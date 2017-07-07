import React from 'react';
import { connect } from 'react-redux';
import { switchDate } from '../actions';
import { getDaysOfMonth, getFirstDay } from '../util/util.js';
import cx from 'classnames';

class CalendarContent extends React.Component {
  setTd() {
    const { year, month, day, switchDate } = this.props;
    const days = getDaysOfMonth(year, month);
    const lastDay = month === 1 ? getDaysOfMonth(year - 1, 12) : getDaysOfMonth(year, month - 1);
    const tds = document.getElementsByTagName("td");
    const now = new Date();
    let begin = getFirstDay(year, month);
    begin = begin === 0 ? 7 : begin;
    for (let i = 0, j = lastDay - begin + 1; i < begin; i++, j++) {
      tds[i].innerHTML = j;
      tds[i].className = "days-of-another-month";
      tds[i].onclick = () => month === 1 ? switchDate({year: year - 1, month: 12, day: j}) : switchDate({year: year, month: month - 1, day: j});
    }
    for (let i = 1, j = begin; i <= days; i++, j++) {
      tds[j].innerHTML = i;
      tds[j].className = "";
      if (year === now.getFullYear() && parseInt(month) === now.getMonth() + 1 && i === now.getDate()) {
        tds[j].className += " today";
      }
      if (i === day) {
        tds[j].className += " selected";
      }
      tds[j].onclick = () => switchDate({year: year, month: month, day: i});
    }
    for (let i = begin + days, j = 1; i < tds.length; i++, j++) {
      tds[i].innerHTML = j;
      tds[i].className = "days-of-another-month";
      tds[i].onclick = () => month === 12 ? switchDate({year: year + 1, month: 1, day: j}) : switchDate({year: year, month: month + 1, day: j});
    }
  }
  componentDidMount() {
    this.setTd();
  }
  componentDidUpdate() {
    this.setTd();
  }
  render() {
    return (
      <div id="content-container">
        <table>
          <thead>
            <tr><th>日</th><th>一</th><th>二</th><th>三</th><th>四</th><th>五</th><th>六</th></tr>
          </thead>
          <tbody>
            <tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>
            <tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>
            <tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>
            <tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>
            <tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>
            <tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default connect(
  null,
  {
    switchDate,
  }
)(CalendarContent);
