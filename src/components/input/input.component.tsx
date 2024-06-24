import { Pane, minorScale, Text, TextInput, Textarea } from "evergreen-ui"
import { selectValidationErrMsg } from "../../utils/utility-functions";
import FieldErrorMessage from "../field-error-message/field-error-message.component";
import { UseFormRegister } from 'react-hook-form';
import { Client } from '../../pages/client-page/client-page.types';
import { ListingItem } from "../../pages/listings-page/listings-page.types";
import { AxiosError } from 'axios';
import { ValidationError } from "../../redux/redux.types";

type InputProps = {
  name: keyof ( Client | ListingItem );
  type: string;
  label: string;
  placeholder?: string;
  register: UseFormRegister<Client>;
  errors: AxiosError<{ validationErrors: ValidationError[] }> | undefined
}

const Input = ({ name, type, label, placeholder, register, errors }: InputProps) => {
  return (
    <Pane marginTop={minorScale(5)}>
      <div className="flex items-center form-field">
        <Text width={"9rem"}>{ label }</Text>
        { type === 'text' ?
          <TextInput
            { ...register(name as string) }
            placeholder={ placeholder || label }
            width={"100%"}
          /> : type === 'textarea' ?
          <Textarea
            { ...register('clientDetails') }
            placeholder={ placeholder || label }
          /> : ''
        }
      </div>
      <FieldErrorMessage message={selectValidationErrMsg(errors, label)}
      />
    </Pane>
  )
}

export default Input;
