import React, {useState, useEffect, useCallback} from 'react';
import {
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ImageBackground,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useDispatch} from 'react-redux';
import {addFavourite} from '../redux/Action/FavouriteAction';

const BreakingBadDetails = ({navigation, route}) => {
  const [getUserData, setUserData] = useState(route.params.userData);

  const dispatch = useDispatch();
  return (
    <ScrollView style={{flex: 1, backgroundColor: 'black'}}>
      <ImageBackground
        style={styles.imageViewStyle}
        resizeMode="stretch"
        source={{
          uri: getUserData.img,
        }}>
        <View style={styles.headerViewContainer}>
          <View style={styles.backArrowView}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <AntDesign name={'arrowleft'} size={20} color={'#FFFFFF'} />
            </TouchableOpacity>
          </View>
          <View style={{alignItems: 'flex-end', flex: 1}}>
            <TouchableOpacity
              onPress={() => {
                dispatch(addFavourite(getUserData));
              }}>
              <AntDesign name={'heart'} size={20} color={'#FFFFFF'} />
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
      <View>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: hp('-30%'),
          }}>
          <Image
            style={styles.smallImageViewStyle}
            resizeMode="stretch"
            source={{
              uri: getUserData.img,
            }}
          />
          <View style={styles.nameViewContainer}>
            <Text style={styles.nameText}>{getUserData.name}</Text>
            <Text style={styles.nickNameText}>{getUserData.nickname}</Text>
          </View>
        </View>
        <View style={{flex: 1, flexDirection: 'row', margin: hp('3%')}}>
          <View style={{justifyContent: 'flex-start'}}>
            <Text
              style={{
                color: '#18CA75',
                fontSize: wp('3.5%'),
              }}>
              Portrayed
            </Text>
            <Text
              style={{
                color: '#FFFFFF',
                fontSize: wp('3.5%'),
              }}>
              {getUserData.portrayed}
            </Text>
          </View>
          <View
            style={{
              flex: 1,
              justifyContent: 'flex-end',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Text
              style={{
                color: '#FFFFFF',
                fontSize: wp('3.5%'),
                marginRight: wp('2%'),
              }}>
              {getUserData.birthday}
            </Text>
            <AntDesign name={'calendar'} size={20} color={'#FFFFFF'} />
          </View>
        </View>
        <View style={{marginTop: hp('2%'), margin: hp('3%')}}>
          <Text
            style={{
              color: '#18CA75',
              fontSize: wp('3.5%'),
            }}>
            occupation
          </Text>

          <Text
            style={{
              color: '#FFFFFF',
              fontSize: wp('3.5%'),
            }}>
            {getUserData.occupation[0]}
          </Text>
          <Text
            style={{
              color: '#18CA75',
              fontSize: wp('3.5%'),
              marginTop: hp('5%'),
            }}>
            Appered In
          </Text>
          <FlatList
            style={{marginTop: hp('1%'), marginLeft: -5}}
            horizontal={true}
            data={getUserData.appearance}
            renderItem={(item, index) => {
              return (
                <View
                  style={{
                    height: hp('3.5%'),
                    width: wp('20%'),
                    margin: 5,
                    justifyContent: 'center',
                    //borderWidth: 1,
                    backgroundColor: '#242424',
                  }}>
                  <Text style={{textAlign: 'center', color: 'white'}}>
                    Season {item.item}
                  </Text>
                </View>
              );
            }}
            keyExtractor={item => item.id}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default BreakingBadDetails;
const styles = StyleSheet.create({
  imageViewStyle: {
    width: '100%',
    height: hp('46%'),
    opacity: 0.5,
    //borderRadius: 5,
  },
  smallImageViewStyle: {
    width: hp('17%'),
    height: hp('24%'),
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 1,
    //borderRadius: 5,
  },
  nameViewContainer: {flex: 0.7, justifyContent: 'flex-end'},
  nameText: {
    color: '#FFFFFF',
    marginTop: hp('2.5%'),
    fontSize: wp('5.5%'),
    fontWeight: 'bold',

    alignSelf: 'center',
  },
  nickNameText: {
    color: '#FFFFFF',
    fontSize: wp('3.5%'),

    alignSelf: 'center',
  },
  headerViewContainer: {margin: 20, flexDirection: 'row'},
  backArrowView: {justifyContent: 'flex-start', flex: 1},
});
