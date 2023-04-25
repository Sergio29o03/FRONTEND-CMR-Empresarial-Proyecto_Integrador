import React , {useState , useEffect} from 'react'
import axios from "axios";
import { useNavigate, useParams } from 'react-router-dom';


const FormEditClient = () => {
    const [name, Setname] = useState("");
    const [email, SetEmail] = useState("");
    const [nit, SetNit] = useState("");
    const [number, Setnumber] = useState("");
    const [msg, SetMsg] = useState("");
    const navigate = useNavigate();
    const {id} = useParams();


    useEffect(()=>{
        const getClientById = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/clients/${id}`);
                Setname(response.data.name);
                SetEmail(response.data.email);
                SetNit(response.data.nit);
                Setnumber(response.data.number);
            } catch (error) {
                if(error.response){
                    SetMsg(error.response.data.msg);
                }
            }
        }
        getClientById();
    }, [id]);

    const updateClient = async(e) => {
        e.preventDefault();
        try {
            await axios.patch(`http://localhost:5000/clients/${id}`, {
                name:name,
                email:email,
                nit:nit,
                number:number,
            });
            navigate('/products')
        } catch (error) {
            if(error.response){
                SetMsg(error.response.data.msg);
            }
        }
    }; 



    return (
        <div>
            <h1 className='tittle'><strong>Clientes</strong></h1>
            <h2 className='subtitle'>Agregar nuevo Cliente</h2>
            <div className="card is-shadowless">
                <div className="card-content">
                    <div className="content">
                        <form onSubmit={updateClient}>
                            <p className='has-text-centered'>{msg}</p>
                            <div className='field'>
                                <label className="label">Nombre</label>
                                <div className="control">
                                    <input type="text" className='input' value={name} onChange={(e) => Setname(e.target.value)} placeholder='Nombre del Cliente'/>
                                </div>
                            </div>
                            <div className='field'>
                                <label className="label">Email</label>
                                <div className="control">
                                    <input type="text" className='input' value={email} onChange={(e) => SetEmail(e.target.value)} placeholder='Email' />
                                </div>
                            </div>
                            <div className='field'>
                                <label className="label">Nit</label>
                                <div className="control">
                                    <input type="number" className='input' value={nit} onChange={(e) => SetNit(e.target.value)} placeholder='Nit' />
                                </div>
                            </div>
                            <div className='field'>
                                <label className="label">Numero Celular</label>
                                <div className="control">
                                    <input type="number" className='input' value={number} onChange={(e) => Setnumber(e.target.value)} placeholder='Numero Celular' />
                                </div>
                            </div>
                            <div className='field'>
                                <div className="control">
                                    <button type="submit"  className="button is-success is-fullwidth">Actualizar</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FormEditClient
