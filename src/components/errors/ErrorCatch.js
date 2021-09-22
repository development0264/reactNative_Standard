import React, {useRef, useEffect} from 'react';
import DropdownAlert from 'react-native-dropdownalert';
import {useSelector, useDispatch} from 'react-redux';
import {refreshErrorState} from '../../store /error/actions';
import _ from 'lodash';
import {colors} from '../../styles/colors';

const ErrorCaches = () => {
  const alertRef = useRef(null),
    error = useSelector(r => r.ERROR_CATCH_DATA),
    dispatch = useDispatch();
  useEffect(() => {
    if (!_.isEmpty(error.error)) {
      alertRef.current.alertWithType('error', 'Error', error.error.message);
    }
    return () => dispatch(refreshErrorState());
  }, [error.flag]);

  return (
    <DropdownAlert
      ref={alertRef}
      errorColor={colors.red}
      successColor={colors.green}
      closeInterval={1000}
    />
  );
};
export default ErrorCaches;
