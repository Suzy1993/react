import update from 'react-addons-update';
import { CENTER, INVERSE, REARRANGE } from '../actions/';
import { genImageURL } from '../util';

var imageDatas = require('../data/imageDatas.json');
var imgsInitialState = [];
genImageURL(imageDatas).forEach(function(value, index) {
  imgsInitialState.push({
    pos: {
      left: 0,
      top: 0
    },
    rotate: 0,
    isInverse: false,
    isCenter: false
  });
});

const initialState = {
  imgsArrangeArr: imgsInitialState,
  Constant: {}
};

const gallery = (state = initialState, { type, payload }) => {
  switch (type) {
    case INVERSE:
      payload.e.preventDefault();
      payload.e.stopPropagation();
      return update(state, {
        imgsArrangeArr: {
          $set: state.imgsArrangeArr.map(img =>
            (img.isCenter === true)
            ? update(img, {
              $merge: {isInverse: !img.isInverse}
            })
            : img
          )
        }
      });
    case CENTER:
      payload.e.preventDefault();
      payload.e.stopPropagation();
      return update(state, {
        imgsArrangeArr: {
          $set: [...rearrange(payload.constant, payload.index, state)]
        }
      });
    case REARRANGE:
      return update(state, {
        Constant: {
          $set: payload.constant
        },
        imgsArrangeArr: {
          $set: rearrange(payload.constant, payload.index, state)
        }
      });
    default:
      break;
  }
  return state;
};

// 获取区间内的一个随机值
const getRangeRandom = (low, high) => {
  return Math.ceil(Math.random() * (high - low) + low);
};

// 获取 0~30° 之间的一个任意正负值
const get30DegRandom = () => {
  return ((Math.random() > 0.5 ? '' : '-') + Math.ceil(Math.random() * 30));
};

/*
 * 重新布局所有图片
 * @param centerIndex 指定居中排布哪个图片
 */
const rearrange = (constant, centerIndex, state) => {
  var save = state.imgsArrangeArr;
  var imgsArrangeArr = state.imgsArrangeArr;
  var centerPos = constant.centerPos,
  hPosRange = constant.hPosRange,
  vPosRange = constant.vPosRange,
  hPosRangeLeftSecX = hPosRange.leftSecX,
  hPosRangeRightSecX = hPosRange.rightSecX,
  hPosRangeY = hPosRange.y,
  vPosRangeTopY = vPosRange.topY,
  vPosRangeX = vPosRange.x,
  imgsArrangeTopArr = [],
  topImgNum = Math.floor(Math.random() * 2),    // 取一个或者不取
  topImgSpliceIndex = 0,
  imgsArrangeCenterArr = imgsArrangeArr.splice(centerIndex, 1);
  // 首先居中 centerIndex 的图片, 居中的 centerIndex 的图片不需要旋转
  imgsArrangeCenterArr[0] = {
    pos: centerPos,
    rotate: 0,
    isCenter: true,
    isInverse: false
  };
  // 取出要布局上侧的图片的状态信息
  topImgSpliceIndex = Math.ceil(Math.random() * (imgsArrangeArr.length - topImgNum));
  imgsArrangeTopArr = imgsArrangeArr.splice(topImgSpliceIndex, topImgNum);
  // 布局位于上侧的图片
  imgsArrangeTopArr.forEach(function (value, index) {
    imgsArrangeTopArr[index] = {
      pos: {
        top: getRangeRandom(vPosRangeTopY[0], vPosRangeTopY[1]),
        left: getRangeRandom(vPosRangeX[0], vPosRangeX[1])
      },
      rotate: get30DegRandom(),
      isCenter: false,
      isInverse: false
    };
  });
  // 布局左右两侧的图片
  for (var i = 0, j = imgsArrangeArr.length, k = j / 2; i < j; i++) {
    var hPosRangeLORX = null;
    // 前半部分布局左边， 右半部分布局右边
    if (i < k) {
      hPosRangeLORX = hPosRangeLeftSecX;
    } else {
      hPosRangeLORX = hPosRangeRightSecX;
    }
    imgsArrangeArr[i] = {
      pos: {
        top: getRangeRandom(hPosRangeY[0], hPosRangeY[1]),
        left: getRangeRandom(hPosRangeLORX[0], hPosRangeLORX[1])
      },
      rotate: get30DegRandom(),
      isCenter: false,
      isInverse: false
    };
  }
  if (imgsArrangeTopArr && imgsArrangeTopArr[0]) {
    imgsArrangeArr.splice(topImgSpliceIndex, 0, imgsArrangeTopArr[0]);
  }
  imgsArrangeArr.splice(centerIndex, 0, imgsArrangeCenterArr[0]);
  return imgsArrangeArr;
};

export default gallery;
