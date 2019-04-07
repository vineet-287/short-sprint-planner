import React, { Component } from "react";

class Counter extends Component {
  state = {
    count: 0,
    tags: ["tag1", "tag2", "tag3"]
  };
  render() {
    let classes = "badge m-2 badge-";
    classes += this.state.count === 0 ? "warning" : "primary";
    return (
      <div>
        <span className={classes}>{this.formatCount()}</span>
        <button className="btn btn-secondary btn-sm" onClick={this.handleClick}>
          Increment
        </button>
        <ul>
          {this.state.tags.map(tag => (
            <li key={tag}>{tag}</li>
          ))}
        </ul>
      </div>
    );
  }

  formatCount() {
    return this.state.count === 0 ? "Zero" : this.state.count;
  }

  handleClick() {}
}

export default Counter;
