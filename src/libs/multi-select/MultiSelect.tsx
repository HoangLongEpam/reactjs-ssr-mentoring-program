import Select, { ActionMeta, MultiValue } from "react-select";
import { MultiSelectOption } from "../../shared/models/MultiSelectOption";
export interface OnSelectParams {
  target: {
    value: MultiValue<MultiSelectOption> | null;
    name: string;
  };
}

export interface OnValueSelectParams {
  target: {
    value: string[] | null;
    name: string;
    type?: string;
  };
}

export interface MultiSelectProps {
  options: MultiSelectOption[];
  onSelect?: (event: OnSelectParams) => void;
  onValueSelect?: (event: OnValueSelectParams) => void;
  name: string;
  value: string[] | null;
  id: string;
}

export const MultiSelect = ({
  id,
  options,
  onValueSelect,
  onSelect,
  name,
  value,
}: MultiSelectProps) => {
  const handleOnChange = (
    options: MultiValue<MultiSelectOption> | null,
    _: ActionMeta<MultiSelectOption>
  ) => {
    if (onValueSelect) {
      onValueSelect({
        target: {
          value: options?.map((option) => option.value) || null,
          name: name,
        },
      });
    }

    if (onSelect) {
      onSelect({
        target: {
          value: options || null,
          name: name,
        },
      });
    }
  };

  return (
    <Select
      id={id}
      isMulti
      defaultValue={value?.map((v) => {
        return {
          label: v,
          value: v,
        };
      })}
      styles={{
        control: (baseStyles) => ({
          ...baseStyles,
          backgroundColor: "#4b5563",
          color: "white",
          border: "none",
        }),
        menu: (baseStyles) => ({
          ...baseStyles,
          backgroundColor: "#4b5563",
          color: "white",
        }),
      }}
      onChange={handleOnChange}
      options={options}
    />
  );
};
