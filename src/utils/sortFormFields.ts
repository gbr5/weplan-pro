import IFormFieldDTO from '../dtos/IFormFieldDTO';

export function sortFormFields(fields: IFormFieldDTO[]): IFormFieldDTO[] {
  if (!fields || fields.length <= 1) {
    return fields;
  }
  const sortedFields = fields.sort((a: IFormFieldDTO, b: IFormFieldDTO) => {
    if (Number(a.position) < Number(b.position)) {
      return -1;
    }
    if (Number(a.position) > Number(b.position)) {
      return 1;
    }
    return 0;
  });
  return sortedFields;
}
