import hero from '../assets/hero.png';

function Saludo() {
    return (

        

        <body className='bg-green-200 flex justify-center p-8 font-semibold'>

            <header className='flex justify-center mb-12'>
                <h1 className='text-3xl md:text-5xl font-extrabold text-dark-mint uppercase bg-lime-400 shadow-md rounded-full p-4'>SOBRE MI</h1>
            </header>

            <main className='grid grid-cols-1 md:grid-cols-2 gap-10'>
                <div className='flex flex-col space-y-10'>

                    <div className='bg-lime-300 p-6 rounded-[2.5rem] shadow-lg border-2 border-lime-400'>
                        <div className='flex justify-center items-center mb-6'>

                            <div className='w-64 h-64 bg-gray-100 rounded-full border-4 border-l-blue-300 shadow-600 flex items-center justify-center overflow-hidden'>
                                <img src={hero} alt="hero" className='w-full h-full object-cover' />

                            </div>
                            

                        </div>

                    </div>

                </div>

            </main>

         
        </body>
        
    )
}

export default Saludo

