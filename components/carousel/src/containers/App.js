import React from 'react';
import { connect } from 'react-redux';
import { activate } from '../actions';
import cx from 'classnames';

class App extends React.Component {
  posClass() {
    const { activeIndex } = this.props;
    switch (activeIndex) {
      case 1: return "first";
      case 2: return "second";
      case 3: return "third";
      case 4: return "forth";
      case 5: return "fifth";
      case 6: return "virtual";
    }
  }
  toRight() {
    const { activeIndex, activate } = this.props;
    if (activeIndex !== 6) {
      activate(activeIndex + 1);
    } else {
      activate(1);
    }
  }
  toLeft() {
    const { activeIndex, activate } = this.props;
    activate(activeIndex - 1);
  }
  autoPlay() {
    const { interval } = this.props;
    this.timeOut = setInterval(() => this.toRight(), interval);
  }
  componentDidMount() {
    this.autoPlay();
    this.closeFlag = true;
  }
  componentDidUpdate() {
    const { activeIndex } = this.props;
    if (activeIndex === 1 && this.closeFlag === true) {
      this.images.className = "closeTransition";
    }
    if (this.closeFlag === false) {
      this.closeFlag = true
    }
  }
  render() {
    const { activeIndex, activate } = this.props;
    return (
      <div id="box">
        <div id="images" className={this.posClass()} ref={ref => {this.images = ref}}>
          <div className="img" id="img1"><img src={require("../images/img1.png")} /></div>
          <div className="img" id="img2"><img src={require("../images/img2.png")} /></div>
          <div className="img" id="img3"><img src={require("../images/img3.png")} /></div>
          <div className="img" id="img4"><img src={require("../images/img4.png")} /></div>
          <div className="img" id="img5"><img src={require("../images/img5.png")} /></div>
          <div className="img" id="img_virtual"><img src={require("../images/img1.png")} /></div>
        </div>
        <div id="indexes">
          <div id="index1" className={cx("index", (activeIndex === 1 || activeIndex === 6) ? "activated" : "")} onClick={() => {this.closeFlag=false;clearInterval(this.timeOut);activate(1);this.autoPlay();}}>1</div>
          <div id="index2" className={cx("index", activeIndex === 2 ? "activated" : "")} onClick={() => {clearInterval(this.timeOut);activate(2);this.autoPlay();}}>2</div>
          <div id="index3" className={cx("index", activeIndex === 3 ? "activated" : "")} onClick={() => {clearInterval(this.timeOut);activate(3);this.autoPlay();}}>3</div>
          <div id="index4" className={cx("index", activeIndex === 4 ? "activated" : "")} onClick={() => {clearInterval(this.timeOut);activate(4);this.autoPlay();}}>4</div>
          <div id="index5" className={cx("index", activeIndex === 5 ? "activated" : "")} onClick={() => {clearInterval(this.timeOut);activate(5);this.autoPlay();}}>5</div>
        </div>
        <div
          className={cx("prev", activeIndex !== 1 && activeIndex !== 6 ? "" : "disabled")}
          onClick={
            () => {
              if (activeIndex !== 1 && activeIndex !== 6) {
                this.closeFlag = false;
                clearInterval(this.timeOut);
                this.toLeft();
                this.autoPlay();
              }
            }
          }
        >
          &lt;
        </div>
        <div
          className={cx("next", activeIndex !== 5 ? "" : "disabled")}
          onClick={
            () => {
              if (activeIndex !== 5) {
                clearInterval(this.timeOut);
                this.toRight();
                this.autoPlay();
              }
            }
          }
        >
          &gt;
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  activeIndex: state.activeIndex,
});

export default connect(
  mapStateToProps,
  {
    activate,
  },
)(App);
