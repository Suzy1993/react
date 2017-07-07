import React from 'react';
import { connect } from 'react-redux';
import { switchDate } from '../actions';

class CalendarSwitcher extends React.Component {
  render() {
    const { year, month, day, switchDate } = this.props;
    let monthOption = [];
    let yearOption = [];
    for (let i = 15; i >= 1; i--) {
      yearOption.push(<option key={year-i} value={year-i}>{year-i}</option>)
    }
    yearOption.push(<option  key={year} value={year}>{year}</option>)
    for (let i = 1; i <= 15; i++) {
      yearOption.push(<option  key={year+i} value={year+i}>{year+i}</option>)
    }
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].forEach((item, index) => {
      monthOption.push(<option  key={item} value={item}>{item}</option>);
    })
    return (
      <div id="switcher-container">
        <img
          className="prevImg"
          src={require('../images/prev_year.png')}
          onClick={() => switchDate({year: year - 1, month: month, day: day})}
        />
        <img
          className="prevImg"
          src={require('../images/prev_month.png')}
          onClick={() => month === 1 ? switchDate({year: year - 1, month: 12, day: day}) : switchDate({year: year, month: month - 1, day: day})}
        />
        <select
          key={year}
          className="selector"
          defaultValue={year}
          ref={ref => {this.selectYear = ref}}
          onChange={
            () => switchDate({year: parseInt(this.selectYear.value), month: month, day: day})
          }
        >
          {yearOption}
        </select>
        <select
          key={month}
          className="selector"
          defaultValue={month}
          ref={ref => {this.selectMonth = ref}}
          onChange={
            () => switchDate({year: year, month: parseInt(this.selectMonth.value), day: day})
          }
        >
          {monthOption}
        </select>
        <img
          className="nextImg"
          src={require('../images/next_year.png')}
          onClick={() => switchDate({year: year + 1, month: month, day: day})}
        />
        <img
          className="nextImg"
          src={require('../images/next_month.png')}
          onClick={() => month === 12 ? switchDate({year: year + 1, month: 1, day: day}) : switchDate({year: year, month: month + 1, day: day})}
        />
      </div>
    );
  }
}

export default connect(
  null,
  {
    switchDate,
  }
)(CalendarSwitcher);
