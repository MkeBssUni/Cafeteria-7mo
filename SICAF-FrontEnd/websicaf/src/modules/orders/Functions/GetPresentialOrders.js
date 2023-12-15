import AxiosClient from "../../../shared/plugins/axios"
import Alert from "../../../shared/plugins/Alert"

const GetPresentialOrders = async(request) => {
    try {
        const response = await AxiosClient({
            url:`orders/presential/${request.filter}/${request.value}`,
            method:'GET',
        })
        if (!response.error) return response.data;
      } catch (error) {
        Alert.fire({
            title: "Advertencia",
            text: 'Por favor selecciona la parte para mostrar los datos',
            icon:'warning',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Aceptar'
        })   
      }
}

export default GetPresentialOrders;