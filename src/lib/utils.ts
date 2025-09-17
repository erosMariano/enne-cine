// expect 18/03/2025
export const formatDate = (date: string): Date => {
  const day = date.split("/")[0];
  const month = date.split("/")[1];
  const year = date.split("/")[2];

  return new Date(`${year}-${month}-${day}`);
};
