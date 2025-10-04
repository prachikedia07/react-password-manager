import React from 'react'

const Navbar = () => {
    return (
        <nav className='bg-slate-800 text-white'>
            <div className="mycontainer flex justify-between items-center px-4 py-2 h-14">
                <div className="logo font-bold text-2xl"> 
                    <span className='text-green-500'> &lt;</span>

                    <span>Pass</span><span className='text-green-500'>OP/&gt;</span>
                    </div>
                {/* <ul>
                    <li className='flex space-x-4'>
                        <a className='hover:font-bold' href="/">Home</a>
                        <a className='hover:font-bold' href="#">Contact</a>
                        <a className='hover:font-bold' href="#">About</a>
                    </li>
                </ul> */}
                <button className='text-white hover:bg-slate-700 bg-green-800 m-4 rounded-full flex justify-center items-center ring-white ring-1'>
                    <img className='invert w-8 p-1' src="/icons/github.svg" alt="github" />
                    <span className='font-bold px-2'>Github</span>
                </button>
            </div>
        </nav>
    )
}

export default Navbar
