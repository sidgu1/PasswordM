
import './App.css'
import Navbar from './components/Navbar'
import Manager from "./components/Manager"
import { FormText } from 'react-bootstrap'
import Footer from './components/Footer'
function App() {

  return (
    <>
      <Navbar />
      <div className=" bg-green-50 bg-[radial-gradient(100%_50%_at_50%_0%,rgba(0,163,255,0.13)_0,rgba(0,163,255,0)_50%,rgba(0,163,255,0)_100%)]">

        <Manager />
      <Footer/>
      </div>
    </>
  )
}

export default App
