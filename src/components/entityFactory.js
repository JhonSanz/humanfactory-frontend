import { useRef, useState, useEffect } from 'react';
import { forwardRef, useImperativeHandle } from 'react';
import Box from '@mui/material/Box';
import DynamicForm from './dynamicForm';
import Paper from '@mui/material/Paper';



const EntityFactory = forwardRef(function EntityFactory({ activeStep, collectedData }, ref) {
  const arrayRef = useRef([]);
  const [finalForm, setFinalForm] = useState([]);

  useEffect(() => {
    arrayRef.current = arrayRef.current.slice(0, finalForm.length);
  }, [finalForm]);

  function getAllFormValues() {
    return arrayRef.current.map(item => item.getFormValues())
  }

  useImperativeHandle(ref, () => {
    return {
      getStepValues() {
        return getAllFormValues()
      }
    };
  }, []);

  function buildForm() {
    if (!collectedData[activeStep.label]) {
      return [activeStep.form]
    };
    const result = collectedData[activeStep.label].map((item) => {
      return activeStep.form.map(stepItem => {
        return {
          ...stepItem,
          default: item[stepItem.name]
        }
      })
    })
    return result
  }

  function appendForm() {
    const copyForm = [...finalForm];
    copyForm.push(activeStep.form)
    setFinalForm(copyForm);
  }

  function removeLastForm() {
    const copyForm = [...finalForm];
    copyForm.splice(-1, 1)
    setFinalForm(copyForm);
  }


  useEffect(() => {
    setFinalForm(buildForm())
  }, [activeStep])

  return (
    <Box>
      {
        finalForm.length > 0 && finalForm.map((item, index) => (
          <Paper key={`val_${index}`} variant="elevation" >
            <Box p={3} m={2}>
              <h4>{activeStep.label} {index + 1}</h4>
              <DynamicForm
                ref={el => arrayRef.current[index] = el}
                fields={item}
                submitFunction={() => { }}
              />
            </Box>
          </Paper>
        ))
      }
      {
        activeStep?.multiple && <Box style={{ display: "flex" }}>
          <button onClick={() => appendForm()}>+</button>
          <button onClick={() => removeLastForm()}>-</button>
        </Box>
      }
    </Box>
  )
})

export default EntityFactory;