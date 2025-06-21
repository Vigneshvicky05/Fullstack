import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
// import './App.css'
import Welcome from './Welcome'
import Skills from './skill'
import { Route, Routes } from 'react-router-dom'
import Home from './Pages/Home'
import About from './Pages/About'
import Service from './Pages/Service'
import Navbar from './components/Navbar'
import State from './hooks/State'
import Form from './hooks/Form'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Navbar/>
    <Routes>
       <Route path='/' element={<Home/>}/>
       <Route path='/About' element={<About/>}/>
       <Route path='/Service' element={<Service/>}/>
       <Route path='/state' element={<State/>}/>
       <Route path='/form' element={<Form/>}/>
    </Routes>
    {/* <Welcome name='Deepan' country='India'/> */}
    {/* <Skills skill={['React','Node','Express','MongoDb']}/>   */}
          {/* <h1>Hello World</h1> */}

    </>
  )
}

export default App
