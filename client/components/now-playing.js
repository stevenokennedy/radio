const React = require("react");

class NowPlaying extends React.Component {
  render() {
    return (
      <div className="now-playing">
        <div className="playing-header">
          <div className="labelDiv playing-title">
            <h3 className="label dark">Now Playing:</h3>
          </div>
          <div className="labelDiv">
            <h3 className="label dark">Country of Origin</h3><h3 className="value dark">IE</h3>
          </div>
          <div className="labelDiv">
            <h3 className="label dark">Station Category</h3><h3 className="value dark">Rock</h3>
          </div>
        </div>
        <div className="playing-body">
          <span className="thumb">
            <img src="/images/music-thumb.png" />
          </span>
          <h1 className="stationName">Today FM</h1>
        </div>
        <div className="playing-footer">
          <h3 className="label">Stream</h3>
        </div>
      </div>
    );
  }
}

export default NowPlaying;
