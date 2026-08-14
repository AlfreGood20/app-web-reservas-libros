import React, { useRef, useState } from 'react'
import { usePerfilUpdateDatos, usePerfilUpdateImagen } from '../hooks/usePerfil';
import { toast } from 'react-toastify';
import { useForm } from '../hooks/useForm';

function Profile({ perfil }) {

    const refInput = useRef(null);

    const datosPersonales = useForm({
        nombre: perfil?.nombre,
        apellido_paterno: perfil?.apellido_paterno,
        apellido_materno: perfil?.apellido_materno
    });

    const telefonoPersonal = useForm({ 
        numero: perfil?.telefonos[0]?.numero
    });
    const telefonoReferencia = useForm({ 
        numero: perfil?.telefonos[1]?.numero
    });

    const telefonos = [
        {
            ...telefonoPersonal.form,
            telefono_id: perfil?.telefonos[0]?.id
        },
        {
            ...telefonoReferencia.form,
            telefono_id: perfil?.telefonos[1]?.id
        }
    ]

    const { subirImagen } = usePerfilUpdateImagen();
    const { cargando, actualizarDatos } = usePerfilUpdateDatos();

    async function seleccionarImagen(e) {
        const archivo = e.target.files[0];

        if (!archivo) return;

        try {

            await toast.promise(
                subirImagen(archivo),
                {
                    error: {
                        render({ data }) {
                            return data.message;
                        }
                    },
                    pending: "Subiendo foto de perfil...",
                }
            );
            
            window.location.reload();
        } catch (error) {}
    }

    async function handleActualizarDatos(e) {

        e.preventDefault();
        
        try {
            
            const datosActulizados = await toast.promise(
                actualizarDatos({
                    ...datosPersonales.form,
                    telefonos
                }),{
                    success: 'Datos actualizados correctamente.',
                    error: {
                        render({ data }) {
                            return data.message;
                        }
                    },
                    pending: 'Actualizando datos...'
                }
            );

            perfil.nombre = datosActulizados.nombre;

        } catch (error) {}
    }

    return (
        <dialog id="perfil" className="modal">

            <div className="modal-box">

                <form method="dialog">
                    <button className="btn btn-sm btn-circle btn-ghost text-md absolute right-2 top-2">✕</button>
                </form>
 
                <div className='flex flex-col items-center'>

                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    </svg>

                    <h1 className='text-3xl font-extralight'>Mi perfil</h1>
                    <div className="divider"></div>

                </div>

                <div className='flex justify-center items-center'>

                    <div className='indicator'>

                        <div className='indicator-item indicator-bottom indicator-center'>

                            <button className="btn btn-soft btn-info rounded-full" title='editar foto perfil' onClick={() => refInput.current.click()}>
                            
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z" />
                                </svg>

                            </button>

                            
                            <input type="file" accept="image/*" hidden ref={refInput} onChange={seleccionarImagen}/>

                        </div>

                        <div className="avatar">
                            <div className="w-35 h-auto rounded-full">
                                <img alt="perfil avatar" src={perfil?.foto_url 
                                    ? `http://localhost:8080${perfil.foto_url}` 
                                    : `https://ui-avatars.com/api/?name=${perfil?.nombre}+${perfil?.apellido_paterno}+${perfil?.apellido_materno}`} />
                            </div>
                        </div>

                    </div>

                </div>

                <form className='mt-6 flex flex-col justify-center' onSubmit={handleActualizarDatos}>

                    <fieldset className="fieldset bg-base-100 border-base-300 rounded-box w-auto border p-5">

                        <legend className="fieldset-legend">Datos personales</legend>

                        <label className="label">Nombre</label>
                        <input onChange={datosPersonales.handleChange} type="text" className="input w-auto validator" value={datosPersonales.form.nombre} placeholder="Obligatorio" name='nombre' required/>

                        <label className="label">Apellido paterno</label>
                        <input onChange={datosPersonales.handleChange} type="text" className="input w-auto validator" value={datosPersonales.form.apellido_paterno} placeholder="Obligatorio" name='apellidoPaterno' required required/>
                
                        <label className="label">Apellido materno</label>
                        <input onChange={datosPersonales.handleChange} type="text" className="input w-auto validator" value={datosPersonales.form.apellido_materno} placeholder="Obligatorio"  required/>

                        <label className='label'>Correo</label>
                        <input type="text" className="input w-auto" value={perfil?.correo}  placeholder="Obligatorio" disabled={true} />
                        <p className='label'>Por tema de seguridad no podras actualizar tu correo.</p>

                    </fieldset>

                    <fieldset className="fieldset bg-base-100 border-base-300 rounded-box w-auto border p-5">

                        <legend className="fieldset-legend">Telefonos</legend>

                        <label className="label">Personal</label>
                        <input onChange={telefonoPersonal.handleChange} type="text" className="input w-auto validator" value={telefonoPersonal.form.numero} placeholder="Obligatorio" name='numero' required/>

                        <label className='label'>Referencia</label>
                        <input onChange={telefonoReferencia.handleChange} type="text" className="input w-auto validator" value={telefonoReferencia.form.numero} placeholder="Obligatorio" name='numero' required/>

                    </fieldset>

                    {/* BOTON DE GUARDAR CAMBIOS */}
                    <button className='btn btn-outline btn-success mt-5' type='submit' disabled={cargando}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
                        </svg>

                        Guardar
                    </button>

                </form>

            </div>

        </dialog>
    )
}

export default Profile