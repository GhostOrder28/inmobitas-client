import { Pane, minorScale, Text, Select, Checkbox } from "evergreen-ui"
import FieldErrorMessage from "../../field-error-message/field-error-message.component";
import { UseFormRegister, Control, Controller, FieldErrors } from 'react-hook-form';
import { ContractPreset } from "../../../pages/listing-page/listing-page.types";
import { useTranslation } from "react-i18next";
import { Listing } from "../../../pages/listing-page/listing-page.types";

type ContractTypeBlockProps = {
  register: UseFormRegister<any>;
  errors: FieldErrors<Listing>
  selectOptions?: ContractPreset[];
  control: Control<Listing, 'isExclusive'>;
}

const ContractTypeBlock = ({ register, errors, selectOptions, control }: ContractTypeBlockProps) => {
  const name = 'contractTypeId';
  const { t } = useTranslation('listing');

  return (
    <Pane 
      display="flex"
      alignItems="center"
      marginTop={minorScale(5)}      
    >
      <Text width={"9rem"}>{ t('contractType') }</Text>
      <Pane display="flex" width="100%">
        <Select 
          width={"100%"} 
          flex={"initial"} 
          { ...register(name, { valueAsNumber: true }) }
        >
          { 
            selectOptions?.map(({ contractTypeId, contractName }, idx) => (
              <option key={idx} value={ contractTypeId }>
                { contractName }
              </option>
            ))
          }
        </Select>
        <Controller 
          name="isExclusive"
          control={ control }
          render={
            ({ field: props }) => (
              <Checkbox
                flex={1}
                whiteSpace={"nowrap"}
                margin={0}
                marginLeft={"1rem"}
                display={"flex"}
                alignItems={"center"}
                label={ t('exclusive') }
                checked={ props.value }
                onChange={ (e) => props.onChange(e.target.checked) }
              /> 
            )
          }
        />
      </Pane>
      <FieldErrorMessage message={ errors[name]?.message } />
    </Pane>
  )
}

export default ContractTypeBlock;
