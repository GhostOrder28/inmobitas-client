import { Client } from "../../pages/client-page/client-page.types";

export type ClientOutletContext = [
  clientData: Client | undefined,
  setClient: React.Dispatch<React.SetStateAction<Client | undefined>>,
]
