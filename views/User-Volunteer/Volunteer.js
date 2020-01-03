import React,{Component} from 'react';
import {
  Platform, StyleSheet, Text, View, FlatList, ImageBackground, TouchableOpacity,
  ScrollView, Dimensions, Image, Button
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
export class USERVolunteerdetailScreen extends Component {

  loginHandler = () => {
    this.props.navigation.navigate('DrewerNav')
  }

  render() {
    return (
      <ImageBackground source={require('../../img/bg.png')}
        style={{
          flex: 1,
          width: wp('100%'), height: hp('100%'),
          justifyContent: 'center',
          alignItems: 'center',
          padding: 2,
        }}>

        <Image source={require('../../img/SUT.png')} style={{
          marginTop: hp('2%'), marginBottom: hp('3%'),
          width: wp('15%'), height: hp('12%'),
        }}>

        </Image>
        
      </ImageBackground >

    );
  }
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 2,
  },

  box: {
    margin: 1,
    width: Dimensions.get("window").width / 6 - 6,
    height: hp('29%'),
    width: wp('42%'),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#ffb347",
    borderRadius: 1,
    opacity: 0.75,
  },
  boxLogin: {
    margin: 1,
    width: Dimensions.get("window").width / 6 - 6,
    height: hp('12%'),
    width: wp('84%'),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#47ffb3",
    borderRadius: 1,
    opacity: 1,
  },
});