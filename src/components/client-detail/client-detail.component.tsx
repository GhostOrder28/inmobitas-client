import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import {
  Pane,
  Table,
  TableBody,
  TableRow, 
  TableCell,
} from "evergreen-ui";

import { formatClientData } from "./client-detail.utils";
import { strParseOut } from "../../utils/utility-functions/utility-functions";
import CustomTable from "../custom-table/custom-table.component";
import Heading from "../heading/heading.component";
import { LABELS } from "../../pages/listings-page/listings-page.consts";

import { Client } from "../../pages/client-page/client-page.types";
import { useGetClientListings } from "./client-detail.hooks";

type ClientDetailProps = {
  clientData: Client | undefined;
};

const ClientDetail = ({ clientData }: ClientDetailProps) => {
  const { t } = useTranslation("listing");
  const { clientId } = useParams();
  const [ clientListings, setClientListings ] = useGetClientListings(clientId);
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
