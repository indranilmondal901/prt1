import axios from 'axios'
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../Home/Home.css";

const Home = () => {
    const navigate = useNavigate()

    const [data, setdata] = useState([])
    const token = localStorage.getItem("token");
    // console.log(token)

    useEffect(() => {
        axios.post("https://prt1b.onrender.com/booklist", { token: token })
            .then((res) => {
                // console.log(res.data.data[1].book.title)
                console.log(res.data.data)
                setdata(res.data.data)
            })
    }, [])
    console.log(data)
    console.log(typeof (data))


    const handelLogOut = () => {
        axios.post("https://prt1b.onrender.com/logout", { token: token })
            .then((res) => {
                console.log(res.data.message);
                localStorage.clear("token");
                window.alert(res.data.message)
                navigate("/")
            })
    }
    // const handleDelete = (ISBN) =>{
    //     axios.post("https://prt1b.onrender.com/delete-book",{token:token,ISBN:ISBN})
    //     .then((res)=>console.log(res))
    // }
    return (
        <div>
            <button onClick={() => { navigate("/addbook") }} style={{ alignContent: "flex-end", width: "100px" }}>Add Book</button>
            <button style={{ width: "100px", backgroundColor: "red" }} onClick={handelLogOut}>LogOut</button>
            <div id="booklist">
                <h1 style={{ textAlign: "center", color: "black", fontSize: "3rem", textDecoration: "underline" }}>Book List</h1>

                <div id="wrapper-homeDiv">
                    {data && data?.map((sData, i) => {
                            return (
                                <div onClick={() => { navigate(`edit`) }}>
                                    <img src="https://www.shutterstock.com/image-vector/open-book-vector-clipart-silhouette-260nw-795305758.jpg" alt={sData.book.title}/>
                                    <div>
                                        <h1 style={{textAlign:"center"}}>{sData.book.title}</h1>
                                        <p>Publisher: {sData.book.publisher}</p>
                                        <h2>Author: {sData.book.author}</h2>
                                    </div>
                                    <button>Delete</button>
                                </div>
                            )
                        })}
                </div>


            </div>
        </div>
    )
}

export default Home
