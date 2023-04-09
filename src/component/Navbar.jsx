import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { logout } from '../redux/slice/UserSlice';
const Navbar = ({ search_term, setSearchTerm }) => {

    const { user } = useSelector((state) => state.user)
    console.log({ user })

    const location = useLocation()
    console.log({ location })

    const dispatch = useDispatch();

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">Home</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link to="/login" className="nav-link active" aria-current="page" >login</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/signup" className="nav-link active" aria-current="page" >signup</Link>
                        </li>
                        {
                            user?.role === "buyer"
                            &&
                            <>
                                <li className="nav-item">
                                    <Link to="/orders" className="nav-link active" aria-current="page" >orders</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/cart" className="nav-link active" aria-current="page" >cart</Link>
                                </li>
                            </>
                        }
                        {
                            user?.role === "seller"
                            &&
                            <>
                                <li className="nav-item">
                                    <Link to="/products/create" className="nav-link active" aria-current="page" >create product</Link>
                                </li>
                            </>
                        }

                    </ul>

                    <div className='d-flex '>
                        {
                            user
                            &&
                            <button onClick={() => {
                                localStorage.removeItem("access_token")
                                // redux logout
                                dispatch(logout())
                            }}>logout</button>
                        }
                        {
                            (location.pathname === "/" || location.pathname === "/products")
                            &&
                            <form className="d-flex">
                                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"
                                    value={search_term}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </form>
                        }
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
