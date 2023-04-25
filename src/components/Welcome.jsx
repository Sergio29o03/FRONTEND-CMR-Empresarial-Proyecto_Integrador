import React from 'react';
import { useSelector } from 'react-redux';

//usar comando "rafce" para generar const y export 


const Welcome = () => {
    const{user}=useSelector((state) => state.auth);
    return (
        <div>
            <h1 className='titulo'><strong>Dashboard</strong></h1>
            <h2 className='subtitulo'>Bienvenido de Nuevo <strong>{user && user.name}</strong></h2>
        </div>);
};



export default Welcome
