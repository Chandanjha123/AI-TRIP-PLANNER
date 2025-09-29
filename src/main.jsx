import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Create_Trip from './Create-Trip/CreateTrip'
import Header from './components/ui/custom/Header'
import { Toaster } from 'sonner'
import { GoogleOAuthProvider } from '@react-oauth/google'
import ViewTrip from './view-trip/[tripId]/ViewTrip'
import Footer from './view-trip/[tripId]/components/Footer'
import MyTrips from './my-trips/MyTrips'


const router=createBrowserRouter([
  {
    path:'/',
    element:<App/>
  },
   {
    path:'/create-trip',
    element:<Create_Trip/>
  },
  {
    path:'/view-trip/:tripId',
    element:<ViewTrip/>
  },{
    path:"/my-trips",
    element:<MyTrips/>
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID}>
    <Header/>
    <Toaster/>
    <RouterProvider  router={router}/>
    </GoogleOAuthProvider>
    <Footer/>
  </StrictMode>,
)
