import axios from "../custom/axios";

const useUserService = () => {
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
      // eslint-disable-next-line
      const res = await axios.post(`/admin/user/update/${formData.id}`, formData);
      return true; 
    } catch (error) {
      console.error('Error updating user:', error);
      throw error; 
    }
  };

  const DeleteUser = async (id) => {
    try {
      // eslint-disable-next-line
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
