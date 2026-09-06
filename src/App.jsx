import './App.css'
import RoomListForm from './components/room/RoomListForm.jsx'
import { Route, Routes } from 'react-router-dom'
import {HotelList} from './components/hotel/HotelList.jsx'
import { ManageHotels } from './components/hotel/ManageHotels.jsx'
import { AddPropertyCard } from './components/common/AddPropertyCard.jsx'
import { OwnerDashboard } from './components/home/OwnerDashboard.jsx'
import { SecureCheckout } from './components/payment/SecureCheckout.jsx'
import { BookingSummary } from './components/bookings/BookingSummary.jsx'
import { AuthCard } from './components/auth/AuthCard.jsx'
import { ResetPasswordCard } from './components/auth/ResetPasswordCard.jsx'
import { TravelEaseHome } from './components/home/TravelEaseHome.jsx'
import { OtpVerify } from './components/auth/OtpVerify.jsx'


function App() {
	return (
		<main>
			<Routes>
				<Route path="/lst-hotel" element={<HotelList />} />
				<Route path="/" element={<RoomListForm />} />
				<Route path="/hotel" element={<ManageHotels />} />
				<Route path="/property-card" element={<AddPropertyCard />} />
				<Route path="/dashboard" element={<OwnerDashboard />} />
				<Route path="/payment" element={<SecureCheckout />} />
				<Route path="/booking" element={<BookingSummary />}/>
				<Route path="/auth" element={<AuthCard />}/>
				<Route path="/reset-password" element={<ResetPasswordCard />}/>
				<Route path='/home'element={<TravelEaseHome />}/>
				<Route path='/otp-vertify' element={<OtpVerify />} />
			</Routes>
		</main>
	)
}

export default App
