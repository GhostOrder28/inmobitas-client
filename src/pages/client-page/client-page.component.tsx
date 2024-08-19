import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";

import http from "../../http/http";
import { selectCurrentUserId } from "../../redux/user/user.selectors";
import { useParams } from "react-router-dom";
import { Client } from "./client-page.types";

const ClientPage = () => {
  const [clientData, setClientData] = useState<Client>();
  const { clientId } = useParams();
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

  return (
    <Outlet context={ [ clientData, setClientData ] }/>
  )
};

export default ClientPage;
