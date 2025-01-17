import ImportantDevicesIcon from '@mui/icons-material/ImportantDevices';
import FormatSizeIcon from '@mui/icons-material/FormatSize';
import React, { useMemo, useState, useEffect } from "react";
import AssessmentRoundedIcon from '@mui/icons-material/AssessmentRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import TroubleshootRoundedIcon from '@mui/icons-material/TroubleshootRounded';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
import LocalHospitalRoundedIcon from '@mui/icons-material/LocalHospitalRounded';
import SpaRoundedIcon from '@mui/icons-material/SpaRounded';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import LoginRoundedIcon from '@mui/icons-material/LoginRounded';
import PersonAddRoundedIcon from '@mui/icons-material/PersonAddRounded';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import translateIcon from './../assets/translate.svg'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { setLanguage } from '../store/layout';
import { languages } from '../pages/OnboardingDoctor';
import ThemeWrapper from "../utils/ThemeWrapper";
import { useSelector, useDispatch } from 'react-redux'
import { setTabValue, setIsMinimized, setShowTabs } from '../store/layout'
import Chatbot from "./Chatbot";
import { useNavigate } from "react-router-dom";
import SignupCarousel from "./SignupCarousel";
import logo from './../assets/logo.svg'

const Layout = ({ children }) => {
	const tabValue = useSelector(state => state.layout.tabValue)
	const isMinimized = useSelector(state => state.layout.isMinimized)
	const lang = useSelector(state => state.layout.language)
	const showTabs = useSelector(state => state.layout.showTabs)

	const dispatch = useDispatch()
	const navigate = useNavigate()

	const disableAllTabs = useMemo(() => {
		return tabValue === 11
	}, [tabValue])

	useEffect(() => {
        dispatch(setIsMinimized(true));
    }, []);
	const openChatbox = () => {
        if (localStorage.getItem('token')) {
            dispatch(setIsMinimized(false))
        } else {
            dispatch(setTabValue(10))
            navigate('/login')
        }
    }

	const redirectTo = (path) => {
		navigate(path)
	}

	// tabvalues = {
	// 	'Home': 0,
	// 	'Find Your Prakriti': 1,
	// 	'Results': 2,
	// 	'Consultant (Doctor)': 3,
	// 	'Self care': 4,
	// 	'About': 5,
	// 	'Profile': 7,
	// 	'Logout': 8,
	// 	'Signup': 9,
	// 	'Login': 10,
	// 	'Onboarding': 11,
	// }

	return (
		<ThemeWrapper>
			{/* <div className="flex items-center justify-between bg-ayurgreen text-white p-3 font-bold">
				<div className="flex items-center">
					<span className="text-2xl font-semibold">AyurMitram</span>
				</div>
			</div> */}
			<div>
				{/* <img src={} */}
			</div>
			<div className="h-[2rem] px-3 flex gap-5 items-center justify-end w-full bg-[#E8EDDF] font-opensans">
				<div className="flex gap-1 cursor-pointer">
					<ImportantDevicesIcon className='' />
					<div className="font-semibold">Main Content</div>
				</div>
				<div className='flex gap-1'>
					{/* <FormatSizeIcon className='' /> */}
					<div className='font-bold cursor-pointer text-lg'>A-</div>
					<div className='font-bold cursor-pointer text-lg'>A</div>
					<div className='font-bold cursor-pointer text-lg'>A+</div>
				</div>
				<div className='flex gap-1'>
					<img src={translateIcon} alt="" className='w-5 h-5' />
					<Select
						sx={{ 
							'& .MuiSelect-select': {
								padding: '0rem',
								paddingRight: '1rem',
								paddingLeft: '1rem',
							}
						}}
						
						labelId="language"
						id="language"
						value={lang}
						onChange={(e) => dispatch(setLanguage(e.target.value))}
						color='secondary'
					>
						{languages.map((name) => (
							<MenuItem
								key={name}
								value={name}
							>
								{name}
							</MenuItem>
						))}
					</Select>
				</div>
			</div>
			<div className="flex flex-col lg:flex-row justify-start gap-0 lg:gap-5 h-auto lg:h-[calc(100vh_-_2rem)] min-h-[calc(100vh_-_2rem)] p-0 lg:p-5 font-['Poppins'] font-semibold bg-[#E8EDDF] overflow-hidden" >
				{showTabs && (
					<div className="flex w-screen lg:w-2/12 flex-col gap-5 rounded-xl overflow-auto h-screen fixed lg:static bg-[#E8EDDF] z-20 top-0 left-0">
						
						<div className="flex gap-2 items-center text-2xl p-5 pb-0">
						<img src={logo} width={40} height={40}/>
							AyurMitram
							<div className='lg:hidden ms-auto cursor-pointer'><CloseRoundedIcon onClick={() => dispatch(setShowTabs(false))} /></div>
						</div>
						
						<div className='w-full h-[0px] bg-black/50 '></div>

						<Tabs value={tabValue} onChange={() => {}} orientation="vertical">
							<Tab label="Home" icon={<HomeRoundedIcon />} iconPosition="start" onClick={() => redirectTo('/')} disabled={disableAllTabs} />
							<Tab label="Find Your Prakriti" icon={<TroubleshootRoundedIcon />} iconPosition="start" onClick={(e) => redirectTo('/find-your-prakruti')} disabled={disableAllTabs} />
							{localStorage.getItem('token') ? (
								<div></div>
							) : (
								<div></div>
							)}
							<Tab label="Consultant (Doctor)" icon={<LocalHospitalRoundedIcon />} iconPosition="start" onClick={() => redirectTo('/consultant')} disabled={disableAllTabs} />
							<Tab label="Self care" icon={<SpaRoundedIcon />} iconPosition="start" onClick={() => redirectTo('/selfcare')} disabled={disableAllTabs} />
							<Tab label="About" icon={<InfoRoundedIcon />} iconPosition="start" onClick={() => redirectTo('/about')} disabled={disableAllTabs} />

							<div className='w-full h-[0.5px] bg-black/50 mt-5 mb-1'></div>

							{localStorage.getItem('token') ? (
								<Tab label="Profile" icon={<AccountCircleRoundedIcon />} iconPosition="start" onClick={() => redirectTo('/profile')} disabled={disableAllTabs} />
							) : (
								<div></div>
							)}
							{localStorage.getItem('token') ? (
								<Tab label="Logout" icon={<LogoutRoundedIcon />} iconPosition="start" onClick={() => {localStorage.removeItem('token'); redirectTo('/') }} />
							) : (
								<div></div>
							)}
							{!localStorage.getItem('token') ? (
								<Tab label="Signup" icon={<PersonAddRoundedIcon />} iconPosition="start" onClick={() => redirectTo('/signup')} disabled={disableAllTabs} />
							) : (
								<div></div>
							)}
							{!localStorage.getItem('token') ? (
								<Tab label="Login" icon={<LoginRoundedIcon />} iconPosition="start" onClick={() => redirectTo('/login')} disabled={disableAllTabs} />
							) : (
								<div></div>
							)}
						</Tabs>
					</div>
				)}
				<div className={` bg-white lg:rounded-2xl ${isMinimized ? 'w-full lg:w-10/12' : 'w-full lg:w-5/12'}`}>
					{children}
				</div>
				{isMinimized && (
					<div className="fixed bottom-8 right-8 z-20">
						<button
							className="bg-ayurgreen text-white p-4 rounded-full"
							onClick={openChatbox}
						>
							<ChatBubbleIcon />
						</button>
					</div>
				)}
				{(tabValue === 10 || tabValue === 9 || tabValue === 11) ? (
					!isMinimized && <SignupCarousel />
				) : (
					<Chatbot />
				)}
			</div>
		</ThemeWrapper>
	)
}

export default Layout