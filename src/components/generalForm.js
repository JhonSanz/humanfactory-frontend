import { forwardRef, useImperativeHandle, useRef, useEffect } from 'react';
import Accordion from '@mui/material/Accordion';
import * as Yup from 'yup';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import DynamicForm from './dynamicForm';


const GeneralForm = forwardRef(function GeneralForm({ }, ref) {
  const sections = [
    {
      name: "Estructura",
      form: [
        {
          "alias": "Nombre",
          "name": "name",
          "type": "string",
          "default": "",
          "validators": Yup.string().required("required")
        },
        {
          "alias": "Transparencia",
          "name": "transparency",
          "type": "string",
          "default": "",
          "validators": Yup.string().required("required")
        },
        {
          "alias": "Volume",
          "name": "volume",
          "type": "number",
          "default": "",
          "validators": Yup.string().required("required")
        },
      ]
    },
    {
      name: "Desarrollo",
      form: [

        {
          "alias": "Evolution",
          "name": "evolution",
          "type": "number",
          "default": "",
          "validators": Yup.string().required("required")
        },
      ]
    },
    {
      name: "Bioquímica",
      form: [
        {
          "alias": "Elemento",
          "name": "element",
          "type": "string",
          "default": "",
          "validators": Yup.string().required("required")
        },
        {
          "alias": "Size",
          "name": "size",
          "type": "number",
          "default": "",
          "validators": Yup.string().required("required")
        },
      ]
    },
    {
      name: "Fisiología",
      form: [
        {
          "alias": "Shape",
          "name": "shape",
          "type": "string",
          "default": "",
          "validators": Yup.string().required("required")
        },
      ]
    },
  ]


  useImperativeHandle(ref, () => {
    return {
      getGeneralFormValues() {
        return getAllFormValues()
      }
    };
  }, []);

  function mergeArrayToObject(arr) {
    return arr.reduce((acc, obj) => {
        return { ...acc, ...obj };
    }, {});
}

  function getAllFormValues() {
    const allValues = arrayRef.current.map(item => item.getFormValues());
    return mergeArrayToObject(allValues)
  }

  const arrayRef = useRef([]);
  useEffect(() => {
    arrayRef.current = arrayRef.current.slice(0, sections.length);
  }, []);

  return (
    <div>
      {
        sections.map((item, index) => (
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              {item.name}
            </AccordionSummary>
            <AccordionDetails>
              <DynamicForm
                ref={el => arrayRef.current[index] = el}
                fields={item.form}
                submitFunction={() => { }}
              />
            </AccordionDetails>
          </Accordion>
        ))
      }
    </div>
  );
})

export default GeneralForm;
