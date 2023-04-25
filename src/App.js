import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Dashboard from './pages/Dashboard';
import Login from './components/Login';
import Users from './pages/Users';
import Products from './pages/Products';
import Clients from './pages/Clients';
import Quotes from './pages/Quotes';
import AddUser from './pages/AddUser';
import EditUser from './pages/EditUser';
import AddProduct from './pages/AddProduct';
import EditProduct from './pages/EditProduct';
import AddClient from './pages/AddClient';
import EditClient from './pages/EditClient';
import AddQuote from './pages/AddQuote';


function App() {
  return ( 
  <div>
    <BrowserRouter>
    <Routes>
    <Route path='/' element={<Login/>} />
    <Route path='/dashboard' element={<Dashboard/>} />
    <Route path='/users' element={<Users/>} />
    <Route path='/users/add' element={<AddUser/>} />
    <Route path='/users/edit/:id' element={<EditUser/>} />
    <Route path='/products' element={<Products/>} />
    <Route path='/products/add' element={<AddProduct/>} />
    <Route path='/products/edit/:id' element={<EditProduct/>} />
    <Route path='/clients' element={<Clients/>} />
    <Route path='/clients/add' element={<AddClient/>} />
    <Route path='/clients/edit/:id' element={<EditClient/>} />
    <Route path='/quotations' element={<Quotes/>} />
    <Route path='/quotations/add' element={<AddQuote/>} />

    </Routes>
  </BrowserRouter>
  </div>)
}

export default App;