import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

var data = require('../data/data.json');

class TabsContent extends React.Component {
  componentDidMount() {
    $(ReactDOM.findDOMNode(this.tabpanel)).hide().fadeIn(1000);
  }
  componentDidUpdate() {
    $(ReactDOM.findDOMNode(this.tabpanel)).hide().fadeIn(1000);
  }
  render() {
    return (
      <div className="tabs-content">
        <div role="tabpanel" className="tabs-panel" ref={ref => {this.tabpanel = ref}}>{data[this.props.id].content}</div>
      </div>
    );
  }
}

export default TabsContent;
