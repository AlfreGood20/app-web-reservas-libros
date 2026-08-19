import React, { useEffect, useState } from 'react';
import { useReservation } from '../hooks/useReservation';
import ViewDetails from '../components/ViewDetails';
import CardActivity from '../components/CardActivity';
import ProgressData from '../components/ProgressData';
import useLoan from '../hooks/useLoan';
import { useForm } from '../hooks/useForm';
import { useFine } from '../hooks/useFine';
import { Link } from 'react-router-dom';

function MyActivities() {

    useEffect(() => {
        document.title = "ME | Tus actividades"
      },[]);

    const fecha = new Date();
    const meses = [
        "enero","febrero","marzo","abril","mayo", "junio","julio","agosto","semtiembre", "octubre","noviembre","diciembre"
    ];

    const data = useForm({ estado: '', page: 0});

    const reservas = useReservation(data.form);
    const prestamos = useLoan(data.form);
    const multas = useFine(data.form);
    
    const [reservaSeleccionada, setReservaSeleccionada] = useState(null);

    function diasRestantes(fechaLimiteISO) {
        const fechaLimite = new Date(fechaLimiteISO);
        const hoy = new Date();

        hoy.setHours(0, 0, 0, 0);

        const diferenciaMs = fechaLimite - hoy;
        return Math.ceil(diferenciaMs / (1000 * 60 * 60 * 24));
    }

    function MensajeDiasRestantes(fechaLimite) {
        const dias = diasRestantes(fechaLimite);

        if (dias < 0) {
            return <span className="badge badge-error ">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>

                        Vencido hace {Math.abs(dias)} día(s)
                    </span>;
        }
        if (dias === 0) {
            return <span className="badge badge-warning">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
                        </svg>

                        Vence hoy
                    </span>;
        }
        if (dias === 1) {
            return <span className="badge badge-warning">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>

                        Vence mañana
                    </span>;
        }

        return <span className="badge badge-info font-extrabold">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
                    </svg>

                    Faltan {dias} días
                </span>;
    }

    const SinHistorial = () => {
        return <div className='flex justify-center items-end md:p-15'>
                    <label className='label text-xl'>Sin historial.</label>
                </div>
    }

    const Skeleton = () => {
        return (
            <>
                <div className="skeleton h-50 w-full"></div>
                <div className="skeleton h-50 w-full"></div>
            </>
        )
    }

    const handleReiniciarData = () => {
         data.setForm({page: 0, estado: ''});
    }

    return (
        <div className='flex flex-col p-5'>

            <label className='text-lg font-extrabold'>Controla tus actividades.</label>
            <p className='text-xs'>
                {fecha.getDate()} de {meses[fecha.getMonth()]} de {fecha.getFullYear()}
            </p>

            <div className="tabs tabs-border mt-5">
                <input onChange={handleReiniciarData}  type="radio" name="my_tabs_2" className="tab" aria-label="Tus reservas" defaultChecked/>

                {/* TAB DE DONDE APARECERAN TODA LA INFORMACION DE RESERVAS */}
                <div className="tab-content border-base-300 bg-base-100 p-10">

                    <h1 className='text-lg font-extrabold' id='tus_reservas'>Tus reservas</h1>

                    <div className='flex justify-center'>
                        <div className="filter">
                            <input onChange={data.handleChange} className="btn btn-outline w-15 filter-reset" value="" type="radio" name="estado" aria-label="Elegir"/>
                            <input onChange={data.handleChange} className="btn btn-soft btn-warning" value="PENDIENTE" type="radio" name="estado" aria-label="Pendientes"/>
                            <input onChange={data.handleChange} className="btn btn-soft btn-accent" value="DISPONIBLE" type="radio" name="estado" aria-label="Disponibles"/>
                            <input onChange={data.handleChange} className="btn btn-soft btn-success" value="ENTREGADA" type="radio" name="estado" aria-label="Entregadas"/>
                            <input onChange={data.handleChange} className="btn btn-soft btn-error" value="CANCELADA" type="radio" name="estado" aria-label="Canceladas"/>
                            <input onChange={data.handleChange} className="btn btn-soft btn-info" value="EXPIRADA" type="radio" name="estado" aria-label="Expirada"/>
                        </div>
                    </div>

                    <div className='divider'></div>

                    <div className='flex flex-col gap-3'>

                        {reservas.cargando?
                            <Skeleton />
                            
                            : reservas.datos?.contenido === null || reservas.datos?.contenido?.length === 0 ?
                                <SinHistorial />

                            : (reservas.datos?.contenido?.map(reserva => 

                                <CardActivity estado = {reserva.estado} key={reserva.id}>
                                    <h1 className='card-title text-sm font-bold'>Libro: {reserva.libro.titulo}</h1>
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

                                        <button className="group rounded-full btn btn-ghost btn-sm btn-circle" title='Ver detalles' onClick={() => {setReservaSeleccionada(reserva); document.getElementById("ver_detalle").showModal();}}>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-10 text-neutral-500 group-hover:text-info transition-colors">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                                            </svg>
                                        </button>

                                    </div>
                                </CardActivity>)
                            )
                        }

                        <div className="join flex flex-flow items-center justify-center">
                            <button className="join-item btn" disabled={reservas.datos?.es_primera} 
                                onClick={() =>  {
                                    data.setForm({...data.form, page: data.form.page - 1});
                                    document.getElementById('tus_reservas').scrollIntoView({behavior: 'smooth', block: 'start'});
                                }}
                            >
                                «
                            </button>
                            <span className="join-item w-auto btn btn-disabled">Página {(reservas.datos?.pagina_actual + 1)}</span>
                            <button className="join-item btn" disabled={reservas.datos?.es_ultima} 
                                onClick={() => {
                                    data.setForm({...data.form, page: data.form.page + 1});
                                    document.getElementById('tus_reservas').scrollIntoView({behavior: 'smooth', block: 'start'});
                                }} 
                            >
                                »
                            </button>
                        </div>
                        
                    </div>
                    
                </div>
                
                {/* TAB DE PRESTAMOS DONDE APARECERAN LAS RESERVAS RECOGIDAS */}
                <input onChange={handleReiniciarData} type="radio" name="my_tabs_2" className="tab" aria-label="Tus prestamos" />
                <div className="tab-content border-base-300 bg-base-100 p-10">
                    <h2 className='text-lg font-extrabold'>Tus Prestamos</h2>

                    {/* ACTIVO,
                    DEVUELTO,
                    VENCIDO,
                    RENOVADO */}

                    <div className='flex justify-center'>
                        <div className="filter">
                            <input onChange={data.handleChange} className="btn btn-outline w-15 filter-reset" value="" type="radio" name="estado" aria-label="Elegir"/>
                            <input onChange={data.handleChange} className="btn btn-soft btn-info" value="ACTIVO" type="radio" name="estado" aria-label="Activos"/>
                            <input onChange={data.handleChange} className="btn btn-soft btn-success" value="DEVUELTO" type="radio" name="estado" aria-label="Devueltos"/>
                            <input onChange={data.handleChange} className="btn btn-soft btn-error" value="VENCIDO" type="radio" name="estado" aria-label="Vencidos"/>
                            <input onChange={data.handleChange} className="btn btn-soft btn-warning" value="RENOVADO" type="radio" name="estado" aria-label="Renovados"/>
                        </div>
                    </div>

                    <div className='divider'></div>
                    <div className='flex flex-col gap-3'>

                        {prestamos.cargando?
                            <Skeleton />

                            : prestamos.datos?.contenido === null || prestamos.datos?.contenido?.length === 0? 
                                <SinHistorial />

                            :(prestamos.datos?.contenido?.map(prestamo => 
                                <CardActivity estado={prestamo.estado} key={prestamo.id}>
                                    <h1 className='card-title text-sm font-bold'>Ejemplar: {prestamo.ejemplar.codigo}</h1>
                                    <label className='label'>ID: {prestamo.id}</label>

                                    <label className='text-xs flex flex-row items-center gap-1'>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                        </svg>

                                        Registrado: {prestamo.fecha_registro}
                                    </label>


                                    <label className='font-bold'>
                                        Autorizado por: {prestamo.autorizo.nombre} {prestamo.autorizo.apellido_paterno} {prestamo.autorizo.apellido_materno}
                                    </label>

                                    <label className='font-bold'>Correo de contacto: {prestamo.autorizo.correo}</label>

                                    <div className='flex flex-row justify-between'>
                                        <label className='label underline'>Fecha limite: {prestamo.fecha_limite}</label>
                                        {prestamo.fecha_devuelto? 
                                                <label class="bg-yellow-300 px-3 rounded label">
                                                    Fecha devuelto: {prestamo.fecha_devuelto}
                                                </label>
                                            :
                                                MensajeDiasRestantes(prestamo.fecha_limite)
                                        }
                                    </div>
                                </CardActivity>
                            ))
                        }

                        <div className="join flex flex-flow items-center justify-center">
                            <button className="join-item btn" disabled={prestamos.datos?.es_primera} 
                                onClick={() =>  {
                                    data.setForm({...data.form, page: data.form.page - 1});
                                    document.getElementById('tus_reservas').scrollIntoView({behavior: 'smooth', block: 'start'});
                                }}
                            >
                                «
                            </button>
                            <span className="join-item w-auto btn btn-disabled">Página {(prestamos.datos?.pagina_actual + 1)}</span>
                            <button className="join-item btn" disabled={prestamos.datos?.es_ultima} 
                                onClick={() => {
                                    data.setForm({...data.form, page: data.form.page + 1});
                                    document.getElementById('tus_reservas').scrollIntoView({behavior: 'smooth', block: 'start'});
                                }}
                            >
                                »
                            </button>
                        </div>

                    </div>

                </div>
                

                {/* TAB DE MULTAS DONDE NO SE HAYA DEVUELTO LOS LIBROS */}
                <input onChange={handleReiniciarData} type="radio" name="my_tabs_2" className="tab" aria-label="Tus multas" />
                <div className="tab-content border-base-300 bg-base-100 p-10">
                    <h2 className='text-lg font-extrabold'>Tus multas</h2>

                    {/* ESTADOS:  PENDIENTE, PAGADO, CONDONADA*/}
                    <div className='flex justify-center'>

                        <div className="filter">
                            <input onChange={data.handleChange} className="btn btn-outline w-15 filter-reset" value="" type="radio" name="estado" aria-label="Elegir"/>
                            <input onChange={data.handleChange} className="btn btn-soft btn-warning" value="PENDIENTE" type="radio" name="estado" aria-label="Pendientes"/>
                            <input onChange={data.handleChange} className="btn btn-soft btn-success" value="PAGADA" type="radio" name="estado" aria-label="Pagados"/>
                            <input onChange={data.handleChange} className="btn btn-soft btn-info" value="CONDONADA" type="radio" name="estado" aria-label="Condonadas"/>
                        </div>

                    </div>

                    <div className='divider'></div>

                    <div className='flex flex-col gap-3'>
                        
                        {multas.cargando?
                            <Skeleton />

                            :
                                multas.datos?.contenido === null || multas.datos?.contenido?.length === 0 ? 
                                    <SinHistorial />

                            : 
                                multas.datos?.contenido?.map(multa => 
                                    <CardActivity key={multa.id} estado={multa.estado}>

                                        <div className='flex flex-row justify-between'>
                                            <label className='label'>ID: {multa.id}</label>

                                            <div class="badge badge-error">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z" />
                                                </svg>

                                                Importe ${multa.importe}
                                            </div>
                                        </div>

                                        <p className='text-sm'>Fecha registro: {multa.fecha_registro}</p>
                                        <p className='font-extrabold'>Dias de retraso: {multa.dias_retraso}</p>

                                        <label className='text-sm label'>El pago es urgente, ya que por cada dia que pase sera mayor su costo de multa.</label>
                                        
                                        <Link className='btn btn-link' to={'/centro-de-ayuda#multas'}>
                                            Más información.
                                        </Link>

                                    </CardActivity>
                                )
                        }

                        <div className="join flex flex-flow items-center justify-center">
                            <button className="join-item btn" disabled={multas.datos?.es_primera} 
                                onClick={() =>  {
                                    data.setForm({...data.form, page: data.form.page - 1});
                                    document.getElementById('tus_reservas').scrollIntoView({behavior: 'smooth', block: 'start'});
                                }}
                            >
                                «
                            </button>
                            <span className="join-item w-auto btn btn-disabled">Página {(multas.datos?.pagina_actual + 1)}</span>
                            <button className="join-item btn" disabled={multas.datos?.es_ultima} 
                                onClick={() => {
                                    data.setForm({...data.form, page: data.form.page + 1});
                                    document.getElementById('tus_reservas').scrollIntoView({behavior: 'smooth', block: 'start'});
                                }}
                            >
                                »
                            </button>
                        </div>

                    </div>

                </div>
                {/* AQUI TERMINA */}

            </div>

            <ViewDetails detalle={reservaSeleccionada} onCancelar={reservas.cancelarReserva}/>
        </div>
    )
}

export default MyActivities;