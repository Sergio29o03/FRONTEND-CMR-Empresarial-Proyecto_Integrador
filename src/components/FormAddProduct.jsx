import React, {useState} from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const FormAddProduct = () => {
    const [name, Setname] = useState("");
    const [price, Setprice] = useState("");
    const [description, Setdescription] = useState("");
    const [msg, SetMsg] = useState("");
    const navigate = useNavigate();
    
    const saveProduct = async(e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/products', {
                name:name,
                price: price,
                description: description
            });
            navigate('/products')
        } catch (error) {
            if(error.response){
                SetMsg(error.response.data.msg);
            }
        }
    } 
    return (
        <div>
            <h1 className='titulo'><strong>Productos</strong></h1>
            <h2 className='subtitulo'>Agregar nuevo Producto</h2>
            <div className="card is-shadowless">
                <div className="card-content">
                    <div className="content">
                        <form onSubmit={saveProduct}>
                            <p className='has-text-centered'>{msg}</p>
                            <div className='field'>
                                <label className="label">Nombre</label>
                                <div className="control">
                                    <input type="text" className='input' value={name} onChange={(e) => Setname(e.target.value)} placeholder='Nombre del Producto'/>
                                </div>
                            </div>
                            <div className='field'>
                                <label className="label">Precio</label>
                                <div className="control">
                                    <input type="text" className='input' value={price} onChange={(e) => Setprice(e.target.value)} placeholder='Precio' />
                                </div>
                            </div>
                            <div className='field'>
                                <label className="label">Descripcion</label>
                                <div className="control">
                                    <input type="text" className='input' value={description} onChange={(e) => Setdescription(e.target.value)} placeholder='Descripcion' />
                                </div>
                            </div>
                            <div className='field'>
                                <div className="control">
                                    <button type="submit"  className="button is-success is-fullwidth">Guardar</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default FormAddProduct
