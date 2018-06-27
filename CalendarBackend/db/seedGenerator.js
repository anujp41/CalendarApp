let loremIpsum = require('lorem-ipsum');
let Chance = require('chance');
const chance = new Chance();

function genTimeArray() { //increment to be specfied in minutes
  const initialDate = new Date(2018, 5, 27, 0, 0, 0, 0);
  const timeArr = [];
  while (initialDate.getDate()<=28) {
    timeArr.push(initialDate.toLocaleTimeString('en-US', {hour: '2-digit', minute:'2-digit'}));
    initialDate.setMinutes(initialDate.getMinutes()+30);
  }
  return timeArr;
}

const timeArr = genTimeArray();

const genEventSeed = () => {
  const eventArray = [];
  for (let i = 0; i < 1000; i++) {
    const startNum = chance.integer({min: 0, max: 47});
    const endNum = chance.integer({min: startNum, max: 48});
    const eventObj = {
      description: loremIpsum({count: 5, units: 'words'}),
      eventDate: chance.birthday({string: true, year: chance.year({min: 2016, max: 2018})}),
      startTime: timeArr[startNum],
      endTime: timeArr[endNum]
    }
    eventArray.push(eventObj);
  }
  return eventArray;
}

module.exports = genEventSeed;