import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { selectCurrentUserId } from '../../redux/user/user.selectors';
import { Form, Field  } from 'react-final-form';
import { useLocation } from 'react-router-dom';
import { selectErrMsg } from '../../utils/utility-functions';
import ErrorMessage from '../error-messages/error-messages.component';
import DayPicker from 'react-day-picker';
import DayPickerInput from 'react-day-picker/DayPickerInput';
// import FilesUploader from '../files-uploader/files-uploader-evergreen.component';
import FilesUploader from '../files-uploader/files-uploader.component';
import PhotoGallery from '../photo-gallery/photo-gallery.component';
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
import {
  Button,
  Pane,
  TextInput,
  Heading,
  Checkbox,
  Text,
  Textarea,
  Select,
  RadioGroup,
  Spinner,
} from 'evergreen-ui';
import 'react-day-picker/lib/style.css';
import './listing-form.styles.css';

const formInitialState = {
  contractType: 1,
  currency: 1,
  estateType: 1,
  isPercentage: false,
  isExclusive: false,
};

const ListingForm = ({ dataPresets, data }) => {

  const userId = useSelector(selectCurrentUserId);
  const [listingIds, setListingIds] = useState({});
  const [signedDate, setSignedDate] = useState(new Date());
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [errors, setErrors] = useState(null);
  const [dbPayload, setDbPayload] = useState(null);
  const [formPresets, setFormPresets] = useState(null);
  const location = useLocation();
  const formRef = useRef(null);
  const [selectedTab, setSelectedTab] = useState(0);
  const [files, setFiles] = useState([])
  const [isLoading, setIsLoading] = useState(null);


  // useEffect(() => {
    // console.log('re-rendering...');
    // console.log('data', data);
    // console.log('dbPayload', dbPayload);
    // console.log('listingIds', listingIds);
    // console.log('dataPresets', dataPresets);
  // })

  useEffect(() => {
    if (data) {
      const { clientId, estateId, contractId } = data;
      const filteredData = {};
      Object.keys(data).forEach(prop => {
        if (
          data[prop] !== null &&
          !(prop === 'clientId' ||
          prop === 'estateId' ||
          prop === 'contractId')
        ) filteredData[prop] = data[prop];
      })
      setDbPayload(filteredData);
      setListingIds({ clientId, estateId, contractId });
    }
  }, [data])

  useEffect(() => {
    if (location.pathname === '/newlisting') {
      formRef.current.reset(formInitialState)

    }
  }, [location.pathname])

  const onSubmit = async values => {
    const { clientId, estateId, contractId } = listingIds;
    console.log(values);
    try {
      if (location.pathname === `/newlisting`) {
        const res = await axios.post(
          `http://${process.env.REACT_APP_HOST_FOR_MOBILE}:3001/newlisting/${userId}`,
          values
        )
      }
      if (location.pathname === `/editlisting/${estateId}`) {
        const res = await axios.put(
          `http://${process.env.REACT_APP_HOST_FOR_MOBILE}:3001/editlisting/${userId}/${clientId}/${estateId}/${contractId}`,
          values
        )
      }
    } catch (err) {
      setErrors(err)
    }
  };

  return (
      <Form
        initialValues={dbPayload || formInitialState}
        onSubmit={onSubmit}
        render={({ handleSubmit, form, values }) => {
          formRef.current = form;
          console.log(values);
          return (
            <form
              className='form flex flex-column pa3'
              onSubmit={handleSubmit}
              encType="multipart/form-data"
              method='post'
            >
              <Pane position={'relative'} elevation={0} padding={20} className='form-category'>
                <Text
                  position={'absolute'}
                  top={0} left={10}
                  marginTop={-10}
                  backgroundColor={'white'}
                  paddingLeft={10}
                  paddingRight={10}
                  size={600}
                  className='form-category-header'
                >{ ownerLabels.OWNER }</Text>
                <Field name='clientName' component="input">
                  {props => (
                    <>
                      <div className='flex items-center form-field'>
                        <Text width={'9rem'}>{ ownerLabels.NAME }</Text>
                        <TextInput {...props.input} placeholder={ ownerLabels.OWNER_NAME } width={'100%'} className='form-field' />
                      </div>
                      <ErrorMessage fieldErrorMsg={selectErrMsg(errors, 'clientName')}/>
                    </>
                  )}
                </Field>
                <Field name='clientContactPhone' component="input" parse={value => parseInt(value) || null}>
                  {props => (
                    <>
                      <div className='flex items-center form-field'>
                        <Text width={'9rem'}>{ ownerLabels.PHONE }</Text>
                        <TextInput {...props.input} placeholder={ ownerLabels.OWNER_CONTACT_PHONE } width={'100%'} className='form-field' />
                      </div>
                      <ErrorMessage fieldErrorMsg={selectErrMsg(errors, 'clientContactPhone')}/>
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
                  size={600}
                  className='form-category-header'
                >{ locationLabels.LOCATION }</Text>
                <Field name='district' component="input">
                  {props => (
                    <>
                      <div className='flex items-center form-field'>
                        <Text width={'9rem'}>{ locationLabels.DISTRICT }</Text>
                        <TextInput {...props.input} placeholder={ locationLabels.DISTRICT } width={'100%'} className='form-field' />
                      </div>
                      <ErrorMessage fieldErrorMsg={selectErrMsg(errors, 'district')}/>
                    </>
                  )}
                </Field>
                <Field name='neighborhood' component="input">
                  {props => (
                    <>
                      <div className='flex items-center form-field'>
                        <Text width={'9rem'}>{ locationLabels.NEIGHBORHOOD }</Text>
                        <TextInput {...props.input} placeholder={ locationLabels.NEIGHBORHOOD } width={'100%'} className='form-field' />
                      </div>
                      <ErrorMessage fieldErrorMsg={selectErrMsg(errors, 'neighborhood')}/>
                    </>
                  )}
                </Field>
                <Field name='addressDetails' component="input">
                  {props => (
                    <>
                      <div className='flex items-center form-field'>
                        <Text width={'9rem'}>{ locationLabels.DETAILS }</Text>
                        <TextInput {...props.input} placeholder={ locationLabels.ADDRESS_DETAILS } width={'100%'} className='form-field' />
                      </div>
                      <ErrorMessage fieldErrorMsg={selectErrMsg(errors, 'addressDetails')}/>
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
                  size={600}
                  className='form-category-header'
                >{ contractLabels.CONTRACT }</Text>
                <div className='flex items-center form-field'>
                  <Text width={'9rem'}>{contractLabels.CONTRACT_TYPE}</Text>
                  <div className='flex w-100'>
                    <Field name='contractType' component="input" parse={value => parseInt(value) || null}>
                      {props => (
                        <Select
                          value={props.input.value}
                          onChange={e => props.input.onChange(e.target.value)}
                          width={'100%'}
                          flex={'initial'}
                        >
                          {dataPresets && dataPresets.contractTypes.map((contract, idx) => (
                            <option key={idx} value={contract.contractTypeId}>{contract.contractName}</option>
                          ))}
                        </Select>
                      )}
                    </Field>
                    <Field name='isExclusive' type={'checkbox'} >
                      {props => (
                        <Checkbox
                          flex={1}
                          width={'100%'}
                          whiteSpace={'nowrap'}
                          margin={0}
                          marginLeft={'1rem'}
                          display={'flex'}
                          alignItems={'center'}
                          label="Exclusive"
                          checked={props.input.checked}
                          onChange={e => props.input.onChange(e.target.checked)}
                        />
                      )}
                    </Field>
                  </div>
                </div>

                <ErrorMessage fieldErrorMsg={selectErrMsg(errors, 'contractType')}/>
                <Field name='currency' component="input" parse={value => parseInt(value) || null}>
                  {props => (
                    <div className='flex items-center form-field'>
                      <Text width={'9rem'}>{contractLabels.CURRENCY}</Text>
                      <Select
                        value={props.input.value}
                        onChange={e => props.input.onChange(e.target.value)}
                        width={'100%'}
                        flex={'initial'}
                      >
                        {dataPresets && dataPresets.currencies.map((currency, idx) => (
                          <option key={idx} value={currency.currencyId}>{currency.currencyName}</option>
                        ))}
                      </Select>
                    </div>
                  )}
                </Field>
                <div className='flex items-center form-field'>
                  <Field name='estatePrice' component="input" parse={value => parseInt(value) || null}>
                    {props => (
                      <>
                        <Text width={'9rem'}>{ values.contractType === 1 ? contractLabels.ESTATE_PRICE : contractLabels.RENT }</Text>
                        <div className='flex items-center w-100'>
                          <Text
                            flex={1}
                            width={'100%'}
                            marginRight={'0.3rem'}
                          >
                            {
                              dataPresets && dataPresets.currencies.find(currency =>
                                  currency.currencyId === values.currency
                              ).currencySymbol
                            }
                          </Text>
                          <TextInput
                            {...props.input}
                            placeholder={ values.contractType === 1 ? contractLabels.ESTATE_PRICE : contractLabels.RENT_COST }
                            width={'100%'}
                            flex={9}
                          />
                        </div>
                        <ErrorMessage fieldErrorMsg={selectErrMsg(errors, 'price')}/>
                      </>
                    )}
                  </Field>
                </div>
                {
                    values.contractType === 2 &&
                  <Field name='utilitiesIncluded' component="input" parse={value => value === 'null' ? null : (value === 'true')}>
                    {props => (
                      <div className='flex items-center form-field'>
                        <Text width={'9rem'}>{contractLabels.UTILITIES}</Text>
                        <Select
                          value={props.input.value}
                          onChange={e => props.input.onChange(e.target.value)}
                          width={'100%'}
                          flex={'initial'}
                        >
                          <option value={'null'}>{ownerPreferencesLabels.DONT_HAVE_THAT_INFORMATION_YET}</option>
                          <option value={true}>{ownerPreferencesLabels.YES}</option>
                          <option value={false}>{ownerPreferencesLabels.NO}</option>
                        </Select>
                      </div>
                    )}
                  </Field>
                }
                <div className='flex items-center form-field'>
                  <Text width={'9rem'}>{contractLabels.FEE}</Text>
                  <div className='flex items-center w-100'>
                    <Field name='fee' component="input" parse={value => parseInt(value) || null}>
                      {props => (
                        <>
                          <Text
                            flex={1}
                            width={'100%'}
                            marginRight={'0.3rem'}
                          >{
                            values.isPercentage ? '%' :
                            (dataPresets && dataPresets.currencies.find(currency =>
                            currency.currencyId === values.currency).currencySymbol)
                          }
                          </Text>
                          <TextInput
                            {...props.input}
                            placeholder={ contractLabels.FEE }
                            flex={4}
                            width={'100%'}
                          />
                        </>
                      )}
                    </Field>
                    <Field name='isPercentage' type={'checkbox'}>
                      {props => (
                        <Checkbox
                          flex={5}
                          width={'100%'}
                          whiteSpace={'nowrap'}
                          margin={0}
                          marginLeft={'1rem'}
                          display={'flex'}
                          justifyContent={'end'}
                          alignItems={'center'}
                          label="Percentage"
                          checked={props.input.checked}
                          onChange={e => props.input.onChange(e.target.checked)}
                        />
                      )}
                    </Field>
                  </div>
                </div>
                <ErrorMessage fieldErrorMsg={selectErrMsg(errors, 'fee')}/>
                <Field name='signedDate' component="input">
                  {props => (
                    <div className='flex items-center form-field'>
                      <Text width={'9rem'}>{ `${contractLabels.SIGNED_DATE}:` }</Text>
                      {/* WARNING: this TextInput component is causing a warning being sent */}
                      <DayPickerInput
                        value={props.input.value}
                        onDayChange={newDate => props.input.onChange(newDate)}
                        component={props => <TextInput width={'100%'} {...props} />}
                      />
                    </div>
                  )}
                </Field>
                <ErrorMessage fieldErrorMsg={selectErrMsg(errors, 'signedDate')}/>
                <Field name='startDate' component="input">
                  {props => (
                    <div className='flex items-center form-field'>
                      <Text width={'9rem'}>{ `${contractLabels.START_DATE}:` }</Text>
                      {/* WARNING: this TextInput component is causing a warning being sent */}
                      <DayPickerInput
                        value={props.input.value}
                        onDayChange={newDate => props.input.onChange(newDate)}
                        component={props => <TextInput width={'100%'} {...props} />}
                      />
                    </div>
                  )}
                </Field>
                <ErrorMessage fieldErrorMsg={selectErrMsg(errors, 'startDate')}/>
                <Field name='endDate' component="input">
                  {props => (
                    <div className='flex items-center form-field'>
                      <Text width={'9rem'}>{ `${contractLabels.END_DATE}:` }</Text>
                      {/* WARNING: this TextInput component is causing a warning being sent */}
                      <DayPickerInput
                        value={props.input.value}
                        onDayChange={newDate => props.input.onChange(newDate)}
                        component={props => <TextInput width={'100%'} {...props} />}
                      />
                    </div>
                  )}
                </Field>
                <ErrorMessage fieldErrorMsg={selectErrMsg(errors, 'endDate')}/>
              </Pane>
              {
                  values.contractType === 2 &&
                <Pane position={'relative'} elevation={0} padding={20} className='form-category'>
                  <Text
                    position={'absolute'}
                    top={0} left={10}
                    marginTop={-10}
                    backgroundColor={'white'}
                    paddingLeft={10}
                    paddingRight={10}
                    size={600}
                    className='form-category-header'
                  >{ ownerPreferencesLabels.OWNER_PREFERENCES }</Text>
                  <Field name='petsAllowed' component="input" parse={value => value === 'null' ? null : (value === 'true')}>
                    {props => (
                      <div className='flex items-center form-field'>
                        <Text width={'9rem'}>{ ownerPreferencesLabels.PETS_ALLOWED }</Text>
                        <Select
                          value={props.input.value}
                          onChange={e => props.input.onChange(e.target.value)}
                          width={'100%'}
                          flex={'initial'}
                        >
                          <option value={'null'}>{ownerPreferencesLabels.DONT_HAVE_THAT_INFORMATION_YET}</option>
                          <option value={true}>{ownerPreferencesLabels.YES}</option>
                          <option value={false}>{ownerPreferencesLabels.NO}</option>
                        </Select>
                        <ErrorMessage fieldErrorMsg={selectErrMsg(errors, 'petsAllowed')}/>
                      </div>
                    )}
                  </Field>
                  <Field name='childrenAllowed' component="input" parse={value => value === 'null' ? null : (value === 'true')}>
                    {props => (
                      <div className='flex items-center form-field'>
                        <Text width={'9rem'}>{ ownerPreferencesLabels.CHILDREN_ALLOWED }</Text>
                        <Select
                          value={props.input.value}
                          onChange={e => props.input.onChange(e.target.value)}
                          width={'100%'}
                          flex={'initial'}
                        >
                          <option value={'null'}>{ownerPreferencesLabels.DONT_HAVE_THAT_INFORMATION_YET}</option>
                          <option value={true}>{ownerPreferencesLabels.YES}</option>
                          <option value={false}>{ownerPreferencesLabels.NO}</option>
                        </Select>
                        <ErrorMessage fieldErrorMsg={selectErrMsg(errors, 'childrenAllowed')}/>
                      </div>
                    )}
                  </Field>
                  <Field name='ownerPreferencesDetails' component="input">
                    {props => (
                      <>
                        <Textarea {...props.input} placeholder={ ownerPreferencesLabels.PREFERENCE_DETAILS } width={'100%'} className='form-field' />
                        <ErrorMessage fieldErrorMsg={selectErrMsg(errors, 'ownerPreferencesDetails')}/>
                      </>
                    )}
                  </Field>
                </Pane>
              }
              <Pane position={'relative'} elevation={0} padding={20} className='form-category'>
                <Text
                  position={'absolute'}
                  top={0} left={10}
                  marginTop={-10}
                  backgroundColor={'white'}
                  paddingLeft={10}
                  paddingRight={10}
                  size={600}
                  className='form-category-header'
                >{ estateLabels.ESTATE }</Text>
                <Field name='estateType' component="input" parse={value => parseInt(value) || null}>
                  {props => (
                    <>
                      <div className='flex items-center form-field'>
                        <Text width={'9rem'}>{estateLabels.ESTATE_TYPE}</Text>
                        <Select
                          {...props.input}
                          value={props.input.value}
                          onChange={e => props.input.onChange(e.target.value)}
                          width={'100%'}
                          flex={'initial'}
                        >
                          {dataPresets && dataPresets.estateTypes.map((estate, idx) => (
                            <option key={idx} value={estate.estateTypeId}>{estate.estateName}</option>
                          ))}
                        </Select>
                      </div>
                      <ErrorMessage fieldErrorMsg={selectErrMsg(errors, 'estateType')}/>
                    </>
                  )}
                </Field>
                {values.estateType === 1 &&
                  <Field name='floors' component="input" parse={value => parseInt(value) || null}>
                    {props => (
                      <>
                        <div className='flex items-center form-field'>
                          <Text width={'9rem'}>{ estateLabels.FLOORS }</Text>
                          <TextInput {...props.input} width={'100%'} placeholder={ estateLabels.NUMBER_OF_FLOORS }/>
                        </div>
                        <ErrorMessage fieldErrorMsg={selectErrMsg(errors, 'floors')}/>
                      </>
                    )}
                  </Field>
                }
                {values.estateType !== 1 &&
                  <Field name='floorLocation' component="input" parse={value => parseInt(value) || null}>
                    {props => (
                      <>
                        <div className='flex items-center form-field'>
                          <Text width={'9rem'}>{ estateLabels.FLOOR }</Text>
                          <TextInput {...props.input} width={'100%'} placeholder={ estateLabels.FLOOR_LOCATION }/>
                        </div>
                        <ErrorMessage fieldErrorMsg={selectErrMsg(errors, 'floorLocation')}/>
                      </>
                    )}
                  </Field>
                }
                <Field name='totalArea' component="input" parse={value => parseInt(value) || null}>
                  {props => (
                    <>
                      <div className='flex items-center form-field'>
                        <Text width={'9rem'}>{ estateLabels.TOTAL_AREA }</Text>
                        <TextInput {...props.input} width={'100%'} placeholder={ 'm²' }/>
                      </div>
                      <ErrorMessage fieldErrorMsg={selectErrMsg(errors, 'totalArea')}/>
                    </>
                  )}
                </Field>
                <Field name='builtArea' component="input" parse={value => parseInt(value) || null}>
                  {props => (
                    <>
                      <div className='flex items-center form-field'>
                        <Text width={'9rem'}>{ estateLabels.BUILT_AREA }</Text>
                        <TextInput {...props.input} width={'100%'} placeholder={ 'm²' }/>
                      </div>
                      <ErrorMessage fieldErrorMsg={selectErrMsg(errors, 'builtArea')}/>
                    </>
                  )}
                </Field>
                <Field name='numberOfBedrooms' component="input" parse={value => parseInt(value) || null}>
                  {props => (
                    <>
                      <div className='flex items-center form-field'>
                        <Text width={'9rem'}>{ featuresLabels.BEDROOMS }</Text>
                        <TextInput {...props.input} width={'100%'} placeholder={ featuresLabels.NUMBER_OF_BEDROOMS }/>
                      </div>
                      <ErrorMessage fieldErrorMsg={selectErrMsg(errors, 'numberOfBedrooms')}/>
                    </>
                  )}
                </Field>
                <Field name='numberOfBathrooms' component="input" parse={value => parseInt(value) || null}>
                  {props => (
                    <>
                      <div className='flex items-center form-field'>
                        <Text width={'9rem'}>{ featuresLabels.BATHROOMS }</Text>
                        <TextInput {...props.input} width={'100%'} placeholder={ featuresLabels.NUMBER_OF_BATHROOMS }/>
                      </div>
                      <ErrorMessage fieldErrorMsg={selectErrMsg(errors, 'numberOfBathrooms')}/>
                    </>
                  )}
                </Field>
                <Field name='numberOfGarages' component="input" parse={value => parseInt(value) || null}>
                  {props => (
                    <>
                      <div className='flex items-center form-field'>
                        <Text width={'9rem'}>{ featuresLabels.GARAGES }</Text>
                        <TextInput {...props.input} width={'100%'} placeholder={ featuresLabels.NUMBER_OF_GARAGES }/>
                      </div>
                      <ErrorMessage fieldErrorMsg={selectErrMsg(errors, 'numberOfGarages')}/>
                    </>
                  )}
                </Field>
                <Field name='numberOfKitchens' component="input" parse={value => parseInt(value) || null}>
                  {props => (
                    <>
                      <div className='flex items-center form-field'>
                        <Text width={'9rem'}>{ featuresLabels.KITCHENS }</Text>
                        <TextInput {...props.input} width={'100%'} placeholder={ featuresLabels.NUMBER_OF_KITCHENS }/>
                      </div>
                      <ErrorMessage fieldErrorMsg={selectErrMsg(errors, 'numberOfKitchens')}/>
                    </>
                  )}
                </Field>
                <Field name='haveNaturalGas' component='select' parse={value => value === 'null' ? null : (value === 'true')}>
                  {props => (
                    <>
                      <div className='flex items-center form-field radio-group'>
                        <Text width={'9rem'}>{ featuresLabels.NATURAL_GAS }</Text>
                        <Select
                          value={props.input.value}
                          onChange={e => props.input.onChange(e.target.value)}
                          width={'100%'}
                          flex={'initial'}
                        >
                          <option value={'null'}>{ownerPreferencesLabels.DONT_HAVE_THAT_INFORMATION_YET}</option>
                          <option value={true}>{ownerPreferencesLabels.YES}</option>
                          <option value={false}>{ownerPreferencesLabels.NO}</option>
                        </Select>
                      </div>
                      <ErrorMessage fieldErrorMsg={selectErrMsg(errors, 'haveNaturalGas')}/>
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
                        className='form-field'
                      />
                      <ErrorMessage fieldErrorMsg={selectErrMsg(errors, 'estateDetails')}/>
                    </>
                  )}
                </Field>
              </Pane>
              <Button width={'100%'} type='submit' appearance="primary" id='submit-btn'>
                { listingLabels.ADD_NEW_LISTING }
              </Button>
            </form>
          )
        }}
      />
    )
};

export default ListingForm;
