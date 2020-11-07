
export default function getServerDate(date) {
  let temp;
  if (date) {
    temp = new Date(date);
  } else temp = new Date();
  return `${temp.getFullYear()}-${(temp.getMonth() + 1)}-${temp.getDate()}`;
}

export function getUIDate(date) {
  let temp;
  if (date) {
    temp = new Date(date);
  } else temp = new Date();
  return `${temp.getDate()}-${(temp.getMonth() + 1)}-${temp.getFullYear()}`;
}
