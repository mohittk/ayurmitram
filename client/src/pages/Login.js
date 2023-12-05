import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import FormControlLabel from '@mui/material/FormControlLabel';

import google from './../assets/google.svg'
import facebook from './../assets/facebook.svg'
import apple from './../assets/apple.svg'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [credentials, setCredentails] = useState(null)
    const [passwordVisible, setPasswordVisible] = useState(false)

    const navigate = useNavigate()

    return (
        <div className="w-full h-full flex flex-col gap-5">
            <div className="text-2xl h-10 min-h-[2.5rem] flex items-center">
                Sign In
            </div>
            <div className='w-full h-[0.5px] bg-black/50 '></div>

            <div className="px-10 flex flex-col overflow-y-auto">
                <div className="text-xl mb-4">Welcome back</div>
                <div className="text-[#9E9E9E] text-sm mb-3">please enter your email and password to sign in</div>
                <TextField
                    label="Email"
                    type='email'
                    value={credentials?.email}
                    onChange={(e) => setCredentails({ ...(credentials ?? {}), email: e.target.value })}
                    variant="standard"
                    className="w-full"
                    sx={{ mb: 3 }}
                    color='secondary'
                    InputProps={{
                        endAdornment: <EmailOutlinedIcon sx={{ stroke: "#fff", strokeWidth: 1, color: '#CACACA' }} />
                    }}
                />
                <TextField
                    label="Password"
                    type={passwordVisible ? 'text' : 'password'}
                    value={credentials?.password}
                    onChange={(e) => setCredentails({ ...(credentials ?? {}), password: e.target.value })}
                    variant="standard"
                    className="w-full"
                    sx={{ mb: 3 }}
                    color='secondary'
                    InputProps={{
                        endAdornment: passwordVisible 
                            ? <VisibilityOutlinedIcon className='cursor-pointer' sx={{ stroke: "#fff", strokeWidth: 1, color: '#CACACA' }} onClick={() => setPasswordVisible(false)} /> 
                            : <VisibilityOffOutlinedIcon className='cursor-pointer' sx={{ stroke: "#fff", strokeWidth: 1, color: '#CACACA' }} onClick={() => setPasswordVisible(true)} />
                    }}

                />
                <div className='flex gap-2 mb-3'>
                    <FormControlLabel 
                        control={<Checkbox
                            checked={credentials?.rememberMe}
                            onChange={(e) => setCredentails({ ...(credentials ?? {}), rememberMe: e.target.checked })}
                            disableRipple
                            // sx={{ p: 0 }}
                            color="secondary"
                        />} 
                        label="Remember me" 
                    />
                </div>
                <Button variant="contained" className="w-full" color='secondary' sx={{ mb: 3 }} disableElevation>
                    Sign In
                </Button>
                <div className='cursor-pointer text-xs text-[#539C52] text-center mb-3'>forgot password?</div>
                <div className='text-center text-sm mb-8'>Don't have a account? <span className='cursor-pointer text-[#539C52]' onClick={() => navigate('/signup')}>Sign Up</span></div>
                <div className='flex items-center justify-center gap-2 mb-3'>
                    <div className='h-[0.5px] grow bg-[#9EAFB0]'></div>
                    <div className='text-xs text-[#9EAFB0]'>or continue with</div>
                    <div className='h-[0.5px] grow bg-[#9EAFB0]'></div>
                </div>
                <div className='flex items-center gap-4 justify-center'>
                    <Button variant="outlined" className="" color='lightGray' sx={{ mb: 3 }} disableElevation>
                        <img src={google} alt="google" className="w-5 h-5" />
                    </Button>
                    <Button variant="outlined" className="" color='lightGray' sx={{ mb: 3 }} disableElevation>
                        <img src={facebook} alt="facebook" className="w-5 h-5" />
                    </Button>
                    <Button variant="outlined" className="" color='lightGray' sx={{ mb: 3 }} disableElevation>
                        <img src={apple} alt="apple" className="w-5 h-5" />
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default Login;