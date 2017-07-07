import Mock from 'mockjs';

export const getData = () => {
  var data ={
    "array|1-10":[
      {
        'studentId|+1': 666,
        'scoreOfChinese|+1': 70,
        'scoreOfMath|+1': 90,
        'scoreOfEnglish|+1': 80
      }
    ]
  }
  Mock.mock(/\.json/, data);
};
