
import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Header from './components/Header'
import AddProduct from './pages/AddProduct';
import ViewProduct from './pages/ViewProduct';


function App() {
  return (
    <Router>
      <div>
        <Header/>
        <Routes>
          <Route path='/add' element={<AddProduct/>}/>
          <Route path='/view' element={<ViewProduct/>}/>
        </Routes>
      </div>
    </Router>
   
  );
}

export default App;
