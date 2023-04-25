import { configureStore } from '@reduxjs/toolkit';
import authReducer from "../features/authSlice";


export const store = configureStore({
  reducer: {
    auth: authReducer
  },
});

//Un reducer es una función que toma el estado actual y una acción y devuelve un nuevo estado.

//función configureStore de @reduxjs/toolkit. El store es un objeto que 
//almacena el estado global de la aplicación y proporciona métodos para actualizar ese estado y suscribirse a cambios en él