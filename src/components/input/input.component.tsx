import { Pane, minorScale, Text, TextInput, Textarea, Select, Checkbox } from "evergreen-ui"
import FieldErrorMessage from "../field-error-message/field-error-message.component";
import { Controller } from 'react-hook-form';
import { FieldNameWithoutAuth, InputProps } from "./input.types";
import DatePicker from "../date-picker/date-picker.component";
import TimePicker from "../time-picker/time-picker.component";

const Input = ({ name, type, label, placeholder, register, errors, selectOptions, control, optionLabelKey, optionValueKey }: InputProps) => {
  return (
    <Pane width={'100%'}>
      <div className={ label ? 'flex items-center form-field' : 'w-100'}>
        { label ?
          <Text width={"9rem"}>{ label }</Text> : ''
        }
        { [ 'text', 'number', 'password' ].includes(type) ?
          <TextInput
            { ...register(name, { valueAsNumber: type === "number" ? true : false }) }
            defaultValue=""
            placeholder={ placeholder || label }
            width={"100%"}
            type={ type }
          /> : type === 'textarea' ?
          <Textarea
            { ...register(name) }
            placeholder={ placeholder || label }
          /> : type === 'select' && selectOptions && optionLabelKey && optionValueKey ?
          // this input probably need to be controlled cause I need to be sure that the
          // first item showed is always the one with the id I set as the default one
          <Select
            flex={"initial"}
            width={"100%"}
            { ...register(name, { valueAsNumber: true }) }
          >
            { selectOptions?.map((option, idx) => (
              <option key={idx} value={option[optionValueKey]}>
                {option[optionLabelKey]}
              </option>
            ))}
          </Select> : type === 'checkbox' && control ?
          <Controller 
            name={ name }
            control={ control }
            render={
              ({ field: props }) => (
                <Checkbox
                  whiteSpace={"nowrap"}
                  margin={0}
                  display={"flex"}
                  alignItems={"center"}
                  checked={ props.value }
                  onChange={ (e) => props.onChange(e.target.checked) }
                />
              )
            }
          /> : type === "date" ? 
          <Controller 
            name={ name }
            control={ control }
            render={
              ({ field: props }) => (
                <DatePicker
                  value={props.value}
                  onChange={(newDate) => props.onChange(newDate)}
                />
              )
            }
          /> : type === "time" ?
          <Controller 
            name={ name }
            control={ control }
            render={
              ({ field: props }) => (
                <TimePicker
                  value={props.value}
                  onChange={(newDate) => props.onChange(newDate)}
                />
              )
            }
          /> : "input type is empty or doesn't exist"
        }
      </div>
      { errors ?
          <FieldErrorMessage message={ errors[name as FieldNameWithoutAuth]?.message } />
        : ""
      }
    </Pane>
  )
}

export default Input;
