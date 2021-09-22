import React, {useRef} from 'react';
import Wrapper from '../../../components /ui/wrapper';
import Title from '../../../components /ui/title';
import HelperText from '../../../components /ui/helper.text';
import {useDispatch, useSelector} from 'react-redux';
import {
  restorePasswordSent,
  senConfirmData,
} from '../../../store /user/registration/forgot/password/action';
import CodeConfirm from '../../../components /code.confirm';
import DropdownAlert from 'react-native-dropdownalert';
import {forgotPasswordSteps as navigator} from '../../../navigation/screen.names';

/**
 * confirm code  and make new password
 * @param navigate
 * @param params
 * @returns {*}
 */
const PhoneConfirm = ({
  navigation: {navigate},
  route: {params},
}) => {
  const dispatch = useDispatch(),
    {
      response: {code},
    } = useSelector(r => r.RESTORE_DATA),
    alertRef = useRef(null),
    onFinishCheckingCode = valid => {
      if (!valid)
        return alertRef.current.alertWithType(
          'warn',
          'Warn',
          'Code didnt match',
        );
      const phone = params.phone.replace(/[^+\d]/g, '');
      dispatch(senConfirmData({code: `${code}`, phone}));
      navigate(navigator.ForgotCreatePassword);
    },
    sentConfirmCode = () => () => {
      alertRef.current.alertWithType(
        'info',
        'Info',
        `We resent you a code on your phone number: ${params.phone}`,
      );
      dispatch(restorePasswordSent(params.phone));
    };
  return (
    <Wrapper>
      <Title
        title="Confirm Phone"
        text={`We sent you a code on your phone number:\r\n ${params.phone}`}
      />
      <CodeConfirm code={code} onFinishCheckingCode={onFinishCheckingCode} />
      <HelperText text="I didn't receive a code" onPress={sentConfirmCode()} />
      <DropdownAlert ref={alertRef} />
    </Wrapper>
  );
};
export default PhoneConfirm;
