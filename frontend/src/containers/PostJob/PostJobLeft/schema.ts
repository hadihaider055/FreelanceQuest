import * as yup from "yup";

export const postJobSchema = yup.object().shape({
  title: yup.string().required(),
  description: yup.string().required(),
  price: yup.string().required(),
  type: yup.string().required(),
  category: yup.string().required(),
  skills: yup.string().required(),
});
