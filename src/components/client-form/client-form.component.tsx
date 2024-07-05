import React, { FC } from "react";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { Pane } from "evergreen-ui";

import useCalculateAppWidth from "../../hooks/use-calculate-app-width";

import { Client } from '../../pages/client-page/client-page.types';
import { onSubmitClientData } from './client-form.api';
import { CLIENT_FORM_INITIAL_STATE } from './client-form.consts';
import Input from '../input/input.component';
import FormSubmit from "../form-submit/form-submit.component";
import { ClientFormProps } from "./client-form.types";

const ClientForm: FC<ClientFormProps> = ({ clientData, setClient }) => {
  const appWidth = useCalculateAppWidth();
  const { t } = useTranslation([ 'client', 'listing' ])

  const { register, handleSubmit, setError, formState: { errors } } = useForm<Client>({
    defaultValues: CLIENT_FORM_INITIAL_STATE,
    values: clientData
  });

  return (
    <Pane width={ appWidth } marginX={'auto'}>
      <form
        className="form flex flex-column pa3"
        onSubmit={handleSubmit((formData: Client) => onSubmitClientData(formData, setClient, setError))}
        encType="multipart/form-data"
        method="post"
      >
        <Input name='clientName' type="text" label={ t('clientName') } register={register} errors={errors} />
        <Input name='clientAge' type="text" label={ t('clientAge') } register={register} errors={errors} />
        <Input name='clientContactPhone' type="text" label={ t('contactPhone') } register={register} errors={errors} />
        <Input name='clientDetails' type="textarea" label={ t('clientDetails') } register={register} errors={errors} />
        <FormSubmit text={ t('commitChanges', { ns: 'listing' }) } />
      </form>
    </Pane>
  )
}

export default ClientForm;
