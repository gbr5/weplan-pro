export default function transformBRLDateToDate(data: string): Date {
  const hourMinute = data.split('T')[0];
  const date = data.split('T')[1];
  const year = date.split('/')[2];
  const month = date.split('/')[1];
  const day = date.split('/')[0];

  const normalDate = new Date(`${year}/${month}/${day} ${hourMinute}`);
  return normalDate;
}
