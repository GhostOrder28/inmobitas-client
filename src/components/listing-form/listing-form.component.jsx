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
  Textarea,
} from 'evergreen-ui';

const ListingForm = () => {

  const [checked, setChecked] = useState(false);

  const onSubmit = async values => {
    const { password, confirmPassword } = values;
    if (password !== confirmPassword) return
    console.log('form submitted!');
    console.log(values);
  };

  return (
    <Pane
      width={400}
      padding={50}
      elevation={3}
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
    >
      <Form
        onSubmit={onSubmit}
        // validate={validate}
        render={({ handleSubmit }) => (
          <form className='flex flex-column' onSubmit={handleSubmit}>
            <Heading size={800} marginBottom={20}>{ listingFormLabels.FORM_HEADER }</Heading>
            <Field name='owner' component="input">
              {props => (
                <TextInput {...props.input} placeholder={ listingFormLabels.OWNER } width={'100%'}/>
              )}
            </Field>
            <Field name='ownerContactPhone' component="input">
              {props => (
                <TextInput {...props.input} placeholder={ listingFormLabels.OWNER_CONTACT_PHONE } width={'100%'}/>
              )}
            </Field>
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
            <Field name='location' component="input">
              {props => (
                <TextInput {...props.input} placeholder={ listingFormLabels.LOCATION } width={'100%'}/>
              )}
            </Field>
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
    </Pane>
  )
};

export default ListingForm;
