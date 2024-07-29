import { useRef, useState, useEffect } from 'react';
import { forwardRef, useImperativeHandle } from 'react';
import Box from '@mui/material/Box';
import DynamicForm from './dynamicForm';
import Paper from '@mui/material/Paper';



const EntityFactory = forwardRef(function EntityFactory({ activeStep }, ref) {
  const arrayRef = useRef([]);
  const [numForms, setNumForms] = useState(1);

  useEffect(() => {
    arrayRef.current = arrayRef.current.slice(0, numForms);
  }, [numForms]);

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

  return (
    <Box>
      {
        activeStep?.form.length > 0 && [...Array(numForms).keys()].map(
          (item, index) => <Paper key={`val_${index}`} variant="elevation" >
            <Box p={3} m={2}>
              <h4>{activeStep.label} {item + 1}</h4>
              <DynamicForm
                ref={el => arrayRef.current[index] = el}
                fields={activeStep.form}
                submitFunction={() => { }}
              />
            </Box>
          </Paper>
        )
      }
      {
        activeStep?.multiple && <Box style={{ display: "flex" }}>
          <button onClick={() => setNumForms(numForms + 1)}>+</button>
          {numForms > 1 && <button onClick={() => setNumForms(numForms - 1)}>-</button>}
        </Box>
      }
    </Box>
  )
})

export default EntityFactory;