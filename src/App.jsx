import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Layout from './components/Layout';
import MyActivities from './pages/MyActivities';
import DetailsBook from './pages/DetailsBook';
import SearchPanel from './pages/SearchPanel';

function App() {
  
  return (
    <>
      <BrowserRouter>     
        <ToastContainer />

        {/* ESTOS COMPONENTES VAN A TENER NAVBAR */}
        <Routes> 
          <Route element={<Layout />}>
            <Route path='/' element={<Home />}/>
            <Route path='/mis-actividades' element={<MyActivities />} />
            <Route path='/libros/:libro/:id' element={<DetailsBook />} />
            <Route path='/libros' element={<SearchPanel />} />
        </Route>

          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='*' element={<Navigate to={'/'} replace />}/>
        </Routes>

      </BrowserRouter>
    </>
  )
}

export default App
