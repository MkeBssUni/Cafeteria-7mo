import React, { useContext } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import AxiosClient from "../../../shared/plugins/axios";
import { AuthContext } from "../authContext";
import Alert from "../../../shared/plugins/Alert";

const UserLogged = async (values) => {
  console.log('Entra aqui',values)
  const { data, dispatch } = useContext(AuthContext);
  const navigation = useNavigate();
  try {
    const response = await AxiosClient({
      url: "/auth/login",
      method: "POST",
      data: JSON.stringify(values),
    });
    if (!response.error) {
      const action = {
        type: "LOGIN",
        payload: response.data,
      };
      console.log(data.isLogged)
      dispatch(action);
      navigation("/", { replace: true });
    } else {
      throw Error();
    }
  } catch (error) {
    Alert.fire({
      title: "Verificar datos",
      text: "Usuario y/o contraseña incorrectos",
      icon: "error",
      confirmButtonColor: "#3085d6",
      confirmButtonText: "Aceptar",
    });
  }
  if (data.isLogged) {
    return <Navigate to={'/'} />;
  }
};

export default UserLogged;
