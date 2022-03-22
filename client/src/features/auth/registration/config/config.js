import M from 'messages';

const formOptions = {
  inputs: [
    { id: "firstName", name: "firstName", label: M.get('register.firstName'), type: "text", variant: "outlined" },
    { id: "lastName", name: "lastName", label: M.get('register.lastName'), type: "text", variant: "outlined" },
    { id: "email", name: "email", label: M.get('register.email'), type: "email", variant: "outlined" },
    { id: "password", name: "password", label: M.get('register.password'), type: "password", variant: "outlined" },
  ]
}

export { formOptions };