import React, { useState, Dispatch, SetStateAction, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import { Pane, Tablist, Tab, minorScale } from "evergreen-ui";
import useMediaQuery from "@custom-react-hooks/use-media-query";
import { DESKTOP_BREAKPOINT_VALUE } from "../../constants/breakpoints.consts";

import Input from "../input/input.component";
import ContractTypeBlock from "./components/contract-type-block.component";
import FormBlock from "./components/form-block.component";
import FormSubmit from "../form-submit/form-submit.component";
import FieldErrorMessage from "../field-error-message/field-error-message.component";
import PageContainer from "../page-container/page-container";

import { Presets, Listing } from "../../pages/listing-page/listing-page.types";

import { LISTING_FORM_INITIAL_STATE } from "./listing-form.consts";
import { onSubmitListingData } from "./listing-form.api";
import { useResetOnPathChange } from "./listing-form.utils";
import "./listing-form.styles.css";

import useGenerateForm from "../../hooks/use-generate-form";
import Form from "../form/form.component";

type ListingFormProps = {
  presets: Presets | undefined;
  listing?: Listing | undefined;
  setListing?: Dispatch<SetStateAction<Listing | undefined>>;
};

const ListingForm = ({ presets, listing, setListing }: ListingFormProps) => {
  
  const location = useLocation();
  const { t } = useTranslation(["listing", "client", "ui", "error"]);
  const {
    handleSubmit, 
    watch, 
    reset, 
    setError, 
    formState: { errors },
    inputCommonProps, 
    controlledCommonProps 
  } = useGenerateForm<Listing>(LISTING_FORM_INITIAL_STATE, listing || LISTING_FORM_INITIAL_STATE);

  useResetOnPathChange<Listing>(reset, LISTING_FORM_INITIAL_STATE)

  const isDesktop = useMediaQuery(`(min-width: ${DESKTOP_BREAKPOINT_VALUE}px)`);
  const [selectedMode, setSelectedMode] = useState<number>(1);
  const tabs = useMemo(() => [
    t("basic", { ns: "listing" }), 
    t("detailed", { ns: "listing" })
  ], [])

  return (
    <>
      <Tablist display="flex" className="tablist">
        { tabs.map((tab, index) => (
          <Tab
            key={tab}
            onSelect={() => setSelectedMode(index)}
            isSelected={index === selectedMode}
            flex={1}
            borderRadius={0}
            paddingY={minorScale(5)}
          >
            {tab}
          </Tab>
        ))}
      </Tablist>
      <Form
        id="listing-form"
        onSubmit={handleSubmit(data => onSubmitListingData(setError, data, setListing))}
        flexDirection={ isDesktop ? "row" : "column" }
        gap={minorScale(8)}
      >
        <Pane flex={1}>
          <FormBlock title={ t("owner", { ns: "client" }) }>
            <Input name="clientName" type="text" label={ t("clientName", { ns: "client" }) } { ...inputCommonProps }/>
            <Input name="clientContactPhone" type="text" label={ t("contactPhone", { ns: "client" }) } { ...inputCommonProps } />
          </FormBlock>
          <FormBlock title={ t("location") }>
            <Input name="district" type="text" label={ t("district") } { ...inputCommonProps } />
            { selectedMode === 1 &&
              <>
                <Input name="neighborhood" type="text" label={ t("neighborhood") } { ...inputCommonProps } />
                <Input name="addressDetails" type="text" label={ t("addressDetails") } { ...inputCommonProps } />
              </>
            }
          </FormBlock>
          <FormBlock title={ t("contract") }>
            <ContractTypeBlock 
              selectOptions={ presets?.contractTypes }
              { ...controlledCommonProps }
            />
          </FormBlock>
          {
            watch("contractTypeId") === 2 && selectedMode === 1 && (
              <FormBlock title={ t("preferenceDetails") }>
                <Input name="petsAllowed" type="checkbox" label={ t("petsAllowed") } { ...controlledCommonProps } />
                <Input name="childrenAllowed" type="checkbox" label={ t("childrenAllowed") } { ...controlledCommonProps } />
                <Input name="ownerPreferencesDetails" type="textarea" label={ t("preferenceDetails") } { ...inputCommonProps } />
              </FormBlock>
            )
          }
        </Pane>
        <Pane flex={1}>
          <FormBlock title={ t("listing") }>
            <Input 
              name="estateTypeId" 
              type="select" 
              label={ t("estateType") } 
              selectOptions={ presets?.estateTypes } 
              optionLabelKey="estateName" 
              optionValueKey="estateTypeId"
              { ...inputCommonProps }
            />
            { watch("estateTypeId") === 1 ? (
              <Input name="numberOfFloors" type="number" label={ t("floors") } { ...inputCommonProps }/>
            ) : (
                <Input name="floorLocation" type="number" label={ t("floor") } { ...inputCommonProps }/>
              )
            }
            { selectedMode === 1 &&
              <>
                <Input name="totalArea" type="number" label={ t("totalArea") } placeholder="m²" { ...inputCommonProps }/>
                <Input name="builtArea" type="number" label={ t("builtArea") } placeholder="m²" { ...inputCommonProps }/>
                <Input name="numberOfBedrooms" type="number" label={ t("numberOfBedrooms") } { ...inputCommonProps }/>
                <Input name="numberOfBathrooms" type="number" label={ t("numberOfBathrooms") } { ...inputCommonProps }/>
                <Input name="numberOfGarages" type="number" label={ t("numberOfGarages") } { ...inputCommonProps }/>
                <Input name="numberOfKitchens" type="number" label={ t("numberOfKitchens") } { ...inputCommonProps }/>
                <Input name="haveNaturalGas" type="checkbox" label={ t("naturalGas") } { ...controlledCommonProps } />
                <Input name="estateDetails" type="textarea" label={ t("estateDetails") } { ...inputCommonProps } />
              </>
            }
          </FormBlock>
        </Pane>
      </Form>
      { errors && 
        <Pane paddingY={minorScale(3)}>
          <FieldErrorMessage message={t("invalidFormError", { ns: "error" })} />
        </Pane>
      }
      <FormSubmit
        text={ location.pathname === "/newlisting" ? t("addNewListing") : t("commitChanges")  } 
        form="listing-form"
      />
    </>
  );
};

export default ListingForm;
