import React from 'react';
import $ from 'jquery';

const data = require('./data/data.json');

class App extends React.Component {
  toggleItem(e) {
    $(e.target).next().toggle();
  }
  generateAccordion(data) {
    let accordion = [];
    if (data instanceof Array) {
      let list = [];
      for (var item of data) {
        list.push(this.generateAccordion(item));
      }
      accordion.push(
        <ul key="items" className="ul_item">
          {list}
        </ul>
      );
    } else {
      accordion.push(
        <li key={`item${data.id}`} className="li_item" className={`icon${data.level}`}>
          <div className="item_name" onClick={(e) => this.toggleItem(e)}>
            {data.name}
          </div>
          {this.generateAccordion(data.subItems)}
        </li>
      );
    }
    return accordion;
  }
  render() {
    return (
      <div className="nav_accordion">
        {this.generateAccordion(data)}
      </div>
    );
  }
}
export default App;
