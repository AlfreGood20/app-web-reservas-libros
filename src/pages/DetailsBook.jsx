import React from 'react';
import { useParams } from 'react-router-dom';
import {useBookGetById} from '../hooks/useBook';
import {useReservation} from '../hooks/useReservation';
import { toast } from 'react-toastify';

function DetailsBook() {

  const { id } = useParams();
  const { libro, cargando } = useBookGetById(id);
  const {pedirNuevaReserva, cargando:cargandoNuevaReserva} = useReservation({ fetchReservas: false});


  const handleNuevaReserva = async () => {
    
    try {
      await toast.promise(
        pedirNuevaReserva({libro_id: libro.id}),{
          pending: 'Reservando libro...',
          error: {
              render({ data }) {
                return data.message;
              }
          },
          success: 'Reservado con exito, consultalo en "Mis actividades ➡️ Mis reservas".'
        }
      );

    } catch (error) {}

  }

  return (
    <div className='flex flex-col md:pt-8 md:pl-12 md:pr-12'>

      <div className='flex flex-row md:gap-3'>

        <div className='avatar'>
          <div className="md:h-85 md:w-75 rounded-xl shadow-xl">
              <img src='https://ui-avatars.com/api/?name=sin+foto' />
          </div>
        </div>
      
        <div className='flex flex-col p-5 gap-3 card shadow-lg border border-base-200 md:w-full md:h-103'>

          <h3 className='card-title'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
            </svg>
            Detalles
          </h3>

          <div className='flex flex-row justify-between'>

            <h1 className='text-center text-lg'>Titulo: {libro?.titulo}</h1>

            <div className="badge badge-neutral badge-outline badge-md">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 0 0 3 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 0 0 5.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 0 0 9.568 3Z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6Z" />
              </svg>
              {libro?.categoria}
            </div>

          </div>

          <p className='text-justify'>{libro?.sinopsis}</p>

          <div className='flex flex-row justify-between label'>
            <label>Total de páginas: {libro?.numero_paginas}</label>
            <label>Año: {libro?.anio}</label>
            <label>Editorial: {libro?.editorial}</label>
            <label>Idioma: {libro?.idioma}</label>
          </div>

          <div className='divider'></div>

          <h4 className='card-title'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
            </svg>
            Autores 
          </h4>

          {libro?.autores.map(a => {
            return (
            <div key={a.id} className='flex flex-row justify-between'>
              <div className='flex flex-row gap-3'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                </svg>

                <a className='link'>{a.nombre} {a.apellido_paterno} {a.apellido_materno}</a>
              </div>

              <label className='label'>Nacionalidad: {a.nacionalidad}</label>
            </div>
          )
          })}

        </div>

      </div>

      <div className='flex flex-row justify-between md:m-5'>

        <div class="tooltip" data-tip="Agregame a tus favoritos 🌟">

          <button className='btn'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
            </svg>
            Favorito
          </button>
          
        </div>
        

        <div class="tooltip" data-tip="¡Reservame ahora!">
          <button className='btn' onClick={handleNuevaReserva} disabled={cargandoNuevaReserva}>

            {cargandoNuevaReserva? 
              <>
                <span className="loading loading-spinner"></span>
                Reservando...
              </>
            :
              <>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z" />
                </svg>
                Reservar
              </>
            }
            
            
          </button>
        </div>

      </div>
      
    </div>
  )
}

export default DetailsBook