import { useState } from 'react'
import AuthButton from './AuthButton';
import InputBox from './InputBox';
import PasswordInputBox from './PasswordInputBox';
import { toast, ToastContainer } from 'react-toastify';
import { authRoutes } from '../utils/routes';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function SignIn() {
    const [values, setValues] = useState({
        email: '',
        password: ''
    });

    const navigate = useNavigate();

    function handleChange(e: React.ChangeEvent<HTMLInputElement>){
        setValues({...values, [e.target.name]: e.target.value});
    }
    
    function handleValidation(){
        const {email, password} = values;
        if(!email || !password){
            toast.error("All fields are required");
            return false;
        }
        if(password.length<8){
            toast.error("Incorrect Password");
            return false;
        }
        return true;
    }

    async function handleSubmit(e: React.MouseEvent<HTMLButtonElement, MouseEvent>){
        e.preventDefault();
        if(handleValidation()){
            const { email, password} = values;
            try {
                const response = await axios.post(`${authRoutes}/signin`, {
                    email,
                    password
                });
                navigate(`/chat/${response.data.username}/${response.data.userId}`)
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
        }
    }

    return (
        <div className='h-full my-6'>
            <div className='py-2'>
                <InputBox name="email" type="email" label="Email" onChange={(e) => handleChange(e)} />
            </div>
            <div className="py-2">
                <PasswordInputBox name="password" label="Password" onChange={(e) => handleChange(e)} />
            </div>
            <AuthButton label='Sign In' onClick={handleSubmit} />
            <ToastContainer />
        </div>
    )
}