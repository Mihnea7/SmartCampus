import React from "react";
import Draggable from "react-draggable";

export default class Welcome extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      task: this.props.text,
      user_ans: "",
      time: 0,
      completed:false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
    console.log("Task created");

    this.timeCounter = setInterval(() => {
      this.setState((prevState) => ({
        time: prevState.time + 1,
      }));
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timeCounter);
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({time:0})
    this.props.handler();
    
  }

  render() {
    const  task  = this.props.text;

    return (
      <div>
        <Draggable>
          <div>
            TIME: {this.props.id !== 0 ? `TIME:${this.state.time}` : "No time limit for this quesiton."}
            <br />
            {task}
            <form onSubmit={(this.handleSubmit)}>
              <label>
                Answer:
                <input type="text" name="Answer" />
              </label>
              <input type="submit" value="Submit" />
            </form>
          </div>
        </Draggable>
      </div>
    );
  }
}
