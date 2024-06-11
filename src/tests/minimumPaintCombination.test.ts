function minimumPaintCombination(paintNeeded:number): Map<number,number> {
    const bucketSizes: number[] = [10,5,2.5,1];

    let paintAmountMap = new Map<number,number>([
        [10,0],
        [5,0],
        [2.5,0],
        [1,0],
    ]);


    for(let bucketSize of bucketSizes){
        paintNeeded = Math.ceil(paintNeeded)
        if (paintNeeded >= bucketSize){
            let numberOfBuckets = Math.floor(paintNeeded / bucketSize);
            paintNeeded -= (numberOfBuckets * bucketSize)
            paintAmountMap.set(bucketSize, (paintAmountMap.get(bucketSize) ||0) + numberOfBuckets);
        }
    }
    return paintAmountMap
    
}

describe('minimumPaintCombination', () => {
    test('should return correct combination of buckets for 0 paint needed', () => {
        const result = minimumPaintCombination(0);
        const expected_result = new Map<number, number>([
            [10,0],
            [5,0],
            [2.5,0],
            [1,0],
        ]);
        expect(result).toEqual(expected_result)
    });
    test('should return correct combination of buckets for 15 paint needed', () => {
        const result = minimumPaintCombination(15);
        const expected_result = new Map<number, number>([
            [10,1],
            [5,1],
            [2.5,0],
            [1,0],
        ]);
        expect(result).toEqual(expected_result)
    });
    test('should return correct combination of buckets for 8.5 paint needed', () => {
        const result = minimumPaintCombination(8.5);
        const expected_result = new Map<number, number>([
            [10,0],
            [5,1],
            [2.5,1],
            [1,2],
        ]);
        expect(result).toEqual(expected_result)
    });
})