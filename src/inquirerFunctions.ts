import inquirer from "inquirer";
import { calculateArea } from "./calculationFunctions.js";


export const askExclude = async (): Promise<number> => {

    const excludeWalls = await inquirer.prompt([
                {
                    type:'input',
                    name:'exclude',
                    message:'How many areas in this wall would you like to exclude?',
                    validate: (input) => {
                        if (input < 0 || isNaN(input) || !Number.isInteger(input)) {
                            return 'Please enter a whole number.'
                        }
                        return true;
                    }
                },
            ])
            return excludeWalls.exclude
            }


export const askNumberOfRooms = async (): Promise<number> => {
    const numberOfRooms = await inquirer.prompt([
        {
            type: 'input',
            name: 'rooms',
            message: 'How many rooms would you like to paint?',
            validate: (input) => {
                const num = Number(input);
                if (isNaN(num) || num <= 0 || !Number.isInteger(num)) {
                    return 'Please enter a whole valid number that is greater than 0.';
                }
                return true;
            }
        }
    ]);
    return Number(numberOfRooms.rooms);
}

export const askNumberOfWalls = async (): Promise<number> => {
    const walls = await inquirer.prompt([
        {
            type: 'input',
            name: 'walls',
            message: 'How many walls are you painting in this room?',
            validate: (input) => {
                const num = Number(input);
                if (isNaN(num) || num <= 0 || !Number.isInteger(num)) {
                    return 'Please enter a whole valid number that is greater than 0.';
                }
                return true;
            },
        }
    ]);

    return Number(walls.walls);
}



export const calculateIncludedWallArea = async(): Promise<number> => {


    const wall_dimensions = await inquirer.prompt([
                    {
                        type: 'input',
                        name: 'width',
                        message: 'What is the width of this wall in meters?',
                        validate: (input) => {
                            if (input <= 0 || isNaN(input)) {
                                return 'Please enter a valid number.'
                            }
                            return true;
                        }
                    },
                    {
                        type: 'input',
                        name: 'height',
                        message: 'What is the height of this wall in meters?',
                        validate: (input) => {
                            if (input <= 0 || isNaN(input)) {
                                return 'Please enter a valid number.'
                            }
                            return true;
                        }
                    }

                ])
    
    return calculateArea(wall_dimensions.width,wall_dimensions.height)
        
}

export const calculateExcludedWallArea = async(): Promise<number> => {


    const wall_dimensions = await inquirer.prompt([
                    {
                        type: 'input',
                        name: 'width',
                        message: 'What is the width of this wall you want to exclude in meters?',
                        validate: (input) => {
                            if (input < 0 || isNaN(input)) {
                                return 'Please enter a valid number.'
                            }
                            return true;
                        }
                    },
                    {
                        type: 'input',
                        name: 'height',
                        message: 'What is the height of this wall you want to exclude in meters?',
                        validate: (input) => {
                            if (input < 0 || isNaN(input)) {
                                return 'Please enter a valid number.'
                            }
                            return true;
                        }
                    }

                ])
    
    return calculateArea(wall_dimensions.width,wall_dimensions.height)
            }


export const askHowManyCoats = async (): Promise<number> => {

    const coats = await inquirer.prompt([
        {
            type: 'input',
            name: 'coats',
            message: 'How many coats of paint do you need for this wall?',
            validate: (input) => {
                if (input <= 0 || isNaN(input)) {
                    return 'Please enter a valid number.'
                }
                return true;
            }

        }
    ])

    return coats.coats
}

export const askBrand = async(): Promise<string> => {
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

    ])
    return paintBrand.brand


}

export const whichColour = async(): Promise<string> => {

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

    ])
    return room_colour.colour

}