import AxiosClient from "../../../shared/plugins/axios";

/*Aqui he declarado todas mis funciones, muy probablemente el sweetalert tambein lo implemente desde aqui, pero eso lo revisare tomorrow */
const productNull={
  name: "Deliciosas sorpresas se estan horneando...\n Mientrras tanto esta sección esta  vacía",
  image:"",
  id: 0,
  description:""
} 
 const getProductsByCategoryAndstatus = async (request) => {
  try {
    const response = await AxiosClient({
      url: `products/getByStatusAndCategory/${request.status}/${request.category}`,
      method: "GET",
      data: JSON.stringify(request),
    });
    if(response.data.length %2  === 1) response.data.push(productNull)
    if (!response.error) return response.data;
  } catch (error) {
    console.log(error);
  }
};


export default getProductsByCategoryAndstatus;



