import AxiosClient from "../../../shared/plugins/axios";

const updateProduct = async (request) =>{
  try {
    const response = await AxiosClient({
      url:`/products/${request.id}`,
      method:'PUT',
      data:JSON.stringify(request)
    })
    if(!response.error) return response
  } catch (error) {
    console.log(error)
  }
}

export default updateProduct