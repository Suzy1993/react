// 利用自执行函数， 将图片名信息转成图片URL路径信息
export const genImageURL = (imageDatasArr) => {
  for (var i = 0, j = imageDatasArr.length; i < j; i++) {
    var singleImageData = imageDatasArr[i];
    singleImageData.imageURL = require('./images/' + singleImageData.fileName);
    imageDatasArr[i] = singleImageData;
  }
  return imageDatasArr;
};
