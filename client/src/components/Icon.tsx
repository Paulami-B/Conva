type IconProps = {
    text?: string,
    size?: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl' | '7xl' | '8xl' | '9xl'
}
  
export default function Icon({text}: IconProps) {
    return (
        <div className="bg-transparent dark:bg-gradient-to-r dark:from-cyan-400 dark:via-blue-400 dark:to-cyan-400 rounded-full dark:p-3 dark:pb-5">
            <div className={`font-matemasie text-4xl lg:text-6xl bg-gradient-to-r from-cyan-400 via-blue-600 to-indigo-900 inline-block text-transparent bg-clip-text dark:text-black`}>
                {text? text : "C"}
            </div>
        </div>
    )
}