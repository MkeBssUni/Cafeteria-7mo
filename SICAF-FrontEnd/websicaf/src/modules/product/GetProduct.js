import AxiosClient from "../../shared/plugins/axios";

export const getProducts = async () => {
    try {
      const response = await AxiosClient({ url: "/products/getAll" });
      if (!response.error) return response.data;
    } catch (error) {
      console.log(error);
    }
  };