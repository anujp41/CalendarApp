let loremIpsum = require('lorem-ipsum');
let Chance = require('chance');
const chance = new Chance();

function genTimeArray() {
  const checkNumLength = num => {
    const numStr = num.toString();
    return numStr.length < 2 ? 0+numStr : numStr;
  }
  const times = [];
  for (let i = 0; i <= 24*60; i=i+30) {
    const hour = Math.floor(i/60);
    const min = i-(hour*60);
    const currTime = `${checkNumLength(hour)}:${checkNumLength(min)}`;
    times.push(currTime);
  }
  return times;
}

const timeArr = genTimeArray();

const genEventSeed = () => {
  const eventArray = [];
  for (let i = 0; i < 1000; i++) {
    const startNum = chance.integer({min: 0, max: 48});
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