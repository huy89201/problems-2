import axios from "axios";

const BASE_URL = "https://rest.coinapi.io/v1";

const service = axios.create({
  baseURL: BASE_URL,
  headers: {
    Accept: "text/plain",
    "X-CoinAPI-Key": process.env.REACT_APP_API_KEY,
  },
});

export const getAllAsset = () => {
  return service.get("/assets/icons/2");
};

export const getRate = (base: string, quote: string) => {
  return service.get(`/exchangerate/${base}/${quote}`);
};
