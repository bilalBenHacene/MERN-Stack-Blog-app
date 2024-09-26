import { createContext, useState } from "react";

export const globalContext = createContext(null);

const GlobalState = ({ children }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });
  const [blogs, setBlogs] = useState([]);
  const [pending, setPending] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  return (
    <globalContext.Provider
      value={{
        formData,
        setFormData,
        blogs,
        setBlogs,
        pending,
        setPending,
        isEdit,
        setIsEdit,
      }}
    >
      {children}
    </globalContext.Provider>
  );
};

export default GlobalState;
