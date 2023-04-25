import React, {useState,useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { LoginUser,reset } from "../features/authSlice";

const Login = () => {
        const[email, setEmail] = useState("");
        const[password, setPassword] = useState("");
        const dispatch = useDispatch ();
        const navigate = useNavigate ();
        const {user, isError , isSuccess , isLoading, message } = useSelector((state) => state.auth);

//La función useDispatch se utiliza para obtener una referencia a la función dispatch proporcionada 
//por Redux, que se utiliza para enviar acciones a la tienda de Redux.

//La función useNavigate se utiliza para obtener una referencia al objeto de navegación proporcionado por React Router

//La función useSelector se utiliza para obtener el estado actual de la tienda de Redux y extraer datos específicos del estado.
//En este caso, se están extrayendo user, isError, isSuccess, isLoading y message del estado de autenticación.

        useEffect(() => {
            if(user || isSuccess){
                navigate("/dashboard");
            }
            dispatch(reset());
        },[user , isSuccess, dispatch , navigate]);

//primero se comprueba si hay un usuario autenticado (user) o si la autenticación ha tenido éxito (isSuccess).
//Si es así, se navega al usuario a la página de panel de control (/dashboard) mediante la función navigate proporcionada por React Router.


        const Auth = (e) =>{
            e.preventDefault();
            dispatch(LoginUser({email,password})); 
        }

    return (
        <section className="hero has-background-grey-light is-fullheight is-fullwidth">
            <div className="hero-body">
                <div className="container">
                    <div className="columns is-centered">
                        <div className='column is-4'>
                        <form onSubmit={Auth} className='box'>
                            { isError && <p className='has-text-centered'>{message}</p>}
                        <h1 className='title is-2'>Inicia Sesion</h1>
                            <div className='field'>
                                <label  className="label">Email</label>
                                <div className="control">
                                    <input type="text" className='input'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder='Email'/>
                                </div>
{/*Cuando el usuario ingresa texto en el campo de entrada, se dispara un evento onChange. El manejador de eventos
onChange llama a la función setEmail para actualizar el estado email con el valor del campo de entrada*/}
                            </div>
                            <div className='field'>
                                <label  className="label">Contraseña</label>
                                <div className="control">
                                    <input type="password"
                                    className='input'
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder='******'/>
                                </div>
                            </div>
                            <div className='field mt-5'>
                                <button type="submit" className="button is-success is-fullwidth">
                                    {isLoading ? 'Loading...' : 'Login'}</button>
                            </div>
                        </form>
                        </div>
                        </div>
                </div>
            </div>
        </section>
    )
}

export default Login
