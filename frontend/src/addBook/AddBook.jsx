import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddBook = () => {
    const navigate = useNavigate()
    const token = localStorage.getItem("token");

    const [title, settitle] = useState("");
    const [ISBN, setISBN] = useState("");
    const [author, setauthor] = useState("");
    const [description, setdescription] = useState("");
    const [publishDate, setpublishDate] = useState("");
    const [publisher, setpublisher] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post("https://prt1b.onrender.com/add-book", { token,title, ISBN, author, description, publishDate, publisher })
            .then((res) => {
                console.log(res);
                window.alert(res.data.message);
                navigate("/home")
            }).catch((err) => {
                console.log(err);
            })
    }
    return (
        <div>
            <button style={{width:"100px" , backgroundColor:"red"}} onClick={()=>{useNavigate("/home")}}>Book List</button>
            <h1 style={{textAlign:"center"}}>ADD BOOK</h1>
            <form>
                <input type='text' required onChange={(e) => { settitle(e.target.value) }} value={title} placeholder='title' />
                <input type='text' required onChange={(e) => { setISBN(e.target.value) }} value={ISBN} placeholder='ISBN' />
                <input type='text' required onChange={(e) => { setauthor(e.target.value) }} value={author} placeholder='author' />
                <input type='text' required onChange={(e) => { setdescription(e.target.value) }} value={description} placeholder='description' />
                <input type='text' required onChange={(e) => { setpublishDate(e.target.value) }} value={publishDate} placeholder='publishDate' />
                <input type='text' required onChange={(e) => { setpublisher(e.target.value) }} value={publisher} placeholder='publisher' />
                <button type='submit' onClick={handleSubmit}>ADD</button>
            </form>
        </div>
    )
}

export default AddBook
