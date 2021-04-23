from flask import Flask, send_from_directory, request
import db
import os
import sqlite3
import math
import random
app = Flask(__name__, static_url_path='', static_folder='build')
app.config.from_mapping(
        SECRET_KEY='dev',
        DATABASE=os.path.join(app.instance_path, 'flaskr.sqlite'),
    )

# ensure the instance folder exists
try:
    os.makedirs(app.instance_path)
except OSError:
    pass

@app.route('/counts_backend', methods=['GET'])
def get_counts():
    with sqlite3.connect(app.config['DATABASE']) as con:
        print("go", flush = True)
        cur = con.cursor()
        cur.execute("""SELECT scenario_name, COUNT(user_id) AS counts
                       FROM (SELECT DISTINCT * FROM fairness_decision)
                       GROUP BY scenario_name""")
        rows = cur.fetchall()
        answer_counts = {}
        for row in rows:
            answer_counts[row[0]] = int(row[1])
        chosen_names = []
        chosen_indices = []
        scenario_names = ['Jacob','Cynthia', 'John', 'Jackson','Denise','Ray','Elijah','Martha' ]
        scenario_categories = ['CRIM', 'LOAN', 'CRIM', "LOAN", "CRIM", "LOAN", "CRIM", "LOAN"]
        for round in range(8):
            min_count = 10000000000
            min_names = []
            min_indices = []
            for i in range(len(scenario_names)):
                if (len(chosen_names) > 0):
                    if (scenario_names[i] not in chosen_names) and (scenario_categories[i] != scenario_categories[chosen_indices[-1]] ):
                        if scenario_names[i] not in answer_counts:
                            min_count = 0
                            min_names.append(scenario_names[i])
                            min_indices.append(i)
                        else:
                            if (answer_counts[scenario_names[i]]) < min_count:
                                min_count = answer_counts[scenario_names[i]]
                                min_names.append(scenario_names[i])
                                min_indices.append(i)
                            elif (answer_counts[scenario_names[i]]) == min_count:
                                min_names.append(scenario_names[i])
                                min_indices.append(i)
                else:
                    if scenario_names[i] not in answer_counts:
                        min_count = 0
                        min_names.append(scenario_names[i])
                        min_indices.append(i)
                    else:
                        if (answer_counts[scenario_names[i]]) < min_count:
                            min_count = answer_counts[scenario_names[i]]
                            min_names.append(scenario_names[i])
                            min_indices.append(i)
                        elif (answer_counts[scenario_names[i]]) == min_count:
                            min_names.append(scenario_names[i])
                            min_indices.append(i)
            random_pos = random.randrange(0, len(min_names))
            min_name = min_names[random_pos]
            min_index = min_indices[random_pos]
            chosen_names.append(min_name)
            chosen_indices.append(min_index)

        out_dict = {}
        for j in range(8):
            out_dict[str(j)] = chosen_names[j]
        print(out_dict, flush=True)
        return out_dict


@app.route('/results_backend_avg', methods=['GET'])
def get_averages():
    with sqlite3.connect(app.config['DATABASE']) as con:
        cur = con.cursor()
        cur.execute("""SELECT AVG(fairness_val) AS fairness_val
                       FROM (SELECT AVG(fairness_val) AS fairness_val
                             FROM fairness_decision
                             GROUP BY user_id)""")
        try:
            overall_kindness = (cur.fetchone()[0])/10.0
        except:
            overall_kindness = 5
        cur.execute("""SELECT AVG(fairness_val) AS fairness_val
                       FROM (SELECT AVG(fairness_val) AS fairness_val
                             FROM fairness_decision
                             WHERE is_narrative='true'
                             GROUP BY user_id)""")
        try:
            kindness_narrative = (cur.fetchone()[0])/10.0
        except:
            kindness_narrative = 5
        cur.execute("""SELECT AVG(fairness_val) AS fairness_val
                       FROM (SELECT AVG(fairness_val) AS fairness_val
                             FROM fairness_decision
                             WHERE is_narrative='false'
                             GROUP BY user_id)""")
        try:
            kindness_datapoint = (cur.fetchone()[0])/10.0
        except:
            kindness_datapoint = 5

    return({"overall_kindness": overall_kindness,
            "kindness_narrative": kindness_narrative,
            "kindness_datapoint": kindness_datapoint,
            "group_info": 5,
            "esoteric_info": 5,
            "past_info": 5
            })

@app.route('/results_backend_self', methods=['POST'])
def get_self():
    if not request.json:
        return "not a json post"
    else:
        data = request.get_json()
        current_user = data['user_id']
        print(type(current_user), flush=True)
        with sqlite3.connect(app.config['DATABASE']) as con:
            cur = con.cursor()
            cur.execute("""SELECT AVG(fairness_val) AS fairness_val
                           FROM fairness_decision
                           WHERE user_id=?""", [current_user])
            try:
                overall_kindness = (cur.fetchone()[0])/10.0
            except:
                overall_kindness = "NaN"

            cur.execute("""SELECT AVG(fairness_val) AS fairness_val
                           FROM (SELECT AVG(fairness_val) AS fairness_val
                                 FROM fairness_decision
                                 GROUP BY user_id)""")
            try:
                overall_kindness_avg = (cur.fetchone()[0])/10.0
            except:
                overall_kindness_avg = 5

            cur.execute("""SELECT AVG(fairness_val) AS fairness_val
                           FROM fairness_decision
                           WHERE is_narrative='true' AND user_id = ?""", [current_user])
            try:
                kindness_narrative = (cur.fetchone()[0])/10.0
            except:
                kindness_narrative = "NaN"
            cur.execute("""SELECT AVG(fairness_val) AS fairness_val
                           FROM fairness_decision
                           WHERE is_narrative='false' AND user_id=?""", [current_user])
            try:
                kindness_datapoint = (cur.fetchone()[0])/10.0
            except:
                kindness_datapoint = "NaN"
            print(overall_kindness_avg - min(1, overall_kindness_avg/2.0), flush=True)
            print(overall_kindness_avg + min(1, overall_kindness_avg/2.0), flush=True)
            print(overall_kindness, flush=True)

            if (overall_kindness >= (overall_kindness_avg - min(1, overall_kindness_avg/2.0) )
                and overall_kindness <= (overall_kindness_avg + min(1, overall_kindness_avg/2.0) )):
                user_category = 1
            elif overall_kindness > (overall_kindness_avg + min(0.5, overall_kindness_avg/2.0)):
                user_category = 2
            else:
                user_category = 0
        return({
                "overall_kindness": overall_kindness,
                "kindness_narrative": kindness_narrative,
                "kindness_datapoint": kindness_datapoint,
                "group_info": "NaN",
                "esoteric_info": "NaN",
                "past_info": "NaN",
                "user_category": user_category
                })
@app.route('/send_fairness', methods=['POST'])
def post_fairness_val():
    if not request.json:
        return "not a json post"
    else:
        data = request.get_json()
        try:
            user_id = data['user_id']
            scenario_count = data['scenario_count']
            fairness_val = data['fairness_val']
            scenario_name = data['scenario_name']
            is_narrative = data['is_narrative']
            dp_selected = data['dp_selected']
            print(type(user_id), flush=True)
            print(type(scenario_count), flush=True)
            print(type(fairness_val), flush=True)
            print(type(scenario_name), flush=True)
            print(type(is_narrative), flush=True)
            print(type(dp_selected), flush=True)
            with sqlite3.connect(app.config['DATABASE']) as con:
                cur = con.cursor()
                cur.execute("INSERT INTO fairness_decision (user_id, scenario_count,fairness_val,scenario_name, is_narrative, dp_selected) VALUES (?,?,?,?,?,?)", (user_id, scenario_count,fairness_val,scenario_name, is_narrative, dp_selected))

                con.commit()
                print("Record successfully added", flush=True)
        except:
            con.rollback()
            print("error in insert operation", flush=True)

    return ""

@app.route('/send_comments', methods=['POST'])
def post_comments():
    if not request.json:
        return "not a json post"
    else:
        data = request.get_json()
        try:
            print(1, flush=True)
            user_id = data['user_id']
            print(1, flush=True)

            scenario_count = data['scenario_count']
            print(1, flush=True)
            scenario_name = data['scenario_name']
            print(1, flush=True)
            is_narrative = data['is_narrative']
            print(1, flush=True)
            dp_selected = data['dp_selected']
            print(1, flush=True)
            chosen_dp = data['chosen_dp']
            print(1, flush=True)
            dp_fairness_comment_1 = data['dp_fairness_comment_1']
            dp_fairness_comment_2 = data['dp_fairness_comment_2']
            dp_fairness_comment_3 = data['dp_fairness_comment_3']
            print(1, flush=True)
            chosen_extraneous_dp = data['chosen_extraneous_dp']
            print(1, flush=True)
            extraneous_comment = data['extraneous_comment']
            print(1, flush=True)
            print(type(user_id), flush=True)
            print(type(scenario_count), flush=True)
            print(type(scenario_name), flush=True)
            print(type(is_narrative), flush=True)
            print(type(dp_selected), flush=True)
            print(type(chosen_dp), flush=True)
            print(type(dp_fairness_comment_1), flush=True)
            print(type(chosen_extraneous_dp), flush=True)
            print(type(extraneous_comment), flush=True)
            with sqlite3.connect(app.config['DATABASE']) as con:
                cur = con.cursor()
                cur.execute("INSERT INTO comments (user_id, scenario_count, scenario_name, is_narrative, dp_selected, chosen_dp, dp_fairness_comment_1,dp_fairness_comment_2, dp_fairness_comment_3, chosen_extraneous_dp, extraneous_comment) VALUES (?,?,?,?,?,?,?,?,?,?,?)", (user_id, scenario_count, scenario_name, is_narrative, dp_selected, chosen_dp, dp_fairness_comment_1, dp_fairness_comment_2, dp_fairness_comment_3, chosen_extraneous_dp, extraneous_comment))
                con.commit()
                print("Record successfully added", flush=True)
        except:
            con.rollback()
            print("error in insert operation", flush=True)

    return ""

@app.route('/send_short_comments', methods=['POST'])
def post_short_comments():
    if not request.json:
        return "not a json post"
    else:
        data = request.get_json()
        try:
            print(1, flush=True)
            user_id = data['user_id']
            print(1, flush=True)

            scenario_count = data['scenario_count']
            print(1, flush=True)
            scenario_name = data['scenario_name']
            print(1, flush=True)
            is_narrative = data['is_narrative']
            print(1, flush=True)
            dp_selected = data['dp_selected']
            print(1, flush=True)
            chosen_dp = data['chosen_dp']

            with sqlite3.connect(app.config['DATABASE']) as con:
                cur = con.cursor()
                cur.execute("INSERT INTO comments (user_id, scenario_count, scenario_name, is_narrative, dp_selected, chosen_dp, dp_fairness_comment_1,dp_fairness_comment_2, dp_fairness_comment_3, chosen_extraneous_dp, extraneous_comment) VALUES (?,?,?,?,?,?,?, ?, ? ,?, ?)", (user_id, scenario_count, scenario_name, is_narrative, dp_selected, chosen_dp, None, None, None , None, None ))
                con.commit()
                print("Record successfully added", flush=True)
        except:
            con.rollback()
            print("error in insert operation", flush=True)

    return ""

db.init_app(app)

if __name__ == '__main__':
    app.run(debug=False, host='0.0.0.0', port= 5000)
