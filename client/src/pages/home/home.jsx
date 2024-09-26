import React, { useContext, useEffect } from "react";
import { globalContext } from "../../context/context";
import {  FaTrash,FaEdit, FaRegEdit, FaTrashAlt, FaEye } from "react-icons/fa";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Home = () => {
  const { blogs, setBlogs, pending, setPending } = useContext(globalContext);
  const navigate=useNavigate();
  const handleEdit=(currentBlog)=>{
    navigate('/add',{state:currentBlog});
  }
  const handleDelete=async(id)=>{
    const response = await axios.delete(`http://localhost:3000/api/blogs/${id}`);
    const result = await response.data;
    if (result?.message) {
      fetchBlogs();
      // navigate('/')
    }
  }

  const fetchBlogs = async () => {
    setPending(true);
    const response = await axios.get("http://localhost:3000/api/blogs/");
    const result = await response.data;
    if (result && result.length) {
      setBlogs(result);
    }else setBlogs([])
    setPending(false);

  };
  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <>
      <div className="flex flex-col p-5 lg:px-48 lg:py-11">
        {pending ? (
          <p className="capitalize">Londing Data ...</p>
        ) : blogs && blogs.length > 0 ? (
          blogs.map((blog) => (
            <div key={blog._id} className="bg-gray-100 p-5 mb-10">
              <h1 className="font-bold text-2xl mb-2">{blog.title}</h1>
              <p className="my-3">{blog.description}</p>
              <div className="inline-flex items-center rounded-md shadow-sm">
                <button onClick={()=>handleEdit(blog)} className="text-slate-800 hover:text-blue-600 text-sm bg-gray-100 hover:bg-white  border border-slate-200 rounded-l-lg font-medium px-4 py-2 inline-flex space-x-1 items-center">
                  <span>
                  <FaRegEdit className="w-6 h-6"/>
                  </span>
                  <span className="hidden md:inline-block">Edit</span>
                </button>
                <button className="text-slate-800 hover:text-blue-600 text-sm bg-gray-100 hover:bg-white  border-y border-slate-200 font-medium px-4 py-2 inline-flex space-x-1 items-center">
                  <span>                    
                    <FaEye className="w-6 h-6"/> 
                  </span>
                  <span className="hidden md:inline-block">View</span>
                </button>
                <button  onClick={()=>handleDelete(blog._id)} className="text-slate-800 hover:text-blue-600 text-sm bg-gray-100 hover:bg-white  border border-slate-200 rounded-r-lg font-medium px-4 py-2 inline-flex space-x-1 items-center">
                  <span>
                    <FaTrashAlt className="w-6 h-6"/> 
                  </span>
                  <span className="hidden md:inline-block">Delete</span>
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="capitalize">No Blogs To Display.<Link className="mt-5 block text-sm hover:underline hover:text-blue-500" to={"/add"}>add new from here</Link> </p>
        )}
      </div>
    </>
  );
};

export default Home;
