import React, { Component } from "react";
import NavBar from "./components/navbar";
import Grid from "./components/grid";

class App extends Component {
  render() {
    return (
      <div className="App">
        <NavBar />
        <Grid />
      </div>
    );
  }
}

export default App;
