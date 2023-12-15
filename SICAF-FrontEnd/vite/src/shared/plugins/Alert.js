import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const Alert = withReactContent(Swal);
export const confirmMsg =
  "Le solicitamos esperar un momento a que la acción termine";
export const confirmTitle = "¿Estás seguro de realizar la acción?";
export const successMsg =
  "La actividad realizada, se ha terminado correctamente";
export const successTitle = "Acción realizada exitosamente";
export const errorMsg = "No se ha realizado la acción solicitada";
export const errorTitle = "Error al realizar la acción";
export const changeStatusTrue =
  "El producto volvera a ser visible para los usuarios";
export const changeStatusFalse =
  "El producto dejara de ser visible para los usuarios";
export const confirmMsj =
  "Le solicitamos esperar un momento a que la solicitud termine";
export const successMsj =
  "La actividad solicitada, se ha realizado correctamente";
export const errorMsj =
  "No se ha logrado realizar la actividad solicitada, por lo cual le pedimos intentar nuevamente, en caso contrario contactar a soporte técnico para solucionar el problema";
export default Alert;
