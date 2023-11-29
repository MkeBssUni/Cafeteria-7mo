import AxiosClient from "../../shared/plugins/axios";

export const getProducts = async () => {
  const products = {
    data: [],
    error: false,
    message:
      "Deliciosas sorpresas se estan horneando...\n mientras tanto, esta seccion esta vacia",
  };

  try {
    const products = await AxiosClient({ url: "/products/getAll" });
    console.log(products.data)
    if (!products.error) return products.data;
  } catch (error) {
    console.log(error);
    return products;
  }
};
