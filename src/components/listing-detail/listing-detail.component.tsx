import React, { useState, useEffect } from "react";
import http from "../../utils/axios-instance";
import { useSelector } from "react-redux";
import { selectCurrentUserId } from "../../redux/user/user.selectors";
import { useParams } from "react-router-dom";
import {
  StyledTable,
  StyledTbody,
  StyledTr,
  StyledTdWrapped,
  StyledTdUnwrapped,
  StyledThWithSpan,
} from "../../global-styles/table.styles";
import { Pane, Spinner } from "evergreen-ui";
import {
  ownerLabels,
  contractLabels,
  estateLabels,
  locationLabels,
  featuresLabels,
  ownerPreferencesLabels,
} from "../../constants/language/english/english-labels.constants";
import { presetSelector } from "../../utils/utility-functions";
import { Tablist, Tab } from "evergreen-ui";
import PhotoGallery from "../photo-gallery/photo-gallery.component";
import "react-image-gallery/styles/css/image-gallery.css";
import "./listing-detail-gallery.styles.css";

import { Listing, Presets } from "../../pages/listing-page/listing-page.types";
import { Picture } from "./listing-detail.types";

type ListingDetailProps = {
  dataPresets: Presets | undefined;
  listing: Listing | undefined;
};

const ListingDetail = ({ dataPresets, listing }: ListingDetailProps) => {
  const userId = useSelector(selectCurrentUserId);
  const { listingid } = useParams();
  const [isHidden, setIsHidden] = useState({
    owner: false,
    contract: false,
    ownerPreferences: false,
    location: false,
    estate: false,
  });
  const [selectedTab, setSelectedTab] = useState(0);
  const [listingPictures, setListingPictures] = useState<Picture[]>([]);

  useEffect(() => {
    (async function () {
      const estatePictures = await http.get<Picture[]>(
        `/estatepictures/${userId}/${listingid}`
      );
      setListingPictures(estatePictures.data);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return !(listing && dataPresets) ? (
    <Spinner />
  ) : (
    <>
      <Tablist width={"100%"} display={"flex"} className="tablist">
        {["Information", "Gallery"].map((tab, index) => (
          <Tab
            key={tab}
            id={tab}
            onSelect={() => setSelectedTab(index)}
            isSelected={index === selectedTab}
            aria-controls={`panel-${tab}`}
            flex={1}
            height={"2.5rem"}
            borderRadius={0}
          >
            {tab}
          </Tab>
        ))}
      </Tablist>
      <Pane display={selectedTab === 0 ? "block" : "none"} margin={10}>
        <StyledTable>
          <StyledTbody>
            <StyledTr
              onClick={() => {
                setIsHidden({ ...isHidden, owner: !isHidden.owner })
              }}
            >
              <StyledThWithSpan spanValue="2">
                {ownerLabels.OWNER_INFO}
              </StyledThWithSpan>
            </StyledTr>
            {!isHidden.owner && (
              <>
                <StyledTr>
                  <StyledTdUnwrapped>{ownerLabels.OWNER}</StyledTdUnwrapped>
                  <StyledTdWrapped>{listing.clientName}</StyledTdWrapped>
                </StyledTr>
                <StyledTr>
                  <StyledTdUnwrapped>
                    {ownerLabels.OWNER_CONTACT_PHONE}
                  </StyledTdUnwrapped>
                  <StyledTdWrapped>
                    {listing.clientContactPhone}
                  </StyledTdWrapped>
                </StyledTr>
              </>
            )}
          </StyledTbody>
          <StyledTbody>
            <StyledTr
              onClick={() => {
                setIsHidden({ ...isHidden, contract: !isHidden.contract });
              }}
            >
              <StyledThWithSpan spanValue="2">
                {contractLabels.CONTRACT}
              </StyledThWithSpan>
            </StyledTr>
            {!isHidden.contract && (
              <>
                <StyledTr>
                  <StyledTdUnwrapped>
                    {contractLabels.CONTRACT_TYPE}
                  </StyledTdUnwrapped>
                  <StyledTdWrapped>
                    {presetSelector(
                      dataPresets.contractTypes,
                      listing.contractTypeId,
                      "contract"
                    )}
                  </StyledTdWrapped>
                </StyledTr>
                <StyledTr>
                  <StyledTdWrapped>
                    {listing.contractType === 1
                      ? contractLabels.ESTATE_PRICE
                      : contractLabels.RENT}
                  </StyledTdWrapped>
                  <StyledTdWrapped>
                    {listing.estatePrice &&
                      `${presetSelector(
                        dataPresets.currencyTypes,
                        listing.currencyTypeId,
                        "currency"
                      )} ${listing.estatePrice}`}
                  </StyledTdWrapped>
                </StyledTr>
                {listing.utilitiesIncluded !== null && (
                  <StyledTr>
                    <StyledTdUnwrapped>
                      {contractLabels.UTILITIES}
                    </StyledTdUnwrapped>
                    <StyledTdWrapped>
                      {listing.utilitiesIncluded ? "Yes" : "No"}
                    </StyledTdWrapped>
                  </StyledTr>
                )}
                <StyledTr>
                  <StyledTdWrapped>{contractLabels.FEE}</StyledTdWrapped>
                  <StyledTdWrapped>
                    {listing.fee &&
                      `
                      ${
                        !listing.isPercentage
                          ? presetSelector(
                              dataPresets.currencyTypes,
                              listing.currencyTypeId,
                              "currency"
                            )
                          : ""
                      } 
                      ${listing.fee} 
                      ${listing.isPercentage ? "%" : ""}
                    `}
                  </StyledTdWrapped>
                </StyledTr>
                <StyledTr>
                  <StyledTdWrapped>
                    {contractLabels.SIGNED_DATE}
                  </StyledTdWrapped>
                  <StyledTdWrapped>{listing.signedDate}</StyledTdWrapped>
                </StyledTr>
                <StyledTr>
                  <StyledTdWrapped>{contractLabels.START_DATE}</StyledTdWrapped>
                  <StyledTdWrapped>{listing.startDate}</StyledTdWrapped>
                </StyledTr>
                <StyledTr>
                  <StyledTdWrapped>{contractLabels.END_DATE}</StyledTdWrapped>
                  <StyledTdWrapped>{listing.endDate}</StyledTdWrapped>
                </StyledTr>
              </>
            )}
          </StyledTbody>
          {listing.contractType === 2 && (
            <StyledTbody>
              <StyledTr
                onClick={() => {
                  setIsHidden({
                    ...isHidden,
                    ownerPreferences: !isHidden.ownerPreferences,
                  });
                }}
              >
                <StyledThWithSpan spanValue="2">
                  {ownerPreferencesLabels.OWNER_PREFERENCES}
                </StyledThWithSpan>
              </StyledTr>
              {!isHidden.ownerPreferences && (
                <>
                  <StyledTr>
                    <StyledTdUnwrapped>
                      {ownerPreferencesLabels.PETS_ALLOWED}
                    </StyledTdUnwrapped>
                    <StyledTdWrapped>
                      {listing.petsAllowed !== null &&
                        (listing.petsAllowed ? "Yes" : "No")}
                    </StyledTdWrapped>
                  </StyledTr>
                  <StyledTr>
                    <StyledTdUnwrapped>
                      {ownerPreferencesLabels.CHILDREN_ALLOWED}
                    </StyledTdUnwrapped>
                    <StyledTdWrapped>
                      {listing.childrenAllowed !== null &&
                        (listing.childrenAllowed ? "Yes" : "No")}
                    </StyledTdWrapped>
                  </StyledTr>
                  <StyledTr>
                    <StyledTdUnwrapped>
                      {ownerPreferencesLabels.PREFERENCE_DETAILS}
                    </StyledTdUnwrapped>
                    <StyledTdWrapped>
                      {listing.ownerPreferencesDetails || ""}
                    </StyledTdWrapped>
                  </StyledTr>
                </>
              )}
            </StyledTbody>
          )}
          <StyledTbody>
            <StyledTr
              onClick={() => {
                setIsHidden({ ...isHidden, location: !isHidden.location });
              }}
            >
              <StyledThWithSpan spanValue="2">
                {locationLabels.LOCATION}
              </StyledThWithSpan>
            </StyledTr>
            {!isHidden.location && (
              <>
                <StyledTr>
                  <StyledTdUnwrapped>
                    {locationLabels.DISTRICT}
                  </StyledTdUnwrapped>
                  <StyledTdWrapped>{listing.district}</StyledTdWrapped>
                </StyledTr>
                <StyledTr>
                  <StyledTdUnwrapped>
                    {locationLabels.NEIGHBORHOOD}
                  </StyledTdUnwrapped>
                  <StyledTdWrapped>{listing.neighborhood}</StyledTdWrapped>
                </StyledTr>
                <StyledTr>
                  <StyledTdUnwrapped>
                    {locationLabels.ADDRESS_DETAILS}
                  </StyledTdUnwrapped>
                  <StyledTdWrapped>
                    {listing.addressDetails || ""}
                  </StyledTdWrapped>
                </StyledTr>
              </>
            )}
          </StyledTbody>
          <StyledTbody>
            <StyledTr
              onClick={() => {
                setIsHidden({ ...isHidden, estate: !isHidden.estate });
              }}
            >
              <StyledThWithSpan spanValue="2">
                {estateLabels.ESTATE}
              </StyledThWithSpan>
            </StyledTr>
            {!isHidden.estate && (
              <>
                <StyledTr>
                  <StyledTdUnwrapped>
                    {estateLabels.ESTATE_TYPE}
                  </StyledTdUnwrapped>
                  <StyledTdWrapped>
                    {presetSelector(
                      dataPresets.estateTypes,
                      listing.estateTypeId,
                      "estate"
                    )}
                  </StyledTdWrapped>
                </StyledTr>
                {listing.estateType !== 1 && (
                  <StyledTr>
                    <StyledTdUnwrapped>
                      {estateLabels.FLOOR_LOCATION}
                    </StyledTdUnwrapped>
                    <StyledTdWrapped>
                      {listing.floorLocation || "-"}
                    </StyledTdWrapped>
                  </StyledTr>
                )}
                {listing.estateType === 1 && (
                  <StyledTr>
                    <StyledTdUnwrapped>
                      {estateLabels.NUMBER_OF_FLOORS}
                    </StyledTdUnwrapped>
                    <StyledTdWrapped>
                      {listing.numberOfFloors || "-"}
                    </StyledTdWrapped>
                  </StyledTr>
                )}
                <StyledTr>
                  <StyledTdUnwrapped>
                    {estateLabels.TOTAL_AREA}
                  </StyledTdUnwrapped>
                  <StyledTdWrapped>
                    {listing.totalArea && `${listing.totalArea} m²`}
                  </StyledTdWrapped>
                </StyledTr>
                <StyledTr>
                  <StyledTdUnwrapped>
                    {estateLabels.BUILT_AREA}
                  </StyledTdUnwrapped>
                  <StyledTdWrapped>
                    {listing.builtArea && `${listing.builtArea} m²`}
                  </StyledTdWrapped>
                </StyledTr>
                <StyledTr>
                  <StyledTdUnwrapped>
                    {featuresLabels.BEDROOMS}
                  </StyledTdUnwrapped>
                  <StyledTdWrapped>
                    {listing.numberOfBedrooms || ""}
                  </StyledTdWrapped>
                </StyledTr>
                <StyledTr>
                  <StyledTdUnwrapped>
                    {featuresLabels.BATHROOMS}
                  </StyledTdUnwrapped>
                  <StyledTdWrapped>
                    {listing.numberOfBathrooms || ""}
                  </StyledTdWrapped>
                </StyledTr>
                <StyledTr>
                  <StyledTdUnwrapped>
                    {featuresLabels.GARAGES}
                  </StyledTdUnwrapped>
                  <StyledTdWrapped>
                    {listing.numberOfGarages || ""}
                  </StyledTdWrapped>
                </StyledTr>
                <StyledTr>
                  <StyledTdUnwrapped>
                    {featuresLabels.KITCHENS}
                  </StyledTdUnwrapped>
                  <StyledTdWrapped>{listing.numberOfKitchens}</StyledTdWrapped>
                </StyledTr>
                <StyledTr>
                  <StyledTdUnwrapped>
                    {featuresLabels.NATURAL_GAS}
                  </StyledTdUnwrapped>
                  <StyledTdWrapped>
                    {listing.haveNaturalGas !== null &&
                      (listing.haveNaturalGas ? "Yes" : "No")}
                  </StyledTdWrapped>
                </StyledTr>
                <StyledTr>
                  <StyledTdUnwrapped spanValue="2">
                    {estateLabels.ESTATE_DETAILS}
                  </StyledTdUnwrapped>
                </StyledTr>
                <StyledTr>
                  <StyledTdWrapped spanValue="2">
                    {listing.estateDetails || ""}
                  </StyledTdWrapped>
                </StyledTr>
              </>
            )}
          </StyledTbody>
        </StyledTable>
      </Pane>
      <PhotoGallery
        display={selectedTab === 1 ? "block" : "none"}
        listingPictures={listingPictures}
      />
    </>
  );
};
export default ListingDetail;
