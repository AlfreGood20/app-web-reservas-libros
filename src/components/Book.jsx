import React from 'react'
import { Link } from 'react-router-dom'

function Book({libro}) {

  function slugify(texto) {
    return texto
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "")
  }

  return (
    <Link 
      className='flex md:w-45 flex-col cursor-pointer hover:translate-2 active:translate-3 transition-transform duration-300' 
      to={`/libros/${slugify(libro.titulo)}/${libro.id}`}
    >

        <div className='avatar'>
          <div className="md:h-50 md:w-40 rounded-xl hover:shadow-lg">
              <img src='https://ui-avatars.com/api/?name=sin+foto' />
          </div>
        </div>

        <div className='text-center text-xs'>
            <h2 className='md:text-xs'>{libro.titulo}</h2>
            <h2 className='font-extrabold md:text-xs'>{libro.isbn}</h2>
            <h3>Año {libro.anio}</h3>
        </div>

    </Link>
  )
}

export default Book