import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectCurrentUserId } from '../../redux/user/user.selectors';
import { Form, Field, useFormState } from 'react-final-form';
import { Link } from 'react-router-dom';
import ErrorMessage from '../error-messages/error-messages.component';
import DayPicker from 'react-day-picker';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import axios from 'axios';
import {
  estateLabels,
  ownerLabels,
  contractLabels,
  locationLabels,
  featuresLabels,
  listingLabels,
  ownerPreferencesLabels,
} from '../../constants/language/english/english-labels.constants';
import './listing-form.styles.css';
import {
  Button,
  Pane,
  TextInput,
  Heading,
  Combobox,
  Checkbox,
  Text,
  Textarea,
} from 'evergreen-ui';

const ListingForm = () => {

  const userId = useSelector(selectCurrentUserId);
  const [signedDate, setSignedDate] = useState(new Date());
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [errors, setErrors] = useState(null);

  const selectErrMsg = field => {
    if (errors) {
      const errorDetails = errors.response.data.details;
      const error = errorDetails && errorDetails.find(errObj => errObj.context.key === field);
      if (error) return error.message;
    } else {
      return null;
    }
  };

  const onSubmit = async values => {
    const { password, confirmPassword } = values;
    if (password !== confirmPassword) return
    console.log('form submitted!');
    console.log(values);
    try {
      const res = await axios.post(`http://${process.env.REACT_APP_HOST_FOR_MOBILE}:3001/newlisting`,
        { ...values, userId }
      )
    } catch (err) {
      console.log(err);
      setErrors(err)
    }
  };

  const ConditionalField = ({ when, is, isNot, children }) => {
    if (is) {
      return(
        <Field name={when} subscription={{ value: true }}>
          {({ input: { value } }) => (value === is ? children : null)}
        </Field>
      )
    }
    if (isNot) {
      return(
        <Field name={when} subscription={{ value: true }}>
          {({ input: { value } }) => (value !== isNot && value !== '' ? children : null)}
        </Field>
      )
    }
  }

  return (
      <Form
        onSubmit={onSubmit}
        // validate={validate}
        render={({ handleSubmit }) => (
          <form className='flex flex-column pa3' onSubmit={handleSubmit}>
            <Heading size={800} marginBottom={20}>{ listingLabels.ADD_LISTING }</Heading>
            <Pane position={'relative'} elevation={0} padding={20} className='form-category'>
              <Text
                position={'absolute'}
                top={0} left={10}
                marginTop={-10}
                backgroundColor={'white'}
                paddingLeft={10}
                paddingRight={10}
                size={500}
                className='form-category-header'
              >{ ownerLabels.OWNER }</Text>
              <Field name='ownerName' component="input">
                {props => (
                  <>
                    <TextInput {...props.input} placeholder={ ownerLabels.NAME } width={'100%'}/>
                    <ErrorMessage validationErrMsg={selectErrMsg('ownerName')}/>
                  </>
                )}
              </Field>
              <Field name='ownerContactPhone' component="input">
                {props => (
                  <>
                    <TextInput {...props.input} placeholder={ ownerLabels.CONTACT_PHONE } width={'100%'}/>
                    <ErrorMessage validationErrMsg={selectErrMsg('ownerContactPhone')}/>
                  </>
                )}
              </Field>
            </Pane>
            <Pane position={'relative'} elevation={0} padding={20} className='form-category'>
              <Text
                position={'absolute'}
                top={0} left={10}
                marginTop={-10}
                backgroundColor={'white'}
                paddingLeft={10}
                paddingRight={10}
                size={500}
                className='form-category-header'
              >{ locationLabels.LOCATION }</Text>
              <Field name='district' component="input">
                {props => (
                  <>
                    <TextInput {...props.input} placeholder={ locationLabels.DISTRICT } width={'100%'}/>
                    <ErrorMessage validationErrMsg={selectErrMsg('district')}/>
                  </>
                )}
              </Field>
              <Field name='neighborhood' component="input">
                {props => (
                  <>
                    <TextInput {...props.input} placeholder={ locationLabels.NEIGHBORHOOD } width={'100%'}/>
                    <ErrorMessage validationErrMsg={selectErrMsg('neighborhood')}/>
                  </>
                )}
              </Field>
              <Field name='addressDetails' component="input">
                {props => (
                  <>
                    <TextInput {...props.input} placeholder={ locationLabels.ADDRESS_DETAILS } width={'100%'}/>
                    <ErrorMessage validationErrMsg={selectErrMsg('addressDetails')}/>
                  </>
                )}
              </Field>
            </Pane>
            <Pane position={'relative'} elevation={0} padding={20} className='form-category'>
              <Text
                position={'absolute'}
                top={0} left={10}
                marginTop={-10}
                backgroundColor={'white'}
                paddingLeft={10}
                paddingRight={10}
                size={500}
                className='form-category-header'
              >{ contractLabels.CONTRACT }</Text>
              <Field name='contractType' component="input">
                {props => (
                  <>
                    <Combobox
                      width={'100%'}
                      openOnFocus
                      items={[contractLabels.SALE, contractLabels.RENTAL]}
                      onChange={selected => props.input.onChange(selected)}
                      placeholder={ contractLabels.CONTRACT_TYPE }
                    />
                    <ErrorMessage validationErrMsg={selectErrMsg('contractType')}/>
                  </>
                )}
              </Field>
              <div className='flex'>
                <Field name='fee' component="input">
                  {props => (
                    <>
                      <TextInput {...props.input} placeholder={ contractLabels.FEE } width={'100%'}/>
                      <ErrorMessage validationErrMsg={selectErrMsg('fee')}/>
                    </>
                  )}
                </Field>
                <Field name='feeUnit' component="input">
                  {props => (
                    <>
                      <Combobox
                        width={'100%'}
                        openOnFocus
                        items={[
                          contractLabels.PERCENTAGE,
                          contractLabels.DOLLAR_SYMBOL,
                        ]}
                        onChange={selected => props.input.onChange(selected)}
                        placeholder={ contractLabels.UNIT }
                      />
                      <ErrorMessage validationErrMsg={selectErrMsg('feeUnit')}/>
                    </>
                  )}
                </Field>
              </div>
              <Field name='signedDate' component="input">
                {props => (
                  <div className='flex flex-column'>
                    <Text>Signed Date:</Text>
                    <DayPickerInput
                      onDayChange={newDate => props.input.onChange(newDate)}
                      component={props => <TextInput {...props} />}
                    />
                    <ErrorMessage validationErrMsg={selectErrMsg('signedDate')}/>
                  </div>
                )}
              </Field>
              <Field name='startDate' component="input">
                {props => (
                  <div className='flex flex-column'>
                    <Text>Start Date:</Text>
                    <DayPickerInput
                      onDayChange={newDate => props.input.onChange(newDate)}
                      component={props => <TextInput {...props} />}
                    />
                    <ErrorMessage validationErrMsg={selectErrMsg('startDate')}/>
                  </div>
                )}
              </Field>
              <Field name='endDate' component="input">
                {props => (
                  <div className='flex flex-column'>
                    <Text>End Date:</Text>
                    <DayPickerInput
                      onDayChange={newDate => props.input.onChange(newDate)}
                      component={props => <TextInput {...props} />}
                    />
                    <ErrorMessage validationErrMsg={selectErrMsg('endDate')}/>
                  </div>
                )}
              </Field>
            </Pane>
            <ConditionalField when='contractType' is={contractLabels.RENTAL}>
              <Pane position={'relative'} elevation={0} padding={20} className='form-category'>
                <Text
                  position={'absolute'}
                  top={0} left={10}
                  marginTop={-10}
                  backgroundColor={'white'}
                  paddingLeft={10}
                  paddingRight={10}
                  size={500}
                  className='form-category-header'
                >{ ownerPreferencesLabels.OWNER_PREFERENCES }</Text>
                <Field name='petsAllowed' component="input">
                  {props => (
                    <>
                      <Checkbox
                        label={ ownerPreferencesLabels.PETS_ALLOWED }
                        checked={props.input.value || false}
                        onChange={e => props.input.onChange(e.target.checked)}
                      />
                      <ErrorMessage validationErrMsg={selectErrMsg('petsAllowed')}/>
                    </>
                  )}
                </Field>
                <Field name='childrenAllowed' component="input">
                  {props => (
                    <>
                      <Checkbox
                        label={ ownerPreferencesLabels.CHILDREN_ALLOWED }
                        checked={props.input.value || false}
                        onChange={e => props.input.onChange(e.target.checked)}
                      />
                      <ErrorMessage validationErrMsg={selectErrMsg('childrenAllowed')}/>
                    </>
                  )}
                </Field>
                <Field name='preferencesDetails' component="input">
                  {props => (
                    <>
                      <TextInput {...props.input} placeholder={ ownerPreferencesLabels.DETAILS } width={'100%'}/>
                      <ErrorMessage validationErrMsg={selectErrMsg('preferencesDetails')}/>
                    </>
                  )}
                </Field>
              </Pane>
            </ConditionalField>
            <Pane position={'relative'} elevation={0} padding={20} className='form-category'>
              <Text
                position={'absolute'}
                top={0} left={10}
                marginTop={-10}
                backgroundColor={'white'}
                paddingLeft={10}
                paddingRight={10}
                size={500}
                className='form-category-header'
              >{ estateLabels.ESTATE }</Text>
              <Field name='estateType' component="input">
                {props => (
                  <>
                    <Combobox
                      width={'100%'}
                      openOnFocus
                      items={[
                        estateLabels.CONDO,
                        estateLabels.APARTMENT,
                        estateLabels.HOUSE,
                        estateLabels.COMMERCIAL_POST,
                      ]}
                      onChange={selected => props.input.onChange(selected)}
                      placeholder={ estateLabels.ESTATE_TYPE }
                    />
                    <ErrorMessage validationErrMsg={selectErrMsg('estateType')}/>
                  </>
                )}
              </Field>
              <ConditionalField when='estateType' is={estateLabels.HOUSE}>
                <Field name='floors' component="input">
                  {props => (
                    <>
                      <div className='flex items-center'>
                        <Text width={'9rem'}>{ estateLabels.FLOORS }</Text>
                        <TextInput {...props.input} width={'100%'} placeholder={ estateLabels.NUMBER_OF_FLOORS }/>
                      </div>
                      <ErrorMessage validationErrMsg={selectErrMsg('floors')}/>
                    </>
                  )}
                </Field>
              </ConditionalField>
              <ConditionalField when='estateType' isNot={estateLabels.HOUSE}>
                <Field name='floorLocation' component="input">
                  {props => (
                    <>
                      <div className='flex items-center'>
                        <Text width={'9rem'}>{ estateLabels.FLOOR }</Text>
                        <TextInput {...props.input} width={'100%'} placeholder={ estateLabels.FLOOR_LOCATION }/>
                      </div>
                      <ErrorMessage validationErrMsg={selectErrMsg('floorLocation')}/>
                    </>
                  )}
                </Field>
              </ConditionalField>
              <Field name='totalArea' component="input">
                {props => (
                  <>
                    <div className='flex items-center'>
                      <Text width={'9rem'}>{ estateLabels.TOTAL_AREA }</Text>
                      <TextInput {...props.input} width={'100%'} placeholder={ 'm²' }/>
                    </div>
                    <ErrorMessage validationErrMsg={selectErrMsg('totalArea')}/>
                  </>
                )}
              </Field>
              <Field name='builtArea' component="input">
                {props => (
                  <>
                    <div className='flex items-center'>
                      <Text width={'9rem'}>{ estateLabels.BUILT_AREA }</Text>
                      <TextInput {...props.input} width={'100%'} placeholder={ 'm²' }/>
                    </div>
                    <ErrorMessage validationErrMsg={selectErrMsg('builtArea')}/>
                  </>
                )}
              </Field>
              <Field name='numberOfBedrooms' component="input">
                {props => (
                  <>
                    <div className='flex items-center'>
                      <Text width={'9rem'}>{ featuresLabels.BEDROOMS }</Text>
                      <TextInput {...props.input} width={'100%'} placeholder={ featuresLabels.NUMBER_OF_BEDROOMS }/>
                    </div>
                    <ErrorMessage validationErrMsg={selectErrMsg('numberOfBedrooms')}/>
                  </>
                )}
              </Field>
              <Field name='numberOfBathrooms' component="input">
                {props => (
                  <>
                    <div className='flex items-center'>
                      <Text width={'9rem'}>{ featuresLabels.BATHROOMS }</Text>
                      <TextInput {...props.input} width={'100%'} placeholder={ featuresLabels.NUMBER_OF_BATHROOMS }/>
                    </div>
                    <ErrorMessage validationErrMsg={selectErrMsg('numberOfBathrooms')}/>
                  </>
                )}
              </Field>
              <Field name='numberOfGarages' component="input">
                {props => (
                  <>
                    <div className='flex items-center'>
                      <Text width={'9rem'}>{ featuresLabels.GARAGES }</Text>
                      <TextInput {...props.input} width={'100%'} placeholder={ featuresLabels.NUMBER_OF_GARAGES }/>
                    </div>
                    <ErrorMessage validationErrMsg={selectErrMsg('numberOfGarages')}/>
                  </>
                )}
              </Field>
              <Field name='numberOfKitchens' component="input">
                {props => (
                  <>
                    <div className='flex items-center'>
                      <Text width={'9rem'}>{ featuresLabels.KITCHENS }</Text>
                      <TextInput {...props.input} width={'100%'} placeholder={ featuresLabels.NUMBER_OF_KITCHENS }/>
                    </div>
                    <ErrorMessage validationErrMsg={selectErrMsg('numberOfKitchens')}/>
                  </>
                )}
              </Field>
              <Field name='haveNaturalGas' component="input">
                {props => (
                  <>
                    <div className='flex items-center'>
                      <Text width={'9rem'}>{ featuresLabels.NATURAL_GAS }</Text>
                      <Combobox
                        width={'100%'}
                        openOnFocus
                        items={[
                          featuresLabels.YES,
                          featuresLabels.NO,
                        ]}
                        onChange={selected => props.input.onChange(selected)}
                        placeholder={ featuresLabels.DOES_IT_HAVE_NATURAL_GAS }
                      />
                    </div>
                    <ErrorMessage validationErrMsg={selectErrMsg('haveNaturalGas')}/>
                  </>
                )}
              </Field>
              <Field name='price' component="input">
                {props => (
                  <>
                    <div className='flex items-center'>
                      <Text width={'9rem'}>{ estateLabels.PRICE }</Text>
                      <TextInput {...props.input} placeholder={ estateLabels.PRICE } width={'100%'}/>
                    </div>
                    <ErrorMessage validationErrMsg={selectErrMsg('price')}/>
                  </>
                )}
              </Field>
              <Field name='estateDetails' component="input">
                {props => (
                  <>
                    <Textarea
                      placeholder={ estateLabels.ESTATE_DETAILS }
                      value={props.input.value}
                      onChange={e => props.input.onChange(e.target.value)}
                    />
                    <ErrorMessage validationErrMsg={selectErrMsg('estateDetails')}/>
                  </>
                )}
              </Field>
            </Pane>
            <Button width={'100%'} type='submit' appearance="primary" >
              { listingLabels.ADD_NEW_LISTING }
            </Button>
          </form>
        )}
      />
  )
};

export default ListingForm;
