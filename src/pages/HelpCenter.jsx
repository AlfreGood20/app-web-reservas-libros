import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom';

function HelpCenter() {

    const localtion = useLocation();

    useEffect(() => {
        document.title = 'ME | Centro de ayuda';

        if (location.hash) {
            const id = location.hash.replace('#', '');
            const elemento = document.getElementById(id);
            
            if (elemento) {
                elemento.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }, [location]);

  return (
    <div className='flex flex-col md:p-10 md:gap-4'>

       <h1 className='font-bold md:text-2xl flex flex-col items-center'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z" />
            </svg>

            Dudas y preguntas frecuentes
        </h1>

        <div className='divider'></div>
        {/* PREGUNTAS PARA RESERVAS */}
        <div className='flex flex-col justify-center'>
            <h2 className='label text-lg'>Reservas</h2>
            <div className="collapse collapse-plus bg-base-100 border border-base-300">
                <input type="radio" name="my-accordion-3" />
                <div className="collapse-title font-semibold">¿Cuantás reservas puedo tener?</div>
                <div className="collapse-content text-sm">
                    El maximo de reservas que puede tener son 10 reservas como estado pendiente.
                    En caso de querer pedir una nueva reserva el sistema no lo dejara, hasta cancelar una y/o completar el proceso de las posteriores.
                </div>
            </div>

            <div className="collapse collapse-plus bg-base-100 border border-base-300">
                <input type="radio" name="my-accordion-3" />
                <div className="collapse-title font-semibold">¿Cómo funciona cada estado de reservas?</div>
                <div className="collapse-content text-sm">
                    <mark>PENDIENTE:</mark> Es el primer proceso en el que pasa cuando recien pides una reserva de un libro.
                    <br></br><mark>DISPONIBLE:</mark> Es el segundo proceso en el cual el bibliotecario acepto la solicitud de la reserva.
                    En este caso es poder pasar a la biblioteca a buscar su ejemplar aceptada.
                    <br></br><mark>ENTREGADA:</mark> Ultimo proceso el cual usted recogio su libro en biblioteca.
                    <br></br><mark>CANCELADA:</mark> Es cuando usted cancelo y/o el bilbiotecario cancelo la solicitud por alguna circunstancia.
                </div>
            </div>

            <div className="collapse collapse-plus bg-base-100 border border-base-300">
                <input type="radio" name="my-accordion-3" />
                <div className="collapse-title font-semibold">¿Sí no paso a recoger mi ejemplar que pasa?</div>
                <div className="collapse-content text-sm">
                    Al no pasar por su libro una vez que la reserva cambio a DISPONIBLE, esta dicha reserva va tener como maximo 15 días maximo
                    para poder recoger su libro. Una vez que pase esos dias el sistema automaticamente va cambiar ese estado de la reserva como expirada
                    y tendra que repetir el proceso de reservas.
                </div>
            </div>

            <div className="collapse collapse-plus bg-base-100 border border-base-300">
                <input type="radio" name="my-accordion-3" />
                <div className="collapse-title font-semibold">¿Cuanto tardan en aceptar mi solicitud?</div>
                <div className="collapse-content text-sm">
                    El maximo que puede tardar en aceptar solicitudes son de 1hr a 10hr. En caso de pasar esas hora puede ser problemas tecnicos del sistema.
                </div>
            </div>

            <div className="collapse collapse-plus bg-base-100 border border-base-300">
                <input type="radio" name="my-accordion-3" />
                <div className="collapse-title font-semibold">¿Puedo cancelar una reserva ya aceptada (DISPONIBLE)?</div>
                <div className="collapse-content text-sm">
                    Si, una vez que este disponible podra cancelarlo y asi el sistema no lo pasara como expirada.
                </div>
            </div>

            <div className="collapse collapse-plus bg-base-100 border border-base-300">
                <input type="radio" name="my-accordion-3" />
                <div className="collapse-title font-semibold">¿Puedo reservar el mismo libro más de una vez?</div>
                <div className="collapse-content text-sm">
                    Si, podra reservar el mismo libro la veces que quieras.
                </div>
            </div>
        </div>

        <div className='divider'></div>
        {/* PREGUNTAS PARA PRESTAMOS */}
        <div className='flex flex-col justify-center'>
            <h2 className='label text-lg'>Prestamos</h2>
            <div className="collapse collapse-plus bg-base-100 border border-base-300">
                <input type="radio" name="my-accordion-3" />
                <div className="collapse-title font-semibold">¿Comó puedo pedir un prestamo?</div>
                <div className="collapse-content text-sm">
                    El prestamo no lo puedes pedir, el proceso es mediante una reservas y una vez que complete la reserva en automatico pasara como prestamo.
                    Otra forma es ir presencialmente a la biblioteca y ellos automaticamente haran el proceso de prestamos.
                </div>
            </div>

            <div className="collapse collapse-plus bg-base-100 border border-base-300">
                <input type="radio" name="my-accordion-3" />
                <div className="collapse-title font-semibold">¿Cuantós dias me dan de prestado un ejemplar?</div>
                <div className="collapse-content text-sm">
                    El plazo es de 15 dias desde el dia que usted pase a recoger su libro o pedirlo presencialmente.
                </div>
            </div>

            <div className="collapse collapse-plus bg-base-100 border border-base-300">
                <input type="radio" name="my-accordion-3" />
                <div className="collapse-title font-semibold">¿Comó renuevo un prestamo?</div>
                <div className="collapse-content text-sm">
                    La renovación de prestamos se hace presencialmente mediante un bibliotecario. Futuramente de implementara poder solicitar su renovación
                    de prestamos.
                </div>
            </div>

            <div className="collapse collapse-plus bg-base-100 border border-base-300">
                <input type="radio" name="my-accordion-3" />
                <div className="collapse-title font-semibold">¿Qué pasa si no devuelvo dicho ejemplar?</div>
                <div className="collapse-content text-sm">
                    Al no hacer dicha acción puede tener consecuencias como generar multas por vencimiendo de prestamos, ya que el sistema al pasar el dia
                    limite de entregar ejemplar, generara una multa. Esto puede generar baneo de cuenta y ademas no poder pedir más libros prestados.
                </div>
            </div>

            <div className="collapse collapse-plus bg-base-100 border border-base-300">
                <input type="radio" name="my-accordion-3" />
                <div className="collapse-title font-semibold">¿Qué pasa si pierdo o daño el ejemplar prestado?</div>
                <div className="collapse-content text-sm">
                    En este caso, no pasa nada pero debera de devolverlo asi y explicar dicho accidente. No hay multa ni pago extra ya que en la biblioteca se retaurara
                </div>
            </div>

        </div>

        <div className='divider' id='multas'></div>
        {/* PRESGUNTAS Y DUDAS DE MULTAS */}
         <div className='flex flex-col justify-center'>
            <h2 className='label text-lg'>Multas</h2>
            <div className="collapse collapse-plus bg-base-100 border border-base-300">
                <input type="radio" name="my-accordion-3" />
                <div className="collapse-title font-semibold">¿Cómo pagó una multa?</div>
                <div className="collapse-content text-sm">
                    Para poder pagar una multa debera de ir presencialmente a la biblioteca.
                </div>
            </div>

            <div className="collapse collapse-plus bg-base-100 border border-base-300">
                <input type="radio" name="my-accordion-3" />
                <div className="collapse-title font-semibold">¿Cual es el costo unitario por dia?</div>
                <div className="collapse-content text-sm">
                    EL costo unitario es de $15.00 pesos mexicanos. Por cada dia que pase se multiplicara por dicho costo.
                    <br></br>Ejemplo: 15 x 2 dias = $30.00
                </div>
            </div>

            <div className="collapse collapse-plus bg-base-100 border border-base-300">
                <input type="radio" name="my-accordion-3" />
                <div className="collapse-title font-semibold">¿Cuantas multas puedo tener?</div>
                <div className="collapse-content text-sm">
                    El maximo de multas son 2, debera de pagar y entregar ejemplar prestamos mas el monto generado. Esto es dispensable
                    para poder seguir prestando mas ejemplares.
                </div>
            </div>

            <div className="collapse collapse-plus bg-base-100 border border-base-300">
                <input type="radio" name="my-accordion-3" />
                <div className="collapse-title font-semibold">¿Hay fecha limite para pagar una multa?</div>
                <div className="collapse-content text-sm">
                    No, la multa se seguira generando hasta que pase a pagar. El sistema lo puede banear si ese monto llega al limite que puede
                    generarse.
                </div>
            </div>

            <div className="collapse collapse-plus bg-base-100 border border-base-300">
                <input type="radio" name="my-accordion-3" />
                <div className="collapse-title font-semibold">¿Puedo seguir reservando libros si tengo una multa pendiente?</div>
                <div className="collapse-content text-sm">
                    Si, siempre y cuando no tengas mas de 2 multas.
                </div>
            </div>

        </div>
        <div className='divider'></div>
        {/* PREGUNTAS Y DUDAS GENERALES */}
        <div className='flex flex-col justify-center '>
            <h2 className='label text-lg'>Más preguntas frecuentes</h2>
            <div className="collapse collapse-plus bg-base-100 border border-base-300">
                <input type="radio" name="my-accordion-3" />
                <div className="collapse-title font-semibold">¿Cómo reporto un error o problema técnico en el sistema?</div>
                <div className="collapse-content text-sm">
                    Reportar al correo: <span className='font-extrabold'>soporte_me@me.com</span>
                </div>
            </div>

            <div className="collapse collapse-plus bg-base-100 border border-base-300">
                <input type="radio" name="my-accordion-3" />
                <div className="collapse-title font-semibold">¿Con quién me contacto si tengo una duda que no está aquí?</div>
                <div className="collapse-content text-sm">
                    Más dudas y preguntas al correo: <span className='font-extrabold'>ayuda_me@me.com</span>
                    <br></br>Respondemos de lunes a viernes en un hoarario de 11:00 am a 9:00 pm.
                </div>
            </div>

            <div className="collapse collapse-plus bg-base-100 border border-base-300">
                <input type="radio" name="my-accordion-3" />
                <div className="collapse-title font-semibold">Horarios de atención de la biblioteca física</div>
                <div className="collapse-content text-sm">
                    Lunes a viernes de 9:00 am a 19:00 pm.
                    <br></br>Sabado y domingo de 13:00 pm a 15:00 pm.
                </div>
            </div>

        </div>

        {/* DIRECCIÓN */}
        <div className='flex flex-col justify-center items-center' id='direccion'>

            <h3 className='label text-lg'>Dirección</h3>
            <div className='divider'></div>

            <p>Carretera Villahermosa - Frontera Km. 3.5 Ciudad Industrial Villahermosa, Tabasco, Mexico. C.P. 86010</p>

            <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d948.510040531994!2d-92.90351738143875!3d18.023339659486076!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85edd9dc648b5af1%3A0xdaa65155955a748b!2sBiblioteca!5e0!3m2!1ses-419!2smx!4v1787111042153!5m2!1ses-419!2smx" 
                className='w-full md:h-85'
                allowFullScreen 
                loading="lazy" 
                referrerPolicy="strict-origin-when-cross-origin">
        </iframe>
        </div>
    </div>
  )
}

export default HelpCenter