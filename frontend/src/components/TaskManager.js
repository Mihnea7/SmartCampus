import React from "react";
import Task from "./Task.js";
import axios from "axios";
import { tasks } from "./tasks.js";
import "./Task.css"

export default class TaskManager extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userId: 0,
      task: 0,
      text: tasks[0]["text"],
      ans: tasks[0]["ans"],
      times: [],
      correctness: [],
      clicks:[]
    };
    this.increaseTaskId = this.increaseTaskId.bind(this);
    this.setUserId = this.setUserId.bind(this);
    this.storeUserInput = this.storeUserInput.bind(this);
    this.submitData = this.submitData.bind(this);
  }

  increaseTaskId() {
    if (this.state.task < 8) {
      this.setState((prevState) => {
        return {
          task: prevState.task + 1,
          text: tasks[prevState.task + 1]["text"],
          ans: tasks[prevState.task + 1]["ans"],
        };
      });
    }
    else this.setState(prevState => {
        return {task: prevState + 1}
    })
  }
  storeUserInput(newTime, userAnswer, newClicks) {
    const newCorrectness = this.state.ans === userAnswer;
    this.setState((prevState) => {
      return {
        times: [...prevState.times, newTime],
        correctness: [...prevState.correctness, newCorrectness],
        clicks: [...prevState.clicks, newClicks]
      };
    });
    console.log(this.state.times, this.state.correctness, this.state.clicks);
  }
  setUserId(newId) {
    this.setState({ userId: newId });
  }
  submitData() {
    axios.post("https://mihnea17.pythonanywhere.com/eval-user", {
      userId:this.state.userId,
      times: this.state.times,
      correctness: this.state.correctness,
      clicks: this.state.clicks
    })
    .catch(()=> {console.log("Failed to post data (userId may already exist)")})
    console.log(this.state);
  }
  render() {
    const { task } = this.state;
    let text = ""
    let ans = ""
    if (this.state.task < 9)
     {text = tasks[task]["text"];
     ans = tasks[task]["ans"];}
     console.log(this.state)
    return (
      <div class="task">
        {task < 9 ? (
          <Task
            id={task}
            text={text}
            correctAns={ans}
            increaseTask={this.increaseTaskId}
            saveData={this.storeUserInput}
            changeId={this.setUserId}
            submit={this.submitData}
            clickCounter={this.props.clickCounter}
            resetCount = {this.props.resetCount}
          />
        ) : (
          ""
        )}
      </div>
    );
  }
}
