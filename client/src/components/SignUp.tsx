import { useState } from "react";
import AuthButton from "./AuthButton";
import InputBox from "./InputBox";
import PasswordInputBox from "./PasswordInputBox";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { authRoutes } from "../utils/routes";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues({...values, [e.target.name]: e.target.value});
  }

  const handleValidation = () => {
    const {name, email, password, confirmPassword} = values;
    if(!name || !email || !password || !confirmPassword){
      toast.error("All fields are required");
      return false;
    }
    if(password!==confirmPassword){
      toast.error("Passwords do not match. Please try again.");
      return false;
    }
    else if(password.length<8){
      toast.error("Password must be atleast 8 characters long.");
      return false;
    }
    else if(name.length<3){
      toast.error("Name must be atleast 3 characters long.");
      return false;
    }
    return true;
  }

  const handleSubmit = async(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if(handleValidation()){
      const {name, email, password} = values;
      try {
        const response = await axios.post(`${authRoutes}/signup`, {
          name,
          email,
          password
        });
        navigate(`/chat/${response.data.username}/${response.data.userId}`)
      } catch (error) {
        if (axios.isAxiosError(error)) {
          if (error.response) {
              toast.error(error.response.data as string); // Ensure it's a string
          } else {
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
    <div>
        <InputBox name="name" type="text" label="Name" onChange={handleChange} />
        <InputBox name="email" type="email" label="Email" onChange={handleChange} />
        <PasswordInputBox name="password" label="Password" onChange={handleChange} />
        <PasswordInputBox name="confirmPassword" label="Confirm Password" onChange={handleChange} />
        <AuthButton label='Sign Up' onClick={handleSubmit} />
        <ToastContainer />
    </div>
  )
}