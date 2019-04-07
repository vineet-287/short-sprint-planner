import React, { Component } from "react";
import List from "./list";

class TaskBreakup extends Component {
  renderValues = key => {
    if (
      typeof this.props.userAddedTasks[this.props.userStoryObject.id] ===
      "undefined"
    )
      return "";
    return this.props.userAddedTasks[this.props.userStoryObject.id][key];
  };

  render() {
    const { userStoryObject, userAddedTasks, inputTaskValue } = this.props;
    return (
      <div className="mt-4">
        <div>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text" id="basic-addon3">
                Estimated Time
              </span>
            </div>
            <input
              type="number"
              className="form-control"
              value={this.renderValues("time")}
              id="basic-url"
              aria-describedby="basic-addon3"
              onChange={e =>
                this.props.handleUdpateUserStoryObject(
                  userStoryObject,
                  e.target.value,
                  "time"
                )
              }
            />
          </div>
        </div>

        <div>
          <input
            value={inputTaskValue}
            type="text"
            className="form-control"
            placeholder="Start entering your task"
            onKeyPress={event =>
              this.props.handleTaskInputKeyPress(event, userStoryObject)
            }
            onChange={this.props.handleTaskInputOnChange}
          />
          <List
            items={userAddedTasks}
            userStoryObject={userStoryObject}
            handleDeleteUserAddedTask={this.props.handleDeleteUserAddedTask}
          />
        </div>

        <div>
          <span className="text-center">Notes / Queries</span>
          <div className="input-group">
            <textarea
              className="form-control"
              aria-label="With textarea"
              value={this.renderValues("questions_notes")}
              onChange={e =>
                this.props.handleUdpateUserStoryObject(
                  userStoryObject,
                  e.target.value,
                  "questions_notes"
                )
              }
            />
          </div>
        </div>
      </div>
    );
  }
}

export default TaskBreakup;
