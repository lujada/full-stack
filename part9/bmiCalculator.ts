interface weightHeight {
    height: number;
    weight: number;
}

const parseValues = (args: Array<string>): weightHeight => {
    return {
    height: Number(args[2]),
    weight: Number(args[3])
    }
}

const calculateBmi = (height: number, weight: number): string => {
    const bmi = weight / ((height / 100) ** 2)

    if (bmi < 18.5) {
    return 'Underweight (unhealthy weight)'
    } else if (bmi >= 18.5 && bmi <= 24.9) {
    return 'Normal (healthy weight)'
    } else if (bmi >= 25 && bmi <= 29) {
        return 'Overweight (unhealthy weight)'
    } else if (bmi > 30) {
        return 'Obese (unhealthy weight)'
    }

}


const {height, weight} = parseValues(process.argv)
console.log(calculateBmi(height, weight))

