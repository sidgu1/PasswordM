import React from 'react'

const Navbar = () => {
    return (
        <nav className='bg-slate-800  text-white'>
            <div className="mycontainer flex justify-between px-4 items-center h-14 py-5">

                <div className="logo font-bold text-2xl">
                    <span className='text-green-500'>&lt;</span>    
                    Pass
                    <span className='text-green-500'>M/&gt;</span>    
                </div>
                <button className='text-white bg-green-700 my-5 mx-2 rounded-full flex justify-between items-center' >
                    <img className='invert w-10 p1 ' src="icons/github.svg" alt="GitLogo" />
                </button>
            </div>
        </nav>
    )
}

export default Navbar
