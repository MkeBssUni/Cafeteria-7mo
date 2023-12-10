import AxiosClient from "../../../shared/plugins/axios";

const GetAllDiscount = async () => {
  try {
    const response = await AxiosClient({
      url: "discounts/",
      method: "GET",
    });
    if (!response.error) return response;
  } catch (error) {
    console.log(error);
  }
};
