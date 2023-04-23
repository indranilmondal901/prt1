import axios from 'axios'
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
    }, [token])
    console.log(data)
    console.log(typeof(data))


    const handelLogOut = ()=>{
        axios.post("https://prt1b.onrender.com/logout", { token: token })
            .then((res) => {
                console.log(res.data.message);
                window.alert(res.data.message)
                navigate("/")
            })
    }
    return (
        <div>
            <button onClick={()=>{navigate("/addbook")}} style={{alignContent:"flex-end", width:"100px" }}>Add Book</button>
            <button style={{width:"100px" , backgroundColor:"red"}} onClick={handelLogOut}>LogOut</button>
            <div id="booklist">
                <h1 style={{textAlign:"center" , color:"black" , fontSize:"3rem", textDecoration:"underline"}}>Book List</h1>
                
                {data && data?.map((sData,i)=>{
                    return(
                        <div style={{display:"flex",backgroundColor:"#f8f8", margin:"4px", padding:"4px"}} onClick={()=>{navigate(`edit/${sData}`)}}>
                        <image src="https://www.shutterstock.com/image-vector/open-book-vector-clipart-silhouette-260nw-795305758.jpg"></image>
                        <h1 id="c-title">{sData.book.title}</h1>
                        <p id='c-des'>{sData.book.publisher}</p>
                        <h2 id="c-author">{sData.book.author}</h2>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Home
