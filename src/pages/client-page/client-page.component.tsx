import React, { useEffect, useState, lazy, Suspense } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { Spinner } from "evergreen-ui";

import http from "../../http/http";
import { selectCurrentUserId } from "../../redux/user/user.selectors";
import { useParams } from "react-router-dom";
import { Client } from "./client-page.types";

const ClientDetail = lazy(() => import("../../components/client-detail/client-detail.component"));
const ClientForm = lazy(() => import("../../components/client-form/client-form.component"));

const ClientPage = () => {

  const [clientData, setClientData] = useState<Client>();
  const { clientId } = useParams();
  const location = useLocation();
  const userId = useSelector(selectCurrentUserId);
  useEffect(() => {

    (async function () {
      try {
        const clientData = await http.get<Client>(`/clients/${userId}/${clientId}`)
        setClientData(clientData.data)
      } catch (err) {
        console.log(err);
      }
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => { console.log("clientData: ", clientData); }, [ clientData ])

  switch (location.pathname) {
    case `/editclient/${clientId}`:
      return (
        <Suspense fallback={<Spinner />}>
          <ClientForm clientData={clientData} setClient={setClientData} />
        </Suspense>
      )
    case `/clientdetail/${clientId}`:
      return (
        <Suspense fallback={<Spinner />}>
          <ClientDetail clientData={ clientData }/>
        </Suspense>
      )
    default:
      return <>"no route was matched"</> 
  }
};

export default ClientPage;
