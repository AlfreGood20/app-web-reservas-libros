import React, { useEffect } from 'react';
import { useBook } from '../hooks/useBook';
import { useSearchParams } from 'react-router-dom';
import Book from '../components/Book';
import { useForm } from '../hooks/useForm';

function SearchPanel() {

    const [searchParams] = useSearchParams();
    const titulo = searchParams.get("titulo");

    /* 6 X 7 */
    const data = useForm({ 
        sort: 'titulo,asc',
        size: 54,
    });

    useEffect(() => {
        data.setForm(prev => ({
            ...prev,
            titulo: titulo || undefined,
            page: 0
        }));
    }, [titulo]);

    const { datos, cargando } = useBook(data.form);

    const Skeleton = () => {
        return (
                <>
                    <div className="skeleton h-50 w-40"></div>
                    <div className="skeleton h-50 w-40"></div>
                    <div className="skeleton h-50 w-40"></div>
                    <div className="skeleton h-50 w-40"></div>
                    <div className="skeleton h-50 w-40"></div>
                    <div className="skeleton h-50 w-40"></div>
                    <div className="skeleton h-50 w-40"></div>
                    <div className="skeleton h-50 w-40"></div>
                    <div className="skeleton h-50 w-40"></div>
                    <div className="skeleton h-50 w-40"></div>
                    <div className="skeleton h-50 w-40"></div>
                    <div className="skeleton h-50 w-40"></div>
                    <div className="skeleton h-50 w-40"></div>
                    <div className="skeleton h-50 w-40"></div>
                    <div className="skeleton h-50 w-40"></div>
                    <div className="skeleton h-50 w-40"></div>
                    <div className="skeleton h-50 w-40"></div>
                    <div className="skeleton h-50 w-40"></div>
                    <div className="skeleton h-50 w-40"></div>
                    <div className="skeleton h-50 w-40"></div>
                    <div className="skeleton h-50 w-40"></div>
                </>
        )
    }

    return (
        <div className='flex flex-col md:pt-10 md:pb-10'>


            <div className='flex flex-wrap justify-center items-center md:gap-5'>

                {cargando? 
                    <Skeleton />
                :
                    datos?.contenido === null || datos?.contenido.length === 0 ?
                        <div className='flex flex-row gap-3 justify-center md:p-45'>
                            <label className='label'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 16.318A4.486 4.486 0 0 0 12.016 15a4.486 4.486 0 0 0-3.198 1.318M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z" />
                                </svg>
                            </label>

                            <label className='label text-lg'>Libros no encontrados...</label>
                        </div>
                :
                    datos?.contenido.map(libro => <Book key={libro.id} libro={libro}/>)
                }

            </div>

            <div class="join flex justify-center md:mt-10">
                <button class="join-item btn" disabled={datos?.es_primera}
                    onClick={() => {
                        data.setForm({ ...data.form, page: data.form.page - 1 });
                        window.scrollTo({top: 0, behavior: 'smooth'});
                    }}
                >
                    «
                </button>
                <span class="join-item btn btn-disabled ">
                    Pagina {datos?.pagina_actual + 1}
                </span>
                <button class="join-item btn" disabled={datos?.es_ultima}
                    onClick={() => {
                        data.setForm({ ...data.form, page: data.form.page + 1 });
                        window.scrollTo({top: 0, behavior: 'smooth'});
                    }}
                >
                    »
                </button>
            </div>


        </div>
    )
}

export default SearchPanel