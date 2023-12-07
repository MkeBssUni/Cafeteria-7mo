import AxiosClient from "../../../shared/plugins/axios";
import Alert, {errorMsg,errorTitle,successMsg,successTitle,} from "../../../shared/plugins/Alert";
export const enableOrDisableProduct = async (id) =>{
  
    try {
      const response = await AxiosClient({
        url:`/products/changeStatus/${id}`,
        method:'PUT',
      })
      if (!response.error) {
        Alert.fire({
          title: successTitle,
          text: successMsg,
          icon: 'success',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'Aceptar'
        })
      }
      return response
    } catch (error) {
      Alert.fire({
        title: errorTitle,
        text: errorMsg,
        icon: 'error',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Aceptar'
      })
    }
  }

  export default enableOrDisableProduct;