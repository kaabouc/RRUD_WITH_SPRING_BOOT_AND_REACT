//import logo from './logo.svg';
import './App.css';
import AddProduct from './components/AddProduct';
import NavBAr from './navBar/NavBar';
import ProductList from './components/ProductList';
import UpdateProduct from './components/UpdateProduct ';
import { BrowserRouter , Routes,Route  } from 'react-router-dom';
import NoPage from './NoPage';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <NavBAr/>
      <Routes>
        
        <Route path="/" element={<ProductList />}/>
          <Route path="/add" element={<AddProduct />} />
          <Route path="/update/:id" element={<UpdateProduct />} />
          <Route path="*" element={<NoPage />} />
        
      </Routes>
    </BrowserRouter>
   </div>
  );
}

export default App;
