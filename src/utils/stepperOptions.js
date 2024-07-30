import * as Yup from 'yup';

const STEPS = [
  {
    label: 'Atom',
    multiple: true,
    form: [
      {
        "alias": "Nombre",
        "name": "name",
        "type": "string",
        "default": "",
        "validators": Yup.string().required("required")
      },
      {
        "alias": "Forma",
        "name": "shape",
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
    label: 'Cell',
    multiple: true,
    form: [
      {
        "alias": "Nombre",
        "name": "name",
        "type": "generalForm",
        "default": "",
        "validators": Yup.string().required("required")
      },
    ]
  },
  {
    label: 'Tissue',
    multiple: true,
    form: []
  },
  {
    label: 'Organ',
    multiple: true,
    form: []
  },
];

export default STEPS;