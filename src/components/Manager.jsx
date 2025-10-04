import React, { useEffect } from 'react'
import { useRef, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';

import 'react-toastify/dist/ReactToastify.css'

const Manager = () => {
    const ref = useRef();
    const passwordRef = useRef();
    const [form, setForm] = useState({ site: "", username: "", password: "" });
    const [passwordArr, setPasswordArr] = useState([])

    const getPasswords = async () => {
        let req = await fetch("http://localhost:3000/") 
        let passwords = await req.json()
        console.log(passwords)
        setPasswordArr(passwords);
        
    }

    useEffect(() => {
        getPasswords();
        
    }, [])

    const copyText = (text) => {
        toast('Copied to clipboard!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
        navigator.clipboard.writeText(text);
    }

    const showPassword = (e) => {
        passwordRef.current.type = "text"
        if (ref.current.src.includes("icons/eyecross.png")) {
            ref.current.src = "icons/eye.png";
            passwordRef.current.type = "password"
        } else {
            ref.current.src = "icons/eyecross.png";
            passwordRef.current.type = "text"
        }
    }

    const savePassword = async() => {
        if (form.site.length > 3 && form.username.length > 3 && form.password.length > 3) {
//if any such id exists in database, delete it
await fetch("http://localhost:3000/", {method: "DELETE", headers: {"Content-Type": "application/json"}, body: JSON.stringify({id: form.id})})

            setPasswordArr([...passwordArr, {...form, id: uuidv4()}]);
            await fetch("http://localhost:3000/", {method: "POST", headers: {"Content-Type": "application/json"}, body: JSON.stringify({...form, id: uuidv4()})})
            // localStorage.setItem("passwords", JSON.stringify([...passwordArr, {...form, id: uuidv4()}]));
            // console.log([...passwordArr, form]);
            setForm({ site: "", username: "", password: "" })
            toast('Password saved!', {
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
        else {
            toast('Error: Password not saved!');
        }
    }

    const deletePassword = async(id) => {
        console.log("deleting password with id" , id);
        let c = confirm("Do you really want to delete this password?")
        if(c){
        setPasswordArr(passwordArr.filter(item => item.id !== id));
        // localStorage.setItem("passwords", JSON.stringify(passwordArr.filter(item => item.id !== id)));
        let res = await fetch("http://localhost:3000/", {method: "DELETE", headers: {"Content-Type": "application/json"}, body: JSON.stringify({id})})
        toast('Password deleted!', {
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

    const editPassword = (id) => {
        console.log("editing password with id" , id);
        setForm({...passwordArr.filter(i=>i.id===id)[0], id: id}) 
        setPasswordArr(passwordArr.filter(item=>item.id!==id))
    }

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={true}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition="Bounce"
            />
            {/* Same as */}
            <ToastContainer />
            <div className="absolute inset-0 -z-10 h-full w-full bg-green-50 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"><div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-green-400 opacity-20 blur-[100px]"></div></div>
            <div className="px-2 md:px-0 mycontainer min-h-[85.2vh] ">
                <h1 className='text-4xl text font-bold text-center'>
                    <span className='text-green-500'> &lt;</span>

                    <span>Pass</span><span className='text-green-500'>OP/&gt;</span>

                </h1>
                <p className='text-lg text-center'>Your Own Password Manager</p>
                <div className='text-black flex flex-col p-4 my-4 gap-2 items-center'>
                    <input value={form.site} onChange={handleChange} placeholder='Enter website URL' className='rounded-full border border-green-400 w-full p-4 py-1' type="text" name='site' id='site' />
                    <div className="flex flex-col md:flex-row w-full justufy-between gap-2">
                        <input value={form.username} onChange={handleChange} placeholder='Enter Username' className='rounded-full border border-green-400 w-full p-4 py-1' type="text" name='username' id='username' />
                        <div className="relative ">
                            <input ref={passwordRef} value={form.password} onChange={handleChange} placeholder='Enter Password' className='rounded-full border border-green-400 w-full p-4 py-1' type="password" name='password' id='password' />
                            <span className='absolute right-[5px] top-[6px] cursor-pointer' onClick={showPassword}>
                                <img ref={ref} className='p-1' width={26} src="icons/eye.png" alt="eye" />
                            </span>
                        </div>
                    </div>
                    <button onClick={savePassword} className='flex justify-center items-center bg-green-500 rounded-full w-fit hover:bg-green-300 px-4 py-2 border-2 border-green-900'><lord-icon
                        src="https://cdn.lordicon.com/jgnvfzqg.json"
                        trigger="hover" >
                    </lord-icon>Save</button>
                </div>

                <div className="passwords">
                    <h2 className='font-bold text-2xl py-2'>Your Passwords</h2>
                    {passwordArr.length === 0 && <p className='text-center'>No passwords saved yet</p>}
                    {passwordArr.length != 0 && <table className="table-auto w-full rounded-md overflow-hidden mb-10">
                        <thead className='bg-green-800 text-white'>
                            <tr>
                                <th className='py-2'>Site</th>
                                <th className='py-2'>Username</th>
                                <th className='py-2'>Password</th>
                                <th className='py-2'>Actions</th>
                            </tr>
                        </thead>
                        <tbody className='bg-green-200'>

                            {passwordArr.map((item, index) => {
                                return <tr key={index}>
                                    <td className='border border-white py-2 text-center'> <div className='flex items-center justify-center '>
                                        <a href={item.site} target='_blank'>{item.site}</a>
                                        <div className='lordiconcopy size-5 cursor-pointer' onClick={() => { copyText(item.site) }}>
                                            <lord-icon
                                                style={{ "width": "23px", "height": "23px", "paddingTop": "3px", "paddingLeft": "3px" }}
                                                src="https://cdn.lordicon.com/iykgtsbt.json"
                                                trigger="hover" >
                                            </lord-icon>
                                        </div>
                                    </div>
                                    </td>
                                    <td className='border border-white py-2 text-center'>{item.username}</td>
                                    <td className='border border-white py-2 text-center'>{item.password}</td>
                                    <td className='border border-white py-2 text-center'><span className='cursor-pointer mx-1' onClick={()=>{editPassword(item.id)}}>
                                            <lord-icon
                                                src="https://cdn.lordicon.com/gwlusjdu.json"
                                                trigger="hover"
                                                style={{"width":"23px", "height":"23px"}}>
                                            </lord-icon>
                                        </span>
                                        <span className='cursor-pointer mx-1'onClick={()=>{deletePassword(item.id)}}>
                                            <lord-icon
                                                src="https://cdn.lordicon.com/skkahier.json"
                                                trigger="hover"
                                                style={{"width":"23px", "height":"23px"}}>
                                            </lord-icon>
                                        </span></td>
                                </tr>
                            })}
                        </tbody>
                    </table>}
                </div>
            </div>
        </>
    )
}

export default Manager
