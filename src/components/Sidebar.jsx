import React from 'react';
import {NavLink , useNavigate } from 'react-router-dom';
import { IoPerson , IoPricetag ,IoHome , IoLogOut,IoCart  } from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux';
import { LogOut,reset } from "../features/authSlice";

//io prefijo de los iconos que se estan trayendo desde react

const Sidebar = () => {
    const dispatch = useDispatch ();
    const navigate = useNavigate ();
    const {user} = useSelector((state) => state.auth);
    const logout = () =>{
        dispatch(LogOut());
        dispatch(reset());
        navigate("/");
    };  

    return (
        <div>
            <aside className="menu pl-2 has-shadow">
                <p className="menu-label">General</p>
                <ul className="menu-list">
                    <li><NavLink to={"/dashboard"}><IoHome/>Dashboard</NavLink></li>
                    <li><NavLink to={"/products"}><IoPricetag/>Productos</NavLink></li>
                    <li><NavLink to={"/clients"}><IoPerson/>Clientes</NavLink></li>
                    <li><NavLink to={"/quotations"}><IoCart/>Cotizaciones</NavLink></li>
                </ul>
                {user && user.role === "admin" && (
                    <div>
                <p className="menu-label">Admin</p>
                <ul className="menu-list">
                <li><NavLink to={"/users"}><IoPerson/>Usuarios</NavLink></li>
                </ul>
                    </div>
                )}
                <p className="menu-label">Ajustes</p>
                <ul className="menu-list">
                    <li><button onClick={logout} className='button is-white'><IoLogOut/>Cerrar Sesion</button></li>
                </ul>
            </aside>
        </div> 
    )
}

export default Sidebar
