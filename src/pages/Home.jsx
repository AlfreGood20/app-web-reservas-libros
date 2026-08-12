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
  const {datos:recienAgregados, cargando:cargandoRecienAgregados} = useBook({ size: 20 });

  /*  BUSCAR LOS LIBROS MAS RECIENTES POR AÑO */
  const {datos:recientes, cargando:cargandoRecientes} = useBook({ size: 20, sort: 'anio,desc' });

  /* BUSCAR LIBROS CLASICOS POR AÑO */
  const {datos: clasicos, cargando:cargandoClasicos} = useBook({ size: 20, sort: 'anio,asc'});
  
  /* BUSCAR LIBROS CORTOS */
  const {datos: paraLeer, cargando:cargandoParaLeer} = useBook({ size: 20, sort: 'numeroPaginas,asc' });

  /* BUSCAR LIBROS QUE COMIENZE CON LA LETRA DEL DIA */
  const { datos: diaSemana, cargando:cargandoDiaSemana } = useBook({ size: 20, titulo: diaActual.letra});

  const Skeleton = () => {
    return (
      <div className='flex flex-col gap-3'>
          <div class="skeleton h-6 w-60"></div>
          <div className='flex flex-row gap-5'>
            <div class="skeleton h-50 w-40"></div>
            <div class="skeleton h-50 w-40"></div>
            <div class="skeleton h-50 w-40"></div>
            <div class="skeleton h-50 w-40"></div>
            <div class="skeleton h-50 w-40"></div>
            <div class="skeleton h-50 w-40"></div>
            <div class="skeleton h-50 w-40"></div>
            <div class="skeleton h-50 w-40"></div>
          </div>
        </div>
    )
  }

  return (
    <>
    
        <div className='flex flex-col p-5 gap-8'>

          {cargandoRecienAgregados? 
              <Skeleton />
            :
              <CatalogBooks titulo = 'Recién agregados'>
                {recienAgregados?.contenido?.map(libro => <Book libro={libro} key={libro.id}/>)}
              </CatalogBooks>
          }

          {cargandoRecientes ? 
            <Skeleton />
          :
            <CatalogBooks titulo= 'Publicados este año / Recientes'>
              {recientes?.contenido?.map(libro => <Book libro={libro} key={libro.id}/>)}
            </CatalogBooks>
          }

          {cargandoClasicos ? 
            <Skeleton />
          :
             <CatalogBooks titulo = 'Clasicos / Antiguos'>
                {clasicos?.contenido?.map(libro => <Book libro={libro} key={libro.id}/>)}
              </CatalogBooks> 
          }

          {cargandoParaLeer ?
            <Skeleton />
          :
            <CatalogBooks titulo = 'Para terminar un día'>
              {paraLeer?.contenido?.map(libro => <Book libro={libro} key={libro.id}/>)}
            </CatalogBooks> 
          }

          {cargandoDiaSemana ?
            <Skeleton />
          :
            <CatalogBooks titulo = {`Con ${diaActual.letra} de ${diaActual.nombre}`}>
              {diaSemana?.contenido?.map(libro => <Book libro={libro} key={libro.id}/>)}
            </CatalogBooks> 
          }

        </div>
    </>
  )
}

export default Home