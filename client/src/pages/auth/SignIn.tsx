import { useState } from 'react'
import AuthButton from '../../components/AuthButton';
import InputBox from '../../components/InputBox';
import PasswordInputBox from '../../components/PasswordInputBox';

export default function SignIn() {
    const [values, setValues] = useState({
        email: '',
        password: ''
    });

    function handleChange(e: React.ChangeEvent<HTMLInputElement>){
        setValues({...values, [e.target.name]: e.target.value});
    }

    return (
        <div className='h-full my-6'>
            <div className='py-2'>
                <InputBox name="email" type="email" label="Email" required onChange={(e) => handleChange(e)} />
            </div>
            <div className="py-2">
                <PasswordInputBox name="password" label="Password" onChange={(e) => handleChange(e)} />
            </div>
            <AuthButton label='Sign In' />
        </div>
    )
}