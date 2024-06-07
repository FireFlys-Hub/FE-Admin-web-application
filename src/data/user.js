import { useContext } from "react";
import { UserContext } from '../context/auth/UserContext';
import axios from "../custom/axios";

const useUserService = () => {
  const { user } = useContext(UserContext);

  const AllUsers = async () => {
    try {
      const res = await axios.get('/admin/user');
      return res;
    } catch (error) {
      console.error('Error during fetching users:', error);
      return false;
    }
  };

  const UpdateUser = async (formData) => {
    try {
      const res = await axios.post(`/admin/user/update/${formData.id}`, formData);
      console.log(res);
      return true; 
    } catch (error) {
      console.error('Error updating user:', error);
      throw error; 
    }
  };

  const DeleteUser = async (id) => {
    try {
      const res = await axios.delete(`/admin/user/delete/${id}`);
      return true;
    } catch (error) {
      console.error("Error deleting user", error);
      throw error;
    }
  };

  return { AllUsers, UpdateUser, DeleteUser };
}

export default useUserService;
