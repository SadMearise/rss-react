import { IProductHeaders } from "../models/interfaces";
import { BASE_URL, HTTPMethods } from "../utils/constants";

const fetchProducts = async (
  skip: number,
  limit: number = 20,
  searchInput: string = ""
): Promise<IProductHeaders | null> => {
  try {
    let searchQuery = "";

    if (searchInput) {
      searchQuery = `search?q${searchInput}`;
    }

    let params = `limit=${limit}&skip=${skip}`;

    if (!searchQuery) {
      params = `?${params}`;
    }
    const response: Response = await fetch(`${BASE_URL}/${searchQuery}${params}`, {
      method: HTTPMethods.get,
    });

    const data: IProductHeaders = await response.json();

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

export default fetchProducts;
