import { useState } from "react";
import Icon from "../../components/Icon";
import SignUp from "./SignUp";
import SignIn from "./SignIn";
import GoogleAuth from "../../components/GoogleAuth";

export default function Auth() {
    const [activeTab, setActiveTab] = useState<'signup' | 'signin'>('signup');
    return (
        <div className="grid grid-cols-3 lg:grid-cols-5 px-12 py-5 gap-5 h-screen w-screen items-center bg-linear-65 from-cyan-400 via-blue-600 to-indigo-900">
            <div className="col-span-3 w-full h-full rounded-l-3xl shadow-lg dark:shadow-2xl dark:shadow-cyan-200 py-5 px-12 bg-white dark:bg-black">
                <div className="py-6">
                    <Icon text="Convo" />
                </div>
                <GoogleAuth />
                <div className="flex justify-center items-center md:py-2 py-4">
                    <div className="w-1/4 border border-gray-300"></div>
                    <div className="text-gray-400 mx-3 text-xl">or</div>
                    <div className="w-1/4 border border-gray-300"></div>
                </div>
                <div className="text-2xl lg:text-4xl font-caveat pb-3 md:pb-4 text-center dark:text-gray-100">Hey there!! Please fill in the details to get started.</div>
                <div className="flex justify-center lg:text-xl w-full items-center">
                    <button className={`w-1/2 p-2 cursor-pointer hover:font-bold border-b-3 dark:text-gray-100 
                    ${activeTab=='signup' ? "font-bold border-indigo-700 dark:border-cyan-400": "font-semibold border-gray-200 dark:border-gray-400"}`} 
                    onClick={() => setActiveTab('signup')}>
                        Sign up
                    </button>
                    <button className={`w-1/2 p-2 cursor-pointer hover:font-bold border-b-3 dark:text-gray-100 
                    ${activeTab=='signin' ? "font-bold border-indigo-700 dark:border-cyan-400": "font-semibold border-gray-200 dark:border-gray-400"}`} 
                    onClick={() => setActiveTab('signin')}>
                        Sign In
                    </button>
                </div>
                <div className="items-center p-6">
                    {activeTab==='signup' ? (
                        <SignUp />
                    ) : (
                        <SignIn />
                    )}
                </div>
            </div>
            <div className="col-span-0 lg:col-span-2 hidden lg:block bg-sky-50 dark:bg-sky-200 rounded-r-3xl items-center px-12 py-28 h-full w-full">
                <div className="py-2 font-caveat text-4xl">Connect, chat, and share—<br/>anytime, anywhere.</div>
                <img src="/Image.png" className=" py-4" />
            </div>
        </div>
    )
}