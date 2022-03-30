import React, { useState, useEffect } from 'react';
import http from '../../utils/axios-instance';
import { useSelector } from 'react-redux';
import { selectCurrentUserId } from '../../redux/user/user.selectors';
import { useParams } from 'react-router-dom';
import {
  StyledTable,
  StyledTbody,
  StyledTr,
  StyledTdWrapped,
  StyledTdUnwrapped,
  StyledThWithSpan,
} from '../../global-styles/table.styles'
import ImageGallery from 'react-image-gallery';
import { Pane } from 'evergreen-ui';
import {
  ownerLabels,
  listingLabels,
  globalLabels,
  contractLabels,
  estateLabels,
  locationLabels,
  featuresLabels,
  ownerPreferencesLabels,
} from '../../constants/language/english/english-labels.constants';
import {
  Tablist,
  Tab,
} from 'evergreen-ui';
import PhotoGallery from '../photo-gallery/photo-gallery.component';
import "react-image-gallery/styles/css/image-gallery.css";
import './listing-detail-gallery.styles.css';

const ListingDetail = ({ dataPresets, data }) => {

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
  const [listingPictures, setListingPictures] = useState([]);

  useEffect(() => {
    (async function () {
      const estatePictures = await http.get(`/estatepictures/${userId}/${listingid}`);
      setListingPictures(estatePictures.data);
    })()
  }, [])

  const getCurrency = () => {
    const currency = dataPresets.currencies.find(currency => currency.currencyId === data.currency)
    return currency.currencySymbol;
  };

  return !(data && dataPresets) ? 'LOADING' : (
    <>
      <Tablist
        width={'100%'}
        display={'flex'}
        className='tablist'
      >
        {
          ['Information', 'Gallery'].map((tab, index) => (
            <Tab
              key={tab}
              id={tab}
              onSelect={() => setSelectedTab(index)}
              isSelected={index === selectedTab}
              aria-controls={`panel-${tab}`}
              flex={1}
              height={'2.5rem'}
              borderRadius={0}
            >
              {tab}
            </Tab>
          ))
        }
      </Tablist>
      <Pane
        display={selectedTab === 0 ? 'block' : 'none'}
        margin={10}
      >
        <StyledTable>
          <StyledTbody>
            <StyledTr clickFn={ () => setIsHidden({ ...isHidden, owner: !isHidden.owner }) }>
              <StyledThWithSpan spanValue='2'>{ownerLabels.OWNER_INFO}</StyledThWithSpan>
            </StyledTr>
            { !isHidden.owner &&
              <>
                <StyledTr>
                  <StyledTdUnwrapped>{ ownerLabels.OWNER }</StyledTdUnwrapped>
                  <StyledTdWrapped>{ data.clientName }</StyledTdWrapped>
                </StyledTr>
                <StyledTr>
                  <StyledTdUnwrapped>{ ownerLabels.OWNER_CONTACT_PHONE }</StyledTdUnwrapped>
                  <StyledTdWrapped>{ data.clientContactPhone }</StyledTdWrapped>
                </StyledTr>
              </>
            }
          </StyledTbody>
          <StyledTbody>
            <StyledTr clickFn={ () => setIsHidden({ ...isHidden, contract: !isHidden.contract }) }>
              <StyledThWithSpan spanValue='2'>{ contractLabels.CONTRACT }</StyledThWithSpan>
            </StyledTr>
            { !isHidden.contract &&
              <>
                <StyledTr>
                  <StyledTdUnwrapped>{ contractLabels.CONTRACT_TYPE }</StyledTdUnwrapped>
                  <StyledTdWrapped>{ dataPresets.contractTypes.find(contractType => contractType.contractTypeId === data.contractType).contractName }</StyledTdWrapped>
                </StyledTr>
                <StyledTr>
                  <StyledTdWrapped>{ data.contractType === 1 ? contractLabels.ESTATE_PRICE : contractLabels.RENT }</StyledTdWrapped>
                  <StyledTdWrapped>{ `${getCurrency()} ${data.estatePrice}` }</StyledTdWrapped>
                </StyledTr>
                { data.utilitiesIncluded !== null &&
                  <StyledTr>
                    <StyledTdUnwrapped>{ contractLabels.UTILITIES }</StyledTdUnwrapped>
                    <StyledTdWrapped>{ data.utilitiesIncluded ? 'Yes' : 'No' }</StyledTdWrapped>
                  </StyledTr>
                }
                <StyledTr>
                  <StyledTdWrapped>{ contractLabels.FEE }</StyledTdWrapped>
                  <StyledTdWrapped>{ `${!data.isPercentage ? getCurrency() : ''} ${data.fee} ${data.isPercentage ? '%' : ''}` }</StyledTdWrapped>
                </StyledTr>
                <StyledTr>
                  <StyledTdWrapped>{ contractLabels.SIGNED_DATE }</StyledTdWrapped>
                  <StyledTdWrapped>{ data.signedDate }</StyledTdWrapped>
                </StyledTr>
                <StyledTr>
                  <StyledTdWrapped>{ contractLabels.START_DATE }</StyledTdWrapped>
                  <StyledTdWrapped>{ data.startDate }</StyledTdWrapped>
                </StyledTr>
                <StyledTr>
                  <StyledTdWrapped>{ contractLabels.END_DATE }</StyledTdWrapped>
                  <StyledTdWrapped>{ data.endDate }</StyledTdWrapped>
                </StyledTr>
              </>
            }
          </StyledTbody>
          { data.contractType === 2 &&
            <StyledTbody>
              <StyledTr clickFn={ () => setIsHidden({ ...isHidden, ownerPreferences: !isHidden.ownerPreferences }) }>
                <StyledThWithSpan spanValue='2'>{ ownerPreferencesLabels.OWNER_PREFERENCES }</StyledThWithSpan>
              </StyledTr>
              { !isHidden.ownerPreferences &&
                <>
                  <StyledTr>
                    <StyledTdUnwrapped>{ ownerPreferencesLabels.PETS_ALLOWED }</StyledTdUnwrapped>
                    <StyledTdWrapped>{ data.petsAllowed !== null && (data.petsAllowed ? 'Yes' : 'No') }</StyledTdWrapped>
                  </StyledTr>
                  <StyledTr>
                    <StyledTdUnwrapped>{ ownerPreferencesLabels.CHILDREN_ALLOWED }</StyledTdUnwrapped>
                    <StyledTdWrapped>{ data.childrenAllowed !== null && (data.childrenAllowed ? 'Yes' : 'No') }</StyledTdWrapped>
                  </StyledTr>
                  <StyledTr>
                    <StyledTdUnwrapped>{ ownerPreferencesLabels.PREFERENCE_DETAILS }</StyledTdUnwrapped>
                    <StyledTdWrapped>{ data.ownerPreferencesDetails || '' }</StyledTdWrapped>
                  </StyledTr>
                </>
              }
            </StyledTbody>
          }
          <StyledTbody>
            <StyledTr clickFn={ () => setIsHidden({ ...isHidden, location: !isHidden.location }) }>
              <StyledThWithSpan spanValue='2'>{ locationLabels.LOCATION }</StyledThWithSpan>
            </StyledTr>
            { !isHidden.location &&
              <>
                <StyledTr>
                  <StyledTdUnwrapped>{ locationLabels.DISTRICT }</StyledTdUnwrapped>
                  <StyledTdWrapped>{ data.district }</StyledTdWrapped>
                </StyledTr>
                <StyledTr>
                  <StyledTdUnwrapped>{ locationLabels.NEIGHBORHOOD }</StyledTdUnwrapped>
                  <StyledTdWrapped>{ data.county }</StyledTdWrapped>
                </StyledTr>
                <StyledTr>
                  <StyledTdUnwrapped>{ locationLabels.ADDRESS_DETAILS }</StyledTdUnwrapped>
                  <StyledTdWrapped>{ data.addressDetails || '' }</StyledTdWrapped>
                </StyledTr>
              </>
            }
          </StyledTbody>
          <StyledTbody>
            <StyledTr clickFn={ () => setIsHidden({ ...isHidden, estate: !isHidden.estate }) }>
              <StyledThWithSpan spanValue='2'>{ estateLabels.ESTATE }</StyledThWithSpan>
            </StyledTr>
            { !isHidden.estate &&
              <>
                <StyledTr>
                  <StyledTdUnwrapped>{ estateLabels.ESTATE_TYPE }</StyledTdUnwrapped>
                  <StyledTdWrapped>{ dataPresets.estateTypes.find(estate => estate.estateTypeId === data.estateType).estateName }</StyledTdWrapped>
                </StyledTr>
                { data.estateType !== 1 &&
                  <StyledTr>
                    <StyledTdUnwrapped>{ estateLabels.FLOOR_LOCATION }</StyledTdUnwrapped>
                    <StyledTdWrapped>{ data.floorLocation || '-' }</StyledTdWrapped>
                  </StyledTr>
                }
                { data.estateType === 1 &&
                  <StyledTr>
                    <StyledTdUnwrapped>{ estateLabels.NUMBER_OF_FLOORS }</StyledTdUnwrapped>
                    <StyledTdWrapped>{ data.floors || '-' }</StyledTdWrapped>
                  </StyledTr>
                }
                <StyledTr>
                  <StyledTdUnwrapped>{ estateLabels.TOTAL_AREA }</StyledTdUnwrapped>
                  <StyledTdWrapped>{ data.totalArea && `${data.totalArea} m²` }</StyledTdWrapped>
                </StyledTr>
                <StyledTr>
                  <StyledTdUnwrapped>{ estateLabels.BUILT_AREA }</StyledTdUnwrapped>
                  <StyledTdWrapped>{ data.builtArea && `${data.builtArea} m²` }</StyledTdWrapped>
                </StyledTr>
                <StyledTr>
                  <StyledTdUnwrapped>{ featuresLabels.BEDROOMS }</StyledTdUnwrapped>
                  <StyledTdWrapped>{ data.bedrooms || '' }</StyledTdWrapped>
                </StyledTr>
                <StyledTr>
                  <StyledTdUnwrapped>{ featuresLabels.BATHROOMS }</StyledTdUnwrapped>
                  <StyledTdWrapped>{ data.bathrooms || '' }</StyledTdWrapped>
                </StyledTr>
                <StyledTr>
                  <StyledTdUnwrapped>{ featuresLabels.GARAGES }</StyledTdUnwrapped>
                  <StyledTdWrapped>{ data.garages || '' }</StyledTdWrapped>
                </StyledTr>
                <StyledTr>
                  <StyledTdUnwrapped>{ featuresLabels.KITCHENS }</StyledTdUnwrapped>
                  <StyledTdWrapped>{ data.kitchens }</StyledTdWrapped>
                </StyledTr>
                <StyledTr>
                  <StyledTdUnwrapped>{ featuresLabels.NATURAL_GAS }</StyledTdUnwrapped>
                  <StyledTdWrapped>{ data.haveNaturalGas !== null && (data.naturalGas ? 'Yes' : 'No') }</StyledTdWrapped>
                </StyledTr>
                <StyledTr>
                  <StyledTdUnwrapped>{ estateLabels.ESTATE_DETAILS }</StyledTdUnwrapped>
                  <StyledTdWrapped>{ data.estateDetails || '' }</StyledTdWrapped>
                </StyledTr>
              </>
            }
          </StyledTbody>
        </StyledTable>
      </Pane>
      <PhotoGallery
        display={selectedTab === 1 ? 'block' : 'none'}
        listingPictures={listingPictures}
      />
    </>
  )
};

export default ListingDetail;
