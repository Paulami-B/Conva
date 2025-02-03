type AuthButtonProps = {
    label: string,
    onClick: React.MouseEventHandler<HTMLButtonElement>
}

export default function AuthButton({label, onClick}: AuthButtonProps) {
    return (
        <button className="w-full my-1 p-2 lg:my-3 lg:p-3 bg-gradient-to-r hover:bg-gradient-to-l from-cyan-400 via-blue-600 to-indigo-900 dark:text-gray-100 
        dark:bg-gradient-to-r dark:from-cyan-400 dark:via-blue-600 dark:to-cyan-400 dark:hover:from-blue-500 dark:hover:via-cyan-400 
        dark:hover:to-blue-500 dark:hover:text-black rounded-lg lg:text-xl font-bold cursor-pointer text-white" onClick={(e) => onClick(e)}>
                {label}
        </button>
    )
}