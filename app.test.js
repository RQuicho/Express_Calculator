const { findMean, findMedian, findMode } = require('./functions');

describe("findMean", () => {
    it("get mean from query of numbers", () => {
        expect(findMean([1,3,5,7,9])).toEqual(5)
    })
})


describe("findMedian", () => {
    it("get median of odd set of numbers", () => {
        expect(findMedian([1,3,5,7,9])).toEqual(5)
    });
    it("get median of even set of numbers", () => {
        expect(findMedian([1,3,5,7])).toEqual(4)
    });
})

describe("findMode", () => {
    it("get mode of query of numbers", () => {
        expect(findMode([1,3,5,5,5,6,6,7])).toEqual(5)
    });
})