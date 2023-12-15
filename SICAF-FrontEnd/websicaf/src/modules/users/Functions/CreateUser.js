import AxiosClient from "../../../shared/plugins/axios"
import Alert,{errorMsg,errorTitle,successMsg,successTitle} from "../../../shared/plugins/Alert"

const CreateUser = async (request) => {
    try {
        const response = await AxiosClient({
            url:'users/',
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
        let respmsg = error.response.data.message;
        let message = "";

        switch(respmsg){
            case "Missing fields":
                message = "Te faltan campos por llenar,vuelve a intentarlo"
            break;
            case "Email already exists":
                message = "El correo es existente ya lo tiene un usuario registrado"
            break;
            case "Invalid password":
                message = "La contraseña esta mal ingresado,vuelve a intentarlo"
            break;
            case "Invalid name":
                message = "El nombre esta mal ingresado,vuelve a intentarlo"
            break;
            case "Invalid lastname":
                message = "El apellido esta mal ingresado,vuelve a intentarlo"
            break;
            case "Invalid gender":
                message = "El genero esta mal ingresado,vuelve a intentarlo"
            break;
            case "Invalid phone number":
                message = "El teléfono es inválido"
            break;
            case "Invalid role id":
                message = "No se pueden registrar ususarios como rol de administrador"
            break;
            default:
                message= errorMsg;
        }
        Alert.fire({
            title: errorTitle,
            text: message,
            icon:'error',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Aceptar'
        })   
      }
}

export default CreateUser