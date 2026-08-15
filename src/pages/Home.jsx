import React, { useEffect } from 'react'
import Book from '../components/Book'
import Navbar from '../components/Navbar'
import { useBook } from '../hooks/useBook'
import CatalogBooks from '../components/CatalogBooks'
import { data } from 'react-router-dom'

function Home() {

  useEffect(() => {
    document.title = "ME | Catalogo"
  },[]);

  const dia = new Date().getDay();

  const dias = [
        { nombre: 'Domingo', letra: 'D' },
        { nombre: 'Lunes', letra: 'L' },
        { nombre: 'Martes', letra: 'M' },
        { nombre: 'Miércoles', letra: 'M' },
        { nombre: 'Jueves', letra: 'J' },
        { nombre: 'Viernes', letra: 'V' },
        { nombre: 'Sábado', letra: 'S' }
    ];

  const diaActual = dias[dia];

  /* asc|desc */
  /* BUSCAR PARA LIBROS MAS RECIENTES */
  const recienAgregados = useBook({ size: 20 });

  /*  BUSCAR LOS LIBROS MAS RECIENTES POR AÑO */
  const recientes = useBook({ size: 20, sort: 'anio,desc' });

  /* BUSCAR LIBROS CLASICOS POR AÑO */
  const clasicos = useBook({ size: 20, sort: 'anio,asc'});
  
  /* BUSCAR LIBROS CORTOS */
  const cortos = useBook({ size: 20, sort: 'numeroPaginas,asc' });

  /* BUSCAR LIBROS QUE COMIENZE CON LA LETRA DEL DIA */
  const diaSemana = useBook({ size: 20, titulo: diaActual.letra});

  const Skeleton = () => {
    return (
      <div className='flex flex-col gap-3'>
          <div className="skeleton h-6 w-60"></div>
          <div className='flex flex-row gap-5'>
            <div className="skeleton h-50 w-40"></div>
            <div className="skeleton h-50 w-40"></div>
            <div className="skeleton h-50 w-40"></div>
            <div className="skeleton h-50 w-40"></div>
            <div className="skeleton h-50 w-40"></div>
            <div className="skeleton h-50 w-40"></div>
            <div className="skeleton h-50 w-40"></div>
            <div className="skeleton h-50 w-40"></div>
          </div>
        </div>
    )
  }

  return (
    <>
    
        <div className='flex flex-col md:p-10 gap-8'>

          {recienAgregados.cargando? 
              <Skeleton />
            :
              <CatalogBooks titulo = 'Recién agregados'>
                {recienAgregados.datos?.contenido?.map(libro => <Book libro={libro} key={libro.id}/>)}
              </CatalogBooks>
          }

          {recientes.cargando ? 
            <Skeleton />
          :
            <CatalogBooks titulo= 'Publicados este año / Recientes'>
              {recientes.datos?.contenido?.map(libro => <Book libro={libro} key={libro.id}/>)}
            </CatalogBooks>
          }

          {clasicos.cargando ? 
            <Skeleton />
          :
             <CatalogBooks titulo = 'Clasicos / Antiguos'>
                {clasicos.datos?.contenido?.map(libro => <Book libro={libro} key={libro.id}/>)}
              </CatalogBooks> 
          }

          {cortos.cargando ?
            <Skeleton />
          :
            <CatalogBooks titulo = 'Para terminar un día'>
              {cortos.datos?.contenido?.map(libro => <Book libro={libro} key={libro.id}/>)}
            </CatalogBooks> 
          }

          {diaSemana.cargando?
            <Skeleton />
          :
            <CatalogBooks titulo = {`Con ${diaActual.letra} de ${diaActual.nombre}`}>
              {diaSemana.datos?.contenido?.map(libro => <Book libro={libro} key={libro.id}/>)}
            </CatalogBooks> 
          }

        </div>
    </>
  )
}

export default Home