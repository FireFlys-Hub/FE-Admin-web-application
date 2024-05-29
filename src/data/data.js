import axios from '../custom/axios';

// Biến lưu trữ dữ liệu
let users = [];
let categories = [];
// Thêm các biến khác nếu cần
// Hàm để lấy dữ liệu từ API và lưu trữ vào các biến
const fetchData = async () => {
  try {
    // Lấy dữ liệu users
    const token = JSON.parse(sessionStorage.getItem('account')).token;
    const usersResponse = await axios.get('/admin/user',{
      headers: {
        'Authorization': `Bearer ${token}`
    }
    }

    );
    users = usersResponse.data;
    // Lấy dữ liệu contacts
    const contactsResponse = await axios.get('/admin/category');
    categories = contactsResponse.data;
    console.log('Data fetched successfully');
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};
// Xuất các biến để sử dụng ở nơi khác
export { users, categories,fetchData };

