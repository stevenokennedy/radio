const React = require("react");

import Header from "../components/header.js";
import NowPlaying from "../components/now-playing.js";
import StationList from "../components/station-list.js";
import StationDetails from "../components/station-details.js";
import ButtonBar from "../components/button-bar.js";

class Viewport extends React.Component {
  render() {
    return (
      <div className="viewport-base">
        <Header title="Internet Radio"/>
        <NowPlaying />
        <div className="main-content-area">
          <StationList />
          <StationDetails />
        </div>
        <ButtonBar />
      </div>
    );
  }
}

export default Viewport;
