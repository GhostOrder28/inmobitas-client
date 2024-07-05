import { OneOf } from "../utils/utility-types";
import { Client } from "../pages/client-page/client-page.types";
import { Listing } from "../pages/listing-page/listing-page.types";
import { SignInData } from "../components/user-auth/user-auth.types";
import { FieldErrors } from "react-hook-form";
import { AgendaEvent } from "../pages/agenda-page/agenda-page.types";

export type Forms = [ Listing, Client, SignInData, AgendaEvent ]
export type FormErrors = OneOf<[ FieldErrors<Client>, FieldErrors<Listing>, FieldErrors<AgendaEvent> ]>
