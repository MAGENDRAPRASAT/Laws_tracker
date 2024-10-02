import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios'
import { RouterProvider } from 'react-router-dom'
import { router } from './routes/routes'

function App() {

  const [data, setData] = useState([])

  useEffect(() => {
    (async()=>{
      const response = await axios.get('http://127.0.0.1:5000/api/laws')
      const data = response.data.data
      console.log(data)
      setData(data)
    })()
  }, [])
   return (
    <>
     <RouterProvider router={router} />
    </>
  )
}

export default App
