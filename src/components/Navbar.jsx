import React from 'react'
import { useAuth } from '../context/AuthContext'
import { Link } from 'react-router-dom';
import { usePerfil } from '../hooks/usePerfil';
import Logo from '../assets/logo_app_biblioteca_me_libro.png'
import  Menu  from '../components/Menu'

function Navbar() {

    const {isAuthenticated, accessToken, cargando} = useAuth();
    const {perfil, cargando: cargandoPerfil} = usePerfil();

    return (
        <div className="navbar bg-base-100 shadow-sm">

            <div className="navbar-start">
                <div className='flex flex-row items-center justify-center carousel carousel-horizontal'>
                    <img src={Logo} className='w-40 h-auto'/>
                    <h1 className="text-2xl flex flex-row font-extrabold text-shadow-lg">ME</h1>
                </div>
            </div>

            <div className="navbar-center">
                <input type="search" placeholder="Buscar libro" className="input input-bordered w-50 md:w-100" />
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

                ): (<Menu perfil={perfil}/>)
                }
            </div>

        </div>
    )
}

export default Navbar