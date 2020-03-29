var express = require('express');
var router = express.Router();
var fs = require('fs');

const coursesData = fs.readFileSync('data/udemy_courses.csv', 'UTF-8');

// split the contents by new line
const coursesAll = coursesData.split('\n');

// // print all lines
// lines.forEach((line) => {
//     console.log(line);
// });


/* GET home page. */
router.post('/', function(req, res, next) {
  const skills = req.body;
  let courses = [];
  for(cate in skills) {
    const top3Skills = skills[cate].slice(0,2);
    const top2Courses = rec_courses(top3Skills);
    courses = courses.concat(top2Courses);
  }
  // await new Promise(resolve => setTimeout(resolve, 5000));
  // console.log('search results: ', courses);
  res.send(courses);
});

function rec_courses(skills){
  let courses1 = [];
  for(skill of skills) {
    for(course of coursesAll) {
      var courseArr = course.split(',');
      var title = courseArr[0];
      var rating = courseArr[1];
      if(isNaN(rating)) continue
      var level = courseArr[2];
      var link = courseArr[3];
      //console.log('search title: ', title);
      if(title.toLowerCase().includes(skill)){
        courses1.push({
          'title': title,
          'rating': rating,
          'level': level,
          'link': link
        });
        break;
      }
    }
  }
  return courses1;
}

module.exports = router;
