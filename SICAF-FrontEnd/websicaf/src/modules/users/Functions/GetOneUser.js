import AxiosClient from "../../../shared/plugins/axios"
import Alert,{errorMsg,errorTitle,successMsg,successTitle} from "../../../shared/plugins/Alert"

const GetOneUser = async (id) => {
    try {
        const response = await AxiosClient({
            url:`/users/${id}`,
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

export default GetOneUser