import React, { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { Link, useNavigate } from 'react-router-dom';
import { usePerfil } from '../hooks/usePerfil';
import Logo from '../assets/logo_app_biblioteca_me_libro.png'
import  Menu  from '../components/Menu'
import { useForm } from '../hooks/useForm';

function Navbar() {

    const {isAuthenticated, cargando} = useAuth();
    const {perfil, cargando: cargandoPerfil} = usePerfil();
    const [activo, setActivo] = useState(false);
    const navegar = useNavigate();

    const data = useForm({ titulo:'' });

    useEffect(() => {

        if(!activo) return;

         const titulo = data.form.titulo.trim();

        if (!titulo) {
            navegar('/libros')
            return;
        }

        const timeout = setTimeout(() => {
            const params = new URLSearchParams();
            params.set("titulo", titulo);
            navegar(`/libros?${params.toString()}`);
        }, 300);

        return () => clearTimeout(timeout);
    },[data.form])

    return (
        <div className="navbar fixed top-0 left-0 z-50 bg-base-100/50 backdrop-blur-md shadow-sm rounded-b-2xl">

            <div className="navbar-start">
                <div className='flex flex-row items-center justify-center carousel carousel-horizontal'>
                    <img src={Logo} className='w-40 h-auto'/>
                    <h1 className="text-2xl flex flex-row font-extrabold text-shadow-lg">ME</h1>
                </div>
            </div>

            {/* INPUT DE BUSQUEDA */}
            <div className="navbar-center">

                <label className="input md:w-100">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                    </svg>

                    <input onFocus={() => setActivo(true)} onChange={data.handleChange} type="search" className="grow " placeholder="Buscar libro" name='titulo'/>
                </label>

            </div>

           <div className="navbar-end">
                {cargando ? (
                    
                    <div className='flex flex-row gap-5'>
                        <div className="skeleton h-8 w-30"></div>
                        <div className="skeleton h-8 w-30"></div>
                    </div>
                    
                ) : !isAuthenticated ? (

                    <div className="flex gap-2">
                        <Link to="/login" className="btn btn-ghost btn-md">
                            Iniciar Sesión
                        </Link>
                        <Link to="/register" className="btn btn-primary btn-md">
                            Registrarse
                        </Link>
                    </div>

                ) : cargandoPerfil ?  (

                    <div className='flex flex-row gap-5 items-center'>
                        <div className="skeleton h-15 w-90"></div>
                        <div className="skeleton h-12 w-12 shrink-0 rounded-full"></div>
                    </div>

                ) : perfil ? (
                    <Menu perfil={perfil}/>
                ) : null}
            </div>

        </div>
    )
}

export default Navbar