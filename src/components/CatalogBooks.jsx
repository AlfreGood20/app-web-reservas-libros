import React, { useRef } from 'react'

function CatalogBooks({ children, titulo }) {

    const scrollRef = useRef(null)

    const scroll = (direccion) => {
        scrollRef.current?.scrollBy({left: direccion * 400,behavior: 'smooth'})
    }

    return (
        <div className="flex flex-col gap-3">

            <h1 className="text-lg font-bold"> {titulo}</h1>

            <div className='flex flex-row items-center'>

                <button onClick={() => scroll(-1)} className="btn btn-circle btn-xl">❮</button>

                <div ref={scrollRef} className="flex flex-row overflow-x-auto gap-6 scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                    {children}
                </div>

                <button onClick={() => scroll(1)} className="btn btn-circle btn-xl">❯</button>

            </div>

        </div>
    )
}

export default CatalogBooks

