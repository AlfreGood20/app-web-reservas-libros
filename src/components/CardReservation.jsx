import React, { useState } from 'react'
import ProgressData from './ProgressData'

function CardReservation({ reserva , onVerDetalle}) {

    const colores = {
        ENTREGADA: 'border-l-green-400',
        DISPONIBLE: 'border-l-neutral-400',
        PENDIENTE: 'border-l-amber-400',
        CANCELADA: 'border-l-red-400',
        EXPIRADA: 'border-l-blue-400'
    };

    return (
        <div className={`card border-base-300 shadow-md border-l-4 ${colores[reserva.estado]}`}>

            <div className='card-body'>

                <h1 className='card-title text-sm font-bold'>{reserva.libro.titulo}</h1>
                <label className='label'>ID: {reserva.id}</label>

                <label className='text-xs flex flex-row items-center gap-1'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z" />
                    </svg>

                    Solicitado: {reserva.fecha_reserva}
                </label>

                <div className='flex flex-row items-center gap-2'>
                    <ProgressData estado={reserva.estado}/> 
                </div>

                 <div className="card-actions justify-end">

                    <button className="group rounded-full btn btn-ghost btn-sm btn-circle" title='Ver detalles' onClick={() => onVerDetalle(reserva)}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-10 text-neutral-500 group-hover:text-info transition-colors">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                        </svg>
                    </button>

                </div>

            </div>
        </div>
    )
}

export default CardReservation