import React, { useState, useEffect, useRef, Dispatch, SetStateAction } from "react";
import { useTranslation } from "react-i18next";
import { AxiosError } from "axios";
import { useSelector } from "react-redux";

import { FormApi } from "final-form";
import { useForm } from "react-hook-form";

import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  Button,
  Pane,
  Text,
  Tablist,
  Tab,
} from "evergreen-ui";

import useRelativeHeight from '../../hooks/use-relative-height';
import useWindowDimensions from '../../hooks/use-window-dimensions';

import Input from "../input/input.component";
import ContractTypeBlock from "./contract-type-block.subcomponent";

import { selectCurrentUserId } from "../../redux/user/user.selectors";
import FieldErrorMessage from "../field-error-message/field-error-message.component";
import "./listing-form.styles.css";
import { Presets, Listing, ListingWithoutIds } from "../../pages/listing-page/listing-page.types";
import { ValidationError } from "../../redux/redux.types";
import { DESKTOP_BREAKPOINT_VALUE } from "../../constants/breakpoints.constants";
import { LISTING_FORM_INITIAL_STATE } from "./listing-form.consts";
import useCalculateAppWidth from "../../hooks/use-calculate-app-width";
import { onSubmitListingData } from './listing-form.api';

type ListingFormProps = {
  dataPresets: Presets | undefined;
  listing?: Listing | undefined;
  setListing: Dispatch<SetStateAction<Listing | undefined>>;
};

const ListingForm = ({ dataPresets, listing, setListing }: ListingFormProps) => {
  
  const location = useLocation();
  const formRef = useRef<FormApi>();
  const { t } = useTranslation(['listing', 'client', 'ui']);
  const [errors, setErrors] = useState<AxiosError<{ validationErrors: ValidationError[] }>>();
  const [selectedMode, setSelectedMode] = useState<number>(1);
  const formWrapperRef = useRef<HTMLDivElement | null>(null);
  const formHeight = useRelativeHeight(formWrapperRef, { extraSpace: 60 });
  const { windowInnerWidth } = useWindowDimensions();
  const appWidth = useCalculateAppWidth();

  const { register, handleSubmit, watch, control } = useForm<Listing>({
    defaultValues: LISTING_FORM_INITIAL_STATE,
    values: listing
  });

  const inputCommonProps = { register, errors };

  const checkboxCommonProps = {
    ...inputCommonProps,
    control,
  };

  useEffect(() => {
    if (location.pathname === "/newlisting" && formRef.current) {
      formRef.current.reset(LISTING_FORM_INITIAL_STATE);
    }
  }, [location.pathname]);

  const onSubmit = (values: any) => { console.log(values); };

  return (
    <Pane width={ appWidth } marginX={ 'auto' }>
      <Tablist width={"100%"} marginBottom={'.5rem'} display={"flex"} className="tablist">
        {[t('basic', { ns: 'listing' }), t('detailed', { ns: 'listing' })].map((tab, index) => (
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
      <Pane
        ref={formWrapperRef}
        overflow={'scroll'}
        height={formHeight}
      >
        <form
          className="form flex flex-column pa3"
          onSubmit={handleSubmit((listingData) => onSubmitListingData(listingData, setListing, setErrors))}
          /* onSubmit={handleSubmit(onSubmit)} */
          encType="multipart/form-data"
          method="post"
        >
          <Pane
            position={"relative"}
            elevation={0}
            padding={20}
            className="form-category"
          >
            <Text size={600} className="form-category-header">{ t('owner', { ns: 'client' }) }</Text>
            <Input name='clientName' type='text' label={ t('clientName', { ns: 'client' }) } { ...inputCommonProps }/>
            <Input name='clientContactPhone' type="text" label={ t('contactPhone', { ns: 'client' }) } { ...inputCommonProps } />
          </Pane>
          <Pane
            position={"relative"}
            elevation={0}
            padding={20}
            className="form-category"
          >
            <Text size={600} className="form-category-header">
              { t('location', { ns: 'listing' }) } 
            </Text>
            <Input name="district" type="text" label={ t('district') } { ...inputCommonProps } />
            { selectedMode === 1 &&
            <>
              <Input name="neighborhood" type="text" label={ t('neighborhood') } { ...inputCommonProps } />
              <Input name="addressDetails" type="text" label={ t('addressDetails') } { ...inputCommonProps } />
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
              { t('contract') } 
            </Text>
            <ContractTypeBlock 
              selectOptions={ dataPresets?.contractTypes }
              { ...checkboxCommonProps }
            />
          </Pane>
          {
            watch("contractTypeId") === 2 && selectedMode === 1 && (
              <Pane
                position={"relative"}
                elevation={0}
                padding={20}
                className="form-category"
              >
                <Text size={600} className="form-category-header">
                  { t('preferenceDetails') }
                </Text>
                <Pane display="flex">
                  <Input name="petsAllowed" type="checkbox" label={ t('petsAllowed') } { ...checkboxCommonProps } />
                  <Input name="childrenAllowed" type="checkbox" label={ t('childrenAllowed') } { ...checkboxCommonProps } />
                </Pane>
                <Input name='ownerPreferencesDetails' type="textarea" label={ t('preferenceDetails') } { ...inputCommonProps } />
              </Pane>
            )
          }
          <Pane
            position={"relative"}
            elevation={0}
            padding={20}
            className="form-category"
          >
            <Text size={600} className="form-category-header">
              { t('estate', { ns: 'listing' }) }
            </Text>
            <Input 
              name="estateTypeId" 
              type="select" 
              label={ t('estateType') } 
              selectOptions={ dataPresets?.estateTypes } 
              optionLabelKey="estateName" 
              optionValueKey="estateTypeId"
              { ...inputCommonProps }
            />
            { watch('estateTypeId') === 1 ? (
                <Input name='numberOfFloors' type='number' label={ t('floors') } { ...inputCommonProps }/>
              ) : (
                <Input name='floorLocation' type='number' label={ t('floor') } { ...inputCommonProps }/>
              )
            }
            { selectedMode === 1 &&
              <>
                <Input name='totalArea' type='number' label={ t('totalArea') } placeholder={ 'm²' } { ...inputCommonProps }/>
                <Input name='builtArea' type='number' label={ t('builtArea') } placeholder={ 'm²' } { ...inputCommonProps }/>
                <Input name='numberOfBedrooms' type='number' label={ t('numberOfBedrooms') } { ...inputCommonProps }/>
                <Input name='numberOfBathrooms' type='number' label={ t('numberOfBathrooms') } { ...inputCommonProps }/>
                <Input name='numberOfGarages' type='number' label={ t('numberOfGarages') } { ...inputCommonProps }/>
                <Input name='numberOfKitchens' type='number' label={ t('numberOfKitchens') } { ...inputCommonProps }/>
                <Input name="haveNaturalGas" type="checkbox" label={ t('naturalGas') } { ...checkboxCommonProps } />
                <Input name='estateDetails' type="textarea" label={ t('estateDetails') } { ...inputCommonProps } />
              </>
            }
          </Pane>
          {
            errors && <FieldErrorMessage message={t('errorGenericMessage')} />
          }
          <Pane
            position={'absolute'}
            display={'flex'}
            justifyContent={'center'}
            width={'100%'}
            bottom={10} left={0}
          >
            <Button
              width={windowInnerWidth > DESKTOP_BREAKPOINT_VALUE ? 400 : '90%'}
              height={40}
              type="submit"
              appearance="primary"
              id="submit-btn"
            >
              { listing ? t('commitChanges', { ns: 'listing' }) : t('addNewListing', { ns: 'listing' }) }
            </Button>
          </Pane>
          </form>
      </Pane>
    </Pane>
  );
};

export default ListingForm;
