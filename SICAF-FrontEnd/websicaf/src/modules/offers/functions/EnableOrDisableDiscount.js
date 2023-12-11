import AxiosClient from "../../../shared/plugins/axios";
import Alert, {
  errorMsg,
  errorTitle,
  successMsg,
  successTitle,
} from "../../../shared/plugins/Alert";

const EnableOrDisableDiscount = async (id) => {
  console.log("entra aqui", id);
  try {
    const response = await AxiosClient({
      url: `discounts/${id}`,
      method: "PATCH",
    });
    if (!response.error) {
      console.log('entra en la funcion');
      Alert.fire({
        title: successTitle,
        text: successMsg,
        icon: "success",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Aceptar",
      });
      return response;
    }
  } catch (error) {
    Alert.fire({
      title: errorTitle,
      text: errorMsg,
      icon: "success",
      confirmButtonColor: "#3085d6",
      confirmButtonText: "Aceptar",
    });
    console.log(error);
  }
};

export default EnableOrDisableDiscount;
