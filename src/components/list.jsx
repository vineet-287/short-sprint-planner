import React, { Component } from "react";

class List extends Component {
  renderLists() {
    if (typeof this.props.items[this.props.userStoryObject.id] == "undefined")
      return null;

    let userStoryId = this.props.userStoryObject.id;
    return this.props.items[userStoryId]["tasks"].map((item, key) => (
      <li key={key}>
        {" "}
        {item}{" "}
        <i
          className="fa fa-close cursor"
          onClick={() => this.props.handleDeleteUserAddedTask(userStoryId, key)}
        />
      </li>
    ));
  }

  render() {
    return <ul>{this.renderLists()}</ul>;
  }
}

export default List;
