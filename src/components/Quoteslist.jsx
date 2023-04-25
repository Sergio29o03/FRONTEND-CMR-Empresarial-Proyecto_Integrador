import React, {useState, useEffect} from 'react';
import  {Link} from 'react-router-dom';
import axios from 'axios';


const Quotelist = () => {
        const[quotations,setQuotations] = useState([]);

        useEffect(()=>{
            getAllQuotations();
        },[]);

        const getAllQuotations = async () => {
            const response = await axios.get('http://localhost:5000/quotations'); 
            setQuotations(response.data);
        }

    return (
        <div>
    <h1 className='title'><strong>Cotizaciones</strong></h1>
    <h2 className='subtitle'>Lista de Cotizaciones</h2>
    <Link to="/quotations/add" className='button is-primary mb-2'>Agrega una nueva cotizacion</Link>
    <table className='table is-striped is-fullwidth'>
                <thead>
                    <tr>
                        <th>id cotizacion</th>
                        <th>Valor cotizacion</th>
                        <th>Cotizacion</th>
                        <th>Vendedor</th>
                    </tr>
                </thead>
                <tbody>
                    {quotations.map((quotation , index)=>(
                        <tr key={quotation.quotation_id}>
                        <td>{index + 1}</td>
                        <td>{quotation ? quotation.qu_value : null}</td>
                        <td>{quotation ? quotation.qu_ident : null}</td>
                        <td>{quotation && quotation.user ? quotation.user.name : null}</td>
                        <td>
                            <Link to={`/quotations/edit/${quotation.quotation_id}`} className="button is-small is-info">Editar</Link>
                        </td>
                    </tr>
                    ))}
                    
                </tbody>
            </table>
        </div>
    )
}


export default Quotelist
