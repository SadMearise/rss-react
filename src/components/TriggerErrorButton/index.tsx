import { Component, PropsWithChildren } from "react";

type TState = {
  counter: number;
};

class TriggerErrorButton extends Component<PropsWithChildren, TState> {
  constructor(props: PropsWithChildren) {
    super(props);

    this.state = { counter: 0 };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState(({ counter }) => ({
      counter: counter + 1,
    }));
  }

  render() {
    const { counter } = this.state;

    if (counter === 1) {
      throw new Error("I crashed!");
    }

    return (
      <button
        type="button"
        onClick={this.handleClick}
      >
        Trigger error
      </button>
    );
  }
}

export default TriggerErrorButton;
