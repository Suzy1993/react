import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import ImgFigure from './ImgFigure';
import ControllerUnit from './ControllerUnit';
import { rearrange } from '../actions/';
import { genImageURL } from '../util';

require('normalize.css');
require('../styles/main.scss');

class App extends React.Component {
  // 组件加载以后， 为每张图片计算其位置的范围
  componentDidMount() {
    // 首先拿到舞台的大小
    var stageDOM = ReactDOM.findDOMNode(this.refs.stage);
    var stageW = stageDOM.scrollWidth,
      stageH = stageDOM.scrollHeight,
      halfStageW = Math.ceil(stageW / 2),
      halfStageH = Math.ceil(stageH / 2);
    // 拿到一个imageFigure的大小
    var imgFigureDOM = ReactDOM.findDOMNode(this.refs.imgFigure0),
      imgW = imgFigureDOM.scrollWidth,
      imgH = imgFigureDOM.scrollHeight,
      halfImgW = Math.ceil(imgW / 2),
      halfImgH = Math.ceil(imgH / 2);
    var constantCopy = {
      centerPos: {
        left: halfStageW - halfImgW,
        top: halfStageH - halfImgH
      },
      hPosRange: {
        leftSecX: [-halfImgW, halfStageW - halfImgW * 3],
        rightSecX: [halfStageW + halfImgW, stageW - halfImgW],
        y: [-halfImgH, stageH - halfImgH]
      },
      vPosRange: {
        topY: [-halfImgH, halfStageH - halfImgH * 3],
        x: [halfStageW - imgW, halfStageW]
      }
    };
    this.props.rearrange(constantCopy, 0);
  }
  render() {
    var controllerUnits = [],
      imgFigures = [],
      imageDatas = require('../data/imageDatas.json');
    genImageURL(imageDatas).forEach(function(value, index) {
      imgFigures.push(
        <ImgFigure
          key={index}
          index={index}
          data={value}
          ref={'imgFigure' + index}
          constant={this.props.Constant}
          arrange={this.props.imgsArrangeArr[index]}
        />
      );
      controllerUnits.push(
        <ControllerUnit
          key={index}
          index={index}
          constant={this.props.Constant}
          arrange={this.props.imgsArrangeArr[index]}
        />
      );
    }.bind(this));
    return (
      <section className='stage' ref='stage'>
        <section className='img-sec'>
          {imgFigures}
        </section>
        <nav className='controller-nav'>
          {controllerUnits}
        </nav>
      </section>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    imgsArrangeArr: state.imgsArrangeArr,
    Constant: state.Constant
  };
};

export default connect(
  mapStateToProps,
  {
    rearrange
  }
)(App);

