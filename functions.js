const findMean = (numsArray) => {
    const sum = numsArray.reduce((accum, currVal) => accum + currVal, 0);
    const mean = sum/numsArray.length;
    return mean;
}


const findMedian = (sortedNumsArray) => {
    const middleIndex = Math.floor(sortedNumsArray.length/2);
    // console.log(sortedNumsArray);
    // console.log(sortedNumsArray.length/2);
    // console.log(sortedNumsArray[Math.floor(sortedNumsArray.length/2)]);

    if (sortedNumsArray.length % 2 === 0) {
        const median = (sortedNumsArray[middleIndex] + sortedNumsArray[middleIndex -1]) / 2;
        return median;
    } else {
        const median = sortedNumsArray[middleIndex];
        return median;
    }  
}


const findMode = (sortedNumsArray) => {
    // https://www.youtube.com/watch?v=0V2Mi16xd04
    // create object of occurences (e.g. {1:1, 2:1, 4:2, 5:4, 8:1, 9:2})
    const obj = {};
    sortedNumsArray.forEach(num => {
        if (!obj[num]) {
            obj[num] = 1;
        } else {
            obj[num] ++;
        }
    });
    // console.log(obj);

    let highestVal = 0;
    let highestValKey = 0;

    // loop through obj to get highest value and corresponding key
    for (let key in obj) {
        const val = obj[key];
        if (val > highestVal) {
            highestVal = val;
            highestValKey = key;
        }
    }
    
    // return res.json({response: {operation: "mode", number: Number(highestValKey), count: highestVal}});

    return Number(highestValKey);

//     // https://stackoverflow.com/questions/52898456/simplest-way-of-finding-mode-in-javascript
//     // let currCount = 1;
//     // let highestCount = 1;
//     // let currNum = sortedNumsArray[0];
//     // let highestNum = sortedNumsArray[0];

//     // for (let i=1; i<sortedNumsArray.length; i++) {
//     //     if (sortedNumsArray[i-1] !== sortedNumsArray[i]) {
//     //         if (currCount > highestCount) {
//     //             highestCount = currCount;
//     //             highestNum = currNum;
//     //         }
//     //         currCount = 0;
//     //         currNum = sortedNumsArray[i];    
//     //     }
//     //     currCount++;
//     // }
//     // if (currCount > highestCount) {
//     //     return res.json({response: {operation: "mode", number: currNum, count: highestCount}});
//     // } else {
//     //     return res.json({response: {operation: "mode", number: highestNum, count: highestCount}});
//     // }            
}

module.exports = { findMean, findMedian, findMode };