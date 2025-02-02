import React, { useState } from "react"
import { HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi"

type PasswordInputBoxProps = {
    name: string,
    label: string,
    onChange: React.ChangeEventHandler<HTMLInputElement>
}

export default function PasswordInputBox({name, label, onChange}: PasswordInputBoxProps) {
    const [type, setType] = useState<'text' | 'password'>('password');
    return (
        <div className="py-2">
            <div className="relative">
                <input name={name} type={type} required
                className="block p-2 pt-3 pr-15 dark:text-gray-200 w-full bg-transparent rounded-lg border-1 border-gray-400 appearance-none 
                focus:outline-none focus:ring-0 focus:border-indigo-700 dark:focus:border-cyan-400 peer" placeholder=" " onChange={onChange} />
                <label className="absolute text-gray-500 dark:text-gray-300 duration-300 transform -translate-y-4 scale-75 bg-white 
                dark:bg-black top-2 z-10 origin-[0] px-2 peer-focus:px-2 peer-focus:text-indigo-700 peer-focus:dark:text-cyan-400 
                peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 
                peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">
                {label}
                </label>
                {type=='password' ? (
                    <button className="absolute top-0 right-5 cursor-pointer h-full flex justify-center items-center"
                    onClick={() => setType('text')}>
                        <HiOutlineEye size={25} className="text-gray-400 hover:text-indigo-800 dark:hover:text-cyan-400" />
                    </button>
                ) : (
                    <button className="absolute top-0 right-5 cursor-pointer h-full flex justify-center items-center"
                onClick={() => setType('password')}>
                    <HiOutlineEyeOff size={25} className="text-indigo-800" />
                </button>
                )}
            </div>
        </div>
    )
}
