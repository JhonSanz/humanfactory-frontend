"use client";
import { useState, useEffect } from "react";
import VerticalLinearStepper from "@/components/fullStepper"
import Grid from '@mui/material/Grid';
import STEPS from "@/utils/stepperOptions";
import EntityFactory from "@/components/entityFactory";



export default function Dashboard() {
  const [stepsForm, setStepsForm] = useState(undefined);
  const [activeStep, setActiveStep] = useState(undefined);

  useEffect(() => {
    setStepsForm([...STEPS]);
    setActiveStep(STEPS[0]);
  }, []);


  useEffect(() => {
    console.log(activeStep)
  }, [activeStep]);

  return (
    <Grid container>
      <Grid item xs={2}>
        {
          stepsForm && <VerticalLinearStepper
            activeStep={activeStep}
            setActiveStep={setActiveStep}
            steps={stepsForm}
          />
        }
      </Grid>
      <Grid item xs={10}>
        {activeStep && <EntityFactory activeStep={activeStep} />}
      </Grid>
    </Grid>
  )
}