import Footer from './components/Footer'
import Manager from "./components/Manager"
import Navbar from "./components/Navbar"

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div>
      <Navbar />
      <Manager />
      <Footer />
      <ToastContainer/>
      <ToastContainer />
    </div>
  )
}

export default App