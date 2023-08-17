const express = require('express');
const ExpressError = require('./expressError');
const { findMean, findMedian, findMode } = require('./functions');

const app = express();

app.use(express.json());


app.get('/mean/:nums?', (req, res, next) => {
    try {
        const nums = req.params.nums;
        if (!nums) {
            console.log(nums);
            throw new ExpressError('Parameters empty. Please input numbers.', 404);            
        }
        const numsArray = nums.split(',').map(x => Number(x));    
        if (!numsArray.length || numsArray.includes(NaN)) {
            throw new ExpressError('Query input not valid', 404);
            // use variable for message in a config file. makes it scalable
        }
        return res.json({response: {operation: "mean", value: findMean(numsArray)}});
    } catch (e) {
        next(e);
    }
})

app.get('/median/:nums?', (req, res, next) => {
    try {
        const nums = req.params.nums;

        if (!nums) {
            console.log(nums);
            throw new ExpressError('Parameters empty. Please input numbers.', 404);
        }

        const numsArray = nums.split(',').map(x => Number(x));
        const sortedNumsArray = numsArray.sort((a,b) => {return a - b}); 
        if (!numsArray.length || numsArray.includes(NaN)) {
            throw new ExpressError('Query input not valid', 404);
        }
        return res.json({response: {operation: "median", value: findMedian(sortedNumsArray)}});
    } catch (e) {
        next(e);
    }
})


app.get('/mode/:nums?', (req, res, next) => {
    try {
        const nums = req.params.nums;
        if (!nums) {
            console.log(nums);
            throw new ExpressError('Parameters empty. Please input numbers.', 404);
        }
        const numsArray = nums.split(',').map(x => Number(x));
        const sortedNumsArray = numsArray.sort((a,b) => {return a - b}); 
        if (!numsArray.length || numsArray.includes(NaN)) {
            throw new ExpressError('Query input not valid', 404);
        }
        return res.json({response: {operation: "mode", value: findMode(sortedNumsArray)}});
    } catch (e) {
        next(e);
    }
})


app.use((error, req, res, next) => {
    let status = error.status || 500;
    let message = error.message;
    return res.status(status).json({
        error: { message, status}
    });
});


app.listen(3000, () => {
    console.log('Server running on port 3000');
})

