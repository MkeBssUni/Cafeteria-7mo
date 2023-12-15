import AxiosClient from "../../../shared/plugins/axios";
import Alert, {
  confirmTitle,
  changeStatusFalse,
  changeStatusTrue,
  confirmMsj,
  successMsj,
} from "../../../shared/plugins/alerts";

const SaveDiscount = async (request) => {
  await Alert.fire({
    title: "¿Estas seguro de guardar el descuento?",
    text: confirmMsj,
    icon: "warning",
    confirmButtonColor: "#009574",
    confirmButtonText: "Aceptar",
    cancelButtonColor: "#DD6B55",
    cancelButtonText: "Cancelar",
    reverseButtons: true,
    backdrop: true,
    showCancelButton: true,
    showLoaderOnConfirm: true,
    allowOutsideClick: () => !Alert.isLoading,
    preConfirm: async () => {
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
    },
  });
};

export default SaveDiscount;
