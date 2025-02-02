import AuthButton from '../../components/AuthButton'
import InputBox from '../../components/InputBox'
import PasswordInputBox from '../../components/PasswordInputBox'

export default function SignUp() {
  return (
    <div>
        <InputBox name="name" type="text" label="Name" required onChange={() => console.log('abc')} />
        <InputBox name="email" type="email" label="Email" required onChange={() => console.log('abc')} />
        <PasswordInputBox name="password" label="Password" onChange={() => console.log("abc")} />
        <PasswordInputBox name="confirmPassword" label="Confirm Password" onChange={() => console.log("abc")} />
        <AuthButton label='Sign Up' />
    </div>
  )
}