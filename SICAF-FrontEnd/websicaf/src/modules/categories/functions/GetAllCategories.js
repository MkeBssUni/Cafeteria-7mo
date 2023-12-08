import AxiosClient from "../../../shared/plugins/axios";

const getCategories = async () => {
    try {
      const response = await AxiosClient({ url: "/categories/" });
      if (!response.error) return response.data;
    } catch (error) {
      console.log(error);
    }
  };

export default getCategories