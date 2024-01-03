import * as yup from "yup";

// Utils
import { getCharacterValidationError } from "@/utils/functions/getCharacterValidation";

const updateProfileSchema = yup.object().shape({
  title: yup.string().required("Title is required"),
  description: yup.string().required("Description is required"),
  hourlyRate: yup.number().required("Price is required"),
  category: yup.string().required("Category is required"),
  languages: yup.string().required("Languages is required"),
});

export default updateProfileSchema;
