import React from 'react';
import {Input, Text} from 'react-native-elements';
import {main as styles} from '../../styles/main';
import {colors} from '../../styles/colors'


export default ({error ,touched,...props}) => {
    return (
        <>
        <Input
        {...props}
       />
       { error && touched  && 
        <Text style={{color:colors.red,paddingLeft:20}}>
           {error && touched  && error}
         </Text>
       }
      </>
    )
}