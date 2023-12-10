import AxiosClient from "../../../shared/plugins/axios"
import Alert,{errorMsg,errorTitle,successMsg,successTitle} from "../../../shared/plugins/Alert"

const UpdateCart = async(request) => {
    try {
        const response = await AxiosClient({
            url:'/users/cart',
            method: 'PATCH',
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

export default UpdateCart