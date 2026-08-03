import React, { useState } from 'react'

function CardActivity({ children, estado}) {

    const colores = {
        ENTREGADA: 'border-l-green-400',
        DISPONIBLE: 'border-l-neutral-400',
        PENDIENTE: 'border-l-amber-400',
        CANCELADA: 'border-l-red-400',
        EXPIRADA: 'border-l-blue-400',
        ACTIVO: 'border-l-blue-500',
        DEVUELTO: 'border-l-green-500',
        VENCIDO: 'border-l-red-500',
        RENOVADO: 'border-l-amber-500'
    };

    return (
        <div className={`card border-base-300 shadow-md border-l-4 ${colores[estado]}`}>

            <div className='card-body'>
                {children}
            </div>
            
        </div>
    )
}

export default CardActivity;