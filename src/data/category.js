import axios from "../custom/axios";
const CRUDCategories = () => {
  const GetCategories = async () => {
    try {
      const response = await axios.get("/admin/category");
      return response;
    } catch (error) {
      console.error("Error during fetching categories:", error);
      return false;
    }
  };
  const CreateCategory =async (formData) => {
    try {
      const res = await axios.post(`/admin/category/create`,formData)
      console.log(res);
      return true; 
    } catch (error) {
      console.error('Error updating category:', error);
      throw error; 
    }
  };

  const UpdateCategory =async (formData) => {
    try {
      const res = await axios.put(`/admin/category/update/${formData.id}`, formData);
      console.log(res.data);
      return true; 
    } catch (error) {
      console.error('Error updating category:', error);
      throw error; 
    }
  };
  const DeleteCategoryById = async (id) =>{
    try {
      const res = await axios.delete(`/admin/category/delete/${id}`);
      console.log(res);
      return true;
    } catch (error) {
      console.error("Error delete category",error);
      throw error;
    };
  }
  return { GetCategories, UpdateCategory, DeleteCategoryById, CreateCategory };
}


export {CRUDCategories};
