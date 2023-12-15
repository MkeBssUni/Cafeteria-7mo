import AxiosClient from "../../../shared/plugins/axios";

const getOneProduct = async (id) => {
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

export default getOneProduct;