import React from 'react';
import { connect } from 'react-redux';
import PaginatorTable from './PaginatorTable';
import PaginatorPanel from '../containers/PaginatorPanel';

const App = () => (
  <div id="paginator-container">
    <PaginatorTable />
    <PaginatorPanel />
  </div>
);

export default App;
