import React, { Component } from "react";
import { CSVLink } from "react-csv";
import UserStory from "./userStory";
import Detail from "./detail";
import TaskBreakup from "./taskBreakup";
var records = require("../rowdata/rowdata.json");
var tasks = require("../rowdata/tasks.json");

class Grid extends Component {
  constructor(props) {
    super();
  }

  state = {
    records: records,
    tasks: tasks,
    currentUs: {},
    userAddedTasks: [],
    inputTaskValue: "",
    csvData: []
  };

  handleClickUS = id => {
    this.setState({ currentUs: this.state.records.data[id] });
  };

  filterTask = event => {
    let string = event.target.value;
    const tasks = [...this.state.tasks];

    let filtered = tasks.filter(
      object =>
        object.module_type.toLowerCase().includes(string) ||
        object.title.toLowerCase().includes(string)
    );
    this.setState({ tasks: filtered });
  };

  addNecessary = (userStoryObject, value, key) => {
    const userAddedTasks = [...this.state.userAddedTasks];
    if (typeof userAddedTasks[userStoryObject.id] === "undefined") {
      userAddedTasks[userStoryObject.id] = [];
      userAddedTasks[userStoryObject.id]["tasks"] = [];
      userAddedTasks[userStoryObject.id]["time"] = "";
      userAddedTasks[userStoryObject.id]["questions_notes"] = "";
    }
    this.setState({ userAddedTasks }, () => {
      this.udpateUserStoryObject(userStoryObject, value, key);
    });
  };

  handleTaskInputKeyPress = (event, userStoryObject) => {
    var code = event.keyCode ? event.keyCode : event.which;
    if (code === 13) {
      this.addNecessary(userStoryObject, this.state.inputTaskValue, "tasks");
    }
  };

  handleTaskInputOnChange = event => {
    this.setState({ inputTaskValue: event.target.value });
  };

  handleDeleteUserAddedTask = (userStoryId, index) => {
    const userAddedTasks = [...this.state.userAddedTasks];
    delete userAddedTasks[userStoryId]["tasks"][index];
    this.setState({ userAddedTasks });
  };

  handleInputChanges = (userStoryObject, value, key) => {
    this.addNecessary(userStoryObject, value, key);
  };

  udpateUserStoryObject = (userStoryObject, value, key) => {
    const userAddedTasks = [...this.state.userAddedTasks];
    if (key === "tasks") {
      userAddedTasks[userStoryObject.id][key].push(value);
    } else {
      userAddedTasks[userStoryObject.id][key] = value;
    }
    this.setState({ userAddedTasks, inputTaskValue: "" });
  };

  handleCsvExport = () => {
    const userAddedTasks = [...this.state.userAddedTasks];
    const csvData = [];
    userAddedTasks.forEach((value, index) => {
      if (typeof index !== "undefined" && typeof value !== "undefined")
        csvData.push({
          userStoryId: index,
          time: value.time,
          tasks: value.tasks,
          questions: value.questions_notes
        });
    });
    this.setState({ csvData });
  };

  render() {
    let csvHeaders = [
      { label: "User Story Number", key: "userStoryId" },
      { label: "Estimated Time", key: "time" },
      { label: "Task Breakups", key: "tasks" },
      { label: "Notes / Questions", key: "questions" }
    ];
    return (
      <div className="container-fluid content-wrapper">
        <div id="sortableKanbanBoards" className="row">
          <div className="col">
            <div className="panel panel-primary kanban-col">
              <div className="panel-heading mt-4">User Stories</div>
              <div className="panel-body">
                <div id="TODO" className="kanban-centered">
                  {this.state.records.data.map((userStory, key) => (
                    <UserStory
                      key={userStory.id}
                      id={key}
                      userStoryObject={userStory}
                      handleClickUS={this.handleClickUS}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="col-6">
            <div className="panel panel-primary kanban-col">
              <div className="panel-heading mt-4">Detail Description</div>
              <div className="panel-body">
                <div id="DOING" className="kanban-centered">
                  {Object.keys(this.state.currentUs).length > 0 && (
                    <Detail storyObject={this.state.currentUs} />
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="panel-heading mt-4">
              Estimations & Task breakup
              <CSVLink
                data={this.state.csvData}
                headers={csvHeaders}
                onClick={(event, done) => {
                  this.handleCsvExport();
                  done();
                }}
                asyncOnClick={true}
                filename={`sprint_breakup.csv`}
              >
                <i className="fa fa-download pull-right" />
              </CSVLink>
            </div>
            {Object.keys(this.state.currentUs).length > 0 && (
              <TaskBreakup
                tasks={this.state.tasks}
                userStoryObject={this.state.currentUs}
                handleFilter={this.filterTask}
                handleTaskInputKeyPress={this.handleTaskInputKeyPress}
                userAddedTasks={this.state.userAddedTasks}
                inputTaskValue={this.state.inputTaskValue}
                handleTaskInputOnChange={this.handleTaskInputOnChange}
                handleDeleteUserAddedTask={this.handleDeleteUserAddedTask}
                handleUdpateUserStoryObject={this.handleInputChanges}
              />
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Grid;
