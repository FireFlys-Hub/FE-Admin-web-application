import { useContext } from "react";
import { UserContext } from "../context/auth/UserContext";
import axios from "../custom/axios";

const CRUDContacts = () => {
    const { user } = useContext(UserContext);
    const token = user.token;
  
    const GetContacts = async () => {
      try {
        const response = await axios.get("/admin/contact");
        console.log("GetContacts response:", response); 
        return response; 
      } catch (error) {
        console.error("Error during fetching contacts:", error);
        return false;
      }
    };
  
    const UpdateContact = async (formData) => {
      try {
        const res = await axios.post(`/admin/contact/${formData.id}/update`, formData);
        console.log(res.data);
        return true;
      } catch (error) {
        console.error('Error updating contact:', error);
        throw error;
      }
    }
  
    return { GetContacts, UpdateContact };
  };

export { CRUDContacts };