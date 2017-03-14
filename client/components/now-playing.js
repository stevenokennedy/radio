const React = require("react");

class NowPlaying extends React.Component {
  render() {
    return (
      <div className="now-playing">
        <div className="playing-header">
          <span className="label">Country</span><span>IE</span>
          <span className="label">Category</span><span>Rock</span>
        </div>
        <div className="playing-body">
          <span className="thumb">thumb</span>
          <span className="stationName">Today FM</span>
        </div>
        <div className="playing-footer">
          <span className="label">Stream</span>
        </div>
      </div>
    );
  }
}

export default NowPlaying;
