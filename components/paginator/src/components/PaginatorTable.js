import React from 'react';
import { connect } from 'react-redux';
import Mock from 'mockjs';
import $ from 'jquery';
import { getData } from '../util/mock.js';
import { initData } from '../actions';

class PaginatorTable extends React.Component {
  componentWillMount() {
    const { pageSize, initData } = this.props;
    $.ajax({
      url: getData()+/\/\.json/,
      dataType: 'json',
    }).done(function(data){
      const dataObj = {
        items: data.array,
        totalItem: data.array.length,
        totalPage: Math.ceil(data.array.length / pageSize),
      };
      initData(dataObj);
    });
  }
  render() {
    const { totalPage, items, pageNo, pageSize } = this.props;
    const firstItem = pageSize * (pageNo - 1);
    const lastItem = firstItem + pageSize - 1;
    return (
      <table id="paginator-table">
        <thead>
          <tr key="tr-th">
              <th>学号</th>
              <th>语文</th>
              <th>数学</th>
              <th>英语</th>
          </tr>
        </thead>
        <tbody>
          {
            items.map(function(item, index) {
              if (index >= firstItem && index <= lastItem ) {
                return(
                  <tr key={`tr-${index}`}>
                      <td>{item.studentId}</td>
                      <td>{item.scoreOfChinese}</td>
                      <td>{item.scoreOfMath}</td>
                      <td>{item.scoreOfEnglish}</td>
                  </tr>
                )
              }
            })
          }
        </tbody>
    </table>
    );
  }
}

const mapStateToProps = state => ({
  pageSize: state.pageSize,
  totalPage: state.totalPage,
  items: state.items,
  pageNo: state.pageNo,
});

export default connect(
  mapStateToProps,
  {
    initData,
  }
)(PaginatorTable);
