import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import TextField from '@mui/material/TextField';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import Button from '@mui/material/Button';

import google from './../assets/google.svg'
import facebook from './../assets/facebook.svg'
import apple from './../assets/apple.svg'
import sthetoscope from './../assets/logo-sthetoscope.svg'
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { setIsMinimized, setShowTabs, setTabValue } from '../store/layout';
import { signup_patient } from '../controllers/patientRoutes';
import { signup_doctor } from '../controllers/doctorRoutes';
import SignupCarousel from '../components/SignupCarousel';
import { setUser } from '../store/user';

const Signup = () => {

    const [typeOfUser, setTypeOfUser] = useState('')
    const [credentials, setCredentails] = useState(null)
    const [passwordVisible, setPasswordVisible] = useState(false)
    const [confirmationPasswordVisible, setConfirmationPasswordVisible] = useState(false)
    const [loading, setLoading] = useState(false)
    const isMinimized = useSelector(state => state.layout.isMinimized)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleGoToLogin = () => {
        dispatch(setTabValue(10))
        navigate('/login')
    }
    const handleSignup = async () => {
        setLoading(true)
        if (typeOfUser === 'patient') {
            const res = await signup_patient({
                patient_name: credentials?.username,
                patient_email: credentials?.email,
                patient_password: credentials?.password
            })
            // console.log(res, 'signup')
            if (res?.token) {
                localStorage.setItem('token', res?.token)
                localStorage.setItem('typeOfUser', 'patient')
                localStorage.setItem('userId', res?.patient?._id)
                dispatch(setUser(res?.patient))
                navigate('/')
            }
        } else if (typeOfUser === 'doctor') {
            const res = await signup_doctor({
                doctor_name: credentials?.username,
                doctor_email: credentials?.email,
                doctor_password: credentials?.password
            })
            // console.log(res, 'signup')
            if (res?.token) {
                localStorage.setItem('token', res?.token)
                localStorage.setItem('typeOfUser', 'doctor')
                localStorage.setItem('userId', res?.doctor?._id)
                dispatch(setUser(res?.doctor))
                navigate('/onboarding/doctor')
            }
        }
        setLoading(false)
    }

    useEffect(() => {
        dispatch(setTabValue(9))
        window.innerWidth < 1024 && dispatch(setShowTabs(false))
        if (typeOfUser === '') {
            dispatch(setIsMinimized(true))
        } else {
            dispatch(setIsMinimized(false))
        }
    }, [typeOfUser])

    return (
        typeOfUser !== '' ? (
            <div className="w-full h-full flex flex-col gap-5 p-5">
                <div className="text-2xl min-h-[2rem] max-h-[2rem] flex items-center">
                    <Button variant="outlined" className="" color='lightGray' disableElevation onClick={() => setTypeOfUser('')}>
                        <ArrowBackRoundedIcon color='secondary' className='mr-2' />
                    </Button>
                    Sign Up
                    <div className="lg:hidden ms-auto cursor-pointer"><MenuRoundedIcon onClick={() => { dispatch(setShowTabs(true)) }} /></div>
                </div>
                <div className='w-full h-[0px] bg-black/50 '></div>

                <div className="px-10 flex flex-col overflow-y-auto">
                    <div className="text-xl mb-4">Welcome here</div>
                    <div className="text-[#9E9E9E] text-sm mb-3">please enter your email and password to sign up</div>
                    <TextField
                        label="Username"
                        type='text'
                        value={credentials?.username}
                        onChange={(e) => setCredentails({ ...(credentials ?? {}), username: e.target.value })}
                        variant="standard"
                        className="w-full"
                        sx={{ mb: 3 }}
                        color='secondary'
                    />
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
                    <TextField
                        label="Confirm Password"
                        type={confirmationPasswordVisible ? 'text' : 'password'}
                        value={credentials?.confirmationPassword}
                        onChange={(e) => setCredentails({ ...(credentials ?? {}), confirmationPassword: e.target.value })}
                        variant="standard"
                        className="w-full"
                        sx={{ mb: 3 }}
                        color='secondary'
                        InputProps={{
                            endAdornment: confirmationPasswordVisible
                                ? <VisibilityOutlinedIcon className='cursor-pointer' sx={{ stroke: "#fff", strokeWidth: 1, color: '#CACACA' }} onClick={() => setConfirmationPasswordVisible(false)} />
                                : <VisibilityOffOutlinedIcon className='cursor-pointer' sx={{ stroke: "#fff", strokeWidth: 1, color: '#CACACA' }} onClick={() => setConfirmationPasswordVisible(true)} />
                        }}
                    />
                    <Button variant="contained" className="w-full" color='secondary' sx={{ mb: 3 }} disableElevation disabled={!credentials?.username || !credentials?.email || !credentials?.password || !credentials?.confirmationPassword || credentials?.password !== credentials?.confirmationPassword} onClick={handleSignup}>
                        Sign Up
                    </Button>
                    <div className='text-center text-sm mb-8'>Already have a account? <span className='cursor-pointer text-[#539C52]' onClick={handleGoToLogin}>Sign In</span></div>
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
        ) : (
            <div className="w-full h-full flex flex-col gap-5 p-5">
                <div className="text-2xl min-h-[2rem] max-h-[2rem] flex items-center">
                    Welcome
                    <div className="lg:hidden ms-auto cursor-pointer"><MenuRoundedIcon onClick={() => { dispatch(setShowTabs(true)) }} /></div>
                </div>
                <div className='w-full h-[0px] bg-black/50 '></div>

                <div className={`flex ${isMinimized ? 'flex-col lg:flex-row overflow-hidden' : 'flex-col overflow-y-scroll'} grow gap-5  items-stretch`}>
                    <div className={`bg-[#E8EDDF] text-center font-medium ${isMinimized ? 'overflow-y-scroll' : ''} w-full rounded-2xl p-5 justify-center `}>
                        <div className=' text-5xl xl:text-6xl 2xl:text-7xl text-[#207B1F] mb-2 mt-8'>AyurMitram</div>
                        <div className=' text-[#2A3F2E] mb-12'>Unveiling the essence of your prakruti</div>
                        <div className='text-[#2A3F2E] font-normal mb-1'>Join AyurMitram now</div>
                        <div className='text-center'>
                            <Button variant="contained" className="w-7/12" color='secondary' sx={{ mb: 2 }}  onClick={() => {setTypeOfUser('patient'); }}>
                                Sign Up
                            </Button>
                        </div>
                        <div className='text-[#2A3F2E] font-normal mb-1'>Already have a account? <span className='cursor-pointer text-[#539C52]' onClick={handleGoToLogin}>Sign In</span></div>                        
                        <div className='text-center'>
                            <Button variant="contained" className="w-7/12" color='secondary' sx={{ mb: 8 }}  onClick={handleGoToLogin}>
                                Sign In
                            </Button>
                        </div>
                        <div className='flex justify-center mb-2'>
                            <img src={sthetoscope} alt="sthetoscope" className="w-[5rem] " />
                        </div>
                        <div className='text-sm mb-2'>Are you a doctor?</div>
                        <div className='text-[#539C52] text-sm mb-2 cursor-pointer' onClick={() => {setTypeOfUser('doctor'); }}>Sign up here</div>
                        <div className='text-xs font-normal'>to connect with individuals seeking holistic insights into their prakruti</div>
                    </div>
                    <div className='w-full lg:w-1/2 rounded-2xl'>
                        <SignupCarousel />
                    </div>
                </div>
            </div>
        )
    )
}

export default Signup