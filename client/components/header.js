const React = require("react");

class Header extends React.Component {
  render() {
    return (
      <div className="header">
        <div className="header-content">
          <span>{this.props.title}</span>
        </div>
      </div>
    );
  }
}

Header.propTypes = {
  title: React.PropTypes.string.isRequired
};

export default Header;
