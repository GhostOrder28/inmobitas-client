import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  Pane,
  Table,
  TableBody,
  TableRow, 
  TableCell,
} from "evergreen-ui";

import { selectCurrentUserId } from "../../redux/user/user.selectors";
import { formatClientData } from "./client-detail.utils";
import { strParseOut } from "../../utils/utility-functions/utility-functions";
import CustomTable from "../custom-table/custom-table.component";
import Heading from "../heading/heading.component";
import { getClientListings } from "./client-detail.api";
import { LABELS } from "../../pages/listings-page/listings-page.consts";

import useGetRequest from "../../hooks/use-get-request";

import { Client } from "../../pages/client-page/client-page.types";
import { ListingItem } from "../../pages/listings-page/listings-page.types";

type ClientDetailProps = {
  clientData: Client | undefined;
};

const ClientDetail = ({ clientData }: ClientDetailProps) => {
  const { t } = useTranslation("listing");
  const { clientId } = useParams();
  const userId = useSelector(selectCurrentUserId);
  const [ clientListings, setClientListings ] = useGetRequest<ListingItem[]>(() => getClientListings(`/listings/${userId}/${clientId}`));
  const clientPersonalData = formatClientData(clientData);

  return (
    <div>
      {clientData && (
        <>
          <Heading type="h1">
            { strParseOut(clientData.clientName) }
          </Heading>
          <Table>
            <TableBody>
              {
                clientPersonalData.map((dataItem, idx) => (
                  <TableRow key={`row-${idx}`}>
                    <TableCell>{ dataItem.label }</TableCell>
                    <TableCell>{ dataItem.content }</TableCell>
                  </TableRow>
                ))
              }
            </TableBody>
          </Table>
        </>
      )}
      <Pane overflow="scroll" borderColor="black">
        <Heading type="h2">
          { t<string>("estates") }
        </Heading>
          {
            clientListings &&
              <CustomTable 
                source={ clientListings }
                setSource={setClientListings}
                labels={ LABELS }
                detailRouteStructure={["listingdetail", "clientId", "estateId"]}
                editRouteStructure={["editlisting", "clientId", "estateId"]}
                deleteBaseUrl={"/listings"}
              /> 
          }
      </Pane>
    </div>
  );
};

export default ClientDetail;
