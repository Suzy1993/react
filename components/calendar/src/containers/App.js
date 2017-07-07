import React from 'react';
import { connect } from 'react-redux';
import $ from 'jquery';
import CalendarSwitcher from './CalendarSwitcher';
import CalendarContent from './CalendarContent';
import { addZoroPrefix } from '../util/util.js';
import { switchDate } from '../actions';

class App extends React.Component {
  componentDidMount() {
    this.displayer.onclick = () => {
      $(this.calendar).toggle();
    };
  }
  render() {
    const now = new Date();
    return (
      <div>
        <div id="displayer-container" ref={ref => this.displayer = ref}>
          {this.props.year}-{addZoroPrefix(this.props.month)}-{addZoroPrefix(this.props.day)}
        </div>
        <div id="calendar-container" ref={ref => this.calendar = ref}>
          <CalendarSwitcher {...this.props} />
          <CalendarContent {...this.props} />
          <div
            className="calendar-button"
            onClick={
              () => this.props.switchDate({year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate()})
            }
          >
            今天
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  year: state.year,
  month: state.month,
  day: state.day,
});

export default connect(
  mapStateToProps,
  {
    switchDate,
  }
)(App);
