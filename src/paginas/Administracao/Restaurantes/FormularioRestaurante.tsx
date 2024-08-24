import {
  Box,
  Button,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import IRestaurante from "../../../interfaces/IRestaurante";
import http from "../../../http";

const FormularioRestaurante = () => {
  const [nomeDoRestaurante, setNomeDoRestaurante] = useState("");
  const parametros = useParams();

  useEffect(() => {
    if (parametros.id) {
      http
        .get<IRestaurante>(`restaurantes/${parametros.id}/`)
        .then((response) => setNomeDoRestaurante(response.data.nome));
    }
  }, [parametros]);

  const aoSubmeterForm = (evento: React.FormEvent<HTMLFormElement>) => {
    evento.preventDefault();

    if (parametros.id) {
      http
        .put(`restaurantes/${parametros.id}/`, {
          nome: nomeDoRestaurante,
        })
        .then(() => {
          alert(`Restaurante ${nomeDoRestaurante} alterado com sucesso!`);
        });
    } else {
      http
        .post("restaurantes/", {
          nome: nomeDoRestaurante,
        })
        .then(() => {
          alert(`Restaurante ${nomeDoRestaurante} cadastrado com sucesso!`);
        });
    }
  };
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        flexGrow: 1,
      }}
    >
      <Typography component="h1" variant="h6">
        Formulário de Restaurante
      </Typography>
      <Box component="form" sx={{ width: "100%" }} onSubmit={aoSubmeterForm}>
        <TextField
          value={nomeDoRestaurante}
          onChange={(evento) => setNomeDoRestaurante(evento.target.value)}
          label="Nome do restaurante"
          variant="standard"
          fullWidth
          required
        />
        <Button
          type="submit"
          variant="outlined"
          fullWidth
          sx={{ marginTop: 1 }}
        >
          Salvar
        </Button>
      </Box>
    </Box>
  );
};
export default FormularioRestaurante;
