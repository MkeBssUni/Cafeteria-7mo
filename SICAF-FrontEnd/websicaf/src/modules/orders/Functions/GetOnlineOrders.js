import AxiosClient from "../../../shared/plugins/axios"
import Alert,{errorMsg,errorTitle,successMsg,successTitle} from "../../../shared/plugins/Alert"
import React from 'react'

const GetOnlineOrders = async(request) => {
    try {
        const response = await AxiosClient({
            url:`orders/online/${request.filter}/${request.value}`,
            method: 'GET',
        })
        console.log(response)
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

export default GetOnlineOrders