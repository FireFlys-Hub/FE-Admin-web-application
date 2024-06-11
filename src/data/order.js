import axios from "../custom/axios";
const ManageOrders = () => {
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
    const updateOrderStatus = async (orderId, newStatus) => {
      try {
        const response = await axios.post(`/admin/orders/${orderId}`, { status: newStatus });
        if (newStatus === "Canceled") {
          const orderDetails = await getAllOrdersById(orderId);
          const orderItems = orderDetails.orderItems;
          for (const item of orderItems) {
           console.log("product_id:",  item.product_id);
            try {
              await axios.post(`/admin/product/increaseQuantity/${item.product_id}`, { quantity_product: item.quantity });
            } catch (error) {
              console.error("Error updating product quantity:", error);
            }
          }
        }
        return response.data;
      } catch (error) {
        console.error("Error updating order status:", error);
        throw error;
      }
    };
    
    return {getAllOrders, getAllOrdersById, updateOrderStatus}
}

export {ManageOrders};

