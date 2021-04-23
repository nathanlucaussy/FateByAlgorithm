DROP TABLE IF EXISTS fairness_decision;
DROP TABLE IF EXISTS comments;

CREATE TABLE fairness_decision (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  scenario_count TEXT NOT NULL,
  fairness_val INT,
  scenario_name TEXT NOT NULL,
  is_narrative FLOAT NOT NULL,
  dp_selected TEXT NOT NULL,
  created TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE comments (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  created TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  scenario_count TEXT NOT NULL,
  scenario_name TEXT NOT NULL,
  is_narrative TEXT NOT NULL,
  dp_selected TEXT NOT NULL,
  chosen_dp TEXT NOT NULL,
  dp_fairness_comment_1 TEXT,
  dp_fairness_comment_2 TEXT,
  dp_fairness_comment_3 TEXT,
  chosen_extraneous_dp TEXT,
  extraneous_comment TEXT
);
