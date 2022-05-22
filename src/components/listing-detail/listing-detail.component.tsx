import React, { useState, useEffect } from "react";
import http from "../../utils/axios-instance";
import { useSelector } from "react-redux";
import { selectCurrentUserId } from "../../redux/user/user.selectors";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  StyledTable,
  StyledTbody,
  StyledTr,
  StyledTdWrapped,
  StyledTdUnwrapped,
  StyledThWithSpan,
} from "../../global-styles/table.styles";
import { Pane, Spinner } from "evergreen-ui";
import { presetSelector } from "../../utils/utility-functions";
import { Tablist, Tab } from "evergreen-ui";
import PhotoGallery from "../photo-gallery/photo-gallery.component";
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
  const { t } = useTranslation(['client', 'listing', 'ui'])

  useEffect(() => {
    
    (async function () {
      const estatePictures = await http.get<Picture[]>(
        `/estatepictures/${userId}/${listingid}`
      );
      console.log(estatePictures.data);
      setListingPictures(estatePictures.data);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //useEffect(() => {
    //console.log(listingPictures);    
  //})

  return !(listing && dataPresets) ? (
    <Spinner />
  ) : (
    <>
      <Tablist width={"100%"} display={"flex"} className="tablist">
        {[t('information', { ns: 'listing' }), t('gallery', { ns: 'listing' })].map((tab, index) => (
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
              <StyledThWithSpan spanValue="2">{ t('owner', { ns: 'client' }) }</StyledThWithSpan>
            </StyledTr>
            {!isHidden.owner && (
              <>
                <StyledTr>
                  <StyledTdUnwrapped>{ t('name', { ns: 'client' }) }</StyledTdUnwrapped>
                  <StyledTdWrapped>{ listing.clientName }</StyledTdWrapped>
                </StyledTr>
                <StyledTr>
                  <StyledTdUnwrapped>
                    { t('phone', { ns: 'client' }) }
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
                { t('contract', { ns: 'listing' }) }
              </StyledThWithSpan>
            </StyledTr>
            {!isHidden.contract && (
              <>
                <StyledTr>
                  <StyledTdUnwrapped>
                    { t('contractType', { ns: 'listing' }) }
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
                    {listing.contractTypeId === 1
                      ? t('estatePrice', { ns: 'listing' }) 
                      : t('rent', { ns: 'listing' })}
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
                      { t('utilities', { ns: 'listing' }) }
                    </StyledTdUnwrapped>
                    <StyledTdWrapped>
                      {listing.utilitiesIncluded ? t('yes', { ns: 'listing' }) : t('no', { ns: 'listing' })}
                    </StyledTdWrapped>
                  </StyledTr>
                )}
                <StyledTr>
                  <StyledTdWrapped>{ t('fee', { ns: 'listing' }) }</StyledTdWrapped>
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
                    { t('signedDate', { ns: 'listing' }) }
                  </StyledTdWrapped>
                  <StyledTdWrapped>{listing.signedDate}</StyledTdWrapped>
                </StyledTr>
                <StyledTr>
                  <StyledTdWrapped>{ t('startDate', { ns: 'listing' }) }</StyledTdWrapped>
                  <StyledTdWrapped>{listing.startDate}</StyledTdWrapped>
                </StyledTr>
                <StyledTr>
                  <StyledTdWrapped>{ t('endDate', { ns: 'listing' }) }</StyledTdWrapped>
                  <StyledTdWrapped>{listing.endDate}</StyledTdWrapped>
                </StyledTr>
              </>
            )}
          </StyledTbody>
          {listing.contractTypeId === 2 && (
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
                  { t('ownerPreferences', { ns: 'listing' }) }
                </StyledThWithSpan>
              </StyledTr>
              {!isHidden.ownerPreferences && (
                <>
                  <StyledTr>
                    <StyledTdUnwrapped>
                      { t('petsAllowed', { ns: 'listing' }) }
                    </StyledTdUnwrapped>
                    <StyledTdWrapped>
                      {listing.petsAllowed !== null &&
                        (listing.petsAllowed ? t('yes', { ns: 'listing' }) : t('no', { ns: 'listing' }))}
                    </StyledTdWrapped>
                  </StyledTr>
                  <StyledTr>
                    <StyledTdUnwrapped>
                      { t('childrenAllowed', { ns: 'listing' }) }
                    </StyledTdUnwrapped>
                    <StyledTdWrapped>
                      {listing.childrenAllowed !== null &&
                        (listing.childrenAllowed ? t('yes', { ns: 'listing' }) : t('no', { ns: 'listing' }))}
                    </StyledTdWrapped>
                  </StyledTr>
                  <StyledTr>
                    <StyledTdUnwrapped>
                      { t('preferenceDetails', { ns: 'listing' }) }
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
                { t('location', { ns: 'listing' }) }
              </StyledThWithSpan>
            </StyledTr>
            {!isHidden.location && (
              <>
                <StyledTr>
                  <StyledTdUnwrapped>
                    { t('district', { ns: 'listing' }) }
                  </StyledTdUnwrapped>
                  <StyledTdWrapped>{listing.district}</StyledTdWrapped>
                </StyledTr>
                <StyledTr>
                  <StyledTdUnwrapped>
                    { t('neighborhood', { ns: 'listing' }) }
                  </StyledTdUnwrapped>
                  <StyledTdWrapped>{listing.neighborhood}</StyledTdWrapped>
                </StyledTr>
                <StyledTr>
                  <StyledTdUnwrapped>
                    { t('addressDetails', { ns: 'listing' }) }
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
                { t('estate', { ns: 'listing' }) }
              </StyledThWithSpan>
            </StyledTr>
            {!isHidden.estate && (
              <>
                <StyledTr>
                  <StyledTdUnwrapped>
                    { t('estateType', { ns: 'listing' }) }
                  </StyledTdUnwrapped>
                  <StyledTdWrapped>
                    {presetSelector(
                      dataPresets.estateTypes,
                      listing.estateTypeId,
                      "estate"
                    )}
                  </StyledTdWrapped>
                </StyledTr>
                {listing.estateTypeId !== 1 && (
                  <StyledTr>
                    <StyledTdUnwrapped>
                      { t('floorLocation', { ns: 'listing' }) }
                    </StyledTdUnwrapped>
                    <StyledTdWrapped>
                      {listing.floorLocation || "-"}
                    </StyledTdWrapped>
                  </StyledTr>
                )}
                {listing.estateTypeId === 1 && (
                  <StyledTr>
                    <StyledTdUnwrapped>
                      { t('numberOfFloors', { ns: 'listing' }) }
                    </StyledTdUnwrapped>
                    <StyledTdWrapped>
                      {listing.numberOfFloors || "-"}
                    </StyledTdWrapped>
                  </StyledTr>
                )}
                <StyledTr>
                  <StyledTdUnwrapped>
                    { t('totalArea', { ns: 'listing' }) }
                  </StyledTdUnwrapped>
                  <StyledTdWrapped>
                    {listing.totalArea && `${listing.totalArea} m²`}
                  </StyledTdWrapped>
                </StyledTr>
                <StyledTr>
                  <StyledTdUnwrapped>
                    { t('builtArea', { ns: 'listing' }) }
                  </StyledTdUnwrapped>
                  <StyledTdWrapped>
                    {listing.builtArea && `${listing.builtArea} m²`}
                  </StyledTdWrapped>
                </StyledTr>
                <StyledTr>
                  <StyledTdUnwrapped>
                    { t('bedrooms', { ns: 'listing' }) }
                  </StyledTdUnwrapped>
                  <StyledTdWrapped>
                    {listing.numberOfBedrooms || ""}
                  </StyledTdWrapped>
                </StyledTr>
                <StyledTr>
                  <StyledTdUnwrapped>
                    { t('bathrooms', { ns: 'listing' }) }
                  </StyledTdUnwrapped>
                  <StyledTdWrapped>
                    {listing.numberOfBathrooms || ""}
                  </StyledTdWrapped>
                </StyledTr>
                <StyledTr>
                  <StyledTdUnwrapped>
                    { t('garages', { ns: 'listing' }) }
                  </StyledTdUnwrapped>
                  <StyledTdWrapped>
                    {listing.numberOfGarages || ""}
                  </StyledTdWrapped>
                </StyledTr>
                <StyledTr>
                  <StyledTdUnwrapped>
                    { t('kitchens', { ns: 'listing' }) }
                  </StyledTdUnwrapped>
                  <StyledTdWrapped>{listing.numberOfKitchens}</StyledTdWrapped>
                </StyledTr>
                <StyledTr>
                  <StyledTdUnwrapped>
                    { t('naturalGas', { ns: 'listing' }) }
                  </StyledTdUnwrapped>
                  <StyledTdWrapped>
                    {listing.haveNaturalGas !== null &&
                      (listing.haveNaturalGas ? t('yes', { ns: 'listing' }) : t('no', { ns: 'listing' }))}
                  </StyledTdWrapped>
                </StyledTr>
                <StyledTr>
                  <StyledTdUnwrapped spanValue="2">
                    { t('estateDetails', { ns: 'listing' }) }
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
