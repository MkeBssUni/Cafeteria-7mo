import AxiosClient from "../../../shared/plugins/axios";
import Alert, {
  confirmTitle,
  changeStatusFalse,
  changeStatusTrue,
  confirmMsj,
  successMsj,
} from "../../../shared/plugins/alerts";

const SaveDiscount = async (request) => {
  try {
    const response = await AxiosClient({
      url: "discounts/",
      method: "POST",
      data: JSON.stringify(request),
    });
    if (response && !response.error) {
      Alert.fire({
        title: "Registro realizado exitosamente",
        text: successMsj,
        icon: "success",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Aceptar",
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.reload();
          return response.data;
        }
      });
    } else {
      Alert.fire({
        title: "Ups!",
        text: "Ocurrió un error",
        icon: "error",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Aceptar",
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.reload();
          return response.data;
        }
      });
    }
  } catch (error) {
    Alert.fire({
      title: "Ups!",
      text: "Ocurrió un error",
      icon: "error",
      confirmButtonColor: "#3085d6",
      confirmButtonText: "Aceptar",
  }).then((result) => {
      if (result.isConfirmed) {
          window.location.reload();
      }
  });
    console.log(error);
  }
};

export default SaveDiscount;
