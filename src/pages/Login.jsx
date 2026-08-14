import React, { useEffect, useState } from 'react'
import Logo from '../assets/logo_app_biblioteca_me_libro.png'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useForm } from '../hooks/useForm'
import { useLogin } from '../hooks/useLogin';
import { toast } from 'react-toastify';
import {useAuth} from '../context/AuthContext'

function Login() {

    const location = useLocation();
    const navegacion = useNavigate();

    useEffect(() => {
        if (location.state?.successMessage) {

            toast.success(location.state.successMessage, {
                toastId: "registro-exitoso",
            });
            
            navegacion(location.pathname, { replace: true });
        }
    }, []);


    const [cargando, setCargando] = useState(false);
    const data = useForm({correo:'', contrasena:''});
    const { entrar } = useLogin();
    const { login } = useAuth();
    
    const handleSumit = async (e) => {
        e.preventDefault();

        setCargando(true)

        try {
            
            const body = await toast.promise(
                entrar(data.form),
                {
                    error: "Credenciales incorrectas."
                }
            );

            login(body.token_access);

            navegacion("/");
        } 
        catch (error) {}
        finally{ setCargando(false); }
    }

    return (
        <div className="hero min-h-screen">

            <div className="hero-content flex-col lg:flex-row-reverse">
                
                <div className="flex flex-col text-center ">
                    
                    <img src={Logo} className='md:h-auto'/>
                    <h1 className='text-3xl font-extrabold'>Biblioteca - ME©</h1>
                    <p className="py-6">
                        Explora el catálogo de libros, realiza reservas en línea y consulta el estado de tus préstamos desde cualquier lugar.
                    </p>

                    <span className="text-rotate">
                        <span className="font-bold justify-items-center">
                            <span>Presta-ME</span>
                            <span>Devuélve-ME</span>
                            <span>Reserva-ME</span>
                            <span>Explora-ME</span>
                            <span>Lee-ME</span>
                        </span>
                    </span>
                </div>

                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                    <div className="card-body">

                        <form onSubmit={handleSumit}>

                            <fieldset className="fieldset">

                                <label className="label">Correo</label>
                                <input onChange={data.handleChange} name='correo' type="email" className="input" placeholder="Email" required/>

                                <label className="label">Contraseña</label>
                                <input onChange={data.handleChange} name='contrasena' type="password" className="input" placeholder="Password" required/>

                                <div className='flex flex-col justify-center items-center'>
                                    <a className="link link-hover">¿Olvidaste la contraseña?</a>
                                </div>

                                <button type='submit' className = 'btn btn-neutral mt-4' disabled = {cargando}>
                                    {cargando ? (<span className="loading loading-spinner"></span>) : ("Entrar")}
                                </button>

                                <div className='flex flex-col justify-center items-center'>
                                    <span>¿No tienes cuenta?</span>
                                    <Link className='link-info font-bold' to="/register">
                                        Registrarme
                                    </Link>
                                </div>

                            </fieldset>

                        </form>

                    </div>
                </div>

            </div>
        </div>
    )
}

export default Login