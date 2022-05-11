import React, { useState, useEffect, useRef } from "react";
import http from "../../utils/axios-instance";
import { AxiosError } from "axios";
import { useSelector } from "react-redux";
import { selectCurrentUserId } from "../../redux/user/user.selectors";
import { Form, Field, FormSpy } from "react-final-form";
import { FormApi } from "final-form";
import { useLocation, useNavigate } from "react-router-dom";
import {
  selectValidationErrMsg,
  presetSelector,
} from "../../utils/utility-functions";
import ErrorMessage from "../error-messages/error-messages.component";
import DayPickerInput from "react-day-picker/DayPickerInput";
import {
  estateLabels,
  ownerLabels,
  contractLabels,
  locationLabels,
  featuresLabels,
  listingLabels,
  ownerPreferencesLabels,
} from "../../constants/language/english/english-labels.constants";
import {
  Button,
  Pane,
  TextInput,
  Checkbox,
  Text,
  Textarea,
  Select,
  Tablist,
  Tab,
} from "evergreen-ui";
import "react-day-picker/lib/style.css";
import "./listing-form.styles.css";
import { Presets, Listing } from "../../pages/listing-page/listing-page.types";
import { ValidationError } from "../../redux/redux.types";

const formInitialState = {
  contractTypeId: 1,
  currencyTypeId: 1,
  estateTypeId: 1,
  isPercentage: false,
  isExclusive: false,
};

type ListingFormProps = {
  dataPresets: Presets | undefined;
  listing?: Listing | undefined;
  setListing: React.Dispatch<React.SetStateAction<Listing | undefined>>;
};

const ListingForm = ({ dataPresets, listing, setListing }: ListingFormProps) => {
  
  const userId = useSelector(selectCurrentUserId);
  const location = useLocation();
  const navigate = useNavigate();
  const formRef = useRef<FormApi>();
  const [errors, setErrors] = useState<AxiosError<{ validationErrors: ValidationError[] }>>();
  const [selectedMode, setSelectedMode] = useState<number>(0);

  useEffect(() => {
    if (location.pathname === "/newlisting" && formRef.current) {
      formRef.current.reset(formInitialState);
    }
  }, [location.pathname]);

  const onSubmit = async (values: Partial<Listing>): Promise<void> => {
    console.log("submitting values: ", values);

    const { clientId, estateId, contractId } = values;
    const formKeys: string[] = Object.keys(values);

    const remainingProps: Omit<Listing, "clientId" | "estateId" | "contractId"> = formKeys.reduce((acc, current) => {
      if (!(current === "clientId" || current === "estateId" || current === "contractId")) {
        return { ...acc, [current]: values[current] };
      } else {
        return acc;
      }
    }, {});

    try {
      const res = location.pathname === `/newlisting`
        ? await http.post<Listing>(`/newlisting/${userId}`, remainingProps)
        : await http.put<Listing>(`editlisting/${userId}/${clientId}/${estateId}/${contractId}`, remainingProps);
      setListing(res.data);
      navigate(`/listingdetail/${res.data.estateId}`);
    } catch (err) {
      setErrors(err as AxiosError<{ validationErrors: ValidationError[] }>);
    }
  };

  return (
    <Form
      initialValues={listing || formInitialState}
      onSubmit={onSubmit}
      subscription={{ submitting: true, pristine: true }}
      render={({ handleSubmit, form, values }) => {
        formRef.current = form;
        return (
          <>
            <Tablist width={"100%"} marginBottom={'.5rem'} display={"flex"} className="tablist">
              {["Basic", "Detailed"].map((tab, index) => (
                <Tab
                  key={tab}
                  id={tab}
                  onSelect={() => setSelectedMode(index)}
                  isSelected={index === selectedMode}
                  aria-controls={`panel-${tab}`}
                  flex={1}
                  height={"2.5rem"}
                  borderRadius={0}
                >
                  {tab}
                </Tab>
              ))}
            </Tablist>
            <form
              className="form flex flex-column pa3"
              onSubmit={handleSubmit}
              encType="multipart/form-data"
              method="post"
            >
              <Pane
                position={"relative"}
                elevation={0}
                padding={20}
                className="form-category"
              >
                <Text size={600} className="form-category-header">{ownerLabels.OWNER}</Text>
                <Field name="clientName" component="input">
                  {(props) => (
                    <>
                      <div className="flex items-center form-field">
                        <Text width={"9rem"}>{ownerLabels.NAME}</Text>
                        <TextInput
                          {...props.input}
                          placeholder={ownerLabels.OWNER_NAME}
                          width={"100%"}
                          className="form-field"
                        />
                      </div>
                      <ErrorMessage
                        fieldErrorMsg={selectValidationErrMsg(
                          errors,
                          "clientName"
                        )}
                      />
                    </>
                  )}
                </Field>
                <Field name="clientContactPhone" component="input" parse={ (value) => parseInt(value) || null }>
                  {(props) => (
                    <>
                      <div className="flex items-center form-field">
                        <Text width={"9rem"}>{ownerLabels.PHONE}</Text>
                        <TextInput
                          {...props.input}
                          placeholder={ownerLabels.OWNER_CONTACT_PHONE}
                          width={"100%"}
                          className="form-field"
                        />
                      </div>
                      <ErrorMessage
                        fieldErrorMsg={selectValidationErrMsg(
                          errors,
                          "clientContactPhone"
                        )}
                      />
                    </>
                  )}
                </Field>
              </Pane>
              <Pane
                position={"relative"}
                elevation={0}
                padding={20}
                className="form-category"
              >
                <Text size={600} className="form-category-header">
                  {locationLabels.LOCATION}
                </Text>
                <Field name="district" component="input">
                  {(props) => (
                    <>
                      <div className="flex items-center form-field">
                        <Text width={"9rem"}>{locationLabels.DISTRICT}</Text>
                        <TextInput {...props.input} placeholder={locationLabels.DISTRICT} width={"100%"} className="form-field" />
                      </div>
                      <ErrorMessage fieldErrorMsg={selectValidationErrMsg(errors, "district")} />
                    </>
                  )}
                </Field>
                { selectedMode === 1 &&
                  <>
                    <Field name="neighborhood" component="input">
                    {(props) => (
                      <>
                        <div className="flex items-center form-field">
                        <Text width={"9rem"}>{locationLabels.NEIGHBORHOOD}</Text>
                        <TextInput
                          {...props.input}
                          placeholder={locationLabels.NEIGHBORHOOD}
                          width={"100%"}
                          className="form-field"
                        />
                        </div>
                      <ErrorMessage fieldErrorMsg={selectValidationErrMsg(errors, "neighborhood")}
                      />
                  </>
                  )}
                    </Field>
                  <Field name="addressDetails" component="input">
                  {(props) => (
                    <>
                      <div className="flex items-center form-field">
                      <Text width={"9rem"}>{locationLabels.DETAILS}</Text>
                      <TextInput
                        {...props.input}
                        placeholder={locationLabels.ADDRESS_DETAILS}
                        width={"100%"}
                        className="form-field"
                      />
                      </div>
                    <ErrorMessage
                    fieldErrorMsg={selectValidationErrMsg(
                      errors,
                      "addressDetails"
                      )}
                    />
                    </>
                  )}
                    </Field>
                  </>
              }
              </Pane>
              <Pane
                position={"relative"}
                elevation={0}
                padding={20}
                className="form-category"
              >
                <Text size={600} className="form-category-header">
                  {contractLabels.CONTRACT}
                </Text>
                <div className="flex items-center form-field">
                  <Text width={"9rem"}>{contractLabels.CONTRACT_TYPE}</Text>
                  <div className="flex w-100">
                    <Field
                      name="contractTypeId"
                      component="input"
                      parse={(value) => parseInt(value) || null}
                    >
                      {(props) => (
                        <Select
                          value={props.input.value}
                          onChange={(e) => props.input.onChange(e.target.value)}
                          width={"100%"}
                          flex={"initial"}
                        >
                          {dataPresets?.contractTypes.map((contract, idx) => (
                            <option key={idx} value={contract.contractTypeId}>
                              {contract.contractName}
                            </option>
                          ))}
                        </Select>
                      )}
                    </Field>
                    <Field name="isExclusive" type={"checkbox"}>
                      {(props) => (
                        <Checkbox
                          flex={1}
                          width={"100%"}
                          whiteSpace={"nowrap"}
                          margin={0}
                          marginLeft={"1rem"}
                          display={"flex"}
                          alignItems={"center"}
                          label="Exclusive"
                          checked={props.input.checked}
                          onChange={(e) => props.input.onChange(e.target.checked)}
                        />
                      )}
                    </Field>
                  </div>
                </div>

                <ErrorMessage
                  fieldErrorMsg={selectValidationErrMsg(errors, "contractTypeId")}
                />
                <Field
                  name="currencyTypeId"
                  component="input"
                  parse={(value) => parseInt(value)}
                >
                  {(props) => (
                    <div className="flex items-center form-field">
                      <Text width={"9rem"}>{contractLabels.CURRENCY}</Text>
                      <Select
                        value={props.input.value}
                        onChange={(e) => props.input.onChange(e.target.value)}
                        width={"100%"}
                        flex={"initial"}
                      >
                        {dataPresets?.currencyTypes.map((currency, idx) => (
                          <option key={idx} value={currency.currencyTypeId}>
                            {currency.currencyName}
                          </option>
                        ))}
                      </Select>
                    </div>
                  )}
                </Field>
                <div className="flex items-center form-field">
                  <FormSpy subscription={{ values: true }}>
                    {({ values }) => {
                      console.log(values);                    
                      return (
                        <Field
                          name="estatePrice"
                          component="input"
                          parse={(value) => parseInt(value) || null}
                        >
                          {(props) => (
                            <>
                              <Text width={"9rem"}>
                                {values.contractTypeId === 1
                                  ? contractLabels.ESTATE_PRICE
                                  : contractLabels.RENT}
                              </Text>
                              <div className="flex items-center w-100">
                                <Text
                                  flex={1}
                                  width={"100%"}
                                  marginRight={"0.3rem"}
                                >
                                  {dataPresets &&
                                    presetSelector(
                                      dataPresets.currencyTypes,
                                      values.currencyTypeId as number,
                                      "currency"
                                  )}
                                </Text>
                                <TextInput
                                  {...props.input}
                                  placeholder={
                                    values.contractTypeId === 1
                                      ? contractLabels.ESTATE_PRICE
                                      : contractLabels.RENT_COST
                                  }
                                  width={"100%"}
                                  flex={9}
                                />
                              </div>
                              <ErrorMessage
                                fieldErrorMsg={selectValidationErrMsg(
                                  errors,
                                  "price"
                                )}
                              />
                            </>
                          )}
                        </Field>
                    )}}
                  </FormSpy>
                </div>
                <FormSpy subscription={{ values: true }}>
                  {({ values }) =>
                    values.contractTypeId === 2 && (
                      <Field
                        name="utilitiesIncluded"
                        component="input"
                        parse={(value) =>
                          value === "null" ? null : value === "true"
                        }
                      >
                        {(props) => (
                          <div className="flex items-center form-field">
                            <Text width={"9rem"}>{contractLabels.UTILITIES}</Text>
                            <Select
                              value={props.input.value}
                              onChange={(e) =>
                                props.input.onChange(e.target.value)
                              }
                              width={"100%"}
                              flex={"initial"}
                            >
                              <option value={"null"}>
                                {
                                  ownerPreferencesLabels.DONT_HAVE_THAT_INFORMATION_YET
                                }
                              </option>
                              <option value={"true"}>
                                {ownerPreferencesLabels.YES}
                              </option>
                              <option value={"false"}>
                                {ownerPreferencesLabels.NO}
                              </option>
                            </Select>
                          </div>
                        )}
                      </Field>
                    )
                  }
                </FormSpy>
                <div className="flex items-center form-field">
                  <Text width={"9rem"}>{contractLabels.FEE}</Text>
                  <div className="flex items-center w-100">
                    <FormSpy subscription={{ values: true }}>
                      {({ values }) => (
                        <Field
                          name="fee"
                          component="input"
                          parse={(value) => parseInt(value) || null}
                        >
                          {(props) => (
                            <>
                              <Text
                                flex={1}
                                width={"100%"}
                                marginRight={"0.3rem"}
                              >
                                {values.isPercentage
                                  ? "%"
                                  : dataPresets &&
                                    presetSelector(
                                      dataPresets.currencyTypes,
                                      values.currencyTypeId as number,
                                      "currency"
                                    )}
                              </Text>
                              <TextInput
                                {...props.input}
                                placeholder={contractLabels.FEE}
                                flex={4}
                                width={"100%"}
                              />
                            </>
                          )}
                        </Field>
                      )}
                    </FormSpy>
                    <Field name="isPercentage" type={"checkbox"}>
                      {(props) => (
                        <Checkbox
                          flex={5}
                          width={"100%"}
                          whiteSpace={"nowrap"}
                          margin={0}
                          marginLeft={"1rem"}
                          display={"flex"}
                          justifyContent={"end"}
                          alignItems={"center"}
                          label="Percentage"
                          checked={props.input.checked}
                          onChange={(e) => props.input.onChange(e.target.checked)}
                        />
                      )}
                    </Field>
                  </div>
                </div>
                <ErrorMessage
                  fieldErrorMsg={selectValidationErrMsg(errors, "fee")}
                />
                { selectedMode === 1 &&
                  <>
                    <Field name="signedDate" component="input">
                    {(props) => (
                      <div className="flex items-center form-field">
                      <Text
                        width={"9rem"}
                      >{`${contractLabels.SIGNED_DATE}:`}</Text>
                      <DayPickerInput
                        value={props.input.value}
                        onDayChange={(newDate) => props.input.onChange(newDate)}
                      />
                      </div>
                    )}
                      </Field>
                  <ErrorMessage
                    fieldErrorMsg={selectValidationErrMsg(errors, "signedDate")}
                  />
                    <Field name="startDate" component="input">
                    {(props) => (
                      <div className="flex items-center form-field">
                      <Text
                        width={"9rem"}
                      >{`${contractLabels.START_DATE}:`}</Text>
                      <DayPickerInput
                        value={props.input.value}
                        onDayChange={(newDate) => props.input.onChange(newDate)}
                      />
                      </div>
                    )}
                      </Field>
                  <ErrorMessage
                    fieldErrorMsg={selectValidationErrMsg(errors, "startDate")}
                  />
                    <Field name="endDate" component="input">
                    {(props) => (
                      <div className="flex items-center form-field">
                      <Text width={"9rem"}>{`${contractLabels.END_DATE}:`}</Text>
                      <DayPickerInput
                        value={props.input.value}
                        onDayChange={(newDate) => props.input.onChange(newDate)}
                      />
                      </div>
                    )}
                      </Field>
                  <ErrorMessage
                    fieldErrorMsg={selectValidationErrMsg(errors, "endDate")}
                  />
                </>
              }
              </Pane>
              <FormSpy subscription={{ values: true }}>
                {({ values }) =>
                  values.contractTypeId === 2 && selectedMode === 1 && (
                    <Pane
                      position={"relative"}
                      elevation={0}
                      padding={20}
                      className="form-category"
                    >
                      <Text size={600} className="form-category-header">
                        {ownerPreferencesLabels.OWNER_PREFERENCES}
                      </Text>
                      <Field
                        name="petsAllowed"
                        component="input"
                        parse={(value) =>
                          value === "null" ? null : value === "true"
                        }
                      >
                        {(props) => (
                          <div className="flex items-center form-field">
                            <Text width={"9rem"}>
                              {ownerPreferencesLabels.PETS_ALLOWED}
                            </Text>
                            <Select
                              value={props.input.value}
                              onChange={(e) =>
                                props.input.onChange(e.target.value)
                              }
                              width={"100%"}
                              flex={"initial"}
                            >
                              <option value={"null"}>
                                {
                                  ownerPreferencesLabels.DONT_HAVE_THAT_INFORMATION_YET
                                }
                              </option>
                              <option value={"true"}>
                                {ownerPreferencesLabels.YES}
                              </option>
                              <option value={"false"}>
                                {ownerPreferencesLabels.NO}
                              </option>
                            </Select>
                            <ErrorMessage
                              fieldErrorMsg={selectValidationErrMsg(
                                errors,
                                "petsAllowed"
                              )}
                            />
                          </div>
                        )}
                      </Field>
                      <Field
                        name="childrenAllowed"
                        component="input"
                        parse={(value) =>
                          value === "null" ? null : value === "true"
                        }
                      >
                        {(props) => (
                          <div className="flex items-center form-field">
                            <Text width={"9rem"}>
                              {ownerPreferencesLabels.CHILDREN_ALLOWED}
                            </Text>
                            <Select
                              value={props.input.value}
                              onChange={(e) =>
                                props.input.onChange(e.target.value)
                              }
                              width={"100%"}
                              flex={"initial"}
                            >
                              <option value={"null"}>
                                {
                                  ownerPreferencesLabels.DONT_HAVE_THAT_INFORMATION_YET
                                }
                              </option>
                              <option value={"true"}>
                                {ownerPreferencesLabels.YES}
                              </option>
                              <option value={"false"}>
                                {ownerPreferencesLabels.NO}
                              </option>
                            </Select>
                            <ErrorMessage
                              fieldErrorMsg={selectValidationErrMsg(
                                errors,
                                "childrenAllowed"
                              )}
                            />
                          </div>
                        )}
                      </Field>
                      <Field name="ownerPreferencesDetails" component="input">
                        {(props) => (
                          <>
                            <Textarea
                              {...props.input}
                              placeholder={
                                ownerPreferencesLabels.PREFERENCE_DETAILS
                              }
                              width={"100%"}
                              className="form-field"
                            />
                            <ErrorMessage
                              fieldErrorMsg={selectValidationErrMsg(
                                errors,
                                "ownerPreferencesDetails"
                              )}
                            />
                          </>
                        )}
                      </Field>
                    </Pane>
                  )
                }
              </FormSpy>
              <Pane
                position={"relative"}
                elevation={0}
                padding={20}
                className="form-category"
              >
                <Text size={600} className="form-category-header">
                  {estateLabels.ESTATE}
                </Text>
                <Field
                  name="estateTypeId"
                  component="input"
                  parse={(value) => parseInt(value) || null}
                >
                  {(props) => (
                    <>
                      <div className="flex items-center form-field">
                        <Text width={"9rem"}>{estateLabels.ESTATE_TYPE}</Text>
                        <Select
                          {...props.input}
                          value={props.input.value}
                          onChange={(e) => props.input.onChange(e.target.value)}
                          width={"100%"}
                          flex={"initial"}
                        >
                          {dataPresets &&
                            dataPresets.estateTypes.map((estate, idx) => (
                              <option key={idx} value={estate.estateTypeId}>
                                {estate.estateName}
                              </option>
                            ))}
                        </Select>
                      </div>
                      <ErrorMessage
                        fieldErrorMsg={selectValidationErrMsg(
                          errors,
                          "estateTypeId"
                        )}
                      />
                    </>
                  )}
                </Field>
                <FormSpy subscription={{ values: true }}>
                  {({ values }) =>
                    values.estateTypeId === 1 ? (
                      <Field
                        name="numberOfFloors"
                        component="input"
                        parse={(value) => parseInt(value) || null}
                      >
                        {(props) => (
                          <>
                            <div className="flex items-center form-field">
                              <Text width={"9rem"}>{estateLabels.FLOORS}</Text>
                              <TextInput
                                {...props.input}
                                width={"100%"}
                                placeholder={estateLabels.NUMBER_OF_FLOORS}
                              />
                            </div>
                            <ErrorMessage
                              fieldErrorMsg={selectValidationErrMsg(
                                errors,
                                "numberOfFloors"
                              )}
                            />
                          </>
                        )}
                      </Field>
                    ) : (
                      <Field
                        name="floorLocation"
                        component="input"
                        parse={(value) => parseInt(value) || null}
                      >
                        {(props) => (
                          <>
                            <div className="flex items-center form-field">
                              <Text width={"9rem"}>{estateLabels.FLOOR}</Text>
                              <TextInput
                                {...props.input}
                                width={"100%"}
                                placeholder={estateLabels.FLOOR_LOCATION}
                              />
                            </div>
                            <ErrorMessage
                              fieldErrorMsg={selectValidationErrMsg(
                                errors,
                                "floorLocation"
                              )}
                            />
                          </>
                        )}
                      </Field>
                    )
                  }
                </FormSpy>
                { selectedMode === 1 &&
                  <>
                    <Field
                      name="totalArea"
                      component="input"
                      parse={(value) => parseInt(value) || null}
                    >
                      {(props) => (
                        <>
                          <div className="flex items-center form-field">
                            <Text width={"9rem"}>{estateLabels.TOTAL_AREA}</Text>
                            <TextInput
                              {...props.input}
                              width={"100%"}
                              placeholder={"m²"}
                            />
                          </div>
                          <ErrorMessage
                            fieldErrorMsg={selectValidationErrMsg(
                              errors,
                              "totalArea"
                            )}
                          />
                        </>
                      )}
                    </Field>
                      <Field
                        name="builtArea"
                        component="input"
                        parse={(value) => parseInt(value) || null}
                      >
                        {(props) => (
                          <>
                            <div className="flex items-center form-field">
                              <Text width={"9rem"}>{estateLabels.BUILT_AREA}</Text>
                              <TextInput
                                {...props.input}
                                width={"100%"}
                                placeholder={"m²"}
                              />
                            </div>
                            <ErrorMessage
                              fieldErrorMsg={selectValidationErrMsg(
                                errors,
                                "builtArea"
                              )}
                            />
                          </>
                        )}
                      </Field>
                  <Field
                    name="numberOfBedrooms"
                    component="input"
                    parse={(value) => parseInt(value) || null}
                  >
                    {(props) => (
                      <>
                        <div className="flex items-center form-field">
                          <Text width={"9rem"}>{featuresLabels.BEDROOMS}</Text>
                          <TextInput
                            {...props.input}
                            width={"100%"}
                            placeholder={featuresLabels.NUMBER_OF_BEDROOMS}
                          />
                        </div>
                        <ErrorMessage
                          fieldErrorMsg={selectValidationErrMsg(
                            errors,
                            "numberOfBedrooms"
                          )}
                        />
                      </>
                    )}
                  </Field>
                  <Field
                    name="numberOfBathrooms"
                    component="input"
                    parse={(value) => parseInt(value) || null}
                  >
                    {(props) => (
                      <>
                        <div className="flex items-center form-field">
                          <Text width={"9rem"}>{featuresLabels.BATHROOMS}</Text>
                          <TextInput
                            {...props.input}
                            width={"100%"}
                            placeholder={featuresLabels.NUMBER_OF_BATHROOMS}
                          />
                        </div>
                        <ErrorMessage
                          fieldErrorMsg={selectValidationErrMsg(
                            errors,
                            "numberOfBathrooms"
                          )}
                        />
                      </>
                    )}
                  </Field>
                  <Field
                    name="numberOfGarages"
                    component="input"
                    parse={(value) => parseInt(value) || null}
                  >
                    {(props) => (
                      <>
                        <div className="flex items-center form-field">
                          <Text width={"9rem"}>{featuresLabels.GARAGES}</Text>
                          <TextInput
                            {...props.input}
                            width={"100%"}
                            placeholder={featuresLabels.NUMBER_OF_GARAGES}
                          />
                        </div>
                        <ErrorMessage
                          fieldErrorMsg={selectValidationErrMsg(
                            errors,
                            "numberOfGarages"
                          )}
                        />
                      </>
                    )}
                  </Field>
                  <Field
                    name="numberOfKitchens"
                    component="input"
                    parse={(value) => parseInt(value) || null}
                  >
                    {(props) => (
                      <>
                        <div className="flex items-center form-field">
                          <Text width={"9rem"}>{featuresLabels.KITCHENS}</Text>
                          <TextInput
                            {...props.input}
                            width={"100%"}
                            placeholder={featuresLabels.NUMBER_OF_KITCHENS}
                          />
                        </div>
                        <ErrorMessage
                          fieldErrorMsg={selectValidationErrMsg(
                            errors,
                            "numberOfKitchens"
                          )}
                        />
                      </>
                    )}
                  </Field>
                  <Field
                    name="haveNaturalGas"
                    component="select"
                    parse={(value) => (value === "null" ? null : value === "true")}
                  >
                    {(props) => (
                      <>
                        <div className="flex items-center form-field radio-group">
                          <Text width={"9rem"}>{featuresLabels.NATURAL_GAS}</Text>
                          <Select
                            value={props.input.value}
                            onChange={(e) => props.input.onChange(e.target.value)}
                            width={"100%"}
                            flex={"initial"}
                          >
                            <option value={"null"}>
                            {
                              ownerPreferencesLabels.DONT_HAVE_THAT_INFORMATION_YET
                              }
                            </option>
                            <option value={"true"}>
                              {ownerPreferencesLabels.YES}
                            </option>
                              <option value={"false"}>
                                {ownerPreferencesLabels.NO}
                              </option>
                          </Select>
                        </div>
                              <ErrorMessage
                                fieldErrorMsg={selectValidationErrMsg(
                                  errors,
                                  "haveNaturalGas"
                                )}
                              />
                      </>
                    )}
                  </Field>
                  <Field name="estateDetails" component="input">
                    {(props) => (
                      <>
                        <Textarea
                          placeholder={estateLabels.ESTATE_DETAILS}
                          value={props.input.value}
                          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                            props.input.onChange(e.target.value)
                          }
                          className="form-field"
                        />
                        <ErrorMessage
                          fieldErrorMsg={selectValidationErrMsg(
                            errors,
                            "estateDetails"
                          )}
                        />
                      </>
                    )}
                  </Field>
                </>
              }
              </Pane>
              <Button
                width={"100%"}
                type="submit"
                appearance="primary"
                id="submit-btn"
              >
                {listingLabels.ADD_NEW_LISTING}
              </Button>
            </form>
          </>
        );
      }}
    />
  );
};

export default ListingForm;
