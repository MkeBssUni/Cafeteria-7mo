import AxiosClient from "../../../shared/plugins/axios"
import Alert,{errorMsg,errorTitle,successMsg,successTitle} from "../../../shared/plugins/Alert"

const GetByStatus = async (id) => {
    try {
        const response = await AxiosClient({
            url: `users/changeStatus/${id}`,
            method: 'PATCH',
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

export default GetByStatus