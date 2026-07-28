import React from 'react'
import { data } from 'react-router-dom';

function ViewDetails({ detalle }) {

    const icons = {
        ENTREGADA: 
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>,
        DISPONIBLE: 
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z" />
            </svg>,
        PENDIENTE: 
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>,
        CANCELADA: 
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>,
        EXPIRADA: 
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
            </svg>
    };

    const colores = {
        ENTREGADA: 'badge-success',
        DISPONIBLE: 'badge-accent',
        PENDIENTE: 'badge-warning',
        CANCELADA: 'badge-error',
        EXPIRADA: 'badge-info'
    };

    return (
       <dialog id="ver_detalle" class="modal">

            <div class="modal-box">

                <h1 className='card-title'>Detalles</h1>
                <div className='flex flex-row justify-between'>
                    <p className='text-sm label'>ID: {detalle?.id}</p>

                    <div class={`badge badge-soft ${colores[detalle?.estado]}`}>
                        {icons[detalle?.estado]} {detalle?.estado}
                    </div>
                </div>

                <p>Fecha solicitada: {detalle?.fecha_reserva}</p>
                {detalle?.fecha_limite_recoger && 
                    <h1>Fecha limite para recoger: <span className='font-extrabold'>{detalle?.fecha_limite_recoger}</span>
                    </h1>
                }

                <div className='divider'></div>

                <div className='flex flex-col p-2 justify-center items-center'>
                    <img className='w-45' src={`http://localhost:8080${detalle?.libro.portada_url}`}/>
                    <h2 className='underline'>{detalle?.libro.titulo}</h2>
                    <p>ISBN: {detalle?.libro.isbn}</p>
                </div>

                <div className='flex justify-between'>
                    <p>Editorial: {detalle?.libro.editorial}</p>
                    <p>Idioma: {detalle?.libro.idioma}</p>
                </div>

                <div className='divider'></div>

                {(detalle?.estado === "PENDIENTE" || detalle?.estado === "DISPONIBLE") &&

                    <div className='flex justify-center'>
                        <button className='btn btn-soft btn-error'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                            </svg>
                            Cancelar reserva
                        </button>
                    </div>
                }

            </div>


            <form method="dialog" class="modal-backdrop">
                <button>close</button>
            </form>
        </dialog>
    )
}

export default ViewDetails