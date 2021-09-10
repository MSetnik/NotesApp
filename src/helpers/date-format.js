export const formatDate = (date) => {
  const d = new Date(date);
  const year = d.getYear();
  const month = d.getMonth() + 1;
  const day = d.getDate();
  return `${day}/${month}/${year}`;
};
