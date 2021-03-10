import React from "react";

export default class Task extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      task: this.props.text,
      answer: this.props.ans,
      time: 0,
      completed: false,
      clicks: 0,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
    this.timeCounter = setInterval(() => {
      this.setState((prevState) => ({
        time: prevState.time + 1,
      }));
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timeCounter);
    this.props.submit();
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({ time: 0 });
    if (this.props.id === 0) {
      this.props.changeId(event.target.answer.value);
      console.log(`Selected user ID: ${event.target.answer.value}`);
    } else {
      this.props.saveData(this.state.time, event.target.answer.value, this.props.clickCounter);
    }
    this.props.increaseTask();
    this.props.resetCount();
  }
  render() {
    const task = this.props.text;
    return (
      <div>
        {task} <br />
        <form onSubmit={this.handleSubmit}>
          <label>
            Answer:
            <input
              id="dataInput"
              type="text"
              name="answer"
              placeholder="Type your answer here"
            />
          </label>
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}
