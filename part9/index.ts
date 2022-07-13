import express from 'express';
import * as bmiCalculator from './bmiCalculator';
import * as exerciseCalculator from './exerciseCalculator';
const app = express();
app.use(express.json());

/*// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment <- apply when necessary*/ 

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi/', (req, res) => {
    const height = Number(req.query.height);
    const weight = Number(req.query.weight);

    if (!height || isNaN(height)) res.status(400).json({ error: "Malformed parameters"});
    if (!weight || isNaN(weight)) res.status(400).json({ error: "Malformed parameters"});
    
    const bmi = bmiCalculator.calculateBmi(height, weight);
    res.json({
    height: height,
    weight: weight,
    bmi: bmi
    });
});


app.post('/exercises', (req, res) => {
  //eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const {exerciseHours, target} = req.body;

  if (!exerciseHours || !target) {
    res.status(400).send({error: "Parameters missing"});
  }
  
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  if (exerciseHours === !typeof(Array) || isNaN(target)) {
    res.status(400).send({error: "Malformatted parameters"});
  }

  function onlyNumbers(excerciseHours: Array<number>): boolean {
    return excerciseHours.every(value => { 
      return !isNaN(value);
     });
  }
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  if (!onlyNumbers(exerciseHours)) {
    res.status(400).send({error: "Malformatted parameters"});
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const response = exerciseCalculator.exerciseCalculator(exerciseHours, target);
  res.json({
    response
  });
});


const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});