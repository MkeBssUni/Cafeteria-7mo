import AxiosClient from "../../../shared/plugins/axios";

export const getByCategory = async (request) =>{
    try {
      const response = await AxiosClient({
        url:`/products/getByCategory/${request}`,
        method:'GET',
        data:JSON.stringify(request)
      })
      if(!response.error) return response.data
    } catch (error) {
      console.log(error)
    }
  }
  

  export default getByCategory