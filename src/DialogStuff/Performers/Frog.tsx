import React, { useState, useContext, createContext } from "react";
import Performer, { PerformerContext } from "../Performer";
import { DialogElementProps } from "../DialogElement";
import AvNormResting from "../images/frog/f-norm-resting.svg";
import AvNorm1 from "../images/frog/f-norm-open-1.svg";
import AvNorm2 from "../images/frog/f-norm-open-2.svg";
import AvLaffResting from "../images/frog/f-laff-resting.svg";
import AvLaff1 from "../images/frog/f-laff-open-1.svg";
import AvLaff2 from "../images/frog/f-laff-open-2.svg";
import AvMadResting from "../images/frog/f-mad-resting.svg";
import AvMad1 from "../images/frog/f-mad-open-1.svg";
import AvMad2 from "../images/frog/f-mad-open-2.svg";
import AvSmugResting from "../images/frog/f-smug-resting.svg";
import AvSmug1 from "../images/frog/f-smug-open-1.svg";
import AvSmug2 from "../images/frog/f-smug-open-2.svg";
import AvShameResting from "../images/frog/f-shame-resting.svg";
import AvShame1 from "../images/frog/f-shame-open-1.svg";
import AvShame2 from "../images/frog/f-shame-open-2.svg";
import AvShockResting from "../images/frog/f-shock-resting.svg";
import AvShock1 from "../images/frog/f-shock-open-1.svg";
import AvShock2 from "../images/frog/f-shock-open-2.svg";
import AvCoolResting from "../images/frog/f-cool-resting.svg";
import AvCool1 from "../images/frog/f-cool-open-1.svg";
import AvCool2 from "../images/frog/f-cool-open-2.svg";
import AvJudg from "../images/Judge/open_mouth.png";
import AvJudgResting from "../images/Judge/closed_mouth.png";
import AvMan from "../images/Man/man_open_mouth.png";
import AvManResting from "../images/Man/man_closed_mouth.png";
import AvWoman from "../images/Woman/woman_open_mouth.png";
import AvWomanResting from "../images/Woman/woman_closed_mouth.png";

import { FrameSet } from "../Performer";

import { Effect } from "windups";

const normFrames = [AvNorm1, AvNorm2];
const normRestingFrames = [AvNormResting];
const laffFrames = [AvLaff1, AvLaff2];
const laffRestingFrames = [AvLaffResting];
const madFrames = [AvMad1, AvMad2];
const madRestingFrames = [AvMadResting];
const smugFrames = [AvSmug1, AvSmug2];
const smugRestingFrames = [AvSmugResting];
const shameFrames = [AvShame1, AvShame2];
const shameRestingFrames = [AvShameResting];
const shockFrames = [AvShock1, AvShock2];
const shockRestingFrames = [AvShockResting];
const coolFrames = [AvCool1, AvCool2];
const coolRestingFrames = [AvCoolResting];
const judgeFrames = [AvJudg];
const judgeRestingFrames = [AvJudgResting];
const manFrames = [AvMan];
const womanFrames = [AvWoman];
const manRestingFrames = [AvManResting];
const womanRestingFrames = [AvWomanResting];
type SetExpressionProps = {
  expression: FrogEmotion;
};

const SetExpression: React.FC<SetExpressionProps> = ({ expression }) => {
  const { setExpression } = useContext(FrogContext);
  const { setAvatarFrames } = useContext(PerformerContext);
  return (
    <Effect
      fn={() => {
        setExpression(expression);
        setAvatarFrames(frogFrameSets[expression]);
      }}
    />
  );
};

function makeExpression(expr: FrogEmotion) {
  return () => <SetExpression expression={expr} />;
}

export const HappyExpression = makeExpression("HAPPY");
export const SmugExpression = makeExpression("SMUG");
export const ShameExpression = makeExpression("SHAME");
export const ShockExpression = makeExpression("SHOCK");
export const MadExpression = makeExpression("MAD");
export const JudgeExpression = makeExpression("JUDGE");
export const ManExpression = makeExpression("MAN");
export const WomanExpression = makeExpression("WOMAN");
type FrogEmotion =
  | "NORMAL"
  | "HAPPY"
  | "MAD"
  | "SMUG"
  | "SHAME"
  | "SHOCK"
  | "COOL"
  | "JUDGE"
  | "MAN"
  | "WOMAN";

type FrogFrameMap = Record<FrogEmotion, FrameSet>;

const frogFrameSets: FrogFrameMap = {
  NORMAL: { normal: normFrames, resting: normRestingFrames },
  HAPPY: { normal: laffFrames, resting: laffRestingFrames },
  MAD: { normal: madFrames, resting: madRestingFrames },
  SMUG: { normal: smugFrames, resting: smugRestingFrames },
  SHAME: { normal: shameFrames, resting: shameRestingFrames },
  SHOCK: { normal: shockFrames, resting: shockRestingFrames },
  COOL: { normal: coolFrames, resting: coolRestingFrames },
  JUDGE: {normal: judgeFrames, resting: judgeRestingFrames},
  MAN: {normal: manFrames, resting: manRestingFrames},
  WOMAN: {normal: womanFrames, resting: womanRestingFrames}

};

interface FrogProps extends DialogElementProps {
  expression?: FrogEmotion;
  silent?: boolean;
}

const FrogContext = createContext<{
  setExpression: React.Dispatch<React.SetStateAction<FrogEmotion>>;
  currentExpression: FrogEmotion;
}>({
  setExpression: () => {},
  currentExpression: "NORMAL",
});

const Frog: React.FC<FrogProps> = ({
  children,
  autoProceed,
  expression: initialExpression = "NORMAL",
  silent,
}) => {
  const [currentExpression, setCurrentExpression] = useState(initialExpression);

  return (
    <FrogContext.Provider
      value={{ setExpression: setCurrentExpression, currentExpression }}
    >
      <Performer
        initialFrameSet={frogFrameSets[initialExpression]}
        autoProceed={autoProceed}
        silent={silent}
      >
        <SetExpression expression={initialExpression} />
        {children}
      </Performer>
    </FrogContext.Provider>
  );
};

export const usePreloadFrogFrames = () => {
  const frames = [
    ...normFrames,
    ...normRestingFrames,
    ...laffFrames,
    ...laffRestingFrames,
    ...madFrames,
    ...madRestingFrames,
    ...smugFrames,
    ...smugRestingFrames,
    ...shameFrames,
    ...shameRestingFrames,
    ...shockFrames,
    ...shockRestingFrames,
    ...coolFrames,
    ...coolRestingFrames,
    ...judgeFrames,
    ...judgeRestingFrames,
    ...manFrames,
    ...manRestingFrames,
    ...womanFrames,
    ...womanRestingFrames
  ];

  frames.forEach((source) => {
    const image = new Image();
    image.src = source;
  });
};

export default Frog;
