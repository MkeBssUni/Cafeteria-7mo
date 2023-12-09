import AxiosClient from "../../../shared/plugins/axios";
import Alert from "../../../shared/plugins/Alert";


const recoveryPassword = async (request) => {
  try {
    const response = await AxiosClient({
      url: "auth/forgotPassword",
      method: "POST",
      data: JSON.stringify(request),
    });
    if (!response.error) {
      Alert.fire({
        title: "Verificar datos",
        text: "¡Perfecto! Hemos enviado un correo electrónico. Por favor, revísalo.",
        icon: "success",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Aceptar",
      });
    } else {
      Alert.fire({
        title: "Ups!",
        text: "Estas seguro de tu correo ingresado",
        icon: "error",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Aceptar",
      });
    }
  } catch (error) {
    Alert.fire({
        title: "Ups!Ocurrió un error",
        text: "Estas seguro de tu correo ingresado",
        icon: "error",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Aceptar",
      });
  }
};

export default recoveryPassword;
