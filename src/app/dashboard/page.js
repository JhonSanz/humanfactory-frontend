"use client";
import { useState, useEffect, useRef } from "react";
import VerticalLinearStepper from "@/components/fullStepper"
import Grid from '@mui/material/Grid';
import STEPS from "@/utils/stepperOptions";
import EntityFactory from "@/components/entityFactory";
import fetchBackend from "@/utils/commonFetch";


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

  function transformObject(originalObj) {
    const transformedObj = {
      data: []
    };
    for (const key in originalObj) {
      if (Object.prototype.hasOwnProperty.call(originalObj, key)) {
        transformedObj.data.push({
          name: key,
          data: originalObj[key]
        });
      }
    }
    return transformedObj;
  }

  async function submitGraph() {
    const newObj = transformObject(collectedData);
    const data = await fetchBackend("/graph", "POST", newObj)
    console.log(data)
  }

  return (
    <Grid container>
      <Grid item xs={2}>
        {
          stepsForm && <VerticalLinearStepper
            activeStep={activeStep}
            setActiveStep={handleChangeStep}
            steps={stepsForm}
            submitGraph={submitGraph}
          />
        }
      </Grid>
      <Grid item xs={10}>
        {activeStep && <EntityFactory ref={ref} activeStep={activeStep} collectedData={collectedData} />}
      </Grid>
    </Grid>
  )
}