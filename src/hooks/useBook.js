import { useEffect, useState } from 'react'
import { getLibroPorId, getLibros } from '../api/bookApi';
import { toast } from 'react-toastify';


export function useBook(
    {
        page = 0, 
        size = 20, 
        sort = 'id,asc',
        titulo = undefined,
        isbn = undefined,
        categoriaId = undefined,
        editorialId = undefined,
        idiomaId = undefined
    } = {}) {

    const [datos, setDatos] = useState(null);
    const [cargando, setCargando] = useState(false);

    useEffect(() => {

        const filtros = {page,size, sort, titulo, isbn, categoriaId, editorialId, idiomaId}

        const params = new URLSearchParams(
            Object.fromEntries(
                Object.entries(filtros).filter(([_, valor]) => valor !== undefined && valor !== '')
            )
        );

        setCargando(true);

        getLibros(params)
            .then(response => response.json())
            .then(data => setDatos(data))
            .catch(() => toast.error("OCURRIÓ UN ERROR EN EL SERVIDOR."))
            .finally(() => setCargando(false));

    }, [page, size, sort, titulo, isbn, categoriaId, editorialId, idiomaId]);



    return { datos, cargando };
}


export function useBookGetById(id) {

    const [cargando, setCargando] = useState(false)
    const [libro, setLibro] = useState(null)

    useEffect(() => {

        if (id === null || id === undefined) {
            return
        }

        setCargando(true)

        getLibroPorId(id)
            .then(response => response.json())
            .then(data => setLibro(data))
            .catch(() => toast.error("OCURRIÓ UN ERROR EN EL SERVIDOR."))
            .finally(() => setCargando(false))

    }, [id])

    return { libro,cargando}
}
