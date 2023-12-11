import AxiosClient from "../../../shared/plugins/axios"
import Alert,{errorMsg,errorTitle,successMsg,successTitle} from "../../../shared/plugins/Alert"

const GetPresentialOrders = async(request) => {
    try {
      console.log( "ENtra aqui",request);
      console.log(JSON.stringify(request))
        const response = await AxiosClient({
            url:'orders/presential',
            method:'GET',
            data:JSON.stringify(request),
            headers: {
              'Content-Type': 'application/json',
          },
        })
        console.log(response)
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

export default GetPresentialOrders;