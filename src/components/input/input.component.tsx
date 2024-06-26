import React, { FC, ReactElement } from "react";
import { Pane, minorScale, Text, TextInput, Textarea, Select, Checkbox } from "evergreen-ui"
import { selectValidationErrMsg } from "../../utils/utility-functions";
import FieldErrorMessage from "../field-error-message/field-error-message.component";
import { UseFormRegister, Control, Controller } from 'react-hook-form';
import { Client } from '../../pages/client-page/client-page.types';
import { AxiosError } from 'axios';
import { ValidationError } from "../../redux/redux.types";
import { Listing } from "../../pages/listing-page/listing-page.types";

type InputProps = {
  name: keyof ( Client & Listing );
  type: string;
  label?: string;
  placeholder?: string;
  register: UseFormRegister<any>;
  errors: AxiosError<{ validationErrors: ValidationError[] }> | undefined;
  selectOptions?: any[];
  optionLabelKey?: string;
  optionValueKey?: string;
  control?: Control<any, any>;
  valueAsNumber?: boolean;
}

const Input = ({ name, type, label, placeholder, register, errors, selectOptions, control, optionLabelKey, optionValueKey }: InputProps) => {
  return (
    <Pane marginTop={minorScale(5)} width={'100%'}>
      <div className={ label ? 'flex items-center form-field' : 'w-100'}>
        { label ?
          <Text width={"9rem"}>{ label }</Text> : ''
        }
        { [ 'text', 'number' ].includes(type) ?
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
          /> : "input type is empty or doesn't exist"
        }
      </div>
      <FieldErrorMessage message={selectValidationErrMsg(errors, name)}
      />
    </Pane>
  )
}

export default Input;
