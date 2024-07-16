import React, { useEffect } from 'react'
import { useRef, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import { v4 as uuidv4 } from 'uuid';

const Manager = () => {
    const ref = useRef();
    const passwordRef = useRef();
    const [form, setform] = useState({ site: "", username: "", password: "" });
    const [passwordArray, setpasswordArray] = useState([]);
    useEffect(() => {
        let paswords = localStorage.getItem("passwords");
        if (paswords) {
            setpasswordArray(JSON.parse(paswords));
        }
    }, [])

    const savePassword = (params) => {
        let ste=form.site.length;
        let user=form.username.length;
        let pass=form.password.length;
        if(ste>3 && user>3 && pass>3){

            setpasswordArray([...passwordArray, {...form, id:uuidv4()}]);
            localStorage.setItem("passwords", JSON.stringify([...passwordArray, {...form, id:uuidv4()}]))
            setform({ site: "", username: "", password: "" });
            toast.success('Saved Successfully', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }
        else if(ste<=3){
            toast.error('Site Length cannot be less than 4', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }
        else if(user<=3){
            toast.error('Username length cannot be less than 4', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }
        else{
            toast.error('Password length cannot be less than 4', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }
    }
    const deletePassword = (id) => {
        let c=confirm("Do you really want to delete the Password");
        console.log(c);
        if(c) {
        setpasswordArray(passwordArray.filter(item=>item.id!==id))
        localStorage.setItem("passwords", JSON.stringify(passwordArray.filter(item=>item.id!==id)))
        toast.info('Password Deleted', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });}
    }
    const editPassword = (id) => {
        setform(passwordArray.filter(item=>item.id===id)[0])
        setpasswordArray(passwordArray.filter(item=>item.id!==id))
    }
    const showPassword = (params) => {
        if (ref.current.src.includes("icons/closeeye.png")) {
            ref.current.src = "icons/openeye.png";
            passwordRef.current.type = "password"
        }
        else {
            ref.current.src = "icons/closeeye.png"
            passwordRef.current.type = "text"
        }
    }
    const handleChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
    }
    const copyText = (text) => {
        toast('Copied to clipboard!', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
        navigator.clipboard.writeText(text);
    }
    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
            {/* Same as */}
            <ToastContainer />
            <div className="absolute top-0 z-[-2] h-screen w-screen"></div>
            <div className=" p-3 md:mycontainer min-h-[88.2vh] " >
                <h1 className='text-4xl text-center font-bold' >
                    <span className='text-green-500'>&lt;</span>
                    Pass
                    <span className='text-green-500'>M/&gt;</span>
                </h1>
                <p className='text-green-600 text-center text-lg'>This is your own password manager</p>

                <div className=" flex flex-col p-4 gap-8 text-black items-center">
                    <input value={form.site} onChange={handleChange} placeholder='Enter Website URL' className='rounded-full border  border-green-700 w-full p-4 py-1' type="text" name='site' id='site' />
                    <div className='w-full flex flex-col md:flex-row justify-between gap-8' >
                        <input value={form.username} onChange={handleChange} placeholder='Enter Username' className='rounded-full border  border-green-700 w-full p-4 py-1' type="text" name='username' id='username' />
                        <div className="relative">

                            <input ref={passwordRef} value={form.password} onChange={handleChange} placeholder='Enter Password' className='rounded-full border  border-green-700 w-full p-4 py-1' type="Password" name='password' id='password' />

                            <span className='absolute right-1 top-[5px] cursor-pointer ' onClick={showPassword}>
                                <img ref={ref} className='p-1' width={35} src="icons/openeye.png" alt="" />
                            </span>
                        </div>
                    </div>

                    <button onClick={savePassword}  className='hover:bg-green-400  text-xl rounded-full bg-green-500 flex justify-center item-centre px-6 gap-2 border border-black py-2 w-fit'>
                        <lord-icon
                            src="https://cdn.lordicon.com/jgnvfzqg.json"
                            trigger="hover"
                        >
                        </lord-icon>
                        Save</button>
                </div>
                <div className="passwords">
                    <h2 className='font-bold text-2xl py-4'>Your Passwords</h2>
                    {passwordArray.length === 0 && <div> No passwords to show</div>}
                    {passwordArray.length != 0 &&
                        <table className="table-auto w-full overflow-hidden rounded-md mb-10">
                            <thead className='bg-green-800 text-white '>
                                <tr>
                                    <th className='py-2'>Site</th>
                                    <th className='py-2'>Username</th>
                                    <th className='py-2'>Password</th>
                                    <th className='py-2'>Actions</th>
                                </tr>
                            </thead>
                            <tbody className='bg-green-100'>
                                {
                                    passwordArray.map((item, index) => {
                                        return <tr key={index}>
                                            <td className='py-1 text-center  border border-white'>
                                                <div className="flex justify-center items-center">

                                                    <a href={item.site} target='_blank'> {item.site}</a>
                                                    <div className='cursor-pointer size-7 iconCopy' onClick={() => copyText(item.site)}>

                                                        <lord-icon
                                                            style={{ height: "25px", width: "25px", "paddingTop": "3px" }}
                                                            src="https://cdn.lordicon.com/lomfljuq.json"
                                                            trigger="click">
                                                        </lord-icon>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className='py-1 text-center  border border-white'>
                                                <div className="flex justify-center items-center">

                                                    <span> {item.username}</span>
                                                    <div className='cursor-pointer size-7 iconCopy' onClick={() => copyText(item.username)}>

                                                        <lord-icon
                                                            style={{ height: "25px", width: "25px", "paddingTop": "3px" }}
                                                            src="https://cdn.lordicon.com/lomfljuq.json"
                                                            trigger="click">
                                                        </lord-icon>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className='py-1 text-center  border border-white'>
                                                <div className="flex justify-center items-center">
                                                    <span> {item.password}</span>

                                                    <div className='cursor-pointer size-7 iconCopy' onClick={() => copyText(item.password)}>

                                                        <lord-icon
                                                            style={{ height: "25px", width: "25px", "paddingTop": "3px" }}
                                                            src="https://cdn.lordicon.com/lomfljuq.json"
                                                            trigger="click">
                                                        </lord-icon>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className='py-1 text-center border border-white'>
                                                <span className='cursor-pointer mx-2' onClick={()=>{deletePassword(item.id)}}>

                                                    <lord-icon
                                                        style={{ height: "25px", width: "25px" }}
                                                        src="https://cdn.lordicon.com/skkahier.json"
                                                        trigger="hover">
                                                    </lord-icon>
                                                </span>
                                                <span className='cursor-pointer ' onClick={()=>{editPassword(item.id)}}>

                                                    <lord-icon
                                                        style={{ height: "25px", width: "25px" }}
                                                        src="https://cdn.lordicon.com/oqaajvyl.json"
                                                        trigger="hover"
                                                        colors="primary:#000000,secondary:#000000">
                                                    </lord-icon>
                                                </span>
                                            </td>
                                        </tr>
                                    })
                                }
                            </tbody>
                        </table>}
                </div>
            </div>
        </>
    )
}

export default Manager
