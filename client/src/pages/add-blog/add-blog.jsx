import React, { useContext, useEffect } from "react";
import { globalContext } from "../../context/context";
import { useNavigate,useLocation } from "react-router-dom";
import axios from "axios";

const AddBlog = () => {
  const { formData, setFormData,setIsEdit,isEdit } = useContext(globalContext);
  const navigate=useNavigate();
  const location=useLocation();
  const handleSave = async () => {
    const response =!isEdit? await axios.post("http://localhost:3000/api/blogs/", {
      title: formData.title,
      description: formData.description,
    }):await axios.put(`http://localhost:3000/api/blogs/${location.state._id}`, {
      title: formData.title,
      description: formData.description,
    });
    const result= await response.data;
    if(result){
      setFormData({
        title:'',
        description:''
      });
      setIsEdit(false);
      navigate('/');
    }
    
  };
  useEffect(() => {
    if (location.state){
      setFormData({
        title:location.state.title,
        description:location.state.description
      });
      setIsEdit(true);
    }
    console.log(location);
    
  }, [location])
  
  return (
    <div className="max-w-xl mx-auto mt-16 flex w-full flex-col border rounded-lg bg-white p-8">
      <h2 className="title-font mb-1 text-lg font-medium text-gray-900">
       {`${isEdit? "Edit":"Add new"}`} Blog
      </h2>
      <div className="mb-4">
        <label
          htmlFor="title"
          className="capitalize text-sm leading-7 text-gray-600"
        >
          title
        </label>
        <input
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          type="text"
          id="title"
          name="title"
          className="w-full rounded border border-gray-300 bg-white py-1 px-3 text-base leading-8 text-gray-700 outline-none transition-colors duration-200 ease-in-out focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="description"
          className="capitalize text-sm leading-7 text-gray-600"
        >
          description
        </label>
        <textarea
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          id="description"
          name="description"
          className="h-32 w-full resize-none rounded border border-gray-300 bg-white py-1 px-3 text-base leading-6 text-gray-700 outline-none transition-colors duration-200 ease-in-out focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
        ></textarea>
      </div>
      <button
        onClick={handleSave}
        className="rounded border-0 bg-indigo-500 py-2 px-6 text-lg text-white hover:bg-indigo-600 focus:outline-none"
      >
        {`${isEdit? "Save":"Add"}`}
      </button>
    </div>
  );
};

export default AddBlog;
