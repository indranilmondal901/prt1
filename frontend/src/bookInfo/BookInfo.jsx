import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import "../bookInfo/BookInfo.css";

const BookInfo = () => {
    const { keyword } = useParams();
    const [data, setdata] = useState("");
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    useEffect(() => {
        axios.post("https://prt1b.onrender.com/sbook", { token: token, ISBN: keyword })
            .then((res) => {
                console.log(res.data.data)
                setdata(res.data.data.book)
            })
    }, [keyword])

    const handleDelete = (ISBN) => {
        axios.post("https://prt1b.onrender.com/delete-book", { token: token, ISBN: ISBN })
            .then((res) => {
                console.log(res.data.message);
                window.alert(res.data.message);
                navigate("/home");
            }).catch((err) => {
                console.log(err);
            })
    }

    return (
        <>
            <h1 style={{ textAlign: "center", fontSize: "3rem", textDecoration: "underline" }}>Book Details</h1>
            <table>
                <tbody>
                    <tr>
                        <th>Title</th>
                        <td>{data.title}</td>
                    </tr>
                    <tr>
                        <th>ISBN</th>
                        <td>{data.ISBN}</td>
                    </tr>
                    <tr>
                        <th>Author</th>
                        <td>{data.author}</td>
                    </tr>
                    <tr>
                        <th>Description</th>
                        <td>{data.description}</td>
                    </tr>
                    <tr>
                        <th>Publishing Date</th>
                        <td>{data.publishDate}</td>
                    </tr>
                    <tr>
                        <th>Publisher</th>
                        <td>{data.publisher}</td>
                    </tr>
                </tbody>
            </table>
            <div id="info-btn-div">
                <button id="delete" onClick={() => { handleDelete(data.ISBN) }}>Delete</button>
                <button id="edit" onClick={() => { navigate(`/edit/${data.ISBN}`) }}>Edit</button>
            </div>
        </>
    )
}

export default BookInfo
