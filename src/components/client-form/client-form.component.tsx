import React, { FC } from "react";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { Pane, minorScale } from "evergreen-ui";

import { Client } from "../../pages/client-page/client-page.types";
import { onSubmitClientData } from "./client-form.api";
import { CLIENT_FORM_INITIAL_STATE } from "./client-form.consts";
import Input from "../input/input.component";
import FormSubmit from "../form-submit/form-submit.component";
import { ClientFormProps } from "./client-form.types";
import Form from "../form/form.component";
import useGenerateForm from "../../hooks/use-generate-form";

const ClientForm: FC<ClientFormProps> = ({ clientData, setClient }) => {
  const { t } = useTranslation([ "client", "listing" ])
  const { handleSubmit, setError, inputCommonProps } = useGenerateForm<Client>(CLIENT_FORM_INITIAL_STATE, clientData);

  return (
    <Pane marginX={"auto"}>
      <Form
        id="client-form"
        onSubmit={handleSubmit((formData: Client) => onSubmitClientData(formData, setClient, setError))}
        gap={minorScale(8)}
        paddingX={ minorScale(5) }
      >
        <Input name="clientName" type="text" label={ t("clientName") } { ...inputCommonProps } />
        <Input name="clientAge" type="text" label={ t("clientAge") } { ...inputCommonProps } />
        <Input name="clientContactPhone" type="text" label={ t("contactPhone") } { ...inputCommonProps } />
        <Input name="clientDetails" type="textarea" label={ t("clientDetails") } { ...inputCommonProps } />
      </Form>
      <FormSubmit 
        text={ t("commitChanges", { ns: "listing" }) } 
        form="client-form"
      />
    </Pane>
  )
}

export default ClientForm;
