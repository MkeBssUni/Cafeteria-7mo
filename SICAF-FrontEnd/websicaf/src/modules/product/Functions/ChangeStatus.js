import AxiosClient from "../../../shared/plugins/axios";

export const enableOrDisableProduct = async (request) =>{
    try {
      const response = await AxiosClient({
        url:`/products/changeStatus/${request.id}`,
        method:'PUT',
        data:JSON.stringify(request)
      })
      if(!response.error) return response
    } catch (error) {
      console.log(error)
    }
  }

  export default enableOrDisableProduct;