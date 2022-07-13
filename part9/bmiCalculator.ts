export interface weightHeight {
    height: number;
    weight: number;
}

export const parseValues = (args: Array<string>): weightHeight => {
    if (args.length > 4) throw new Error('Too many arguments');
    if (args.length < 4) throw new Error('Not enough arguments');

    if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
    height: Number(args[2]),
    weight: Number(args[3])
    };
    }
    else {
        throw new Error('Provided values were not numbers!');
    }
};

export const calculateBmi = (height: number, weight: number): string => {
    const bmi = weight / ((height / 100) ** 2);

    if (bmi < 18.5) {
    return 'Underweight (unhealthy weight)';
    } else if (bmi >= 18.5 && bmi <= 24.9) {
    return 'Normal (healthy weight)';
    } else if (bmi >= 25 && bmi <= 29) {
        return 'Overweight (unhealthy weight)';
    } else if (bmi > 30) {
        return 'Obese (unhealthy weight)';
    }
    throw new Error('Something went wrong while calculating the Bmi!');

};

/*
try{
const {height, weight} = parseValues(process.argv)
console.log(calculateBmi(height, weight))
} catch (error: unknown) {
    let errorMessage = 'Something went wrong.'
    if (error instanceof Error) {
        errorMessage += ' Error: ' + error.message
    }
    console.log(errorMessage)
}
*/