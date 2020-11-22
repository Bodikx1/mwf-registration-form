
import React, { Fragment, useState } from 'react';
import TextField from '@atlaskit/textfield';

import Form, {
  ErrorMessage,
  Field,
  HelperMessage,
  ValidMessage,
} from '@atlaskit/form';


function PasswordConfirmation(props: any) {
  const [password, setPassword] = useState('');

  const passwordValidator = (value?: string) => {
    if (value && value.length < 8) {
      return 'TOO_SHORT';
    }
    value && setPassword(value);
    return;
  };

  const passwordConfirmValidator = (value?: string) => {
    if (value && value !== password) {
      return 'DOESN\'T_MATCH';
    }
    return;
  };

  return (
    <Fragment>
      <Field
        name="password"
        label="Password"
        defaultValue=""
        isRequired
        validate={passwordValidator}
      >
        {({ fieldProps, error, valid, meta }) => {
          return (
            <Fragment>
              <TextField type="password" {...fieldProps} />
              {error && !valid && (
                <HelperMessage>
                  Use 8 or more characters with a mix of letters, numbers &
                  symbols.
                </HelperMessage>
              )}
              {error && (
                <ErrorMessage>
                  Password needs to be more than 8 characters.
                </ErrorMessage>
              )}
              {valid && meta.dirty ? (
                <ValidMessage>Awesome password!</ValidMessage>
              ) : null}
            </Fragment>
          );
        }}
      </Field>
      <Field
        name="passwordConfirm"
        label="Password confirmation"
        defaultValue=""
        isRequired
        validate={passwordConfirmValidator}
      >
        {({ fieldProps, error, valid, meta }) => {
          return (
            <Fragment>
              <TextField type="password" {...fieldProps} />
              {error && !valid && (
                <HelperMessage>
                  Should be the same as password.
                </HelperMessage>
              )}
              {error && (
                <ErrorMessage>
                  Password confirmation doesn't match with password.
                </ErrorMessage>
              )}
              {valid && meta.dirty ? (
                <ValidMessage>Password confirmed!</ValidMessage>
              ) : null}
            </Fragment>
          );
        }}
      </Field>
    </Fragment>
  );
}

export default PasswordConfirmation;