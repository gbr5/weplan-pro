export function slug(
  e: React.FormEvent<HTMLInputElement>,
): React.FormEvent<HTMLInputElement> {
  let { value } = e.currentTarget;
  value = value.toLowerCase();
  value = value.normalize('NFD');
  value = value.replace(/\s+/g, '-');
  value = value.replace(/[^\w-]+/g, '-');
  value = value.replace(/--+/g, '-');
  value = value.replace(/^-+/, '-');
  value = value.replace(/-+$/, '-');
  e.currentTarget.value = value;

  return e;
}

export function cep(
  e: React.FormEvent<HTMLInputElement>,
): React.FormEvent<HTMLInputElement> {
  e.currentTarget.maxLength = 9;
  let { value } = e.currentTarget;
  value = value.replace(/\D/g, '');
  value = value.replace(/^(\d{5})(\d)/, '$1-$2');
  e.currentTarget.value = value;

  return e;
}

export function currency(
  e: React.FormEvent<HTMLInputElement>,
): React.FormEvent<HTMLInputElement> {
  let { value } = e.currentTarget;
  value = value.replace(/\D/g, '');
  value = value.replace(/(\d)(\d{2})$/, '$1,$2');
  value = value.replace(/(?=(\d{3})+(\D))\B/g, '.');

  e.currentTarget.value = value;

  return e;
}

export function brlID(
  e: React.FormEvent<HTMLInputElement>,
): React.FormEvent<HTMLInputElement> {
  e.currentTarget.maxLength = 11;
  let { value } = e.currentTarget;
  value = value.replace(/\D/g, '');
  value = value.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  e.currentTarget.value = value;

  return e;
}

export function brlDateFormat(
  e: React.FormEvent<HTMLInputElement>,
): React.FormEvent<HTMLInputElement> {
  e.currentTarget.maxLength = 8;
  let { value } = e.currentTarget;
  value = value.replace(/\D/g, '');
  value = value.replace(/^(\d{2})(\d{2})(\d{4})/, '$1/$2/$3');
  const day = value.split('/')[0];
  const month = value.split('/')[1];
  const year = value.split('/')[2];

  if (Number(month) === 2 && Number(day) > 29) {
    value = `//${year}`;
  }
  if (
    (Number(month) === 1 ||
      Number(month) === 3 ||
      Number(month) === 5 ||
      Number(month) === 7 ||
      Number(month) === 8 ||
      Number(month) === 10 ||
      Number(month) === 12) &&
    Number(day) > 31
  ) {
    value = `//${year}`;
  }
  if (
    (Number(month) === 2 ||
      Number(month) === 4 ||
      Number(month) === 6 ||
      Number(month) === 9 ||
      Number(month) === 11) &&
    Number(day) > 30
  ) {
    value = `//${year}`;
  }
  if (Number(month) > 12) {
    value = `//${year}`;
  }

  e.currentTarget.value = value;

  return e;
}

export function hour(
  e: React.FormEvent<HTMLInputElement>,
): React.FormEvent<HTMLInputElement> {
  e.currentTarget.maxLength = 2;
  let { value } = e.currentTarget;
  value = value.replace(/\D/g, '');
  // value = value.replace(/^2[5-9]/g, '');
  if (Number(value) > 23) {
    value = '';
  }
  // if (value.length === 1) {
  //   value = `0${value}`;
  // }
  e.currentTarget.value = value;

  return e;
}

export function minute(
  e: React.FormEvent<HTMLInputElement>,
): React.FormEvent<HTMLInputElement> {
  e.currentTarget.maxLength = 2;
  let { value } = e.currentTarget;
  value = value.replace(/\D/g, '');
  if (Number(value) > 59) {
    value = '';
  }
  // if (value.length === 1) {
  //   value = `0${value}`;
  // }
  e.currentTarget.value = value;

  return e;
}

export function time(
  e: React.FormEvent<HTMLInputElement>,
): React.FormEvent<HTMLInputElement> {
  e.currentTarget.maxLength = 4;
  let { value } = e.currentTarget;
  value = value.replace(/\D/g, '');
  if (value.length === 0) value = '';
  if (value.length === 1 && Number(value) <= 2) value = `${value}`;
  if (value.length === 1 && Number(value) > 2) value = `0${value}`;
  if (value.length === 2 && Number(value) < 24) value = `${value}`;
  if (value.length === 2 && Number(value) > 23)
    value = `0${value[0]}${value[1]}`;
  if (value.length === 3 && Number(`${value[2]}`) > 5)
    value = `${value[0]}${value[1]}0${value[2]}`;
  if (value.length === 3 && Number(`${value[0]}${value[1]}`) < 24)
    value = `${value[0]}${value[1]}${value[2]}`;
  if (value.length === 3 && Number(`${value[0]}${value[1]}`) > 23)
    value = `0${value[0]}${value[1]}${value[2]}`;
  if (
    value.length === 4 &&
    Number(`${value[0]}${value[1]}`) > 23 &&
    Number(`${value[2]}${value[3]}`) < 60
  )
    value = `00${value[2]}${value[3]}`;
  if (
    value.length === 4 &&
    Number(`${value[0]}${value[1]}`) > 23 &&
    Number(`${value[2]}${value[3]}`) > 59
  )
    value = `0`;

  const thishour = Number(`${value[0]}${value[1]}`);
  const thisminute = Number(`${value[2]}${value[3]}`);
  if (thishour > 23 && thisminute <= 59) value = `23:${thisminute}`;
  if (thishour <= 23 && thisminute > 59) value = `${thishour}:59`;
  value = value.replace(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, '');
  value = value.replace(/^(\d{2}):(\d{2})/, '$1:$2');
  e.currentTarget.value = value;

  return e;
}
