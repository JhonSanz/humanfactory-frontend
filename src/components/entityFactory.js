import { useRef, useState } from 'react';
import Box from '@mui/material/Box';
import DynamicForm from './dynamicForm';


export default function EntityFactory({ activeStep }) {
  const fieldsForm = activeStep.form;
  const ref = useRef(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleSubmitForm() {
    console.log("aqui estoy")
  }

  return (
    <Box>
      <DynamicForm
        ref={ref}
        fields={fieldsForm}
        submitFunction={handleSubmitForm}
        setIsSubmitting={setIsSubmitting}
      />
    </Box>
  )
}