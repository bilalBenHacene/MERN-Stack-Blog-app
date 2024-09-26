import mongoose from "mongoose";
import blogSchema from "../model/blog-model.js";
// Fetch All
export const fetchAll = async (req, res) => {
  let blogList;
  try {
    blogList = await blogSchema.find();
  } catch (error) {
    console.log(error.message);
  }
  if (!blogList) return res.status(404).json({ message: "No Blogs Found" });
  return res.status(200).json(blogList);
};
// Add
export const addNew = async (req, res) => {
  const { title, description } = req.body;
  const currentDate = new Date();
  const createdBlog = new blogSchema({ title, description, date: currentDate });
  try {
    await createdBlog.save();
  } catch (error) {
    console.log(error.meaage);
  }
  try {
    const session = await mongoose.startSession();
    session.startTransaction();
    await createdBlog.save(session);
    session.commitTransaction();
  } catch (error) {
    res.send(500).json({ message: error.message });
  }
  return res.status(200).json(createdBlog);
};
// Delete
export const deleteBlog = async (req, res) => {
  const id = req.params.id;
  try {
    const deletedBlog = await blogSchema.findByIdAndDelete(id);
    if (!deletedBlog)
      return res.status(404).json({ message: "Blog Not Found" });
    return res.status(200).json({ message: "Successfully Deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// Update
export const updateBlog = async (req, res) => {
  const id = req.params.id;
  const { title, description } = req.body;
  try {
    const updatedBlog = await blogSchema.findByIdAndUpdate(id, {
      title,
      description,
    });
    if (!updatedBlog)
      return res.status(404).json({ message: "Blog Not Found" });
    return res.status(200).json({ updateBlog });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
