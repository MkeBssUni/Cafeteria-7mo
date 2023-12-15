import AxiosClient from "../../../shared/plugins/axios";

export const getByStatus = async (status) =>{
    try {
     const response = await AxiosClient({
      url:`/products/getByStatus/${status}`,
      method:"GET"
     }) 
     if(!response.error) return response.data
    } catch (error) {
      console.log(error)
    }
  }

  export default getByStatus;