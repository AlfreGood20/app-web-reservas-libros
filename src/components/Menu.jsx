import React from 'react'
import { Link } from 'react-router-dom'
import Profile from '../components/Profile'

function Menu({ perfil }) {

    const abrirPerfil = () => {
        document.getElementById('perfil').showModal();
    };

    return (
        <div className='flex flex-row items-center gap-5'>
            <ul className="menu bg-base-200 lg:menu-horizontal rounded-box">
                <li>
                    <Link to={'/'}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                        </svg>
                        Inicio
                    </Link>
                </li>
                <li>
                    <a>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                        </svg>

                        Mis favoritos
                    </a>
                </li>

                <li>
                    <a>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
                        </svg>

                        Notificación
                    </a>
                </li>
            </ul>

            <div className="dropdown dropdown-end">
                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                    <div className="w-10 rounded-full">
                        <img alt="perfil avatar" src={perfil?.foto_url 
                            ? `http://localhost:8080${perfil.foto_url}` 
                            : `https://ui-avatars.com/api/?name=${perfil?.nombre}+${perfil?.apellido_paterno}+${perfil?.apellido_materno}`
                        } />
                    </div>
                </div>
                <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                    <li>
                        <button onClick={abrirPerfil}>
                            Ver perfil
                        </button>
                    </li>
                    <li>
                        <Link to={'/my-reservations'}>
                            Mis reservas
                        </Link>
                    </li>
                    <li>
                        <a>Mis prestamos</a>
                    </li>
                    <li>
                        <a>Salir sesion</a>
                    </li>
                </ul>
            </div>

            <Profile perfil={perfil} />
        </div>
    )
}

export default Menu