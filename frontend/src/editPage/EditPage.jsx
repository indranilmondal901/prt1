import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import "../editPage/EditPage.css";

const EditPage = () => {
  const { keyword } = useParams();
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    description: "",
    publishDate: "",
    publisher: ""
  });
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleInputChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.put("https://prt1b.onrender.com/edit", { token: token, ISBN: keyword, ...formData })
      .then((res) => {
        console.log(res);
        navigate(`/home`);
      })
      .catch((err) => console.log(err));
  }

  return (
    <div id="edit-form-wrapper-div">
      <h1 style={{color:"red",textAlign:"center",textDecoration:"underline"}}>Edit Book</h1>
      <form onSubmit={handleSubmit} id="edit-form">
        <div>
          <label htmlFor="title">Title</label>
          <input type="text" id="title" name="title" value={formData.title} onChange={handleInputChange} />
        </div>
        <div>
          <label htmlFor="author">Author</label>
          <input type="text" id="author" name="author" value={formData.author} onChange={handleInputChange} />
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <textarea id="description" name="description" value={formData.description} onChange={handleInputChange}></textarea>
        </div>
        <div>
          <label htmlFor="publishDate">Publishing Date</label>
          <input type="text" id="publishDate" name="publishDate" value={formData.publishDate} onChange={handleInputChange} />
        </div>
        <div>
          <label htmlFor="publisher">Publisher</label>
          <input type="text" id="publisher" name="publisher" value={formData.publisher} onChange={handleInputChange} />
        </div>
        <button type="submit">Update</button>
      </form>
    </div>
  );
}

export default EditPage;
