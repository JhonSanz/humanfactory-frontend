import { useRef, useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import DynamicForm from './dynamicForm';
import Paper from '@mui/material/Paper';


export default function EntityFactory({ activeStep }) {
  const ref = useRef(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeForm, setActiveForm] = useState(null);

  useEffect(() => {
    if (activeStep?.form.length === 0) {
      setActiveForm(null);
      return;
    }
    if (activeStep !== undefined && activeStep?.form) {
      setActiveForm([...activeStep.form]);
    }
  }, [activeStep])

  const triggerSubmit = () => {
    if (!ref || !ref.current) return;
    if (!ref.current.isValid()) return;
    ref.current.submit();
  };

  function handleSubmitForm(values) {
    console.log("submit shit", values)
  }

  return (
    <Box>
      {
        [...Array(2).keys()].map(item => <Paper variant="elevation">
          <Box p={5} m={2}>
            <h4>{activeStep.label} {item + 1}</h4>
            {
              activeForm && <DynamicForm
                ref={ref}
                fields={activeForm}
                submitFunction={handleSubmitForm}
                setIsSubmitting={setIsSubmitting}
              />
            }
          </Box>
        </Paper>
        )
      }
      {activeStep.multiple && <button>+</button>}
    </Box>
  )
}