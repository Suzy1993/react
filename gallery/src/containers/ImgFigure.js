import React from 'react';
import { connect } from 'react-redux';
import { inverse, center } from '../actions/';

// CSS
require('normalize.css');
require('../styles/main.scss');

const ImgFigure = (props) => {
  var styleObj = {};
  // 如果props属性中指定了这张图片的位置，则使用
  if (props.arrange.pos) {
      styleObj = props.arrange.pos;
  }
  // 如果图片的旋转角度有值并且不为0， 添加旋转角度
  if (props.arrange.rotate) {
    (['MozTransform', 'msTransform', 'WebkitTransform', 'transform']).forEach(function (value) {
      styleObj[value] = 'rotate(' + props.arrange.rotate + 'deg)';
    });
  }
  // 如果是居中的图片， z-index设为11
  if (props.arrange.isCenter) {
    styleObj.zIndex = 11;
  }
  var imgFigureClassName = 'img-figure';
    imgFigureClassName += props.arrange.isInverse ? ' is-inverse' : '';
  return (
    <figure
      className={imgFigureClassName}
      style={styleObj}
      onClick={
        (e) => props.arrange.isCenter
        ? props.inverse(e, props.index)
        : props.center(e, props.constant, props.index)
      }
    >
      <img src={props.data.imageURL}
        alt={props.data.title}
      />
      <figcaption>
        <h2 className='img-title'>{props.data.title}</h2>
        <div className='img-back' onClick={(e) => props.inverse(e, props.index)}>
          <p>
            {props.data.desc}
          </p>
        </div>
      </figcaption>
    </figure>
  );
};

export default connect(
  null,
  {
    inverse,
    center
  }
)(ImgFigure);
