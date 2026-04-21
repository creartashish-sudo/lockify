import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Header from './components/Header'
import Footer from './components/Footer'
// import "./assets/vendor/bootstrap/css/bootstrap.min.css"
import "./assets/vendor/bootstrap/js/bootstrap.min.js"

// import "./assets/vendor/bootstrap-icons/bootstrap-icons.css"
// import "./assets/vendor/aos/aos.css"
// import "./assets/vendor/glightbox/css/glightbox.min.css"
// import "./assets/vendor/swiper/swiper-bundle.min.css"
import './assets/css/main.css'
// import './assets/vendor/aos/aos.js'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Register from './pages/Register'
import Login from './pages/Login'
import Documents from './pages/Documents'
import Websites from './pages/Websites'
import Feedback from './pages/Feedback'
import Contact from './pages/Contact'
import About from './pages/About'
import UpdateProfile from './pages/UpdateProfile'
import ChangePassword from './pages/ChangePassword'
import AddWebsite from './pages/AddWebsite'
import AddDocument from './pages/AddDocument'
import ForgotPassword from './pages/ForgotPassword'
import WebsiteDetails from './pages/WebsiteDetails.jsx'
import UpdateWebsite from './pages/UpdateWebsites.jsx'
import Subscription from './pages/Subscription.jsx'
import UpdateDocument from './pages/UpdateDocument.jsx'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import UpdateProfilePassword from './pages/UpdateProfilePassword.jsx'
import axios from 'axios'


function App() {
  const [count, setCount] = useState(0)
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  useEffect(() => {
      const username = localStorage.getItem("user");
      if (username) {
        setIsUserLoggedIn(true);
      } else {
        setIsUserLoggedIn(false);
      }
    }, [localStorage.getItem("user")]);


    // const sendMail = (e) => {
    //   e.preventDefault();
    //   try{
    //     const res = axios.post('http://localhost:3000/users/send-test-mail', {email:"creart.ashish@gmail.com"});
    //     console.log(res);
    //   }catch(err){
    //     console.log(err);
    //   }
    // }
  return (
    <>
    <ToastContainer 
    position="top-right"
    style={{ marginTop: '60px !important' }}
    />


    {/* <button onClick={(e)=>sendMail(e)}>Mail</button> */}
      <Header isUserLoggedIn={isUserLoggedIn} setIsUserLoggedIn={setIsUserLoggedIn}/>
      <main className='main'>
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/about' element={<About />}/>
          <Route path='/documents' element={<Documents />}/>
          <Route path='/update-document' element={<UpdateDocument />}/>
          <Route path='/websites' element={<Websites />}/>
          <Route path='/websites/website-details' element={<WebsiteDetails />}/>
          <Route path='/websites/update-website' element={<UpdateWebsite />}/>
          <Route path='/add-website' element={<AddWebsite />}/>
          <Route path='/add-document' element={<AddDocument />}/>
          <Route path='/feedback' element={<Feedback />}/>
          <Route path='/contact' element={<Contact />}/>
          <Route path='/update-profile' element={<UpdateProfile />}/>
          <Route path='/change-password' element={<ChangePassword />}/>
          <Route path='/change-profile-password' element={<UpdateProfilePassword />}/>
          <Route path='/login/forgot-password' element={<ForgotPassword />}/>

          <Route path='/register' element={<Register isUserLoggedIn={isUserLoggedIn} setIsUserLoggedIn={setIsUserLoggedIn}/>}/>
          <Route path='/login' element={<Login isUserLoggedIn={isUserLoggedIn} setIsUserLoggedIn={setIsUserLoggedIn}/>}/>
          <Route path='/subscription' element={<Subscription />}/>
        </Routes>
      </main>
      <Footer />
    </>
  )
}

export default App
