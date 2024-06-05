import { useContext } from "react";
import { UserContext } from "../context/auth/UserContext";
import axios from "../custom/axios";
const CRUDCategories = () => {
  const { user } = useContext(UserContext);
  const token = user.token;
  const GetCategories = async () => {
    try {
      const response = await axios.get("/admin/category", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error during fetching categories:", error);
      return false;
    }
  };

  const UpdateCategory =async (category) => {
    try {
      const res = await axios.post(`/admin/category/update/${category.id}`, category, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      console.log(res.data);
      return true; 
    } catch (error) {
      console.error('Error updating category:', error);
      throw error; 
    }
  };
  const DeleteCategory = async (id) =>{
    try {
      const res = await axios.delete(`/admin/category/delete/${id}`,{
        headers:{
          'Authorization': `Bearer ${token}`,
        },
      });
      return true;
    } catch (error) {
      console.error("Error delete category",error);
      throw error;
    };
  }
  return { GetCategories, UpdateCategory, DeleteCategory };
}


export { CRUDCategories};
