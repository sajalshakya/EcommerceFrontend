import './App.css';
import { useState, useEffect } from "react"
import Navbar from './component/Navbar';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from './page/Login';
import Signup from './page/Signup';
import Home from './page/Home';
import Show from './page/Product/Show';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setUser } from './redux/slice/UserSlice';
import ProtectedRoute from './component/ProtectedRoute';
import Upsert from './page/Product/Upsert';

export default function App() {
  const dispatch = useDispatch()


  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let access_token = localStorage.getItem("access_token")
    if (access_token) {
      axios.get(`${process.env.REACT_APP_SERVER_URL}/users/get-user`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`
        }
      })
        .then(user_res => {
          console.log({ user_res })
          dispatch(setUser(user_res.data))
          setLoading(false)
        }).catch(err => {
          console.log(err)
          setLoading(false)
        })
    }
    else {
      setLoading(false)
    }
  }, []);

  // const [user, setUser] = useState(null) //{name;email,role}

  const [search_term, setSearchTerm] = useState("");

  if (loading) {
    return <>
      <div style={{
        height: "100vh",
        width: "100vw",
        marginTop: "50vh",
        marginLeft: "auto",
        marginRight: "auto"
      }}>
        <div class="spinner-border" role="status">
          <span class="sr-only"></span>
        </div>
        <h1>please wait......</h1>
      </div>
    </>
  }

  return (
    <div>
      <BrowserRouter>
        <Navbar setSearchTerm={setSearchTerm} search_term={search_term} />
        <div className='container'>
          <Routes>
            <Route path='' element={<Home search_term={search_term} />} />
            <Route path='products'>
              <Route index element={<Home search_term={search_term} />} />
              <Route path='create' element={<Upsert />} />
              <Route path='edit/:id' element={<Upsert />} />
              <Route path=':id' element={<Show />} />
            </Route>
            <Route path='login' element={<Login />} />
            <Route path='signup' element={<Signup email="em@em.com" />} />
            <Route element={<ProtectedRoute role="buyer" />}>
              <Route path='orders' element={<h1>order page</h1>} />
              <Route path='cart' element={<h1>cart page</h1>} />
            </Route>
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}
