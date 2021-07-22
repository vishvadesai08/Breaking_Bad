import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from 'react-native';
import {AXIOS_TOOL} from '../provider/ApiProvider';
import AppLoader from '../common/Loader';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import AntDesign from 'react-native-vector-icons/AntDesign';

const SearchBreakingBad = ({navigation}) => {
  const [getCharacterData, setCharecterData] = useState([]);
  const [getIsLoading, setIsLoading] = useState(false);
  const [getCharecterName, setCharecterName] = useState(false);

  useEffect(() => {}, [getCharacterData]);

  const getSeachData = text => {
    setIsLoading(true);
    AXIOS_TOOL('GET', `/api/characters?name=${text}`).then(res => {
      setIsLoading(false);
      setCharecterData(res.data);
      console.log('search Data', res);
    });
  };

  const onCharecterNameChange = text => {
    setCharecterName(text);
    setTimeout(() => {
      getSeachData(text);
    }, 1000);
  };

  return (
    <View style={{flex: 1}}>
      <AppLoader isLoading={getIsLoading}></AppLoader>
      <View style={styles.viewConatainer}>
        <View style={{flex: 1}}>
          <TextInput
            style={styles.textInputStyle}
            onChangeText={text => onCharecterNameChange(text)}
            placeholderTextColor="white"
            placeholder="Search"></TextInput>
        </View>
        <View style={{flex: 0.1}}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <AntDesign name={'close'} size={20} color={'gray'} />
          </TouchableOpacity>
        </View>
      </View>

      <FlatList
        style={styles.flatListStyle}
        numColumns={2}
        data={getCharacterData}
        renderItem={(item, index) => {
          return (
            <View style={styles.flatListMainView}>
              <Image
                style={styles.imageViewStyle}
                resizeMode="stretch"
                source={{
                  uri: item.item.img,
                }}
              />
              <View style={styles.nameConatiner}>
                <View style={styles.nameViewContainer}>
                  <Text style={styles.nameText}>{item.item.name}</Text>
                  <Text style={styles.nickNameText}>{item.item.nickname}</Text>
                </View>
                <View style={styles.heartIconMainView}>
                  <TouchableOpacity
                    style={{alignItems: 'flex-end'}}
                    onPress={() => {
                      dispatch(addFavourite(item.item));
                    }}>
                    <View style={styles.heartIconView}>
                      <AntDesign name={'heart'} size={20} color={'gray'} />
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          );
        }}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

export default SearchBreakingBad;
const styles = StyleSheet.create({
  viewConatainer: {
    height: hp('8%'),
    flexDirection: 'row',
    backgroundColor: '#242424',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInputStyle: {
    fontSize: wp('4.5%'),
    color: '#FFFFFF',
    marginLeft: 30,
  },
  heartIconView: {flex: 0.3, marginRight: 8},
  heartIconMainView: {flex: 0.3, marginRight: 8},
  nameText: {
    color: 'white',
    fontSize: wp('3.5%'),
    fontWeight: 'bold',
  },
  nickNameText: {
    color: 'white',
    fontSize: wp('3%'),
    fontFamily: 'Roboto-Light',
  },
  flatListMainView: {
    flex: 1,
    margin: 20,
    alignItems: 'center',
    fontFamily: 'Roboto-Thin',
  },
  nameConatiner: {
    flexDirection: 'row',
    marginTop: hp('2%'),
    marginLeft: 10,
  },
  nameViewContainer: {flex: 0.7, justifyContent: 'flex-end'},
  imageViewStyle: {
    width: hp('18%'),
    height: hp('19%'),
    borderRadius: 5,
  },
  titleTextStyle: {
    fontSize: wp('4.5%'),
    color: '#FFFFFF',
    marginLeft: 30,
  },
  titleIconsView: {
    flex: 0.2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: 20,
  },
  flatListStyle: {flex: 1, backgroundColor: 'black'},
});
