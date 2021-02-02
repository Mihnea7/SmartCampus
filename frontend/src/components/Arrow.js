import React from "react";
import arrow from "../image/arrow.svg";
import "./Arrow.css";

export default class Arrow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      toggle: this.props.toggle,
    };
    this.rotatingDone = this.rotatingDone.bind(this);
  }

  componentDidMount() {
    const elm = this.image;
    elm.addEventListener("animationend", this.rotatingDone);
  }
  componentWillUnmount() {
    const elm = this.image;
    elm.removeEventListener("animationend", this.rotatingDone);
  }

  rotatingDone() {
    this.setState((prevState) => {
      return {
        toggle: !prevState.toggle,
      };
    });
  }

  render() {
    const toggle = this.props.toggle;
    return (
      <img
        src={arrow}
        alt="Arrow"
        ref={(elm) => {
          this.image = elm;
        }}
        className={toggle ? "rotate" : ""}
      />
    );
  }
}
