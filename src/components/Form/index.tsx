import { FC } from "react";
import Form from "./form";
import FormItem, {FormItemProps} from "./formItem";

export type FormComponent = typeof Form & {
  Item: FC<FormItemProps>
}

const TransForm = Form as FormComponent
TransForm.Item = FormItem

export default TransForm