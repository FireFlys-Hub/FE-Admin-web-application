import { useContext } from "react";
import { UserContext } from '../context/auth/UserContext';
import axios from "../custom/axios";

const useUserService = () => {
  const { user } = useContext(UserContext);
  const token = user.token;

  const AllUsers = async () => {
    try {
      const res = await axios.get('/admin/user', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      return res.data;
    } catch (error) {
      console.error('Error during fetching users:', error);
      return false;
    }
  };

  const UpdateUser = async (formData) => {
    try {
      const res = await axios.post(`/admin/user/update/${formData.id}`, formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      console.log(res.data);
      return true; 
    } catch (error) {
      console.error('Error updating user:', error);
      throw error; 
    }
  };
  const DeleteUser = async (id) =>{
    try {
      const res = await axios.delete(`/admin/user/delete/${id}`,{
        headers:{
          'Authorization': `Bearer ${token}`,
        },
      });
      return true;
    } catch (error) {
      console.error("Error delete user",error);
      throw error;
    };
  };

  return { AllUsers, UpdateUser, DeleteUser };
}

export default useUserService;
