import React, {useEffect, useRef} from 'react';
import Wrapper from '../../../components /ui/wrapper';
import Title from '../../../components /ui/title';
import HelperText from '../../../components /ui/helper.text';
import {useDispatch, useSelector} from 'react-redux';
import {confirmCode} from '../../../store /user/registration/full_name/actions';
import {refreshConfirmData} from '../../../store /user/registration/full_name/actions';
import _ from 'lodash';
import SplashScreen from '../../../components /spinner';
import {resentPhoneNumberData} from '../../../store /user/registration/resent/phone/actions';
import DropdownAlert from 'react-native-dropdownalert';
import {registrationSteps as navigator} from '../../../navigation/screen.names';
import CodeConfirm from '../../../components /code.confirm';
/**
 * Confirm phone take token from back-end
 * @param navigate
 * @param params
 * @param showNotification
 * @returns {*}
 */
const PhoneConfirm = ({navigation: {navigate}, route: {params}}) => {
  const {response, loading} = useSelector(r => r.REGISTRATION_DATA.confirmCode),
    dispatch = useDispatch(),
    onFinishCheckingCode = code => dispatch(confirmCode(code)),
    alertRef = useRef(null),
    sentConfirmCode = () => () => {
      dispatch(resentPhoneNumberData(params.phone));
      alertRef.current.alertWithType(
        'info',
        'Info',
        `We resent you a code on your phone number: ${params.phone}`,
      );
    },
    effect = () => {
      !_.isEmpty(response) &&
        (navigate(navigator.CreatePassword), dispatch(refreshConfirmData()));
    };
  useEffect(() => {
    effect();
  }, [loading]);

  return loading ? (
    <SplashScreen />
  ) : (
    <Wrapper>
      <Title
        title="Confirm Phone"
        text={`We sent you a code on your phone number:\r\n ${params.phone}`}
      />
      <CodeConfirm onFinishCheckingCode={onFinishCheckingCode} />
      <HelperText text="I didn't receive a code" onPress={sentConfirmCode()} />
      <DropdownAlert ref={alertRef} />
    </Wrapper>
  );
};
export default PhoneConfirm;
