export default function dateToString(createdAt: string) {
  const d = new Date(createdAt); // 서버에서 받은 createAt
  const year = String(d.getFullYear());
  let month = String(d.getMonth());
  let date = String(d.getDate());

  if (Number(month) < 10) {
    month = '0' + month;
  }

  if (Number(date) < 10) {
    date = '0' + date;
  }
  return { year, month, date };
}
