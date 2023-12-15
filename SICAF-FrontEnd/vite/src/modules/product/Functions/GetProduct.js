import AxiosClient from "../../../shared/plugins/axios";

 const getProducts = async () => {
    try {
      const response = await AxiosClient({ url: "/products/getAll" });
      if (!response.error) return response.data;
    } catch (error) {
      console.log(error);
    }
  };

export default getProducts