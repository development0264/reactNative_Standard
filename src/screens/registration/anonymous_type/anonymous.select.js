import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {Button, CheckBox} from 'react-native-elements';
import Wrapper from '../../../components /ui/wrapper';
import {useDispatch, useSelector} from 'react-redux';
import {sentAnonTypeData} from '../../../store /user/registration/password/actions';
import Title from '../../../components /ui/title';
import {registrationSteps as navigator} from '../../../navigation/screen.names';
import {main as styles} from '../../../styles/main';
/**
 * Select Anonymous type in app fro user and continue registration
 * @param navigate
 * @returns {*}
 */
const AnonymousScreen = ({navigation: {navigate}}) => {
  const [anonType, setChecked] = useState(false),
    {data, loading} = useSelector(r => r.PASSWORD_DATA.anonType),
    dispatch = useDispatch(),
    handleSubmit = () => dispatch(sentAnonTypeData(anonType)),
    effect = () => data.message === 'OK' && navigate(navigator.CreateEmail);

  useEffect(() => {
    effect();
  }, [loading]);
  return (
    <Wrapper>
      <Title
        text="Other users won’t be able to see your personal information"
        title="Anonymous"
      />
      <CheckBox
        center
        title="Stay anonymous inside the app?"
        checkedColor="grey"
        onPress={() => setChecked(!anonType)}
        checked={anonType}
        containerStyle={styles.AnonymousScreen.containerStyle}
        size={40}
      />
      <View style={styles.AnonymousScreen.box}>
        <Button
          onPress={() => handleSubmit()}
          loading={loading}
          title="Save"
          disabled={loading}
        />
      </View>
    </Wrapper>
  );
};
export default AnonymousScreen;
