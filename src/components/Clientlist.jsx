import React, {useState, useEffect} from 'react';
import  {Link} from 'react-router-dom';
import axios from 'axios';


const Clientlist = () => {
        const[clients,setClients] = useState([]);

        useEffect(()=>{
            getClients();
        },[]);


        const getClients = async () => {
            const response = await axios.get('http://localhost:5000/clients'); 
            setClients(response.data);
        }

    
        const deleteClient = async(clientId) => {
            await axios.delete(`http://localhost:5000/clients/${clientId}`);
            getClients();
        }



    return (
        <div>
    <h1 className='title'><strong>Clientes</strong></h1>
    <h2 className='subtitle'>Lista de Clientes</h2>
    <Link to="/clients/add" className='button is-primary mb-2'>Agrega uno nuevo</Link>
    <table className='table is-striped is-fullwidth'>
                <thead>
                    <tr>
                        <th>N°</th>
                        <th>Nombre del Cliente</th>
                        <th>Email</th>
                        <th>Nit</th>
                        <th>Numero Celular</th>
                    </tr>
                </thead>
                <tbody>
                    {clients.map((client , index)=>(
                        <tr key={client.uuid}>
                        <td>{index + 1}</td>
                        <td>{client ? client.name : null}</td>
                        <td>{client ? client.email : null}</td>
                        <td>{client ? client.nit : null}</td>
                        <td>{client ? client.number : null}</td>
                        <td>{client && client.user ? client.user.name : null}</td>
                        <td>
                            <Link to={`/clients/edit/${client.uuid}`} className="button is-small is-info">Editar</Link>
                            <button onClick={()=>deleteClient(client.uuid)} className="button is-small is-danger">Eliminar</button>
                        </td>
                    </tr>
                    ))}
                    
                </tbody>
            </table>

        </div>
    )
}


export default Clientlist
