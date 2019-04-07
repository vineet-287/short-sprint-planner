import React, { Component } from "react";

class UserStory extends Component {
  state = {};

  renderDescrptionText = description => {
    return description.length > 100
      ? description.substring(0, 100) + ".."
      : description;
  };

  render() {
    const { userStoryObject, id } = this.props;
    return (
      <article
        className="kanban-entry grab"
        id={"item" + id}
        draggable="true"
        onClick={() => this.props.handleClickUS(id)}
      >
        <div className="kanban-entry-inner">
          <div className="kanban-label">
            <h2>
              <span className="pull-left">{userStoryObject.title}</span>
            </h2>
            <p className="mt-4">
              {this.renderDescrptionText(userStoryObject.description)}
            </p>
          </div>
        </div>
      </article>
    );
  }
}

export default UserStory;
