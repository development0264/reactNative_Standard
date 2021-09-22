import React, {useEffect, useState} from 'react';
import {ScrollView, View} from 'react-native';
import {Button, CheckBox} from 'react-native-elements';
import {main} from '../../../styles/main';
import {main as styles} from '../../../styles/main';
import {CreditCardInput} from '../../../components /card/payment_card';
import {useDispatch, useSelector} from 'react-redux';
import {addCardData, refreshData} from '../../../store /user/card/add/actions';
import _ from 'lodash';
import {Formik} from 'formik';
import {Font, STRIPE_DEFAULTS} from '../../../config/data';
import {getCardsData} from "../../../store /user/card/cards_all/actions";
import {updateUserDetails} from "../../../store /user/user_data/actions"
import {cardRegister} from '../../../config/registration.values';
import {cardRegisterSchema as cardSchema} from '../../../config/formik.validation.schema';
import RegistrationInput from '../../../components /inputs/registration.input';
import {buttonText, helperText, UA, USA} from '../../../config/texts';
import UUIDGenerator from 'react-native-uuid-generator';

import {store} from '../../../store /store';
const {dispatch,getState} = store;

const style = main.cardStyle;
/**
 * PaymentCardListElement adding page send data to visa
 * @param
 * @returns {*}
 */
const UserPaymentCard = ({alertRef}) => {
  const dispatch = useDispatch(),
    data = useSelector(r => r.SEND_CARD_DATA),
    {loading, response} = data,
    [defaultType, setDefaultType] = useState(false),
    [isValidCard, setIsValidCard] = useState(false),
    [card, setCard] = useState({}),
    onChange = formData => {
      setCard({...formData.values});
      setIsValidCard(formData.valid);
    },
    _handleCredentialValuesSend = async (data) => {
      if (!isValidCard)
        return alertRef.current.alertWithType(
          'warn',
          'Warn',
          'Please fill all fields in Card inputs',
        );
        UUIDGenerator.getRandomUUID().then((uuid) => {
          let user = getState().USER_INFO_DATA.data
          const params = {
            requestId: uuid,
            creditCardNumber: String(card.number).replace(/ /g,"-"),
            expirationMonth: card.expiry.substring(0, 2),
            expirationYear: card.expiry.slice(-2),
            cvv: card.cvc,
            id: user.id,
            ...data
          }
          dispatch(addCardData(params));
        });
    };
  useEffect(() => {
    !_.isEmpty(response) &&
      (alertRef.current.alertWithType(
        'success',
        'Success',
        'Your Card successfully added !!!',
      ),
      setTimeout(() => {
        dispatch(updateUserDetails())
      }, 500),
      dispatch(refreshData()));
  }, [loading]);
  return (
    <ScrollView style={style.container}>
      <CreditCardInput
        autoFocus
        requiresCVC
        labelStyle={style.label}
        inputStyle={style.input}
        validColor="black"
        invalidColor="red"
        inputContainerStyle={{
          borderBottomColor: 'grey',
          borderBottomWidth: 0.5,
        }}
        placeholderColor="gray"
        additionalInputsProps={{width: 10}}
        onChange={onChange}
        inputStyle={{fontFamily: Font.Helvetica}}
      />
               <View style={{alignSelf: 'flex-start'}}>
               <CheckBox
               center
                title="Set as a default Card?"
                   checkedColor="grey"
                  onPress={() => setDefaultType(!defaultType)}
                   checked={defaultType}
                 containerStyle={style.mix.checkBoxStyle}
                 />
         </View>

         <Formik
        validationSchema={cardSchema}
        initialValues={cardRegister}
        onSubmit={values => _handleCredentialValuesSend(values)}>
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <View style={[styles.cardRegisterPageStyle.container, styles.cardRegisterPageStyle.horizontalPad]}>
            <RegistrationInput
              handleChange={handleChange}
              handleBlur={handleBlur}
              value={values.firstName}
              touched={touched.firstName}
              type="firstName"
              placeholder="First Name"
              error={errors.firstName}
            />
            <RegistrationInput
              handleChange={handleChange}
              handleBlur={handleBlur}
              value={values.lastName}
              touched={touched.lastName}
              type="lastName"
              placeholder="Last Name"
              error={errors.lastName}
            />
            <RegistrationInput
              handleChange={handleChange}
              handleBlur={handleBlur}
              value={values.address1}
              touched={touched.address1}
              type="address1"
              placeholder="Address"
              error={errors.address1}
            />
            <RegistrationInput
              handleChange={handleChange}
              handleBlur={handleBlur}
              value={values.city}
              touched={touched.city}
              type="city"
              placeholder="City"
              error={errors.city}
            />

            <RegistrationInput
              handleChange={handleChange}
              handleBlur={handleBlur}
              value={values.countryCode}
              touched={touched.countryCode}
              type="countryCode"
              placeholder="Country code"
              error={errors.countryCode}
            />
            <RegistrationInput
              handleChange={handleChange}
              handleBlur={handleBlur}
              value={values.state}
              touched={touched.state}
              type="state"
              placeholder="State"
              error={errors.state}
            />
            <RegistrationInput
              handleChange={handleChange}
              handleBlur={handleBlur}
              value={values.zipCode}
              touched={touched.zipCode}
              type="zipCode"
              placeholder="Zipcode"
              error={errors.zipCode}
            />
            <View style={style.mix.buttonStyle}>
              <Button
                onPress={handleSubmit}
                loading={loading}
                title="Save"
                disabled={loading}
              />
            </View>
          </View>
        )}
      </Formik>

        {/* <View style={style.mix.buttonStyle}>
            <Button title="Save" onPress={handleSubmit} loading={loading} />
        </View> */}
    </ScrollView>
  );
};
export default UserPaymentCard;
