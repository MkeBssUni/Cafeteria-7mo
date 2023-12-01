import AxiosClient from "../../shared/plugins/axios";

/*Aqui he declarado todas mis funciones, muy probablemente el sweetalert tambein lo implemente desde aqui, pero eso lo revisare tomorrow */

export const getProducts = async () => {
  const products = {
    data: [],
    error: false,
    message:
      "Deliciosas sorpresas se estan horneando...\n mientras tanto, esta seccion esta vacia",
  };

  try {
    const response = await AxiosClient({ url: "/products/getAll" });
    if (!response.error) return response.data;
  } catch (error) {
    console.log(error);
    return products;
  }
};

export const getOneProduct = async (id) => {
  try {
    const response = await AxiosClient({
      url: `/products/${id}` ,
      method:"GET",
      });
    if (!response.error) return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getProductsByCategoryAndstatus = async (request) => {
  try {
    const response = await AxiosClient({
      url: "products/getByStatusAndCategory/",
      method: "GET",
      data: JSON.stringify(request),
    });
    if (!response.error) return response;
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