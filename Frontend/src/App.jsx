import { Router } from './Routes/Router'
import { Navbar } from './Navbar'
import './App.css'
import { AuthProvider } from './Context/AuthProvider';
function App() {

  return (
    <>
      <AuthProvider>
        <Navbar />
        <Router />
      </AuthProvider>
    </>
  )
}

export default App
