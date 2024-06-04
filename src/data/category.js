import axios from "../custom/axios";
const getAllCategories = async () => {
    try {
        const response = await axios.get('admin/category');
        // return response.data;
        console.log("data",response);
    } catch (error) {
      console.error('Error during fetching categories:', error);
      return false;
    }
}
const updateCategory = async () => {
    
}
export {getAllCategories,updateCategory};