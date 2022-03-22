import React from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import KeyIcon from '@mui/icons-material/Key';
import M from 'messages';

const formOptions = {
  inputs: [
    { id: "email", name: "email", label: M.get('login.email'), type: "email", variant: "outlined", icon: <AccountCircleIcon /> },
    { id: "password", name: "password", label: M.get('login.password'), type: "password", variant: "outlined", icon: <KeyIcon /> },
  ]
}

export { formOptions };