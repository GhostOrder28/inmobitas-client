import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { Spinner } from "evergreen-ui";
import { format } from "date-fns";
import { Tablist, Tab } from "evergreen-ui";

import http from "../../utils/axios-instance";
import { selectCurrentUserId } from "../../redux/user/user.selectors";
import { strParseIn } from "../../utils/utility-functions";
import PhotoGallery from "../photo-gallery/photo-gallery.component";
import "./listing-detail-gallery.styles.css";
import { Presets } from "../../pages/listing-page/listing-page.types";
import { SpecificationTable as SpecificationTableType } from "../specification-table/specification-table.types";
import { Picture } from "./listing-detail.types";
import SpecificationTable from '../specification-table/specification-table.component';
import { Listing } from '../../pages/listing-page/listing-page.types';

export type ListingDetailProps = {
  dataPresets: Presets | undefined;
  listing: Listing | SpecificationTableType | undefined; //I need to find a better way to narrow the this type because in this component 'listing' is never a Listing.
};

const ListingDetail = ({ dataPresets, listing }: ListingDetailProps) => {
  const userId = useSelector(selectCurrentUserId);
  const { listingid } = useParams();
  const [selectedTab, setSelectedTab] = useState(0);
  const [listingPictures, setListingPictures] = useState<Picture[]>([]);
  const { t } = useTranslation(['client', 'listing', 'ui']) 

  // useEffect(() => {
  //   (async function () {
  //     const estatePictures = await http.get<Picture[]>(
  //       `/pictures/${userId}/${listingid}`
  //     );
  //     console.log(estatePictures);
  //     setListingPictures(estatePictures.data);
  //   })();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  function isSpecificationTable (data: Listing | SpecificationTableType | undefined): data is SpecificationTableType{
    return (data as SpecificationTableType).data.length !== undefined;
  }

  const generatePresentationFilename = () => {
    const now = new Date();
    const date = format(now, 'P').replaceAll('/', '-');
    const timestamp = format(now, 't');
    if (listing && isSpecificationTable(listing)) {
      // this whole process to get the district and neighborhood data is not really good, I need to find a better way to get that data
      const locationData = listing.data[listing.data.length - 2];
      console.log(locationData)
      // WARNING: District and Neighborhood are capitalized because they are being extracted from the returned grouped listing array, these are used as labels and that's why they are capitalized.
      const [district, neighborhood] = locationData.items.filter(item => item.label === 'District' || item.label === 'Neighborhood');
      return strParseIn(`${district.value}_${neighborhood.value ? neighborhood.value + '_' : ''}presentation_${date}_${timestamp}.pdf`);
    }
    return `presentation_${date}_${timestamp}.pdf` ;
  }

  return !(listing && dataPresets) ? (
    <Spinner />
  ) : (
    <>
      <Tablist width={"100%"} display={"flex"} className="tablist">
        {
          [
            t('information', { ns: 'listing' }),
            t('gallery', { ns: 'listing' })
          ].map((tab, index) => (
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
          ))
        }
      </Tablist>
      { selectedTab === 0 && isSpecificationTable(listing) && 
        <SpecificationTable
          source={listing}
        />
      }
      { selectedTab === 1 &&
        <PhotoGallery
          display={selectedTab === 1 ? "block" : "none"}
          /* listingPictures={listingPictures} */
          generatePresentationFilename={generatePresentationFilename}
        />
      }
    </>
  );
};
export default ListingDetail;
