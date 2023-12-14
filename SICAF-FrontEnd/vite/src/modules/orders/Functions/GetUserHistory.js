import AxiosClient from "../../../shared/plugins/axios"
import Alert,{errorMsg,errorTitle,successMsg,successTitle} from "../../../shared/plugins/Alert"
import React from 'react'

const GetUserHistory = async (request) => {
    try {
        const response = await AxiosClient({
            url:'orders/history',
            method: 'GET',
            data: JSON.stringify(request)
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

export default GetUserHistory