import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Login from './login/Login';
import Register from './register/Register';
import Home from './Home/Home';
import AddBook from './addBook/AddBook';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/home' element={<Home />} />
        <Route path='/addbook' element={<AddBook/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
