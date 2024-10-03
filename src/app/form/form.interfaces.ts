export interface FormDefinition {
  pages: Page[];
}

interface Page {
  fields: Field[];
}

interface BaseField {
  key: string;
  label: string;
  type: string;
  options?: Option[];
}

// interface DateField extends BaseField {
//   type: 'date';
// }

// interface SelectField extends BaseField {
//   type: 'select';
//   options: string[] | Country[];
// }

// interface MultiSelectField extends BaseField {
//   type: 'multiselect';
//   options: string[] | Country[];
// }

interface ConditionalField extends BaseField {
  visible?: (model: any) => boolean;
}

type Field = BaseField | ConditionalField;

interface Option {
  label: string;
  value: string | number;
}