import React, {useEffect, useRef} from 'react';
import Title from '../../../components /ui/title';
import HelperText from '../../../components /ui/helper.text';
import Wrapper from '../../../components /ui/wrapper';
import {useDispatch, useSelector} from 'react-redux';
import {
  refreshRegistrationEmail,
  sentEmailConfirmCode,
} from '../../../store /user/registration/email/actions';
import {resentEmailCodeData} from '../../../store /user/registration/resent/email/actions';
import SplashScreen from '../../../components /spinner';
import _ from 'lodash';
import DropdownAlert from 'react-native-dropdownalert';
import {registrationSteps as navigator} from '../../../navigation/screen.names';
import CodeConfirm from '../../../components /code.confirm';
/**
 * Email ConFirm Screen to confirm users email and finish registration steps
 * @param navigate
 * @param email
 * @param showNotification
 * @returns {*}
 */
const EmailConfirm = ({
  navigation: {navigate},
  route: {
    params: {email},
  },
}) => {
  const dispatch = useDispatch(),
    {data, loading} = useSelector(r => r.EMAIL_DATA.confirmCode),
    alertRef = useRef(),
    onFinishCheckingCode = code => dispatch(sentEmailConfirmCode(code)),
    sentConfirmCode = () => () => {
      alertRef.current.alertWithType(
        'info',
        'Info',
        `We sent code on your email: ${email}`,
      );
      dispatch(resentEmailCodeData(email));
    };
  useEffect(() => {
    !_.isEmpty(data) &&
      (navigate(navigator.Presentation), dispatch(refreshRegistrationEmail()));
  }, [loading]);

  return loading ? (
    <SplashScreen />
  ) : (
    <Wrapper>
      <Title
        title="Confirm Email"
        text={`We sent you a code on your email:\r\n ${email}`}
      />
      <CodeConfirm onFinishCheckingCode={onFinishCheckingCode} />
      <HelperText text="I didn't receive a code" onPress={sentConfirmCode()} />
      <DropdownAlert ref={alertRef} />
    </Wrapper>
  );
};
export default EmailConfirm;
