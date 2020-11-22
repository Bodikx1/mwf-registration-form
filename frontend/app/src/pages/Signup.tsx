import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';

import ButtonGroup from '@atlaskit/button/button-group';
import LoadingButton from '@atlaskit/button/loading-button';
import { Checkbox } from '@atlaskit/checkbox';
import TextField from '@atlaskit/textfield';

import Form, {
  ErrorMessage,
  Field,
  FormFooter,
  HelperMessage,
} from '@atlaskit/form';

import { getUserByEmail } from '../services/apiService';
import { signUpUser } from '../redux/actions/userActions';
import PasswordConfirmation from '../components/PasswordConfirmation';

export interface FormFields {
  useremail: string;
  username: string;
  password: string;
  passwordConfirm: string;
};

function Signup(props: any) {
  const [nextStep, setNextStep] = useState(false);

  const checkIsUserExists = async (useremail: string) => {
    let userData = null;
    try {
      userData = await getUserByEmail(useremail);
    } catch (err) {
      // suppress error, do nothing
    }
    // user with such email exists already
    if (userData) {
      return { useremail: 'EMAIL_IN_USE' };
    } else {
      setNextStep(true);
      return;
    }
  };

  const onSubmitHandler = async (data: FormFields): Promise<any> => {
    const { useremail, password, passwordConfirm } = data;

    if (nextStep && password === passwordConfirm) {
      props.signUpUser(data, props.history);
      return;
    } else {
      return checkIsUserExists(useremail);
    }
  };

  const userNameValidator = (value?: string) => {
    if (value && value.length < 4) {
      return 'TOO_SHORT';
    }
    return;
  }

  const containerStyles: React.CSSProperties = {
    display: 'flex',
    width: '400px',
    maxWidth: '100%',
    margin: '0 auto',
    flexDirection: 'column',
  };

  return (
    <div style={containerStyles}>
      <Form<FormFields>
        onSubmit={onSubmitHandler}
      >
        {({ formProps, submitting }) => (
          <form {...formProps}>
            <Field
              name="useremail"
              label="User email"
              defaultValue=""
              isRequired
            >
              {({ fieldProps, error, valid, meta }) => (
                <Fragment>
                  <TextField
                    placeholder="some@email.com"
                    type="email"
                    pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                    {...fieldProps}
                  />
                  {error === 'EMAIL_IN_USE' && (
                    <ErrorMessage>
                      This user email is already in use, try another one.
                    </ErrorMessage>
                  )}
                </Fragment>
              )}
            </Field>
            <Field
              name="username"
              label="User name"
              defaultValue=""
              validate={userNameValidator}
              isRequired
            >
              {({ fieldProps, error }) => (
                <Fragment>
                  <TextField
                    placeholder="Enter user name"
                    autoComplete="off"
                    {...fieldProps}
                  />
                  {!error && (
                    <HelperMessage>
                      You can use letters, numbers & periods.
                    </HelperMessage>
                  )}
                  {error === 'TOO_SHORT' && (
                    <ErrorMessage>
                      User name should be longer than 4 characters.
                    </ErrorMessage>
                  )}
                </Fragment>
              )}
            </Field>
            {nextStep ? <PasswordConfirmation /> : null}
            <FormFooter>
              <ButtonGroup>
                <LoadingButton
                  type="submit"
                  appearance="primary"
                  isLoading={submitting}
                >
                  {nextStep ? 'Signup' : 'Next'}
                </LoadingButton>
              </ButtonGroup>
            </FormFooter>
          </form>
        )}
      </Form>
    </div>
  );
}

//this map the states to our props in this functional component
const mapStateToProps = (state: any) => ({
  user: state.user,
  UI: state.UI
});

//this map actions to our props in this functional component
const mapActionsToProps = {
  signUpUser
};

export default connect(mapStateToProps, mapActionsToProps)(Signup);
