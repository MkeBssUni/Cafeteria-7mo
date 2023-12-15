import AxiosClient from "../../../shared/plugins/axios";
import Alert, {
  errorMsg,
  errorTitle,
  successMsg,
  successTitle,
} from "../../../shared/plugins/Alert";

const SaveOrder = async (request) => {
  try {
    const response = await AxiosClient({
      url: "orders/saveOrder",
      method: "POST",
      data: JSON.stringify(request),
    });
    if (!response.error) {
      Alert.fire({
        title: successTitle,
        text: successMsg,
        icon: "success",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Aceptar",
      });
    }
  } catch (error) {
    let respmsg = error.response.data.message;
    let message = "";
    
    switch (respmsg) {
      case "Error sending email":
        message = "El correo de la persona no es correcto";
        break;
      case "Invalid id":
        message = "Un dato es inválido";
        break;
      case "Invalid comment":
        message = "El comentario ingresado es inválido";
        break;
      case "Invalid role":
        message = "El usuario no tiene permisos para registrar ventas";
        break;
      case "User not found":
        message = "El usuario no ha sido encontrado";
        break;
      case "Missing fields":
        message = "Verifica que todos los campos estén llenos correctamente";
        break;
      case "Invalid quantity":
        message = "El valor de la cantidad es inválido";
        break;
      case "Invalid discount":
        message = "El descuento es inválido para este usuario o ha expirado";
        break;
      case "Not enough stock":
        message = "No hay suficiente stock de este producto";
        break;
      case "Product disabled":
        message = "El producto se encuentra inactivo";
        break;
      case "Product not found":
        message = "El producto no ha sido encontrado";
        break;
      default:
        message = "Error desconocido";
    }
    
    Alert.fire({
      title: message,
      text: errorTitle,
      icon: "error",
      confirmButtonColor: "#3085d6",
      confirmButtonText: "Aceptar",
    });
    
  }
};

export default SaveOrder;
