import AxiosClient from "../../../shared/plugins/axios";

 const CreateProduct = async (request)=> {
    try {
      const response = await AxiosClient({
        url:"products/",
        method:"POST",
        data: JSON.stringify(request)
      })
      if(!response.error) return response
    } catch (error) {
      console.log(error)
    }
  }

  export default CreateProduct