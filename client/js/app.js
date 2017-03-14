var React = require("react")
  , ReactDOM = require("react-dom");

import Viewport from "../components/viewport.js";

class App extends React.Component {
  render() {
    return (
      <Viewport />
    );
  }
}

ReactDOM.render(
    <App/>, document.getElementById("app"));
