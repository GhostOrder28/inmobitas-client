import React, { useState } from 'react';
import { Form, Field } from 'react-final-form';
import { Link } from 'react-router-dom';
import {
  estateLabels,
  ownerLabels,
  contractLabels,
  locationLabels,
  featuresLabels,
  listingLabels,
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

  const onSubmit = async values => {
    const { password, confirmPassword } = values;
    if (password !== confirmPassword) return
    console.log('form submitted!');
    console.log(values);
  };

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
                  <TextInput {...props.input} placeholder={ ownerLabels.NAME } width={'100%'}/>
                )}
              </Field>
              <Field name='ownerContactPhone' component="input">
                {props => (
                  <TextInput {...props.input} placeholder={ ownerLabels.CONTACT_PHONE } width={'100%'}/>
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
              <Field name='city' component="input">
                {props => (
                  <TextInput {...props.input} placeholder={ locationLabels.CITY } width={'100%'}/>
                )}
              </Field>
              <Field name='district' component="input">
                {props => (
                  <TextInput {...props.input} placeholder={ locationLabels.DISTRICT } width={'100%'}/>
                )}
              </Field>
              <Field name='neighborhood' component="input">
                {props => (
                  <TextInput {...props.input} placeholder={ locationLabels.NEIGHBORHOOD } width={'100%'}/>
                )}
              </Field>
              <Field name='addressDetails' component="input">
                {props => (
                  <TextInput {...props.input} placeholder={ locationLabels.ADDRESS_DETAILS } width={'100%'}/>
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
              <Field name='typeOfContract' component="input">
                {props => (
                  <Combobox
                    width={'100%'}
                    openOnFocus
                    items={[contractLabels.SALE, contractLabels.RENTAL]}
                    onChange={selected => props.input.onChange(selected)}
                    placeholder={ contractLabels.CONTRACT_TYPE }
                  />
                )}
              </Field>
              <Field name='price' component="input">
                {props => (
                  <TextInput {...props.input} placeholder={ estateLabels.PRICE } width={'100%'}/>
                )}
              </Field>
              <div className='flex'>
                <Field name='fee' component="input">
                  {props => (
                    <TextInput {...props.input} placeholder={ contractLabels.FEE } width={'100%'}/>
                  )}
                </Field>
                <Field name='commissionUnit' component="input">
                  {props => (
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
                  )}
                </Field>
              </div>
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
              >{ estateLabels.ESTATE }</Text>
              <Field name='propertyType' component="input">
                {props => (
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
                )}
              </Field>
              <div className='flex'>
                <Field name='floorLocation' component="input">
                  {props => (
                    <TextInput {...props.input} placeholder={ estateLabels.FLOOR_LOCATION } width={'100%'}/>
                  )}
                </Field>
                <Field name='floors' component="input">
                  {props => (
                    <TextInput {...props.input} placeholder={ estateLabels.NUMBER_OF_FLOORS } width={'100%'}/>
                  )}
                </Field>
              </div>
              <div className='flex'>
                <Field name='totalArea' component="input">
                  {props => (
                    <TextInput {...props.input} placeholder={ estateLabels.TOTAL_AREA } width={'100%'}/>
                  )}
                </Field>
                <Field name='builtArea' component="input">
                  {props => (
                    <TextInput {...props.input} placeholder={ estateLabels.BUILT_AREA } width={'100%'}/>
                  )}
                </Field>
              </div>
              <div className='flex'>
                <Field name='bedrooms' component="input">
                  {props => (
                    <TextInput {...props.input} placeholder={ featuresLabels.BEDROOMS } width={'100%'}/>
                  )}
                </Field>
                <Field name='bathrooms' component="input">
                  {props => (
                    <TextInput {...props.input} placeholder={ featuresLabels.BATHROOMS } width={'100%'}/>
                  )}
                </Field>
                <Field name='garages' component="input">
                  {props => (
                    <TextInput {...props.input} placeholder={ featuresLabels.GARAGES } width={'100%'}/>
                  )}
                </Field>
                <Field name='kitchens' component="input">
                  {props => (
                    <TextInput {...props.input} placeholder={ featuresLabels.KITCHENS } width={'100%'}/>
                  )}
                </Field>
              </div>
              <Field name='haveNaturalGas' component="input">
                {props => (
                  <Checkbox
                    label={ featuresLabels.NATURAL_GAS }
                    checked={props.input.value || false}
                    onChange={e => props.input.onChange(e.target.checked)}
                  />
                )}
              </Field>
            </Pane>
            <Field name='extraNotes' component="input">
              {props => (
                <Textarea
                  name="extraNotesField"
                  placeholder={ estateLabels.ESTATE_DETAILS }
                  value={props.input.value}
                  onChange={e => props.input.onChange(e.target.value)}
                />
              )}
            </Field>
            <Button width={'100%'} type='submit' appearance="primary" >
              { listingLabels.ADD_NEW_LISTING }
            </Button>
          </form>
        )}
      />
  )
};

export default ListingForm;
