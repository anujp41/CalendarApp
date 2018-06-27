let loremIpsum = require('lorem-ipsum');
let Chance = require('chance');
const chance = new Chance();

function genTimeArray(startTime=0) {
  //inner function created as this is only ingested within genTimeArray method
  const checkNumLength = num => {
    const numStr = num.toString();
    return numStr.length < 2 ? 0+numStr : numStr;
  }

  const times = ['Select:']; //set up array to store time in 30min increments

  if (startTime !== 0) {
    const timeArr = startTime.split(':').map(numStr => parseInt(numStr));
    startTime = (timeArr[0]*60)+(timeArr[1]);
  }

  for (let i = startTime; i <= 24*60; i=i+30) {
    const hour = Math.floor(i/60);
    const min = i-(hour*60);
    const currTime = `${checkNumLength(hour)}:${checkNumLength(min)}`;
    times.push(currTime);
  }

  return times;
}

const timeArr = genTimeArray(30);

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

/* Generated this formula but cannot use right away as front-end would need additional work; saving for late if time to get back
function genTimeArray(increment) { //increment to be specfied in minutes
  const initialDate = new Date(2018, 5, 27, 0, 0, 0, 0);
  const timeArr = [];
  while (initialDate.getDate()<=28) {
    timeArr.push(initialDate.toLocaleTimeString('en-US', {hour: '2-digit', minute:'2-digit'}));
    initialDate.setMinutes(initialDate.getMinutes()+30);
  }
  return timeArr;
}
*/