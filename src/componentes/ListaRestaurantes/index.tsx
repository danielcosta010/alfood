import { useEffect, useState } from "react";
import IRestaurante from "../../interfaces/IRestaurante";
import style from "./ListaRestaurantes.module.scss";
import Restaurante from "./Restaurante";
import axios, { AxiosRequestConfig } from "axios";
import { IPaginacao } from "../../interfaces/IPaginacao";
import { Box, Button, MenuItem, Select, TextField } from "@mui/material";

interface IParametros {
  ordering?: string
  search?: string
}

const ListaRestaurantes = () => {
  const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([]);
  const [proximaPagina, setProximaPagina] = useState('');
  const [paginaAnterior, setPaginaAnterior] = useState('');
  const [busca, setBusca] = useState('');
  const [ordenacao, setOrdenacao] = useState('');

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
    if (ordenacao) {
      opcoes.params.ordering = ordenacao
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
          
          <Select 
            name="select-ordenacao"
            id="select-ordenacao"
            value={ordenacao}
            onChange={evento => setOrdenacao(evento.target.value)}
            sx={{width: 200, marginLeft: 2}}
          >
            <MenuItem value="">Padrão</MenuItem>
            <MenuItem value="id">Por ID</MenuItem>
            <MenuItem value="Nome">Por Nome</MenuItem>

          </Select>
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


// import axios, { AxiosRequestConfig } from 'axios';
// import { useEffect, useState } from 'react';
// import { IPaginacao } from '../../interfaces/IPaginacao';
// import IRestaurante from '../../interfaces/IRestaurante';
// import style from './ListaRestaurantes.module.scss';
// import Restaurante from './Restaurante';

// // esses são os posséveis parâmetros que podemos enviar para a API
// interface IParametrosBusca {
//   ordering?: string
//   search?: string
// }

// const ListaRestaurantes = () => {

//   const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([])
//   const [proximaPagina, setProximaPagina] = useState('')
//   const [paginaAnterior, setPaginaAnterior] = useState('')

//   const [busca, setBusca] = useState('')
//   const [ordenacao, setOrdenacao] = useState('')

//   // agora, o carregarDados recebe opcionalmente opções de configuração do axios
//   const carregarDados = (url: string, opcoes: AxiosRequestConfig = {}) => {

//     axios.get<IPaginacao<IRestaurante>>(url, opcoes)
//       .then(resposta => {
//         setRestaurantes(resposta.data.results)
//         setProximaPagina(resposta.data.next)
//         setPaginaAnterior(resposta.data.previous)
//       })
//       .catch(erro => {
//         console.log(erro)
//       })
//   }

//   // a cada busca, montamos um objeto de opções
//   const buscar = (evento: React.FormEvent<HTMLFormElement>) => {
//     evento.preventDefault()
//     const opcoes = {
//       params: {

//       } as IParametrosBusca
//     }
//     if (busca) {
//       opcoes.params.search = busca
//     }
//     if (ordenacao) {
//       opcoes.params.ordering = ordenacao
//     }
//     carregarDados('http://localhost:8000/api/v1/restaurantes/', opcoes)
//   }

//   useEffect(() => {
//     // obter restaurantes
//     carregarDados('http://localhost:8000/api/v1/restaurantes/')
//   }, [])

//   return (<section className={style.ListaRestaurantes}>
//     <h1>Os restaurantes mais <em>bacanas</em>!</h1>
//     {/* sinta-se livre para deixar o formulário mais elegante, aplicando estilos CSS */}
//     <form onSubmit={buscar}>
//       <div>
//         <input type="text" value={busca} onChange={evento => setBusca(evento.target.value)} />
//       </div>
//       <div>
//         <label htmlFor="select-ordenacao">Ordenação</label>
//         <select
//           name="select-ordenacao"
//           id="select-ordenacao"
//           value={ordenacao}
//           onChange={evento => setOrdenacao(evento.target.value)}
//         >
//           <option value="">Padrão</option>
//           <option value="id">Por ID</option>
//           <option value="nome">Por Nome</option>
//         </select>
//       </div>
//       <div>
//         <button type='submit'>buscar</button>
//       </div>
//     </form>
//     {restaurantes?.map(item => <Restaurante restaurante={item} key={item.id} />)}
//     {<button onClick={() => carregarDados(paginaAnterior)} disabled={!paginaAnterior}>
//       Página Anterior
//     </button>}
//     {<button onClick={() => carregarDados(proximaPagina)} disabled={!proximaPagina}>
//       Próxima página
//     </button>}
//   </section>)
// }

//export default ListaRestaurantes