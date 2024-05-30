import axios from '../custom/axios';

const token = JSON.parse(sessionStorage.getItem('account'))?.token;

const useUserService = () => {
  const AllUsers = async () => {
    try {
      const res = await axios.get('/admin/user', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }
      );
      console.log(res.data);
      return res.data;
    } catch (error) {
      console.error('Error during login:', error);
      return false;
    }
  };

  const UpdateUser = async (formData) => {
    try {
      // const formData = {
      //   name: data.name,
      //   email:data.email,
      //   phone_number:data.phone_number,
      //   image_update:data.image_update
      // }
  
      const res = await axios.post(`/admin/user/update/${formData.id}`, formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      console.log(res.data);
      console.log(formData);
      // Xử lý phản hồi từ máy chủ (nếu cần)
      return true; // Trả về dữ liệu phản hồi từ máy chủ (nếu có)
    } catch (error) {
      console.error('Error updating user:', error);
      throw error; // Ném lỗi để xử lý ở phần gọi hàm
    }
  };
  
  return {AllUsers,UpdateUser};
}
export default useUserService;


