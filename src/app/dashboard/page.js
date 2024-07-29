"use client";
import { useState, useEffect, useRef } from "react";
import VerticalLinearStepper from "@/components/fullStepper"
import Grid from '@mui/material/Grid';
import STEPS from "@/utils/stepperOptions";
import EntityFactory from "@/components/entityFactory";



export default function Dashboard() {
  const [stepsForm, setStepsForm] = useState(undefined);
  const [activeStep, setActiveStep] = useState(undefined);
  const [collectedData, setCollectedData] = useState({});
  const ref = useRef(null);


  useEffect(() => {
    setStepsForm([...STEPS]);
    setActiveStep(STEPS[0]);
  }, []);

  function handleChangeStep(newStep) {
    if (!ref || !ref.current) return;
    if (!ref.current.getStepValues()) return;
    const stepForm = {};
    stepForm[activeStep.label] = ref.current.getStepValues();
    setCollectedData({ ...collectedData, ...stepForm })
    setActiveStep(newStep)
  }

  return (
    <Grid container>
      <Grid item xs={2}>
        {
          stepsForm && <VerticalLinearStepper
            activeStep={activeStep}
            setActiveStep={handleChangeStep}
            steps={stepsForm}
          />
        }
      </Grid>
      <Grid item xs={10}>
        {activeStep && <EntityFactory ref={ref} activeStep={activeStep} collectedData={collectedData} />}
      </Grid>
    </Grid>
  )
}