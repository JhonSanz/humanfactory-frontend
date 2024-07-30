import { useRef, useState, useEffect } from 'react';
import { forwardRef, useImperativeHandle } from 'react';
import Box from '@mui/material/Box';
import DynamicForm from './dynamicForm';
import Paper from '@mui/material/Paper';
import GeneralForm from './generalForm';


const EntityFactory = forwardRef(function EntityFactory({ activeStep, collectedData }, ref) {
  const arrayRef = useRef([]);
  const [numForms, setNumForms] = useState(1);

  function getAllFormValues() {
    return arrayRef.current.map(item => item.getGeneralFormValues())
  }

  useImperativeHandle(ref, () => {
    return {
      getStepValues() {
        return getAllFormValues()
      }
    };
  }, []);

  return (
    <Box>
      {
        [...Array(numForms).keys()].map((item, index) => <Paper variant="elevation" style={{ backgroundColor: "#fafafa" }}>
          <Box p={3} m={2}>
            <h4>{activeStep.label} {index + 1}</h4>
            <GeneralForm
              ref={el => arrayRef.current[index] = el}
            />
          </Box>
        </Paper>
        )
      }
      {
        activeStep?.multiple && <Box style={{ display: "flex" }}>
          <button onClick={() => setNumForms(numForms + 1)}>+</button>
          <button onClick={() => setNumForms(numForms - 1)}>-</button>
        </Box>
      }
    </Box>
  )
})

export default EntityFactory;