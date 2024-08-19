import { Pane } from "evergreen-ui";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import React, { useState, useEffect, useRef } from "react";

import http from "../../http/http";
import { selectCurrentUserId } from "../../redux/user/user.selectors";

import "../../global-styles/listings-page-scroll.styles.css";
import { ClientItem } from "./clients-page.types";

import CustomTable from "../../components/custom-table/custom-table.component";
import NoDataMessage from "../../components/no-data-message/no-data-message.component";

const ClientsPage = () => {

  const [clients, setClients] = useState<ClientItem[]>([]);
  const [noClients, setNoClients] = useState<boolean>(false);
  const userId = useSelector(selectCurrentUserId);
  const { t } = useTranslation(["client", 'ui'])

  useEffect(() => {

    (async function () {
      try {
        const res = await http.get<ClientItem[]>(`/clients/${userId}`);
        if (res.data.length) {
          setClients(res.data)
        } else {
          setNoClients(true);
        }
      } catch (err) {
        console.log(err);
      }
    })()

  }, [userId])

  return (
    <Pane overflow={"scroll"} borderColor={'black'}>
      { noClients &&
        <NoDataMessage
          messageText={t("noClients", { ns: 'ui' }) + ', '}
          linkText={t("startAddingOne", { ns: 'ui' })}
          url={"/newlisting"}
        /> 
      }
      {
        clients.length ?
        <CustomTable 
          source={clients}
          setSource={setClients}
          labels={[
            t("name"),
            t("phone"),
          ]}
          entity="client"
          deleteMessage={ t("waitForClientDelete", { ns: 'ui' }) }
        /> : ""
      }
    </Pane>
  )
};

export default ClientsPage;
