import { useContext } from "react";
import { UserContext } from "../context/auth/UserContext";
import axios from "../custom/axios";

const ManageOrders = () => {
    // const { user } = useContext(UserContext);
    // const token = user.token;
    const getAllOrders = async () => {
        try {
            const response = await axios.get("/admin/orders");
            console.log("data", response);
            return response;
          } catch (error) {
            console.error("Error during fetching orders:", error);
            return false;
          }
    }
    const getAllOrdersById = async (id) => {
        try {
            const response = await axios.get(`/admin/orders/${id}`);
            console.log("detail item", response);
            return response;
          } catch (error) {
            console.error("Error during fetching orders:", error);
            return false;
          }
    }
    return {getAllOrders, getAllOrdersById}
}

export {ManageOrders};

