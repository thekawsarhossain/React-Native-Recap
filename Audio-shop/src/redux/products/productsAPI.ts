import axios from "axios";

export const getProducts = async () => {
    const response = await axios.get(`/api/products`);
    return response.data;
};