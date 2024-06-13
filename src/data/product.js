import axios from '../custom/axios';

const useProductService = ()=>{
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
            // eslint-disable-next-line
            const res  = await axios.post('/admin/product/create',formData);
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
    const getProductDeleted = async ()=>{
        try {
            const res =  await axios.get('admin/product/restore');
            if(res){
                return res;
            }
            return false;
        } catch (error) {
            
        }
    }
    const restoreProduct = async(id)=>{
        try {
            const res = await axios.post(`admin/product/restore/${id}`);
            if(res){
                return true;
            }
            return false;
        } catch (error) {
            console.error("Fail to restore product: ",error);
        }
    }
    return {getAllProduct , CreateProduct ,getCategory, updateProduct,deleteProduct,getProductDeleted, restoreProduct}
}
export default useProductService;
