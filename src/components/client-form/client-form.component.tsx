import React, { FC } from "react";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { Pane } from "evergreen-ui";

import useCalculateAppWidth from "../../hooks/use-calculate-app-width";

import { Client } from "../../pages/client-page/client-page.types";
import { onSubmitClientData } from "./client-form.api";
import { CLIENT_FORM_INITIAL_STATE } from "./client-form.consts";
import Input from "../input/input.component";
import FormSubmit from "../form-submit/form-submit.component";
import { ClientFormProps } from "./client-form.types";
import Form from "../form/form.component";
import useGenerateForm from "../../hooks/use-generate-form";

const ClientForm: FC<ClientFormProps> = ({ clientData, setClient }) => {
  const appWidth = useCalculateAppWidth();
  const { t } = useTranslation([ "client", "listing" ])
  const { handleSubmit, setError, inputCommonProps } = useGenerateForm<Client>(CLIENT_FORM_INITIAL_STATE, clientData);

  return (
    <Pane width={ appWidth } marginX={"auto"}>
      <Form
        onSubmit={handleSubmit((formData: Client) => onSubmitClientData(formData, setClient, setError))}
      >
        <Input name="clientName" type="text" label={ t("clientName") } { ...inputCommonProps } />
        <Input name="clientAge" type="text" label={ t("clientAge") } { ...inputCommonProps } />
        <Input name="clientContactPhone" type="text" label={ t("contactPhone") } { ...inputCommonProps } />
        <Input name="clientDetails" type="textarea" label={ t("clientDetails") } { ...inputCommonProps } />
        <FormSubmit text={ t("commitChanges", { ns: "listing" }) } />
      </Form>
    </Pane>
  )
}

export default ClientForm;
