import { useContext } from 'react';
import axios from '../custom/axios';
import { UserContext } from '../context/auth/UserContext';

const useProductService = ()=>{
    const { user } = useContext(UserContext);
    const token = user.token;
    const getAllProduct = async ()=>{
        try {
            const res = axios.get('/admin/product');
            return res;
        } catch (error) {
            console.error("Error to fetch data: ",error);
            return false;
        }
    }

    return {getAllProduct}
}
export default useProductService;
