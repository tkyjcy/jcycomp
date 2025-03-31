import { FC } from "react";
import Select from "./select";
import { SelectOptionProps, Option } from "./option";

type ISelectConponent = typeof Select & {
  Option: FC<SelectOptionProps>
}

const TransSelect = Select as ISelectConponent;

TransSelect.Option = Option;

export default TransSelect;