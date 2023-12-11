import AxiosClient from "../../../shared/plugins/axios";

const SaveDiscount = async (request)=> {
    console.log('entra aqui',request );
      try {
        const response = await AxiosClient({
          url:"discounts/",
          method:"PUT",
          data: JSON.stringify(request)
        })
        if(!response.error) return response
      } catch (error) {
        console.log(error)
      }
    }
  
  export default SaveDiscount;