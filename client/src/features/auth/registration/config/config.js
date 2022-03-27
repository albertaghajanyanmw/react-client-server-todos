import M from 'messages';

const formOptions = {
  inputs: [
    { id: "firstName", name: "firstName", label: M.get('register.firstName'), type: "text", variant: "outlined" },
    { id: "lastName", name: "lastName", label: M.get('register.lastName'), type: "text", variant: "outlined" },
    { id: "email", autoComplete: "new-password", name: "email", label: M.get('register.email'), type: "email", variant: "outlined" },
    { id: "password", name: "password", label: M.get('register.password'), type: "password", variant: "outlined" },
  ],
  guestInputs: [
    { id: "nickName", autoComplete: "new-password", name: "nickName", label: M.get('register.nickName'), type: "text", variant: "outlined" },
    { id: "password", name: "password", label: M.get('register.password'), type: "password", variant: "outlined" },
  ],
  switchGuestInputs: [
    { id: "firstName", name: "firstName", label: M.get('register.firstName'), type: "text", variant: "outlined" },
    { id: "lastName", name: "lastName", label: M.get('register.lastName'), type: "text", variant: "outlined" },
    { id: "email", autoComplete: "new-password", name: "email", label: M.get('register.email'), type: "email", variant: "outlined" },
    { id: "nickName", autoComplete: "new-password", name: "nickName", label: M.get('register.guestNickName'), type: "text", variant: "outlined" },
    { id: "password", name: "password", label: M.get('register.guestPassword'), type: "password", variant: "outlined" },
  ],
}

export { formOptions };