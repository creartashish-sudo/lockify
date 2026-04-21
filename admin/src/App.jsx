import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Header from './components/Header'
import './assets/vendor/bootstrap/css/bootstrap.min.css'

import './assets/vendor/bootstrap/css/bootstrap.min.css'
import './assets/vendor/bootstrap-icons/bootstrap-icons.css'
import './assets/vendor/boxicons/css/boxicons.min.css'
import './assets/vendor/quill/quill.snow.css'
import './assets/vendor/quill/quill.bubble.css'
import './assets/vendor/remixicon/remixicon.css'
import './assets/vendor/simple-datatables/style.css'
import './assets/css/style.css'
import './assets/vendor/bootstrap/js/bootstrap.bundle.min.js'

import Sidebar from './components/Sidebar'
import Footer from './components/Footer'
import { Route, Routes, useLocation } from 'react-router-dom'
import Login from './pages/Login.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Users from './pages/Users.jsx'
import Inquiry from './pages/Inquiry.jsx'
import Feedback from './pages/Feedback.jsx'
import Payment from './pages/Payment.jsx'
import UserDetails from './pages/UserDetails.jsx'

function App() {
  const [count, setCount] = useState(0)
  const location = useLocation();

  return (
    <>
    <Routes>
          <Route path='/login' element={<Login />}/>
        </Routes>
      {location.pathname != "/login" ? <Header /> : <></>}
      {location.pathname != "/login" ? <Sidebar /> : <></>}
      {/* <Sidebar /> */}
      {location.pathname != "/login" ? <main id="main" class="main">
        <Routes>
          <Route path='/' element={<Dashboard />}/>
          <Route path='/users' element={<Users />}/>
          <Route path='/user-details' element={<UserDetails />}/>
          <Route path='/inquiry' element={<Inquiry />}/>
          <Route path='/feedback' element={<Feedback />}/>
          <Route path='/payment' element={<Payment />}/>
        </Routes>
      </main> :<></>}
      {location.pathname != "/login" ? <Footer /> : <></>}
 
      {/* <Footer /> */}
    </>
  )
}

export default App
