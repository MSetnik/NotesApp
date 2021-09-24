export const formatDate = (date) => {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = d.getMonth() + 1;
  const day = d.getUTCDate();

  return `${day}/${month}/${year}`;
};
