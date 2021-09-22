import React from 'react';
import CardsListItem from './cards.list.item';
import {FlatList} from 'react-native';
/**
 * when card was added user will see list of cardsItem
 * @param cards
 * @returns {*}
 */
const CardsList = ({cards, navigation, alertRef}) => {
  const renderItemElement = ({item}) => (
    <CardsListItem
      card={item}
      key={item}
      navigation={navigation}
      alertRef={alertRef}
    />
  );
  return (
    <FlatList
      data={cards}
      renderItem={renderItemElement}
      keyExtractor={el => el.id}
    />
  );
};
export default CardsList;
