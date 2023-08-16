const express = require('express');
const ExpressError = require('./expressError');
const { findMean, findMedian, findMode } = require('./functions');

const app = express();

app.use(express.json());



app.get('/mean/:nums?', (req, res, next) => {
    try {
        const nums = req.params.nums;
        // console.log(nums);
        const numsArray = nums.split(',').map(x => Number(x));
        // console.log(numsArray);        

        if (!numsArray.length || numsArray.includes(NaN)) {
            throw new ExpressError('query input not valid', 404);
        }
        return res.json({response: {operation: "mean", value: findMean(numsArray)}});

    } catch (e) {
        next(e);
    }
})

app.get('/median/:nums?', (req, res, next) => {
    try {
        const nums = req.params.nums;
        const numsArray = nums.split(',').map(x => Number(x));
        const sortedNumsArray = numsArray.sort((a,b) => {return a - b}); 
        // console.log(sortedNumsArray);
        // console.log(sortedNumsArray.length/2);
        // console.log(sortedNumsArray[Math.floor(sortedNumsArray.length/2)]);
   
        if (!numsArray.length || numsArray.includes(NaN)) {
            throw new ExpressError('query input not valid', 400);
        }

        return res.json({response: {operation: "median", value: findMedian(sortedNumsArray)}});

    } catch (e) {
        next(e);
    }
})


app.get('/mode/:nums?', (req, res, next) => {
    try {
        const nums = req.params.nums;
        const numsArray = nums.split(',').map(x => Number(x));
        const sortedNumsArray = numsArray.sort((a,b) => {return a - b}); 

        if (!numsArray.length || numsArray.includes(NaN)) {
            throw new ExpressError('query input not valid', 400);
        }
        
        return res.json({response: {operation: "mode", value: findMode(sortedNumsArray)}});

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

