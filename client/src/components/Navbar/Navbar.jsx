import React, {useEffect} from "react";
import { Link } from "react-router-dom";
import {useSelector, useDispatch} from 'react-redux'
import logo from "../../assets/logo.png";
import "./Navbar.css";
import search from "../../assets/search.svg";
import Avatar from "../Avatar/Avatar";
import { setCurrentUser } from "../../actions/currentUser";
import { useNavigate } from "react-router-dom";
import decode from 'jwt-decode'


function Navbar() {
  var User = useSelector((state) => (state.currentUserReducer))

  const dispatch = useDispatch()
  const navigate = useNavigate();

  const handleLogOut = () => {
    dispatch({ type: 'LOGOUT' });
    navigate('/')
    dispatch(setCurrentUser(null))
  }
  
  useEffect(() => {
    const token = User?.token 

    if(token) {
      const decodedToken = decode(token)
      if(decodedToken.exp * 1000 < new Date().getTime()) {
        handleLogOut()
      }
    }

    dispatch(setCurrentUser(JSON.parse(localStorage.getItem('Profile'))))
  }, [dispatch])


  return (
    <nav className="main-nav">
      <div className="navbar">
        <Link to="/" className="nav-item nav-logo">
          <img className="img-logo" src={logo} alt="logo" />
        </Link>
        <Link to="/" className="nav-item nav-btn">
          About
        </Link>
        <Link to="/" className="nav-item nav-btn">
          Products
        </Link>
        <Link to="/" className="nav-item nav-btn">
          For Teams
        </Link>
        <form>
          <input type="text" placeholder="Search..." />
          <img src={search} className="search-icon" alt="search" width="18" />
        </form>
        {User === null ? (
          <Link to="/Auth" className="nav-item nav-links">
            Log In
          </Link>
        ) : (
          <>
            <Avatar
              backgroundColor="#009dff"
              px="12px"
              py="6px"
              borderRadius="50%"
              color="white"
            >
              <Link
                to={`/Users/${User?.result._id}`}
                style={{ color: "white", textDecoration: "none" }}
              >
                {User.result.name.charAt(0)}
              </Link>
            </Avatar>

            <button className="nav-item nav-links" onClick={handleLogOut} >Log Out</button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
