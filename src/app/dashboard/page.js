"use client";
import { useState, useEffect } from "react";
import VerticalLinearStepper from "@/components/fullStepper"
import Grid from '@mui/material/Grid';
import STEPS from "@/utils/stepperOptions";
import EntityFactory from "@/components/entityFactory";



export default function Dashboard() {
  const [activeStep, setActiveStep] = useState(STEPS[0]);

  useEffect(() => {
    console.log(activeStep)
  }, [activeStep])

  return (
    <Grid container>
      <Grid item xs={2}>
        <VerticalLinearStepper
          activeStep={activeStep}
          setActiveStep={setActiveStep}
          steps={STEPS}
        />
      </Grid>
      <Grid item xs={10}>
        <EntityFactory activeStep={activeStep} />
      </Grid>
    </Grid>
  )
}