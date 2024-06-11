export function calculateArea(width:number, height:number): number {
    return width * height;
}

export function minimumPaintCombination(paintNeeded:number): Map<number,number> {
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
