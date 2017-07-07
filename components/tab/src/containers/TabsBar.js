import React from 'react';
import { connect } from 'react-redux';
import { switchTab } from '../actions';
import cx from 'classnames';

class TabsBar extends React.Component {
  render() {
    const data = require('../data/data.json');
    let li = [];
    const { id, switchTab } = this.props;

    data.forEach(function(value, index) {
      li.push(
        <li
          key={index}
          role="tab"
          className={cx("tabs-tab", id === index ? "tab-clicked" : "")}
          onClick={() => switchTab(index)}
        >
          {data[index].bar}
        </li>
      );
    });
    return (
      <div className="tabs-bar" role="tablist">
        <ul className="tabs-nav">
          {li}
        </ul>
      </div>
    );
  }
}

export default connect(
  null,
  {
    switchTab,
  }
)(TabsBar);
