import AxiosClient from "../../shared/plugins/axios";

/*Aqui he declarado todas mis funciones, muy probablemente el sweetalert tambein lo implemente desde aqui, pero eso lo revisare tomorrow */
const productNull={
  name: "Deliciosas sorpresas se estan horneando...\n Mientrras tanto esta sección esta  vacía",
  image:"",
  id: 0,
  description:""
}

export const getProducts = async () => {
  try {
    const response = await AxiosClient({ url: "/products/getAll" });
    if (!response.error) return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getOneProduct = async (id) => {
  try {
    const response = await AxiosClient({
      url: `/products/${id}` ,
      method:"GET",
      });
      console.log(response.data);
    if (!response.error) return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getProductsByCategoryAndstatus = async (request) => {
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

export const createProduct = async (request)=> {
  try {
    const response = await AxiosClient({
      url:"products/",
      method:"POST",
      data: JSON.stringify(request)
    })
    if(!response.error) return response
  } catch (error) {
    console.log(error)
  }
}

export const updateProduct = async (request) =>{
  try {
    const response = await AxiosClient({
      url:`/products/${request.id}`,
      method:'PUT',
      data:JSON.stringify(request)
    })
    if(!response.error) return response
  } catch (error) {
    console.log(error)
  }
}

export const enableOrDisableProduct = async (request) =>{
  try {
    const response = await AxiosClient({
      url:`/products/changeStatus/${request.id}`,
      method:'PUT',
      data:JSON.stringify(request)
    })
    if(!response.error) return response
  } catch (error) {
    console.log(error)
  }
}

export const getByCategory = async (idCategory) =>{
  try {
   const response = await AxiosClient({
    url:`/products/getByCategory/${idCategory}`,
    method:"GET"
   }) 

   if(!response.error) return response.data
  } catch (error) {
    console.log(error)
  }
}

export const getByStatus = async (status) =>{
  try {
   const response = await AxiosClient({
    url:`/products/getByStatus/${status}`,
    method:"GET"
   }) 
   if(!response.error) return response.data
  } catch (error) {
    console.log(error)
  }
}

export const searchProduct = async (request) =>{
  try {
   const response = await AxiosClient({
    url:`products/search/`,
    method:"POST",
    data: JSON.stringify(request)
   }) 
   if(!response.error) return response.data
  } catch (error) {
    console.log(error)
  }
}