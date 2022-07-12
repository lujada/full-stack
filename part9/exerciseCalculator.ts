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
  else if (value > 0.7 && value <= 1) {
    return 'Not too bad but could be better'
  }
  else if (value > 1) {
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

console.log(exerciseCalculator([3, 0, 2, 4.5, 0, 3, 1], 2))

