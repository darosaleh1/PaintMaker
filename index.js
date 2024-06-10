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
    const numberOfWalls = await inquirer.prompt([
        {
            type: 'number',
            name: 'walls',
            message: 'How many walls are you painting in this room?'
        }
    ]);
    return numberOfWalls.walls;
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
                'Sky Blue',
                'Navy Blue',
                'Light Grey',
                'Steel Grey',
                'Baby Pink',
                'Blush Pink',
                'Sage Green',
                'Teal'
            ],
        }
    ]);
    return room_colour.colour;
};
let map = new Map();
map.set('White', 10);
map.set('Cream', 15);
map.set('Sky Blue', 10);
map.set('Navy Blue', 20);
map.set('Light Grey', 5);
map.set('Steel Grey', 15);
map.set('Baby Pink', 10);
map.set('Blush Pink', 25);
map.set('Sage Green', 15);
map.set('Teal', 20);
async function main() {
    const numberOfRooms = await askNumberOfRooms();
    console.log(`You are painting ${numberOfRooms} rooms!`);
    let roomPaintList = [];
    for (let i = 0; i < numberOfRooms; i++) {
        let numberOfWalls = await askNumberOfWalls();
        console.log(`You are painting ${numberOfWalls} walls!`);
        let wallArea = 0;
        for (let j = 0; j < numberOfWalls; j++) {
            wallArea += await calculateIncludedWallArea();
            wallArea -= await calculateExcludedWallArea();
        }
        let roomColour = await whichColour();
        let roomTuple = [wallArea, roomColour];
        roomPaintList.push(roomTuple);
        console.log(`You are painting room ${i + 1} in ${roomTuple[1]}, this will cost £${(map.get(roomTuple[1]) * roomTuple[0])}`);
    }
}
main();
