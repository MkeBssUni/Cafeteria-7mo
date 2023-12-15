import AxiosClient from "../../../shared/plugins/axios"
import Alert,{errorMsg,errorTitle,successMsg,successTitle} from "../../../shared/plugins/Alert"

const GetRepceiptForConfirmation = async (request) => {
  try {
    const response = await AxiosClient({
        url:'orders/confirmationReceipt',
        method: 'POST',
        data: JSON.stringify(request)
    })
    if(!response.error){
        Alert.fire({
            title: successTitle,
            text:successMsg,
            icon:'success',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Aceptar'
        })
    }
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

export default GetRepceiptForConfirmation