import React , {useState , useEffect} from 'react'
import axios from "axios";
import { useNavigate, useParams } from 'react-router-dom';

const FormEditProduct = () => {
    const [name, Setname] = useState("");
    const [price, Setprice] = useState("");
    const [description, Setdescription] = useState("");
    const [msg, SetMsg] = useState("");
    const navigate = useNavigate();
    const {id} = useParams();

    useEffect(()=>{
        const getProductById = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/products/${id}`);
                Setname(response.data.name);
                Setprice(response.data.price);
                Setdescription(response.data.description);
            } catch (error) {
                if(error.response){
                    SetMsg(error.response.data.msg);
                }
            }
        }
        getProductById();
    }, [id]);



    const updateProduct = async(e) => {
        e.preventDefault();
        try {
            await axios.patch(`http://localhost:5000/products/${id}`, {
                name:name,
                price: price,
                description: description,
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
            <h1 className='titulo'>Productos</h1>
            <h2 className='subtitulo'>Editar Producto</h2>
            <div className="card is-shadowless">
                <div className="card-content">
                    <div className="content">
                        <form onSubmit={updateProduct}>
                            <p className='has-text-centered' >{msg}</p>
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
                                    <button  type="submit" className="button is-success is-fullwidth">Actualizar</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FormEditProduct
