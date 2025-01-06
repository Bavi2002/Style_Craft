
import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Header from './components/Header'
import AddProduct from './pages/AddProduct';


function App() {
  return (
    <Router>
      <div>
        <Header/>
        <Routes>
          <Route path='/' element={<AddProduct/>}/>
        </Routes>
      </div>
    </Router>
   
  );
}

export default App;
