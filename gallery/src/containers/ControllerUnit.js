import React from 'react';
import { connect } from 'react-redux';
import { inverse, center } from '../actions/';

// CSS
require('normalize.css');
require('../styles/main.scss');

// 控制组件
const ControllerUnit = (props) => {
  var controlelrUnitClassName = 'controller-unit';
  // 如果对应的是居中的图片，显示控制按钮的居中态
  if (props.arrange.isCenter) {
    controlelrUnitClassName += ' is-center';
    // 如果同时对应的是翻转图片， 显示控制按钮的翻转态
    if (props.arrange.isInverse) {
      controlelrUnitClassName += ' is-inverse';
    }
  }
  return (
    <span
      className={controlelrUnitClassName}
      onClick={
        (e) => props.arrange.isCenter
        ? props.inverse(e, props.index)
        : props.center(e, props.constant, props.index)
      }
    >
    </span>
  );
};

export default connect(
  null,
  {
    inverse,
    center
  }
)(ControllerUnit);
