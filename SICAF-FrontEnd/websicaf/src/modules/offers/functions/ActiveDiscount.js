import AxiosClient from "../../../shared/plugins/axios"
import Alert,{errorMsg,errorTitle,successMsg,successTitle} from "../../../shared/plugins/Alert"

const ActiveDiscount = async () => {
    try {
        const response = await AxiosClient({
            url:'discounts/active',
            method: 'GET'
        })
        if (!response.error) return response.data;
      } catch (error) {
        Alert.fire({
            title: errorTitle,
            text: errorMsg,
            icon:'error',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Aceptar'
        })   
      }
}

export default ActiveDiscount