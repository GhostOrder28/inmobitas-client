import { t } from 'i18next';
import { useParams } from "react-router-dom";
import { Pane } from "evergreen-ui";
import { formatClientData } from "./client-detail.utils";

import useWindowDimensions from "../../hooks/use-window-dimensions";
import useGetClientListings from "../../hooks/use-get-client-listings";

import { Client } from "../../pages/client-page/client-page.types";
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
import { getSummarizedListingProps } from '../../pages/listings-page/listings-page.utils';

type ClientDetailProps = {
  clientData: Client | undefined;
};

const ClientDetail = ({ clientData }: ClientDetailProps) => {
  const clientPersonalData = formatClientData(clientData);
  const { clientid: clientId } = useParams();
  const [ clientListings, setClientListings ] = useGetClientListings(clientId);
  const { windowInnerWidth } = useWindowDimensions();

  const tableSource = windowInnerWidth > MOBILE_BREAKPOINT_VALUE ?
    clientListings :
    getSummarizedListingProps(clientListings)

  const tableAreaLabels = windowInnerWidth > MOBILE_BREAKPOINT_VALUE ? 
    [
      t('listing:totalArea') + ' ' + 'm²', 
      t('listing:builtArea') + ' ' + 'm²' 
    ] : [];

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
          { t<string>('listing:estates') }
        </Heading>
          {
            clientListings &&
              <CustomTable 
                source={ tableSource }
                setSource={setClientListings}
                labels={[
                  t('listing:district'),
                  t('listing:neighborhood'),
                  ...tableAreaLabels
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
