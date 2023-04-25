import React, { useState, useEffect } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const FormAddQuotations = () => {
    const [msg, SetMsg] = useState("");
    const navigate = useNavigate();
    const [clients, setClients] = useState([]);
    const [selectedClient, setSelectedClient] = useState("");
    const [products, setProducts] = useState([]);
    const [selectedProducts, setSelectedProducts] = useState({});
    const [qu_value, setQu_value] = useState("");
    const [price, setPrice] = useState("");
    const [quantity, setquantity] = useState("");
    const [q_ident, setq_ident] = useState("");

    useEffect(() => {
        axios.get('http://localhost:5000/clients')
            .then(response => setClients(response.data))
            .catch(error => console.log(error));
        axios.get('http://localhost:5000/products')
            .then(response => setProducts(response.data))
            .catch(error => console.log(error));
    }, []);

    const handleQuantityChange = (productId, quantity) => {
        setSelectedProducts({ ...selectedProducts, [productId]: quantity });
    }


    const saveQuotes = async(e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/quotations', {
                q_ident:q_ident,
                qu_value: qu_value,
            });
            navigate('/quotations')
        } catch (error) {
            if(error.response){
                SetMsg(error.response.data.msg);
            }
        }
    } 





    return (
        <div>
            <h1 className='titulo'><strong>Cotizaciones</strong></h1>
            <h2 className='subtitulo'>Agregar nueva Cotizacion</h2>
            <div className="card is-shadowless">
                <div className="card-content">
                    <div className="content">
                        <form onSubmit={saveQuotes}>
                            <p className='has-text-centered'>{msg}</p>
                            <div className='field'>
                                <label className="label">Cliente</label>
                                <div className="control">
                                    <div className="select is-fullwidth">
                                        <select value={selectedClient} onChange={(e) => setSelectedClient(e.target.value)}>
                                            <option value="">Seleccionar Cliente</option>
                                            {clients.map(client => (
                                                <option key={client.id} value={client.id}>{client.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                {products.map(product => (
                                    <div className='field' key={product.id}>
                                        <label className='label'>{product.name}</label>
                                        <div className='control'>
                                            <div className='select'>
                                                <select
                                                    value={selectedProducts[product.id] || 0}
                                                    onChange={(e) => handleQuantityChange(product.id, parseInt(e.target.value))}
                                                >
                                                    {[...Array(product.stock).keys()].map((value) => (
                                                        <option key={value} value={value + 1}>{value + 1}</option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                <div className='field is-grouped'>
                                    <div className='control'>
                                        <button type='submit' className='button is-link'>Guardar</button>
                                    </div>
                                    <div className='control'>
                                        <button className='button is-link is-light' onClick={() => navigate('/quotations')}>Cancelar</button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );

};

export default FormAddQuotations;