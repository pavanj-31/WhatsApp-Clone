import Login from "./components/Login";
import Home from "./components/Home";
import Pagenotfound from "./components/Pagenotfound";
import { Route, Routes } from 'react-router-dom'
import ProtectedRoute from "./components/ProtectedRoute"

function App() {
  // loggdeIn -> information , user data -> CRUD
  return (
    <>
      <Routes>
        <Route path="/" element={<ProtectedRoute>
          <Home ></Home>
        </ProtectedRoute>}></Route>

        <Route path="/:chatid" element={
          <ProtectedRoute><Home></Home></ProtectedRoute>
        }></Route>

        <Route path="/login" element={<Login ></Login>}></Route>
        <Route path="*" element={< Pagenotfound />} />
      </Routes>
    </>
  )
}

export default App