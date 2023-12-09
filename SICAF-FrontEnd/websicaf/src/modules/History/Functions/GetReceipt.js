import AxiosClient from "../../../shared/plugins/axios";

const GetReceipt = async (request) =>{
    try {
     const response = await AxiosClient({
      url:`orders/confirmationReceipt/`,
      method:"POST",
      data: JSON.stringify(request)
     }) 
     if(!response.error) return response.data
    } catch (error) {
      console.log(error)
    }
  }

  export default GetReceipt;