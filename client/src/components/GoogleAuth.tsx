import { FcGoogle } from "react-icons/fc";

export default function GoogleAuth() {
    return (
        <div className="flex justify-center py-2">
            <button className="flex justify-center items-center gap-3 rounded-full px-5 py-1 lmd:py-2 border-2 border-orange-300 hover:border-amber-300 cursor-pointer">
                <FcGoogle size={25} />
                <div className="md:text-xl font-semibold hover:font-bold dark:text-gray-100">Continue with Google</div>
            </button>
        </div>
    )
}
