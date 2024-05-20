import axios from 'axios';
// Biến lưu trữ dữ liệu
let users = [];
let categories = [];
// Thêm các biến khác nếu cần
// Hàm để lấy dữ liệu từ API và lưu trữ vào các biến
const fetchData = async () => {
  try {
    // Lấy dữ liệu users
    const usersResponse = await axios.get('http://127.0.0.1:8000/api/admin/user');
    users = usersResponse.data;
    // Lấy dữ liệu contacts
    const contactsResponse = await axios.get('http://127.0.0.1:8000/api/admin/category');
    categories = contactsResponse.data;
    console.log('Data fetched successfully');
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};
// Xuất các biến để sử dụng ở nơi khác
export { users, categories,fetchData };

