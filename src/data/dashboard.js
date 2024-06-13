import axios from "../custom/axios";

const useDashboardService = () => {
    const getDashboardData = async () => {
        const res = await axios.get('/admin/dashboard/data');
        return res;
    }
    return { getDashboardData };    
}
export default useDashboardService;
