import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    user: null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ""
}

export const LoginUser = createAsyncThunk("user/LoginUser", async (user, thunkAPI) => {
    try {
        const response = await axios.post('http://localhost:5000/login', {
            email: user.email,
            password: user.password
        });
        return response.data;
    } catch (error) {
        if (error.response) {
            const message = error.response.data.msg;
            return thunkAPI.rejectWithValue(message);
        };
    };
});
//librería Redux Toolkit para crear un "slice" de Redux, que es una porción del estado global de tu aplicación. 
//El slice que estás creando tendrá un estado inicial con cuatro propiedades: "user", "isError", "isSuccess" y "isLoading", y "message".


//función "createAsyncThunk" de Redux Toolkit para crear una acción asincrónica que llamará a una API utilizando Axios. 
//Esta acción se encargará de enviar una solicitud HTTP para autenticar al usuario y actualizar el estado en consecuencia.

export const getMe = createAsyncThunk("user/getMe", async(_, thunkAPI) => {
    try {
        const response = await axios.get('http://localhost:5000/me');
        return response.data;
    } catch (error) {
        if(error.response){
            const message = error.response.data.msg;
            return thunkAPI.rejectWithValue(message);
        }
    }
});


export const LogOut = createAsyncThunk("user/LogOut", async() => {
    await axios.delete('http://localhost:5000/logout');
});


export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers:{
        reset: (state) => initialState
    },
    extraReducers:(builder) =>{
        builder.addCase(LoginUser.pending, (state) =>{
            state.isLoading = true;
        });
        builder.addCase(LoginUser.fulfilled, (state, action) =>{
            state.isLoading = false;
            state.isSuccess = true;
            state.user = action.payload;
        });
        builder.addCase(LoginUser.rejected, (state, action) =>{
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        })

        // Get User Login
        builder.addCase(getMe.pending, (state) =>{
            state.isLoading = true;
        });
        builder.addCase(getMe.fulfilled, (state, action) =>{
            state.isLoading = false;
            state.isSuccess = true;
            state.user = action.payload;
        });
        builder.addCase(getMe.rejected, (state, action) =>{
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        })
    }
});

export const {reset} = authSlice.actions;
export default authSlice.reducer;

//reset, simplemente restablece el estado auth a su estado inicial.

//El primer caso de reducción, LoginUser.pending, se activa cuando se envía una acción pending para autenticar al usuario.
//Dentro de este caso, el estado isLoading se establece en true.

//El segundo caso de reducción, LoginUser.fulfilled, se activa cuando se recibe una respuesta satisfactoria (fulfilled) de la acción LoginUser. Dentro de este caso, el estado isLoading 
//se establece en false, el estado isSuccess se establece en true, y el estado user se establece en los datos del usuario autenticado.

//El tercer caso de reducción, LoginUser.rejected, se activa cuando se recibe una respuesta rechazada (rejected) de la acción LoginUser. Dentro de este caso, el estado isLoading se establece en
//false, el estado isError se establece en true, y el estado message se establece en el mensaje de error de la respuesta.

