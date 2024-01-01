import * as yup from "yup";

export const postJobSchema = yup.object().shape({
  title: yup.string().required(),
  description: yup.string().required(),
  price: yup.number().required(),
  type: yup.string().required(),
  category: yup.string().required(),
  featured: yup.boolean().required(),
  skills: yup.array().of(yup.string().required()).required(),
  duration: yup.number().required(),
});
