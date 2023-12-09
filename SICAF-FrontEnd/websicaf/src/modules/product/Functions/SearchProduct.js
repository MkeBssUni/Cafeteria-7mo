import AxiosClient from "../../../shared/plugins/axios";

const searchProduct = async (request) =>{
    try {
     const response = await AxiosClient({
      url:`products/search/`,
      method:"POST",
      data: JSON.stringify(request)
     }) 
     if(!response.error) return response.data
    } catch (error) {
      console.log(error)
    }
  }

  export default searchProduct;