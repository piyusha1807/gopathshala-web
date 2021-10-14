export const setFormErrorFields = (form: any, payload: any) => {
  if (!(form && payload)) return;

  let errors = [];
  Object.keys(payload).forEach((keys) => {
    let item = payload[keys];
    errors.push({
      name: keys,
      errors: Array.isArray(item) ? item : [item.message || item],
    });
  });
  form.setFields(errors);
};
