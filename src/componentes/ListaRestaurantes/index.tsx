import { useEffect, useState } from "react";
import IRestaurante from "../../interfaces/IRestaurante";
import style from "./ListaRestaurantes.module.scss";
import Restaurante from "./Restaurante";
import axios, { AxiosRequestConfig } from "axios";
import { IPaginacao } from "../../interfaces/IPaginacao";
import { Box, Button, TextField } from "@mui/material";

interface IParametros {
  ordering?: string
  search?: string
}

const ListaRestaurantes = () => {
  const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([]);
  const [proximaPagina, setProximaPagina] = useState('');
  const [paginaAnterior, setPaginaAnterior] = useState('');
  const [busca, setBusca] = useState('');

  useEffect(() => {
      carregarDados("http://localhost:8000/api/v1/restaurantes/")
  }, []);

  const carregarDados = (url: string, opcoes: AxiosRequestConfig = {}) => {
    axios.get<IPaginacao<IRestaurante>>(url, opcoes)
      .then((response) => {
        setRestaurantes(response.data.results);
        setProximaPagina(response.data.next);
        setPaginaAnterior(response.data.previous);
        console.log(response);
      })
      .catch((erro) => {
        console.log(erro);
      });
  };

  const buscar = (evento: React.FormEvent<HTMLFormElement>) => {
    evento.preventDefault();
    const opcoes = {
      params:{} as IParametros
    } 

    if(busca){
      opcoes.params.search = busca;
    }
    carregarDados("http://localhost:8000/api/v1/restaurantes/", opcoes)
  }

  return (
    <section className={style.ListaRestaurantes}>
      <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        <h1>
          Os restaurantes mais <em>bacanas</em>!
        </h1>
        <Box component='form' onSubmit={buscar} sx={{display: 'flex'}}>
          <TextField 
            variant="outlined" 
            placeholder="Digite o restaurante"
            value={busca}
            onChange={evento => setBusca(evento.target.value)}
          />
          <Button variant="outlined" type="submit" sx={{marginLeft: 4, alignSelf: 'center'}}>Pesquisar</Button>

        </Box>
      </Box>
      {restaurantes?.map((item) => (
        <Restaurante restaurante={item} key={item.id} />
      ))}
      {paginaAnterior && <button onClick={() => carregarDados(paginaAnterior)} disabled={!paginaAnterior}>Pagina anterior</button>}
      {proximaPagina && <button onClick={() => carregarDados(proximaPagina)} disabled={!proximaPagina}>Proxima página</button>}
    </section>
  );
};

export default ListaRestaurantes;
