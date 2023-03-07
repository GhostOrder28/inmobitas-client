import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { Pane } from "evergreen-ui";

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
import Heading from "../heading/heading.component";
import { MOBILE_BREAKPOINT_VALUE } from '../../constants/breakpoints.constants';
import { filterListingsProps } from '../../pages/listings-page/listings-page.utils';

type ClientDetailProps = {
  clientData: Client | undefined;
};

const ClientDetail = ({ clientData }: ClientDetailProps) => {
  const { t } = useTranslation(['client', 'listing']);
  const [clientListings, setClientListings] = useState<ListingItem[]>([]);
  const [ clientPersonalData ] = useState([
    {
      label: t('contactPhone', { ns: 'client' }),
      content: clientData?.clientContactPhone || ''
    },
    {
      label: t('clientAge', { ns: 'client' }),
      content: clientData?.clientAge || ''
    },
    {
      label: t('clientDetails', { ns: 'client' }),
      content: clientData?.clientDetails || ''
    },
  ]);

  const userId = useSelector(selectCurrentUserId);
  const params = useParams();
  const { windowInnerWidth } = useWindowDimensions();

  useEffect(() => {
    (async function () {
      try {
        const clientListingsData = await http.get<ListingItem[]>(
          `/listings/${userId}/${params.clientid}`
        );
        setClientListings(clientListingsData.data);
      } catch (err) {
        throw new Error(`there was an error, ${err}`)
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      {clientData && (
        <>
          <Heading type={"h1"}>
            { strParseOut(clientData.clientName) }
          </Heading>
          <Table>
            <TableBody>
              {
                clientPersonalData.map((dataItem, idx) => (
                  <TableRow key={`row-${idx}`}>
                    <TableCell>
                      { dataItem.label }
                    </TableCell>
                    <TableCell>
                      { dataItem.content }
                    </TableCell>
                  </TableRow>
                ))
              }
            </TableBody>
          </Table>
        </>
      )}
      <Pane overflow={"scroll"} borderColor={"black"}>
        <Heading type={"h2"}>
          { t('estates', { ns: 'listing' }) }
        </Heading>
          {
            clientListings &&
              <CustomTable 
                source={windowInnerWidth > MOBILE_BREAKPOINT_VALUE ? clientListings : filterListingsProps(clientListings)}
                setSource={setClientListings}
                labels={[
                  t('district', { ns: 'listing' }),
                  t('neighborhood', { ns: 'listing' }),
                  ...(windowInnerWidth > MOBILE_BREAKPOINT_VALUE ? [
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
