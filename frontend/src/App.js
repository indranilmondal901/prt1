import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Login from './login/Login';
import Register from './register/Register';
import Home from './Home/Home';
import AddBook from './addBook/AddBook';
import EditPage from './editPage/EditPage';
import BookInfo from './bookInfo/BookInfo';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/home' element={<Home />} />
        <Route path='/addbook' element={<AddBook/>} />
        <Route path='/info/:keyword' element={<BookInfo/>} />
        <Route path='/edit' element={<EditPage/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
