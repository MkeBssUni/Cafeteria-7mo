import AxiosClient from "../../../shared/plugins/axios";

const GetAllActiveDiscount = async () => {
  try {
    const response = await AxiosClient({
      url: "/discounts/active",
      method: "GET",
    });
    if (!response.error) return response.data;
  } catch (error) {
    console.log(error);
  }
};

export default GetAllActiveDiscount;
