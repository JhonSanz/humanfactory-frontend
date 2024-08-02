"use client";

import { forwardRef, useImperativeHandle, useRef } from 'react';
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Asynchronous from '@/components/prototype/autocomplete';
import fetchBackend from "@/utils/commonFetch";


function ParamsPicker({
  size = "medium",
  paramsForm,
  setParamsForm,
}) {
  function addNewProp() {
    setParamsForm([...paramsForm, { name: "param", value: "" }])
  }

  function removeNewProp() {
    const copied = [...paramsForm];
    copied.splice(-1, 1)
    setParamsForm(copied)
  }

  function modifyItem(index, field, value) {
    const copiedData = [...paramsForm];
    const copiedDataItem = copiedData[index];
    copiedDataItem[field] = value;
    copiedData.splice(index, 1, copiedDataItem);
    setParamsForm(copiedData);
  }

  useEffect(() => {
    console.log("paramsForm", paramsForm)
  }, [])

  return (
    <Box style={{ padding: "20px", border: "1px dotted gray" }}>
      {
        paramsForm.map((item, index) => (
          <Box style={{ display: "flex", marginBottom: "15px" }}>
            <TextField
              size={size}
              fullWidth
              id="outlined-basic"
              label="Parametro"
              variant="outlined"
              value={item.name}
              onChange={(e) => modifyItem(index, "name", e.target.value)}
            />
            <TextField
              size={size}
              fullWidth
              id="outlined-basic"
              label="Valor"
              variant="outlined"
              value={item.value}
              onChange={(e) => modifyItem(index, "value", e.target.value)}
            />
          </Box>
        ))
      }
      <button onClick={() => addNewProp()}>Agregar</button>
      {paramsForm.length > 1 && <button onClick={() => removeNewProp()}>Quitar</button>}
    </Box>
  )
}

const Mercar = forwardRef(function Mercar({ }, ref) {
  const [purchase, setPurchase] = useState([
    {
      related: "SOME_CODE",
      params: [{ name: "initialLabel", value: "" }]
    }
  ]);

  useImperativeHandle(ref, () => {
    return {
      getPurchases() {
        return purchase;
      }
    };
  }, [purchase]);

  function updatePurchase(newValue, index) {
    const copiedData = [...purchase];
    const copiedItem = { ...copiedData[index] };
    copiedItem.params = newValue;
    copiedData.splice(index, 1, copiedItem);
    setPurchase(copiedData)
  }

  function addRelation() {
    setPurchase([
      ...purchase, {
        related: "SOME_CODE",
        params: [{ name: "initialLabel", value: "" }]
      }
    ])
  }

  return (
    <Box>
      <Box sx={{ padding: "25px", backgroundColor: "#fafafa" }}>
        {
          purchase.map((item, index) => (
            <Box>
              <Box display="flex" mb={3}>
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
                  <ParamsPicker
                    size="small"
                    initialLabel="Relation"
                    paramsForm={item.params}
                    setParamsForm={(updatedValue) => updatePurchase(updatedValue, index)}
                  />
                </Box>
              </Box>
              <hr />
            </Box>
          ))
        }
      </Box>
      <button onClick={() => addRelation()}>Vincular</button>
    </Box>
  )
})


export default function Prototype() {
  const mercarRef = useRef(null);
  const [itemType, setItemType] = useState("fundamental");
  const [formInsumo, setFormInsumo] = useState({
    name: "",
    code: "",
    type: "",
  });

  const handleChange = (event) => {
    setItemType(event.target.value);
  };

  function handleChangeInsumoForm(e) {
    const copiedFormInsumo = { ...formInsumo };
    copiedFormInsumo[e.target.name] = e.target.value;
    setFormInsumo(copiedFormInsumo);
  }

  const [paramsForm, setParamsForm] = useState([
    { name: "initialLabel", value: "" }
  ]);

  function handleSubmitFullForm() {
    const finalBody = {
      ...formInsumo,
      nodeParams: paramsForm,
      nodeRelations: []
    }
    switch (itemType) {
      case "shopping":
        finalBody["nodeRelations"] = mercarRef.current.getPurchases();
        break;
      default:
        break;
    }

    console.log(finalBody)
    fetchBackend("/graph/insumo/", "POST", finalBody)
  }

  return (
    <Box
      sx={{ padding: "50px", border: "1px dotted black", borderRadius: "5px" }}
    >
      <h2>CREACION DE INSUMOS</h2>
      <Box mb={2}>
        <TextField
          fullWidth
          id="outlined-basic"
          label="Nombre"
          name="name"
          variant="outlined"
          value={formInsumo["name"]}
          onChange={handleChangeInsumoForm}
        />
      </Box>
      <Box mb={2}>
        <h4>Parametros del objeto</h4>
        <ParamsPicker
          initialLabel="Param"
          paramsForm={paramsForm}
          setParamsForm={setParamsForm}
        />
      </Box>
      <Box mb={2}>
        {/* <Asynchronous label="tipo" /> */}
        <TextField
          fullWidth
          id="outlined-basic"
          label="Tipo"
          name="type"
          variant="outlined"
          value={formInsumo["type"]}
          onChange={handleChangeInsumoForm}
        />
      </Box>
      <Box mb={2}>
        <TextField
          fullWidth
          id="outlined-basic"
          label="Codigo"
          name="code"
          variant="outlined"
          value={formInsumo["code"]}
          onChange={handleChangeInsumoForm}
        />
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
        itemType === "shopping" && <Mercar ref={mercarRef} />
      }
      <Box pt={5}>
        <button onClick={() => handleSubmitFullForm()}>GUARDAR</button>
      </Box>
    </Box>
  )
}