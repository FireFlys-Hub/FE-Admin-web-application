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
    const CreateProduct = async (formData)=>{
        try {
            const res  = await axios.post('/admin/product/create',formData);
           console.log(res);
            return true;
        } catch (error) {
            console.error("Fail to create data: ",error)
        }
    }
    const getCategory = async ()=>{
        try {
            const res  = await axios.get('admin/category');
            return res;
        } catch (error) {
            console.error("Fail to get Category");
        }
    }
    const updateProduct = async (id,formData)=>{
        try {
            const res = await axios.post(`admin/product/update/${id}`,formData);
            if(res){
                return true;
            }
            return false;
        } catch (error) {
            console.error("Fail to update product: ",error);
        }
    }
    const deleteProduct =async(id)=>{
        try {
            const res = await axios.delete(`admin/product/delete/${id}`);
            if(res){
                return true;
            }
            return false;
        } catch (error) {
            
        }
    }
    return {getAllProduct , CreateProduct ,getCategory, updateProduct,deleteProduct}
}
export default useProductService;
