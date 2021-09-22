import React from 'react';
import {Appbar} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {DrawerActions} from '@react-navigation/routers/src/DrawerRouter';
import {main as style} from '../../styles/main';

const MainHeader = ({title}) => {
  const navigator = useNavigation(),
    styles = style.MainHeader;
  return (
    <Appbar.Header style={styles.header} statusBarHeight={styles.height}>
      <Appbar.Action
        icon="menu"
        onPress={() => navigator.dispatch(DrawerActions.openDrawer())}
        size={styles.size}
      />
      <Appbar.Content title={title} titleStyle={styles.content} />
    </Appbar.Header>
  );
};
export default MainHeader;
