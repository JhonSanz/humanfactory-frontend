import * as Yup from 'yup';

const STEPS = [
  {
    label: 'Atom',
    form: [
      {
        "alias": "Nombre",
        "name": "name",
        "type": "string",
        "default": "",
        "validators": Yup.string().required("required")
      },
    ]
  },
  {
    label: 'Cell',
    form: []
  },
  {
    label: 'Tissue',
    form: []
  },
];

export default STEPS;