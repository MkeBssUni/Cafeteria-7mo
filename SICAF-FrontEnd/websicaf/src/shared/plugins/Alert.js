import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const Alert = withReactContent(Swal);
export const confirmMsg =
  'Le solicitamos esperar un momento a que la acción termine';
export const confirmTitle = '¿Estás seguro de realizar la acción?';
export const successMsg =
  'La actividad se realizo con éxito';
export const successTitle = 'Acción realizada exitosamente';
export const errorMsg = 'Error al realizar la acción';
export const errorTitle = 'Error al realizar la acción';
export const changeStatusTrue="El producto volvera a ser visible para los usuarios";
export const changeStatusFalse="El producto dejara de ser visible para los usuarios";
export default Alert;