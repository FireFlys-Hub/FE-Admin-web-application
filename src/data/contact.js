import axios from "../custom/axios";

const CRUDContacts = () => {
  
    const GetContacts = async () => {
      try {
        const response = await axios.get("/admin/contact");
        return response; 
      } catch (error) {
        console.error("Error during fetching contacts:", error);
        return false;
      }
    };
  
    const UpdateContact = async (formData) => {
      try {
        // eslint-disable-next-line
        const res = await axios.post(`/admin/contact/${formData.id}/update`, formData);
        return true;
      } catch (error) {
        console.error('Error updating contact:', error);
        throw error;
      }
    }
  
    return { GetContacts, UpdateContact };
  };

export { CRUDContacts };