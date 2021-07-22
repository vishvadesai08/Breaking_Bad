import React, {useState, useEffect, useCallback} from 'react';
import {
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {AXIOS_TOOL} from '../provider/ApiProvider';
import AppLoader from '../common/Loader';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useDispatch} from 'react-redux';
import {addFavourite} from '../redux/Action/FavouriteAction';
import {useSelector} from 'react-redux';
import {useFocusEffect} from '@react-navigation/native';

const BreakingBadList = ({navigation}) => {
  const dispatch = useDispatch();
  const [getCharacterData, setCharecterData] = useState();
  const [getIsLoading, setIsLoading] = useState(false);
  const [getFavData, setFavData] = useState(
    useSelector(state => state.FavouriteReducer.favouriteData),
  );

  useFocusEffect(
    useCallback(() => {
      console.log('getFAvDATA', getFavData);
      getCharecterData();
    }, []),
  );

  const getCharecterData = () => {
    setIsLoading(true);
    AXIOS_TOOL('GET', '/api/characters').then(res => {
      setIsLoading(false);
      setCharecterData(res.data);
    });
  };

  return (
    <View style={{flex: 1}}>
      <AppLoader isLoading={getIsLoading}></AppLoader>
      <View style={styles.viewConatainer}>
        <View style={{flex: 1}}>
          <Text style={styles.titleTextStyle}>The Breaking Bad</Text>
        </View>
        <View style={styles.titleIconsView}>
          <TouchableOpacity
            style={{padding: 5}}
            onPress={() => navigation.navigate('searchBreakingBad')}>
            <AntDesign name={'search1'} size={20} color={'gray'} />
          </TouchableOpacity>
          <TouchableOpacity
            style={{padding: 5}}
            onPress={() => navigation.navigate('Favourite')}>
            <AntDesign name={'heart'} size={20} color={'gray'} />
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
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('BreakingBadDetails', {
                    userData: item.item,
                  })
                }>
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
                    <Text style={styles.nickNameText}>
                      {item.item.nickname}
                    </Text>
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
              </TouchableOpacity>
            </View>
          );
        }}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

export default BreakingBadList;

const styles = StyleSheet.create({
  viewConatainer: {
    height: hp('8%'),
    flexDirection: 'row',
    backgroundColor: '#242424',
    justifyContent: 'center',
    alignItems: 'center',
  },
  heartIconView: {flex: 0.3, marginRight: 8},
  heartIconMainView: {flex: 0.3, marginRight: 8},
  nameText: {
    color: 'white',
    fontSize: wp('3.5%'),
    fontWeight: 'bold',
    fontFamily: 'Roboto-Light',
  },
  nickNameText: {color: 'white', fontSize: wp('3%'), fontFamily: 'Roboto-Thin'},
  flatListMainView: {flex: 1, margin: 20, alignItems: 'center'},
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
    fontFamily: 'Roboto-Bold',
  },
  titleIconsView: {
    flex: 0.2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: 20,
  },
  flatListStyle: {flex: 1, backgroundColor: 'black'},
});
