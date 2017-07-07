import React from 'react';
import { connect } from 'react-redux';
import { switchPage, setPageSize, gotoPage } from '../actions';
import cx from 'classnames';

class PaginatorPanel extends React.Component {
  render() {
    const { totalPage, totalItem, pageSize, switchPage, setPageSize, gotoPage, pageNo} = this.props;
    let panels = [], flag = 0;
    panels.push(
      <div
        className={cx("panelDiv", "panelArrow", pageNo === 1 ? "disabled" : "")}
        key="pagePrev"
        onClick={
          pageNo === 1
          ? ""
          : () => switchPage(pageNo - 1)
        }
      >
        &lt;
      </div>
    );
    if (totalPage <= 5) {
      for (let i = 1; i <= totalPage; i++) {
        panels.push(
          <div
            className={cx("panelDiv", pageNo === i ? "clicked" : "")}
            key={`page${i}`}
            onClick={
              () => switchPage(i)
            }
          >
            {i}
          </div>
        );
      }
    } else {
      panels.push(
        <div
          className={cx("panelDiv", pageNo === 1 ? "clicked" : "")}
          key="firstPage"
          onClick={
            () => switchPage(1)
          }
        >
          1
        </div>
      );
      for (let i = 2; i < totalPage; i++) {
        if (Math.abs(pageNo - i) <= 1) {
          flag = 0;
          panels.push(
            <div
              className={cx("panelDiv", pageNo === i ? "clicked" : "")}
              key={`page${i}`}
              onClick={
                () => switchPage(i)
              }
            >
              {i}
            </div>
          );
        } else if (flag === 0) {
          flag = 1;
          panels.push(
            <div className={cx("panelDiv", "middlePage")} key={`page${i}`}>
              ...
            </div>
          );
        }
      }
      panels.push(
        <div
          className={cx("panelDiv", pageNo === totalPage ? "clicked" : "")}
          key="lastPage"
          onClick={
            () => switchPage(totalPage)
          }
        >
          {totalPage}
        </div>
      );
    }
    panels.push(
      <div
        className={cx("panelDiv", "panelArrow", pageNo === totalPage ? "disabled" : "")}
        key="pageNext"
        onClick={
          pageNo === totalPage
          ? ""
          : () => switchPage(pageNo + 1)
        }
      >
        &gt;
      </div>
    );
    return (
      <div id="panel-container">
        {panels}
        <div id="panelContent">
          总共<span id="totalItem">{totalItem}</span>条,
          共<span id="totalPage">{totalPage}</span>页,
          每页最多显示
          <input
            type="text"
            id="pageSize"
            placeholder={pageSize}
            ref={node => {this.inputSetPageSize = node}}
            onKeyPress={
              (e) => {
                if ((e.charCode || e.which || e.keyCode) === 13) {
                  if (/^\d+$/.test(this.inputSetPageSize.value)) {
                    setPageSize(parseInt(this.inputSetPageSize.value));
                  } else {
                    alert("请输入数字！");
                  }
                  this.inputGotoPage.value = "";
                }
              }
            }
          />
          条,
          当前第<span id="pageNo">{pageNo}</span>页,
          到第
          <input
            type="text"
            id="gotoPage"
            ref={node => {this.inputGotoPage = node}}
            onKeyPress={
              (e) => {
                if ((e.charCode || e.which || e.keyCode) === 13) {
                  if (/^\d+$/.test(this.inputGotoPage.value)
                    && parseInt(this.inputGotoPage.value) >= 1
                    && parseInt(this.inputGotoPage.value) <= totalPage
                    ) {
                    gotoPage(parseInt(this.inputGotoPage.value));
                  } else if (totalPage !== 1) {
                    alert(`请输入1到${totalPage}之间的数字！`);
                  } else {
                    alert("总共只有1页");
                  }
                  this.inputGotoPage.value = "";
                }
              }
            }
          />
          页
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  totalPage: state.totalPage,
  totalItem: state.totalItem,
  pageSize: state.pageSize,
  pageNo: state.pageNo,
});

export default connect(
  mapStateToProps,
  {
    switchPage,
    setPageSize,
    gotoPage,
  }
)(PaginatorPanel);
