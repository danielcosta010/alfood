import { Button, TextField } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";


const FormularioRestaurante = () => {
  const [ nomeDoRestaurante, setNomeDoRestaurante ] = useState('');

  const aoSubmeterForm = (evento: React.FormEvent<HTMLFormElement>) => {
    evento.preventDefault();
    axios.post('http://localhost:8000/api/v2/restaurantes/', {
      nome: nomeDoRestaurante
    })  
      .then(() => {
        alert(`Restaurante ${nomeDoRestaurante} cadastrado com sucesso!`)
      })    
  }
  return (
  <form onSubmit={aoSubmeterForm}>
    <TextField  
      value={nomeDoRestaurante}
      onChange={evento => setNomeDoRestaurante(evento.target.value)}
      label='Nome do restaurante' 
      variant='standard' />
    <Button type="submit" variant='outlined'>Salvar</Button>
  </form>
  )
};
export default FormularioRestaurante;
