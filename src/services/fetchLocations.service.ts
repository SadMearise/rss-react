import { IInfo } from "../models/interfaces";
import { BASE_URL, HTTPMethods } from "../utils/constants";

const fetchLocations = async (page: number, searchInput: string = ""): Promise<IInfo | null> => {
  try {
    const response: Response = await fetch(`${BASE_URL}/?page=${page}&name=${searchInput}`, {
      method: HTTPMethods.get,
    });

    const data: IInfo = await response.json();

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

export default fetchLocations;
