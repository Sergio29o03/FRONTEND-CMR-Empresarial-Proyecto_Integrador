import React, {useState, useEffect} from 'react';
import  {Link} from 'react-router-dom';
import axios from 'axios';


const Productlist = () => {
        const[products,setProducts] = useState([]);

        useEffect(()=>{
            getProducts();
        },[]);

        const getProducts = async () => {
            const response = await axios.get('http://localhost:5000/products'); 
            setProducts(response.data);
        }

        const deleteProduct = async(productId) => {
            await axios.delete(`http://localhost:5000/products/${productId}`);
            getProducts();
        }



    return (
        <div>
    <h1 className='title'><strong>Productos</strong></h1>
    <h2 className='subtitle'>Lista de Productos</h2>
    <Link to="/products/add" className='button is-primary mb-2'>Agrega uno nuevo</Link>
    <table className='table is-striped is-fullwidth'>
                <thead>
                    <tr>
                        <th>N°</th>
                        <th>Nombre del Producto</th>
                        <th>Precio</th>
                        <th>Descripcion</th>
                        <th>Creado</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product , index)=>(
                        <tr key={product.uuid}>
                        <td>{index + 1}</td>
                        <td>{product ? product.name : null}</td>
                        <td>{product ? product.price : null}</td>
                        <td>{product ? product.description : null}</td>
                        <td>{product && product.user ? product.user.name : null}</td>
                        <td>
                            <Link to={`/products/edit/${product.uuid}`} className="button is-small is-info">Editar</Link>
                            <button onClick={()=>deleteProduct(product.uuid)} className="button is-small is-danger">Eliminar</button>
                        </td>
                    </tr>
                    ))}
                    
                </tbody>
            </table>

        </div>
    )
}


export default Productlist
