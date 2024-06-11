import inquirer from "inquirer";
const askNumberOfRooms = async () => {
    const numberOfRooms = await inquirer.prompt([
        {
            type: 'number',
            name: 'rooms',
            message: 'How many rooms would you like to paint?'
        },
    ]);
    return numberOfRooms.rooms;
};
const askNumberOfWalls = async () => {
    const walls = await inquirer.prompt([
        {
            type: 'number',
            name: 'walls',
            message: 'How many walls are you painting in this room?'
        }
    ]);
    return walls.walls;
};
const askHowManyCoats = async () => {
    const coats = await inquirer.prompt([
        {
            type: 'number',
            name: 'coats',
            message: 'How many coats of paint do you need for this wall?'
        }
    ]);
    return coats.coats;
};
const askBrand = async () => {
    const paintBrand = await inquirer.prompt([
        {
            type: 'list',
            name: 'brand',
            choices: [
                'Farrow & Ball',
                'Dulux',
                'Lick',
            ],
            message: 'Which brand would you like for this colour? (ordered by price)'
        }
    ]);
    return paintBrand.brand;
};
function calculateArea(width, height) {
    return width * height;
}
const calculateIncludedWallArea = async () => {
    const wall_dimensions = await inquirer.prompt([
        {
            type: 'input',
            name: 'width',
            message: 'What is the width of this wall in meters?'
        },
        {
            type: 'input',
            name: 'height',
            message: 'What is the height of this wall in meters?'
        }
    ]);
    return calculateArea(wall_dimensions.width, wall_dimensions.height);
};
const calculateExcludedWallArea = async () => {
    const wall_dimensions = await inquirer.prompt([
        {
            type: 'number',
            name: 'width',
            message: 'What is the width of this wall you want to exclude in meters?'
        },
        {
            type: 'number',
            name: 'height',
            message: 'What is the height of this wall you want to exclude in meters?'
        }
    ]);
    return calculateArea(wall_dimensions.width, wall_dimensions.height);
};
const whichColour = async () => {
    const room_colour = await inquirer.prompt([
        {
            type: 'list',
            name: 'colour',
            choices: [
                'White',
                'Cream',
                'Navy Blue',
                'Light Grey',
                'Baby Pink',
                'Sage Green',
            ],
            message: 'Which colour would you like to paint this wall?'
        }
    ]);
    return room_colour.colour;
};
function minimumPaintCombination(paintNeeded) {
    const bucketSizes = [10, 5, 2.5, 1];
    let paintAmountMap = new Map([
        [10, 0],
        [5, 0],
        [2.5, 0],
        [1, 0],
    ]);
    paintNeeded = Math.ceil(paintNeeded);
    for (let bucketSize of bucketSizes) {
        if (paintNeeded >= bucketSize) {
            let numberOfBuckets = Math.floor(paintNeeded / bucketSize);
            paintNeeded -= (numberOfBuckets * bucketSize);
            paintAmountMap.set(bucketSize, (paintAmountMap.get(bucketSize) || 0) + numberOfBuckets);
        }
    }
    return paintAmountMap;
}
let fAndBMap = new Map([
    ['White', [8, 16, 30, 48]],
    ['Cream', [14, 40, 70, 136]],
    ['Navy Blue', [24, 60, 110, 168]],
    ['Light Grey', [24, 60, 110, 168]],
    ['Baby Pink', [24, 60, 110, 168]],
    ['Sage Green', [24, 60, 110, 168]],
]);
let duluxMap = new Map([
    ['White', [4, 8, 15, 24]],
    ['Cream', [7, 20, 35, 68]],
    ['Navy Blue', [12, 30, 55, 84]],
    ['Light Grey', [12, 30, 55, 84]],
    ['Baby Pink', [12, 30, 55, 84]],
    ['Sage Green', [15, 30, 55, 84]],
]);
let lickMap = new Map([
    ['White', [3, 6, 11, 21]],
    ['Cream', [5, 14, 26, 50]],
    ['Navy Blue', [9, 25, 48, 80]],
    ['Light Grey', [9, 25, 48, 80]],
    ['Baby Pink', [9, 25, 48, 80]],
    ['Sage Green', [9, 25, 48, 80]],
]);
let paintBrandsMap = new Map([
    ['Farrow & Ball', fAndBMap],
    ['Dulux', duluxMap],
    ['Lick', lickMap],
]);
let paintNeededMap = new Map([
    ['White', 0],
    ['Cream', 0],
    ['Navy Blue', 0],
    ['Light Grey', 0],
    ['Baby Pink', 0],
    ['Sage Green', 0]
]);
function updatePaintNeeded(roomColour, paintNeeded) {
    const currentValue = paintNeededMap.get(roomColour);
    paintNeededMap.set(roomColour, (currentValue || 0) + paintNeeded);
}
async function main() {
    const numberOfRooms = await askNumberOfRooms();
    console.log(`You are painting ${numberOfRooms} rooms!`);
    for (let i = 0; i < numberOfRooms; i++) {
        let numberOfWalls = await askNumberOfWalls();
        console.log(`You are painting ${numberOfWalls} walls!`);
        for (let j = 0; j < numberOfWalls; j++) {
            console.log(`Wall ${j + 1}:`);
            let wallArea = 0;
            wallArea += await calculateIncludedWallArea();
            wallArea -= await calculateExcludedWallArea();
            let coats = await askHowManyCoats();
            let roomColour = await whichColour();
            let paintNeeded = parseFloat(((wallArea / 10) * coats).toFixed(2));
            updatePaintNeeded(roomColour, paintNeeded);
        }
    }
    let total = 0;
    for (let [key, value] of paintNeededMap) {
        if (value > 0) {
            let brand = await askBrand();
            console.log(`You need ${value} litres of ${key} paint of the brand ${brand}`);
            let amounts = await minimumPaintCombination(value);
            let paintBrandPrices = paintBrandsMap.get(brand)?.get(key)?.reverse();
            let idx = 0;
            for (let [key_1, value_1] of amounts) {
                if (value_1 > 0) {
                    const bucketPrice = paintBrandPrices?.[idx];
                    if (bucketPrice !== undefined) {
                        console.log(`For the ${key} paint, you need ${value_1} buckets of ${key_1} litres, this costs £${bucketPrice * value_1}`);
                        total += (bucketPrice * value_1);
                    }
                }
            }
        }
    }
    console.log(`Your total cost is £${total}`);
}
main();
