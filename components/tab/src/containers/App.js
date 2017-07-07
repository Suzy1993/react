import React from 'react';
import { connect } from 'react-redux';
import TabsBar from './TabsBar';
import TabsContent from '../components/TabsContent';

class App extends React.Component {
  render() {
    return (
      <div id="tabs-container">
        <TabsBar id={this.props.id} />
        <TabsContent id={this.props.id} />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  id: state.id,
});

export default connect(
  mapStateToProps,
)(App);
