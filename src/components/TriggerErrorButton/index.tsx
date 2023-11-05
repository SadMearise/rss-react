import { FC, useState } from "react";

const TriggerErrorButton: FC = () => {
  const [counter, setCounter] = useState(0);

  const handleClick = () => {
    setCounter((counter) => counter + 1);
  };

  if (counter === 1) {
    throw new Error("I crashed!");
  }

  return (
    <button
      type="button"
      onClick={handleClick}
    >
      Trigger error
    </button>
  );
};

export default TriggerErrorButton;
