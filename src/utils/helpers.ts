export const getSkip = (limit: number, page: number) => limit * (page - 1);

export const getCountPages = (totalItems: number, limit: number) => Math.ceil(totalItems / limit);
