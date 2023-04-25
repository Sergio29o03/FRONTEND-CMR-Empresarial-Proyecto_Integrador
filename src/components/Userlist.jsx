import React, {useState, useEffect} from 'react';
import axios from 'axios';
import  {Link} from 'react-router-dom';



const Userlist = () => {
        const[users,setUsers] = useState([]);

        useEffect(()=>{
            getUsers();
        },[]);

        const getUsers = async () => {
            const response = await axios.get('http://localhost:5000/users'); 
            setUsers(response.data);
        };

        const deleteUser = async (userId) => {
            await axios.delete(`http://localhost:5000/users/${userId}`);
            getUsers();
        };
        



    return (
        <div>
    <h1 className='title'><strong>Usuarios</strong></h1>
    <h2 className='subtitle'>Lista de Usuarios</h2>
    <Link to="/users/add" className='button is-primary mb-2'>Agrega uno nuevo</Link>
    <table className='table is-striped is-fullwidth'>
                <thead>
                    <tr>
                        <th>N°</th>
                        <th>Nombre </th>
                        <th>Email</th>
                        <th>Rol</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user , index)=>(
                        <tr key={user.uuid}>
                        <td>{index + 1}</td>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.role}</td>
                        <td>
                            <Link to={`/users/edit/${user.uuid}`} className="button is-small is-info">Editar</Link>
                            <button onClick={()=>deleteUser(user.uuid)} className="button is-small is-danger">Eliminar</button>
                        </td>
                    </tr>
                    ))}
                    
                </tbody>
            </table>
        </div>
    );
};




export default Userlist
