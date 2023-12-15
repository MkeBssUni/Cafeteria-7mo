import AxiosClient from "../../../shared/plugins/axios"
import Alert,{errorMsg,errorTitle,successMsg,successTitle} from "../../../shared/plugins/Alert"
import React from 'react'

const GetOnlineOrders = async(request) => {
    try {
        const response = await AxiosClient({
            url:'orders/online',
            method: 'GET',
            data: JSON.stringify(request)
        })
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

export default GetOnlineOrders