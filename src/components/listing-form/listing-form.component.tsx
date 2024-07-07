import React, { useState, useEffect, useRef, Dispatch, SetStateAction } from "react";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";
import { Pane, Tablist, Tab } from "evergreen-ui";

import Input from "../input/input.component";
import ContractTypeBlock from "./subcomponents/contract-type-block.subcomponent";
import FormBlock from "./subcomponents/form-block.subcomponent";
import FormSubmit from "../form-submit/form-submit.component";
import FieldErrorMessage from "../field-error-message/field-error-message.component";

import { Presets, Listing } from "../../pages/listing-page/listing-page.types";

import { LISTING_FORM_INITIAL_STATE } from "./listing-form.consts";
import { onSubmitListingData } from './listing-form.api';
import { useResetOnPathChange } from "./listing-form.utils";
import "./listing-form.styles.css";

import useRelativeHeight from '../../hooks/use-relative-height';
import useCalculateAppWidth from "../../hooks/use-calculate-app-width";
import useGenerateForm from "../../hooks/use-generate-form";
import Form from "../form/form.component";

type ListingFormProps = {
  dataPresets: Presets | undefined;
  listing?: Listing | undefined;
  setListing: Dispatch<SetStateAction<Listing | undefined>>;
};

const ListingForm = ({ dataPresets, listing, setListing }: ListingFormProps) => {
  
  const location = useLocation();
  const { t } = useTranslation(['listing', 'client', 'ui']);
  const [selectedMode, setSelectedMode] = useState<number>(1);
  const formWrapperRef = useRef<HTMLDivElement | null>(null);
  const formHeight = useRelativeHeight(formWrapperRef, { extraSpace: 60 });
  const appWidth = useCalculateAppWidth();

  const {
    handleSubmit, 
    watch, 
    reset, 
    setError, 
    formState: { errors },
    inputCommonProps, 
    controlledCommonProps 
  } = useGenerateForm<Listing>(LISTING_FORM_INITIAL_STATE, listing);

  useResetOnPathChange<Listing>(reset, LISTING_FORM_INITIAL_STATE)

  // useEffect(() => {
  //   if (location.pathname === "/newlisting") {
  //     reset(LISTING_FORM_INITIAL_STATE)
  //   }
  // }, [location.pathname]);

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
        <Form
          onSubmit={handleSubmit(listingData => onSubmitListingData(listingData, setListing, setError))}
        >
          <FormBlock title={ t('owner', { ns: 'client' }) }>
            <Input name='clientName' type='text' label={ t('clientName', { ns: 'client' }) } { ...inputCommonProps }/>
            <Input name='clientContactPhone' type="text" label={ t('contactPhone', { ns: 'client' }) } { ...inputCommonProps } />
          </FormBlock>
          <FormBlock title={ t('location') }>
            <Input name="district" type="text" label={ t('district') } { ...inputCommonProps } />
            { selectedMode === 1 &&
            <>
              <Input name="neighborhood" type="text" label={ t('neighborhood') } { ...inputCommonProps } />
              <Input name="addressDetails" type="text" label={ t('addressDetails') } { ...inputCommonProps } />
            </>
            }
          </FormBlock>
          <FormBlock title={ t('contract') }>
            <ContractTypeBlock 
              selectOptions={ dataPresets?.contractTypes }
              { ...controlledCommonProps }
            />
          </FormBlock>
          {
            watch("contractTypeId") === 2 && selectedMode === 1 && (
            <FormBlock title={ t('preferenceDetails') }>
              <Input name="petsAllowed" type="checkbox" label={ t('petsAllowed') } { ...controlledCommonProps } />
              <Input name="childrenAllowed" type="checkbox" label={ t('childrenAllowed') } { ...controlledCommonProps } />
              <Input name='ownerPreferencesDetails' type="textarea" label={ t('preferenceDetails') } { ...inputCommonProps } />
            </FormBlock>
            )
          }
          <FormBlock title={ t('estate') }>
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
                <Input name="haveNaturalGas" type="checkbox" label={ t('naturalGas') } { ...controlledCommonProps } />
                <Input name='estateDetails' type="textarea" label={ t('estateDetails') } { ...inputCommonProps } />
              </>
            }
          </FormBlock>
          {
            errors && <FieldErrorMessage message={t('errorGenericMessage')} />
          }
          <FormSubmit
            text={ location.pathname === "/newlisting" ? t('addNewListing') : t('commitChanges')  } 
          />
        </Form>
      </Pane>
    </Pane>
  );
};

export default ListingForm;
