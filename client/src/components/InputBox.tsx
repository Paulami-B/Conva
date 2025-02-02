import React from 'react'

type InputBoxProps = {
    type: 'text' | 'email',
    required: boolean,
    name: string,
    label: string,
    onChange: React.ChangeEventHandler<HTMLInputElement>
}

export default function InputBox({type, required, name, label, onChange}: InputBoxProps) {
    return (
        <div className="relative py-2">
            <input name={name} type={type} required={required} 
            className="block p-2 pt-3 dark:text-gray-200 w-full bg-transparent rounded-lg border-1 border-gray-400 appearance-none 
            focus:outline-none focus:ring-0 focus:border-indigo-700 dark:focus:border-cyan-400 peer" placeholder=" " onChange={onChange} />
            <label className="absolute text-gray-500 dark:text-gray-300 duration-300 transform -translate-y-4 scale-75 bg-white 
            dark:bg-black top-2 z-10 origin-[0] px-2 peer-focus:px-2 peer-focus:text-indigo-700 peer-focus:dark:text-cyan-400 
            peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 
            peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">
            {label}
            </label>
        </div>
    )
}
