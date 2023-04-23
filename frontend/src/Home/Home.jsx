import axios from 'axios'
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate()

    const [book, setbook] = useState(null)
    const token = localStorage.getItem("token");
    // console.log(token)

    useEffect(() => {
        axios.post("https://prt1b.onrender.com/booklist", { token: token })
            .then((res) => {
                console.log(res.data.data[1].book.title)
                setbook(res.data.data)
            })
    }, [token])
    console.log(book)
    return (
        <div>
            <button onClick={()=>{navigate("/addbook")}}>Add Book</button>
            <div id="booklist">
                <h1>{book}</h1>
                {/* {book && book.map((sbook, i) => {
                    return (
                        <div key={i}>
                            <h1>{sbook._id}</h1>
                            <h1>{sbook.book.title}</h1>
                            <h3>{sbook.book.author}</h3>
                            <p>{sbook.book.publisher}</p> 
                        </div>
                    )
                })} */}
            </div>
        </div>
    )
}

export default Home
