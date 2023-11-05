import { IProduct } from "../models/interfaces";
import { BASE_URL, HTTPMethods } from "../utils/constants";

const fetchProductById = async (id: number): Promise<IProduct | null> => {
  try {
    const response: Response = await fetch(`${BASE_URL}/${id}`, {
      method: HTTPMethods.get,
    });

    const data: IProduct = await response.json();

    return data;
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    } else {
      console.log("Unexpected error", error);
    }

    return null;
  }
};

export default fetchProductById;
