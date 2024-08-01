"use client";

import { useState } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Asynchronous from '@/components/prototype/autocomplete';
import { TextareaAutosize } from '@mui/base/TextareaAutosize';


function ParamsPicker({
  size = "medium",
  initialLabel
}) {
  const [paramsForm, setParamsForm] = useState([
    { name: initialLabel, value: "" }
  ]);

  function addNewProp() {
    setParamsForm([...paramsForm, { name: "param", value: "" }])
  }

  function removeNewProp() {
    const copied = [...paramsForm];
    copied.splice(-1, 1)
    setParamsForm(copied)
  }

  return (
    <Box style={{ padding: "10px", border: "1px dotted gray" }}>
      {
        paramsForm.map(item => (
          <Box style={{ display: "flex" }}>
            <TextField size={size} fullWidth id="outlined-basic" label={item.name} variant="outlined" />
            <TextField size={size} fullWidth id="outlined-basic" label="Valor" variant="outlined" />
          </Box>
        ))
      }
      <button onClick={() => addNewProp()}>Agregar</button>
      {paramsForm.length > 1 && <button onClick={() => removeNewProp()}>Quitar</button>}
    </Box>
  )
}



function Mercar() {
  const DEFAULT_TEXTAREA = `
  {
    "relation_name": "",
    "param1": "",
    "param2": "",
  }
  `


  const [purchase, setPurchase] = useState([1]);
  const [textArea, setTextArea] = useState(DEFAULT_TEXTAREA);

  return (
    <Box>
      <Box sx={{ padding: "25px", backgroundColor: "#fafafa" }}>
        {
          purchase.map(item => (
            <Box>
              <Box display="flex">
                <Box style={{ padding: 10, width: "100%" }}>
                  <Asynchronous label="Codigo/Nombre" />
                  <Box>
                    <h5>Elemento universal</h5>
                    <p>codigo: CUYF221</p>
                    <p>Propiedades</p>
                  </Box>
                </Box>
                <Box style={{ padding: 10, width: "100%" }}>
                  <h4>Parametros de la relación</h4>
                  <ParamsPicker size="small" initialLabel="Relation" />
                </Box>
              </Box>
              <hr />
            </Box>
          ))
        }
      </Box>
      <button onClick={() => { }}>Vincular</button>
    </Box>
  )
}


export default function Prototype() {
  const [itemType, setItemType] = useState("fundamental");
  const handleChange = (event) => {
    setItemType(event.target.value);
  };
  return (
    <Box
      sx={{ padding: "50px", border: "1px dotted black", borderRadius: "5px" }}
    >
      <h2>CREACION DE INSUMOS</h2>
      <Box mb={2}>
        <TextField fullWidth id="outlined-basic" label="Nombre" variant="outlined" />
      </Box>
      <Box mb={2}>
        <h4>Parametros del objeto</h4>
        <ParamsPicker initialLabel="Param" />
      </Box>
      <Box mb={2}>
        <Asynchronous label="tipo" />
      </Box>
      <Box mb={2}>
        <TextField fullWidth id="outlined-basic" label="Codigo" variant="outlined" />
      </Box>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Tipo</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={itemType}
          label="itemType"
          onChange={handleChange}
        >
          <MenuItem value={"fundamental"}>Elemento fundamental</MenuItem>
          <MenuItem value={"int_std"}>Estándar internacional</MenuItem>
          <MenuItem value={"formula_optional"}>Fórmula a veces</MenuItem>
          <MenuItem value={"formula_mandatory"}>Fórmula</MenuItem>
          <MenuItem value={"shopping"}>Mercar</MenuItem>
          {/* // grilla */}
          {/* sinonimos */}
          <MenuItem value={"homologacion"}>Homologacion</MenuItem>
        </Select>
      </FormControl>
      {
        itemType === "shopping" && <Mercar />
      }
    </Box>
  )
}