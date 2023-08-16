const express = require('express');
const ExpressError = require('./expressError');

const app = express();

app.use(express.json());



app.get('/mean/:nums', (req, res, next) => {
    try {
        const nums = req.params.nums;
        // console.log(nums);
        const numsArray = nums.split(',').map(x => Number(x));
        // console.log(numsArray);
        const sum = numsArray.reduce((accum, currVal) => accum + currVal, 0);
        const mean = sum/numsArray.length;
        
        if (!numsArray.length || numsArray.includes(NaN)) {
            throw new ExpressError('query input not valid', 404);
        }
        return res.json({response: {operation: "mean", value: mean}});
    } catch (e) {
        next(e);
    }
})

app.get('/median/:nums', (req, res, next) => {
    try {
        const nums = req.params.nums;
        const numsArray = nums.split(',').map(x => Number(x));
        const sortedNumsArray = numsArray.sort((a,b) => {return a - b}); 
        const middleIndex = Math.floor(sortedNumsArray.length/2);
        // console.log(sortedNumsArray);
        // console.log(sortedNumsArray.length/2);
        // console.log(sortedNumsArray[Math.floor(sortedNumsArray.length/2)]);
   
        if (!numsArray.length || numsArray.includes(NaN)) {
            throw new ExpressError('query input not valid', 400);
        }

        if (sortedNumsArray.length % 2 === 0) {
            const median = (sortedNumsArray[middleIndex] + sortedNumsArray[middleIndex -1]) / 2;
            return res.json({response: {operation: "median", value: median}});
        } else {
            const median = sortedNumsArray[middleIndex];
            return res.json({response: {operation: "median", value: median}});
        }        
    } catch (e) {
        next(e);
    }
})


app.get('/mode/:nums', (req, res, next) => {
    try {
        const nums = req.params.nums;
        const numsArray = nums.split(',').map(x => Number(x));
        const sortedNumsArray = numsArray.sort((a,b) => {return a - b}); 

        if (!numsArray.length || numsArray.includes(NaN)) {
            throw new ExpressError('query input not valid', 400);
        }

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
        
        return res.json({response: {operation: "mode", number: Number(highestValKey), count: highestVal}});

        // https://stackoverflow.com/questions/52898456/simplest-way-of-finding-mode-in-javascript
        // let currCount = 1;
        // let highestCount = 1;
        // let currNum = sortedNumsArray[0];
        // let highestNum = sortedNumsArray[0];

        // for (let i=1; i<sortedNumsArray.length; i++) {
        //     if (sortedNumsArray[i-1] !== sortedNumsArray[i]) {
        //         if (currCount > highestCount) {
        //             highestCount = currCount;
        //             highestNum = currNum;
        //         }
        //         currCount = 0;
        //         currNum = sortedNumsArray[i];    
        //     }
        //     currCount++;
        // }
        // if (currCount > highestCount) {
        //     return res.json({response: {operation: "mode", number: currNum, count: highestCount}});
        // } else {
        //     return res.json({response: {operation: "mode", number: highestNum, count: highestCount}});
        // }        
    } catch (e) {
        next(e);
    }
})


app.use((error, req, res, next) => {
    // res.send("OH NO IT IS AN ERROR!!!");
    // console.log(error.status);
    // console.log(error.message);

    let status = error.status || 500;
    let message = error.message;

    return res.status(status).json({
        error: { message, status}
    });
});


app.listen(3000, () => {
    console.log('Server running on port 3000');
})

