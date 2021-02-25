import React from "react";
import Task from "./Task.js";
import { tasks } from "./tasks.js";

export default class TaskMa extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      task: 0,
      text: tasks[0]["text"],
      ans: tasks[0]["ans"],
    };
    this.increaseTaskId = this.increaseTaskId.bind(this);
  }

  increaseTaskId() {
    console.log("Task ID increased");
    this.setState((prevState) => {
      return {
        task: prevState.task + 1,
        text: tasks[prevState.task + 1]["text"],
        ans: tasks[prevState.task + 1]["ans"],
      };
    });
  }

  render() {
    const { task } = this.state;
    const text = tasks[task]["text"];
    console.log(task);
    let {show} = this.state
    if (!show) show = true
    return (
      <div>
        {task < 8 ? (
          <Task
            id={task}
            text={text}
            correctAns={this.state.ans}
            handler={this.increaseTaskId}
          />
        ) : (
          ""
        )}
      </div>
    );
  }
}
