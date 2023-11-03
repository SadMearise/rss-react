export const getSkip = (limit: number, countPages: number | string) => {
  if (typeof countPages === "string") {
    return limit * (Number(countPages) - 1);
  }

  return limit * (countPages - 1);
};

export const getCountPages = (totalItems: number, limit: number) => Math.ceil(totalItems / limit);
