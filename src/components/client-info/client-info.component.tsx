import { useTranslation } from "react-i18next";
import { useParams, useOutletContext } from "react-router-dom";
import {
  Pane,
  Table,
  TableBody,
  TableRow, 
  TableCell,
} from "evergreen-ui";

import { formatClientData } from "./client-info.utils";
import { strParseOut } from "../../utils/utility-functions/utility-functions";
import CustomTable from "../custom-table/custom-table.component";
import Heading from "../heading/heading.component";
import { LABELS } from "../../pages/listings-page/listings-page.consts";

import { Client } from "../../pages/client-page/client-page.types";
import { useGetClientListings } from "./client-info.hooks";
import useCalculateAppSize from "../../hooks/use-calculate-app-size";

const ClientInfo = () => {
  const [ clientData ] = useOutletContext<[Client]>();
  const { t } = useTranslation([ "listing", "ui" ]);
  const { clientId } = useParams();
  const [ clientListings, setClientListings ] = useGetClientListings(clientId);
  const clientPersonalData = formatClientData(clientData);
  const { appHeight } = useCalculateAppSize();

  return (
    <Pane 
      display="flex" 
      flexDirection="column"
      height={ appHeight }
      marginX="auto" 
    >
      <Pane>
        <Heading type="h1">
          { strParseOut(clientData ? clientData.clientName : "") }
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
      </Pane>
      <Pane display="flex" flexDirection="column" overflow="scroll" flexGrow={1}>
        <Heading type="h2">
          { t<string>("estates") }
        </Heading>
          {
            clientListings &&
              <CustomTable 
                source={ clientListings }
                setSource={setClientListings}
                labels={ LABELS }
                entity="listing"
                deleteMessage={ t("waitForListingDelete", { ns: "ui" }) }
              /> 
          }
      </Pane>
    </Pane>
  );
};

export default ClientInfo;
