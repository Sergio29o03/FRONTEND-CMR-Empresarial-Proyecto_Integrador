import React, {useState} from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const FormAddUser = () => {
    const [name, Setname] = useState("");
    const [email, SetEmail] = useState("");
    const [password, SetPassword] = useState("");
    const [confPassword, setConfPassword] = useState("");
    const [role, setRole] = useState("");
    const [msg, SetMsg] = useState("");
    const navigate = useNavigate();


    const saveUser = async(e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/users', {
                name:name,
                email:email,
                password:password,
                confPassword: confPassword,
                role:role,
            });
            navigate('/users')
        } catch (error) {
            if(error.response){
                SetMsg(error.response.data.msg);
            }
        }
    }
    return (
        <div>
            <h1 className='titulo'>Usuarios</h1>
            <h2 className='subtitulo'>Agregar nuevo usuario</h2>
            <div className="card is-shadowless">
                <div className="card-content">
                    <div className="content">
                    <form onSubmit={saveUser}>
                        <p className='has-text-centered'>{msg}</p>
                    <div className='field'>
                                <label  className="label">Nombre</label>
                                <div className="control">
                                    <input type="text" className='input' value={name} onChange={(e)=> Setname(e.target.value)}  placeholder='Nombre'/>
                                </div>
                            </div>
                            <div className='field'>
                                <label  className="label">Email</label> 
                                <div className="control">
                                    <input type="text" className='input' value={email} onChange={(e)=> SetEmail(e.target.value)} placeholder='Email'/>
                                </div>
                            </div>
                            <div className='field'>
                                <label  className="label">Contraseña</label>
                                <div className="control">
                                    <input type="password" className='input' value={password} onChange={(e)=> SetPassword(e.target.value)}  placeholder='******'/>
                                </div>
                            </div>
                            <div className='field'>
                                <label  className="label">Confirmar Contraseña</label>
                                <div className="control">
                                    <input type="password" className='input' value={confPassword} onChange={(e)=> setConfPassword(e.target.value)}  placeholder='******'/>
                                </div>
                            </div>
                            <div className='field'>
                                <label  className="label">Rol</label>
                                <div className="select is-fullwidth">
                                    <select value={role} onChange={(e)=> setRole(e.target.value)} >
                                        <option value="admin">Admin</option>
                                        <option value="user">Gestor</option>
                                    </select>
                                </div>
                            </div>
                            <div className='field'>
                                <div className="control">
                                    <button type='submit' className="button is-success is-fullwidth">Guardar</button>      
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FormAddUser
