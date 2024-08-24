import { Routes, Route } from 'react-router-dom';
import Home from './paginas/Home';
import VitrineRestaurantes from './paginas/VitrineRestaurantes';
import AdmistracaoRestaurantes from './paginas/Administracao/Restaurantes/AdmnistracaoRestaurantes';
import FormularioRestaurante from './paginas/Administracao/Restaurantes/FormularioRestaurante';
import PaginaBaseAdministracao from './paginas/Administracao/PaginaBaseAdministracao';

function App() {

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/restaurantes" element={<VitrineRestaurantes />} />

      <Route path='/admin/' element={<PaginaBaseAdministracao />}>
        <Route path="restaurantes" element={<AdmistracaoRestaurantes />} />
        <Route path="restaurantes/novo" element={<FormularioRestaurante />} />
        <Route path="restaurantes/:id" element={<FormularioRestaurante />} />
      </Route>
    </Routes>
  );
}

export default App;
