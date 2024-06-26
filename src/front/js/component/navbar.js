
import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import ThemeSwitcher from "./themechanger";
import {GiHamburgerMenu } from 'react-icons/gi';
import file from "../../img/file.jpg"

import "../../styles/navbar.css";

export const Navbar = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();
  const localUserId = localStorage.getItem("userId")
  const token = localStorage.getItem("jwt-token")
  const [favouritesUpdated, setFavouritesUpdated] = useState(0);


	const logOut = () => {
		localStorage.removeItem('jwt-token');
		localStorage.removeItem('userId')
    actions.setLoggedIn(false)
		navigate("/");
		Swal.fire({
      icon: 'success',
      text: 'You are now logged out'         
    })
	}
 
	useEffect(() => {		
		actions.getUser(localStorage.getItem("userId"))
	}, []);

  useEffect(() => {
    if (localUserId) {
      actions.getUser(localUserId);
    }
  }, [localUserId]);

  useEffect(() => {
    setFavouritesUpdated(favouritesUpdated + 1);
  }, [store.favourite]); 

  const isHome = window.location.pathname === '/';

  return (
      <nav 
      className={`navbar navbar-expand-lg ${isHome ? 'home-navbar' : 'home-navbar'}`} 
      style={isHome ? { background: 'url("https://t3.ftcdn.net/jpg/05/71/35/96/240_F_571359675_uW3GDeWGeBZITejIbxt6OyuNGOclQkmT.jpg")', 
      color: 'white', minHeight: '400px', backgroundSize: 'cover', backgroundPosition: 'center'
      } : null}
      >
          <div className="home-navbar container-fluid">
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation" >
              <span className="navbar-toggler-icon" >
              <GiHamburgerMenu className="reactIcon" size="30px" />
              </span>
            </button>
            <a className="navbar-brand" href="/"> 
            {isHome ? (
              <img
                src={file}
                alt="0d3b546942f94de196812ac8af0bf4d9"
                id="imageBrand"
              />
            ) : (
              <img
              src={file}
                alt="black-navbar-1"
                id="imageBrandBNavbar"
              />)}
            </a>
            <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
                <ul className="navbar-nav me-auto mt-0 mb-2 mb-lg-0" id="navbarContent">
                  <li className="nav-item dropdown" id="category-dropdown">
                    <button className="btn dropdown text-warning toggle" id="category" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                      Category
                    </button>
                      <ul className="dropdown-menu bg-dark" id="scroll-down">
                        <li>
                          <a className="nav-link text-warning" id="scroll-down2" href="#" onClick={() => navigate("/activities")}>
                          Activities
                          </a>
                        </li>
                        <li>
                          <a className="nav-link text-warning" id="scroll-down2" href="#" onClick={() => navigate("/products")}>
                          Products
                          </a>
                        </li>
                        <li>
                          <a className="nav-link text-warning" id="scroll-down2" href="#" onClick={() => navigate("/trips")}>
                          Trips
                          </a>
                        </li>
                      </ul>
                  </li>
                  <li class="nav-item" id="userNavbar">
                    {token ? ( 
                        <div className="token">
                          <div className="nav-item">
                            <a className="nav-link text-warning" href="#" onClick={() => navigate("/user-page")}>
                              User Page
                            </a>
                          </div>
                          <div className="nav-item">
                            <a className="nav-link text-warning" href="#" onClick={() => navigate("/create-review")}>
                              Create Review
                            </a>
                          </div>
                          <div className="nav-item">
                            <a className="nav-link text-warning" href="#" onClick={logOut}>
                              Logout
                            </a>
                          </div>
                          <li className="nav-item text-warning" id="theme">
                            <ThemeSwitcher/>
                          </li>
                          <div className="btn-group dropdown d-flex flex-wrap" id="favourites">
                            <button type="button" className="btn-navbar dropdown-toggle" data-bs-toggle="dropdown" data-bs-auto-close="outside" id="dropdownMenuClickableInside" aria-expanded="false">
                                Favourites <span className="p-1 text-center text-warning">{(store.favourite && store.favourite!=null && store.favourite!=undefined)? store.favourite.length:"0"}</span>
                            </button>
                            {store.favourite && store.favourite.length > 0 ? (
                                <ul className="dropdown-menu dropdown-menu-lg-end" id="favouritesDropdown" aria-labelledby="dropdownMenuClickableInside">
                                    {store.favourite.map((fav, index) => {
                                        return (
                                            <li key={index} id="favourites-list">
                                                <a className="dropdown-item d-flex" id="dropdown-favourites" onClick={() => {
                                                  navigate(`/${fav.category}/${fav.id}`)
                                                }}>
                                                    {fav.title}
                                                </a>
                                                <i
                                                  className="fas fa-trash" id="delete-favourite"
                                                  onClick={() => {
                                                      actions.deleteFavourite(fav);
                                                      actions.addUserFavourites(localUserId);
                                                  }}
                                                ></i>
                                            </li>
                                        );
                                    })}
                                </ul>
                            ) : (
                              ""
                            )}
                        </div>
                        </div>
                      ) : (
                          <div className="nav-item">
                            <a className="nav-link text-warning" href="#" onClick={() => navigate("/login")}>
                              Login
                            </a>
                          </div>
                          )}
                  </li>
                </ul>
            </div>
          </div>
      </nav>
  );
};