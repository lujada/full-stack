/*npm run ts-node -- exerciseCalculator.ts*/

interface valueInterface {
PeriodLength: number;
trainingDays: number;
target: number;
average: number;
success: boolean;
rating: number;
ratingDescription: string;
}

const parseExerciseValues = (args: Array<string>) => {
  if (args.length < 4) throw new Error('Not enough arguments!');
  let lastIndex = args.length - 1
  let excerciseHoursStr = args.slice(2, lastIndex)

  let excerciseHours = excerciseHoursStr.map(value => Number(value))
  
  /* A function to check if all values are numbers */
  function onlyNumbers(excerciseHours: Array<number>): boolean {
    return excerciseHours.every(value => { 
      return !isNaN(value)
     })
  }
  if (!onlyNumbers(excerciseHours)) throw new Error('All hours inserted were not numbers!');
 

  let targetValue = Number(args[lastIndex])
  if (isNaN(targetValue)) throw new Error('Target value is not a number!');

  return exerciseCalculator(excerciseHours, targetValue)
}

const periodLength = (values: Array<number>): number => {
    return values.length
}

const daysTrained = (values: Array<number>): number => {
  let result = values.filter(value => value > 0)
    return result.length
}


const ifSuccessful = (target: number, average: number): boolean => {
  if (average >= target) {
    return true
  }
  else {
    return false
  }
}

const countRating = (value: number): number => {
    if (value <= 0.7) {
      return 1
    }
    else if (value > 0.7 && value <= 1) {
      return 2
    }
    else if (value > 1) {
      return 3
    }
}

const describeRating = (value: number): string => {
  if (value <= 0.7) {
    return 'You really should try harder next time'
  }
  else if (value > 0.7 && value < 1) {
    return 'Not too bad but could be better'
  }
  else if (value >= 1) {
    return 'Target reached, excellent work!'
  }
}

const exerciseCalculator = (excerciseHours: Array<number>, target: number): valueInterface => {
  let sum = excerciseHours.reduce((partialSum, a) => partialSum + a, 0);
  let average = sum/excerciseHours.length

  let ratingPercentage = average / target

    return {
      PeriodLength: periodLength(excerciseHours),
      trainingDays: daysTrained(excerciseHours),
      success: ifSuccessful(target, average),
      rating: countRating(ratingPercentage),
      ratingDescription: describeRating(ratingPercentage),
      target: target,
      average: average
    }
    

}

try {
console.log(parseExerciseValues(process.argv))
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.'
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}