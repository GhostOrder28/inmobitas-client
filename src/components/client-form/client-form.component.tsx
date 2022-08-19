import React, { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import { AxiosError } from "axios";
import { useSelector } from "react-redux";
import { Form, Field } from "react-final-form";
import { useNavigate, useParams } from "react-router-dom";
import {
  Button,
  Pane,
  TextInput,
  Text,
  Textarea,
  minorScale,
} from "evergreen-ui";

import useWindowDimensions from '../../hooks/use-window-dimensions';

import http from "../../utils/axios-instance";
import { selectCurrentUserId } from "../../redux/user/user.selectors";
import { selectValidationErrMsg } from "../../utils/utility-functions";
import ErrorMessage from "../error-message/error-message.component";
import { ValidationError } from "../../redux/redux.types";
import { desktopBreakpoint } from "../../constants/breakpoints.constants";
import { Client } from '../../pages/client-page/client-page.types';

type ClientFormProps = {
  clientData: Client | undefined;
  setClient: React.Dispatch<React.SetStateAction<Client | undefined>>;
}

const ClientForm: FC<ClientFormProps> = ({ clientData, setClient }) => {
  console.log(clientData)
  const navigate = useNavigate();
  const { clientid } = useParams();
  const { t } = useTranslation(['client', 'listing']);
  const userId = useSelector(selectCurrentUserId);
  const { windowInnerWidth } = useWindowDimensions();
  const [errors, setErrors] = useState<AxiosError<{ validationErrors: ValidationError[] }>>();

  const onSubmit = async (formData: Client) => {
    try {
      const { clientId, ...formDataWithoutIds } = formData;
      const res = await http.put<Client>(`/clients/${userId}/${clientid}`, formDataWithoutIds);

      setClient(res.data);
      navigate(`/clientdetail/${clientid}`)
    } catch (err) {
      setErrors(err as AxiosError<{ validationErrors: ValidationError[] }>);
    }
  }

  return (
    <Pane
      width={windowInnerWidth > desktopBreakpoint ? 600 : '100%'}
      marginX={'auto'}
    >
      <Form
        initialValues={clientData}
        onSubmit={onSubmit}
        render={({ handleSubmit, form, values }) => {
          console.log(values)
          return (
            <form
              className="form flex flex-column pa3"
              onSubmit={handleSubmit}
              encType="multipart/form-data"
              method="post"
            >
              <Pane marginTop={minorScale(5)}>
                <Field name="clientName" component="input">
                  {(props) => (
                    <>
                      <div className="flex items-center form-field">
                      <Text width={"9rem"}>{ t('clientName', { ns: 'client' }) + ' *' }</Text>
                      <TextInput
                        {...props.input}
                        placeholder={ t('clientName', { ns: 'client' }) }
                        width={"100%"}
                      />
                      </div>
                      <ErrorMessage
                        fieldErrorMsg={selectValidationErrMsg(
                          errors,
                          "clientName"
                        )}
                      />
                    </>
                  )}
                </Field>
              </Pane>
              <Pane marginTop={minorScale(5)}>
                <Field name="clientAge" component="input" parse={ (value) => parseInt(value) || null }>
                  {(props) => (
                    <>
                      <div className="flex items-center form-field">
                      <Text width={"9rem"}>{ t('clientAge', { ns: 'client' })}</Text>
                      <TextInput
                        {...props.input}
                        placeholder={ t('clientAge', { ns: 'client' }) }
                        width={"100%"}
                      />
                      </div>
                      <ErrorMessage
                        fieldErrorMsg={selectValidationErrMsg(
                          errors,
                          "clientAge"
                        )}
                      />
                    </>
                  )}
                </Field>
              </Pane>
              <Pane marginTop={minorScale(5)}>
                <Field name="clientContactPhone" component="input" parse={ (value) => parseInt(value) || null }>
                  {(props) => (
                    <>
                      <div className="flex items-center form-field">
                      <Text width={"9rem"}>{ t('contactPhone', { ns: 'client' }) + ' *' }</Text>
                      <TextInput
                        {...props.input}
                        placeholder={ t('contactPhone', { ns: 'client' }) }
                        width={"100%"}
                      />
                      </div>
                      <ErrorMessage
                        fieldErrorMsg={selectValidationErrMsg(
                          errors,
                          "clientContactPhone"
                        )}
                      />
                    </>
                  )}
                </Field>
              </Pane>
              <Pane marginTop={minorScale(5)}>
                <Field name="clientDetails" component="input">
                  {(props) => (
                    <>
                      <Textarea
                        placeholder={ t('clientDetails', { ns: 'client' }) }
                        value={props.input.value}
                        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                          props.input.onChange(e.target.value)
                        }
                      />
                      <ErrorMessage
                        fieldErrorMsg={selectValidationErrMsg(
                          errors,
                          "clientDetails"
                        )}
                      />
                    </>
                  )}
                </Field>
              </Pane>
              <Pane
                display={'flex'}
                justifyContent={'center'}
                width={'100%'}
                marginTop={minorScale(5)}
              >
                <Button
                  width={windowInnerWidth > desktopBreakpoint ? 400 : '100%'}
                  height={40}
                  type="submit"
                  appearance="primary"
                  id="submit-btn"
                >
                  { t('commitChanges', { ns: 'listing' }) }
                </Button>
              </Pane>
            </form>
          )
        }}
      />
    </Pane>
  )
}

export default ClientForm;
