import React, { useEffect, useState } from "react";
import http from "../../utils/axios-instance";
import { ListingItem } from "../../pages/listings-page/listings-page.types";
import { Client } from "./owner-detail.types";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { selectCurrentUserId } from "../../redux/user/user.selectors";
import { strParseOut } from "../../utils/utility-functions";
import {
  StyledTable,
  StyledTbody,
  StyledTr,
  StyledTdWrapped,
  StyledTdUnwrapped,
} from "../../global-styles/table.styles";
import { Pane, Heading } from "evergreen-ui";
import ListingsTable from "../listings-table/listings-table.component";

type OwnerDetailProps = {
  clientData: Client | undefined;
};

const OwnerDetail = ({ clientData }: OwnerDetailProps) => {
  const [listings, setListings] = useState<ListingItem[]>([]);

  const userId = useSelector(selectCurrentUserId);
  const params = useParams();
  const { t } = useTranslation(['client', 'listing']);

  useEffect(() => {
    (async function () {
      try {
        const clientListingsData = await http.get<ListingItem[]>(
          `/listingslist/${userId}/${params.clientid}`
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
      <Pane margin={10}>
        {clientData && (
          <>
            <Heading is={"h1"} size={800} marginBottom={20}>
              {strParseOut(clientData.clientName)}
            </Heading>
            <StyledTable>
              <StyledTbody>
                <StyledTr>
                  <StyledTdUnwrapped>
                    { t('clientType', { ns: 'client' }) }
                  </StyledTdUnwrapped>
                  <StyledTdWrapped>{clientData.clientType}</StyledTdWrapped>
                </StyledTr>
                <StyledTr>
                  <StyledTdUnwrapped>
                    { t('phone', { ns: 'client' }) }
                  </StyledTdUnwrapped>
                  <StyledTdWrapped>
                    {clientData.clientContactPhone}
                  </StyledTdWrapped>
                </StyledTr>
                <StyledTr>
                  <StyledTdUnwrapped>{ t('age', { ns: 'client' }) }</StyledTdUnwrapped>
                  <StyledTdWrapped>{clientData.clientAge}</StyledTdWrapped>
                </StyledTr>
                <StyledTr>
                  <StyledTdUnwrapped>
                    { t('clientDetails', { ns: 'client' }) }
                  </StyledTdUnwrapped>
                  <StyledTdWrapped>{clientData.clientDetails}</StyledTdWrapped>
                </StyledTr>
              </StyledTbody>
            </StyledTable>
          </>
        )}
      </Pane>
      <Pane margin={10} overflow={"scroll"} borderColor={"black"}>
        <Heading is={"h2"} size={600} fontWeight={500} marginBottom={20}>
          { t('estates', { ns: 'listing' }) }
        </Heading>
        {listings && <ListingsTable listings={listings} />}
      </Pane>
    </div>
  );
};

export default OwnerDetail;
