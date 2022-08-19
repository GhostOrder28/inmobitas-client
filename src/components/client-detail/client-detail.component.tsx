import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { Pane, Heading } from "evergreen-ui";

import useWindowDimensions from "../../hooks/use-window-dimensions";

import http from "../../utils/axios-instance";
import { ListingItem } from "../../pages/listings-page/listings-page.types";
import { Client } from "../../pages/client-page/client-page.types";
import { selectCurrentUserId } from "../../redux/user/user.selectors";
import { strParseOut } from "../../utils/utility-functions";
import {
  Table,
  TableBody,
  TableRow, 
  TableCell,
} from "evergreen-ui";
import CustomTable from '../custom-table/custom-table.component';
import { tabletBreakpoint } from '../../constants/breakpoints.constants';
import { filterListingsProps } from '../../pages/listings-page/listings-page.utils';

type ClientDetailProps = {
  clientData: Client | undefined;
};

const ClientDetail = ({ clientData }: ClientDetailProps) => {
  const [listings, setListings] = useState<ListingItem[]>([]);

  const userId = useSelector(selectCurrentUserId);
  const params = useParams();
  const { t } = useTranslation(['client', 'listing']);
  const { windowInnerWidth } = useWindowDimensions();

  useEffect(() => {
    (async function () {
      try {
        const clientListingsData = await http.get<ListingItem[]>(
          `/listings/${userId}/${params.clientid}`
        );
        setListings(clientListingsData.data);
      } catch (err) {
        console.log(err);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      {clientData && (
        <>
          <Heading
            is={"h1"}
            size={800}
            margin={20}
          >
            {strParseOut(clientData.clientName)}
          </Heading>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell>
                  { t('contactPhone', { ns: 'client' }) }
                </TableCell>
                <TableCell>
                  { clientData.clientContactPhone }
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  { t('clientAge', { ns: 'client' }) }
                </TableCell>
                <TableCell>
                  { clientData.clientAge }
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  { t('clientDetails', { ns: 'client' }) }
                </TableCell>
                <TableCell>
                  {clientData.clientDetails}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </>
      )}
      <Pane overflow={"scroll"} borderColor={"black"}>
        <Heading
          is={"h2"}
          size={700} 
          fontWeight={500} 
          margin={20}
        >
          { t('estates', { ns: 'listing' }) }
        </Heading>
          {
            listings &&
              <CustomTable 
                source={windowInnerWidth > tabletBreakpoint ? listings : filterListingsProps(listings)}
                setSource={setListings}
                labels={[
                  t('district', { ns: 'listing' }),
                  t('neighborhood', { ns: 'listing' }),
                  ...(windowInnerWidth > tabletBreakpoint ? [
                    t('totalArea', { ns: 'listing' }) + ' ' + 'm²',
                    t('builtArea', { ns: 'listing' }) + ' ' + 'm²'
                  ] : [])
                ]}
                detailRouteStructure={['listingdetail', 'clientId', 'estateId']}
                editRouteStructure={['editlisting', 'clientId', 'estateId']}
                deleteBaseUrl={'/listings'}
              /> 
          }
      </Pane>
    </div>
  );
};

export default ClientDetail;
