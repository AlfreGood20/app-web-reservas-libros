import React from 'react'

function ProgressData({ estado }) {

    const mensaje = {
        PENDIENTE: 'Solicitud enviada.',
        DISPONIBLE: 'Solicitud aceptada, puedes pasar a buscar tu libro.',
        ENTREGADA: '¡Difruta de tu libro!!, revise su fecha devolución.',
        CANCELADA: 'Solicitud cancelada.',
        EXPIRADA: 'Solicitud expirada.'
    }

    const progresoPorEstado = {
        PENDIENTE: 33,
        DISPONIBLE: 66,
        ENTREGADA: 100,
        CANCELADA: 50,
        EXPIRADA: 80
    }

    const progreso = progresoPorEstado[estado] ?? 0;


    return (
        <>
            <span>{mensaje[estado]}</span>
            <progress className="progress progress-success w-56" value={progreso} max="100"></progress>
            <span>{progreso}%</span>
        </>
    )
}

export default ProgressData