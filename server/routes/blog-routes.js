import express from "express";
import { addNew, deleteBlog, fetchAll, updateBlog } from "../controller/blog-controller.js";
const blogRoutes=express.Router();

blogRoutes.get('/',fetchAll);
blogRoutes.post('/',addNew);
blogRoutes.put('/:id',updateBlog);
blogRoutes.delete('/:id',deleteBlog);
export default blogRoutes;