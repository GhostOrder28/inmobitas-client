import React, { useState } from 'react';
import { Form, Field } from 'react-final-form';
import { Link } from 'react-router-dom';
import { listingFormLabels } from '../../constants/language/english/english-labels.constants';
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
          <form className='flex flex-column' onSubmit={handleSubmit}>
            <Heading size={800} marginBottom={20}>{ listingFormLabels.FORM_HEADER }</Heading>
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
              >Owner</Text>
              <Field name='ownerName' component="input">
                {props => (
                  <TextInput {...props.input} placeholder={ listingFormLabels.NAME } width={'100%'}/>
                )}
              </Field>
              <Field name='ownerContactPhone' component="input">
                {props => (
                  <TextInput {...props.input} placeholder={ listingFormLabels.CONTACT_PHONE } width={'100%'}/>
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
              >Location</Text>
              <Field name='district' component="input">
                {props => (
                  <TextInput {...props.input} placeholder={ listingFormLabels.DISTRICT } width={'100%'}/>
                )}
              </Field>
              <Field name='county' component="input">
                {props => (
                  <TextInput {...props.input} placeholder={ listingFormLabels.COUNTY } width={'100%'}/>
                )}
              </Field>
              <Field name='address' component="input">
                {props => (
                  <TextInput {...props.input} placeholder={ listingFormLabels.ADDRESS } width={'100%'}/>
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
              >Contract</Text>
              <Field name='typeOfContract' component="input">
                {props => (
                  <Combobox
                    width={'100%'}
                    openOnFocus
                    items={[listingFormLabels.SALE, listingFormLabels.RENTAL]}
                    onChange={selected => props.input.onChange(selected)}
                    placeholder={ listingFormLabels.TYPE_OF_CONTRACT }
                  />
                )}
              </Field>
              <Field name='price' component="input">
                {props => (
                  <TextInput {...props.input} placeholder={ listingFormLabels.PRICE } width={'100%'}/>
                )}
              </Field>
              <div className='flex'>
                <Field name='commission' component="input">
                  {props => (
                    <TextInput {...props.input} placeholder={ listingFormLabels.COMMISSION } width={'100%'}/>
                  )}
                </Field>
                <Field name='commissionUnit' component="input">
                  {props => (
                    <Combobox
                      width={'100%'}
                      openOnFocus
                      items={[
                        listingFormLabels.PERCENTAGE,
                        listingFormLabels.CURRENCY,
                      ]}
                      onChange={selected => props.input.onChange(selected)}
                      placeholder={ listingFormLabels.UNIT }
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
              >Property</Text>
              <Field name='propertyType' component="input">
                {props => (
                  <Combobox
                    width={'100%'}
                    openOnFocus
                    items={[
                      listingFormLabels.CONDO,
                      listingFormLabels.APARTMENT,
                      listingFormLabels.HOUSE,
                      listingFormLabels.COMMERCIAL_POST,
                    ]}
                    onChange={selected => props.input.onChange(selected)}
                    placeholder={ listingFormLabels.PROPERTY_TYPE }
                  />
                )}
              </Field>
              <div className='flex'>
                <Field name='floorLocation' component="input">
                  {props => (
                    <TextInput {...props.input} placeholder={ listingFormLabels.FLOOR_LOCATION } width={'100%'}/>
                  )}
                </Field>
                <Field name='floors' component="input">
                  {props => (
                    <TextInput {...props.input} placeholder={ listingFormLabels.FLOORS } width={'100%'}/>
                  )}
                </Field>
              </div>
              <div className='flex'>
                <Field name='totalArea' component="input">
                  {props => (
                    <TextInput {...props.input} placeholder={ listingFormLabels.TOTAL_AREA } width={'100%'}/>
                  )}
                </Field>
                <Field name='builtArea' component="input">
                  {props => (
                    <TextInput {...props.input} placeholder={ listingFormLabels.BUILT_AREA } width={'100%'}/>
                  )}
                </Field>
              </div>
              <div className='flex'>
                <Field name='bedrooms' component="input">
                  {props => (
                    <TextInput {...props.input} placeholder={ listingFormLabels.BEDROOMS } width={'100%'}/>
                  )}
                </Field>
                <Field name='bathrooms' component="input">
                  {props => (
                    <TextInput {...props.input} placeholder={ listingFormLabels.BATHROOMS } width={'100%'}/>
                  )}
                </Field>
                <Field name='garages' component="input">
                  {props => (
                    <TextInput {...props.input} placeholder={ listingFormLabels.GARAGES } width={'100%'}/>
                  )}
                </Field>
                <Field name='kitchens' component="input">
                  {props => (
                    <TextInput {...props.input} placeholder={ listingFormLabels.KITCHENS } width={'100%'}/>
                  )}
                </Field>
              </div>
              <Field name='haveNaturalGas' component="input">
                {props => (
                  <Checkbox
                    label={ listingFormLabels.NATURAL_GAS }
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
                  placeholder="Extra notes goes here..."
                  value={props.input.value}
                  onChange={e => props.input.onChange(e.target.value)}
                />
              )}
            </Field>
            <Button width={'100%'} type='submit' appearance="primary" >
              Add new Listing
            </Button>
          </form>
        )}
      />
  )
};

export default ListingForm;
