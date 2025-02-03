import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-toastify";
import { authRoutes, googleOAuthURL } from "../utils/routes";
import { useNavigate } from "react-router-dom";

export default function GoogleAuth() {
    const navigate = useNavigate();
    const handleLoginWithGoogle = useGoogleLogin({
        onSuccess: async cred => {
            const userInfo = await axios.get(googleOAuthURL, {
                headers: {
                    Authorization: `Bearer ${cred.access_token}`
                }
            }).then(res => res.data);
            try {
                const response = await axios.post(`${authRoutes}/googlesignin`, {
                    name: userInfo.name,
                    profileImage: userInfo.picture,
                    email: userInfo.email
                });
                navigate(`/chat/${response.data.username}/${response.data.userId}`);
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    if (error.response) {
                        console.log(error.response.data)
                        toast.error(error.response.data as string); // Ensure it's a string
                    } 
                    else {
                        toast.error("Something went wrong!");
                    }
                } 
                else {
                    console.error("Unexpected error:", error);
                    toast.error("An unexpected error occurred.");
                }
            }
        },
        onError: err => {
            console.log(err);
            toast.error("Login failed");
        }
        
    });

    return (
        <div className="flex justify-center py-2">
            <button onClick={() => handleLoginWithGoogle()} className="flex justify-center items-center gap-3 rounded-full px-5 py-1 lmd:py-2 border-2 border-orange-300 hover:border-amber-300 cursor-pointer">
                <FcGoogle size={25} />
                <div className="md:text-xl font-semibold hover:font-bold dark:text-gray-100">Continue with Google</div>
            </button>
        </div>
    )
}
