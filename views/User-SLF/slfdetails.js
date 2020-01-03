import React, { Component } from 'react';
import {
  Platform, StyleSheet, Text, View, FlatList, ImageBackground, TouchableOpacity,
  ScrollView, Dimensions, Image, Linking
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import {
  Container,
  Header,
  Left,
  Right,
  Body,
  Title,
  Footer, FooterTab,
  Content,
  Button,
  Card, CardItem,
  Segment,
  Input

} from "native-base"
export class USERSLFdetailScreen extends Component {
  constructor(props) {
    super(props)

    this.state = {
      ID: '',
      student_code: '',
      student_prefix: '',
      student_name: ''
    }
  }
  loginHandler = () => {
    this.props.navigation.navigate('DrewerNav')
  }
  async componentDidMount() {
    var student_code = await AsyncStorage.getItem('student_code')
    var student_prefix = await AsyncStorage.getItem('student_prefix')
    var student_name = await AsyncStorage.getItem('student_name')
    var value = await AsyncStorage.getItem('ID')

    this.setState({
      ID: value,
      student_code: student_code,
      student_prefix: student_prefix,
      student_name: student_name
    })
  }
  render() {
    return (
      <View style={{
        backgroundColor: '#ebebeb',
        height: hp('100%')
      }}>
        <View style={{
          backgroundColor: '#343a40',
          flexDirection: 'row',

        }}>
          <Text style={{
            fontFamily: 'Kanit-Regular',
            fontSize: hp('2%'),
            marginLeft: wp('8%'),
            marginTop: hp('1%'),
            marginBottom: hp('1%'),
            color: '#fff'
          }}>
            <Image source={require('../../img/user.png')} style={{
              width: wp('5%'), height: hp('2.5%')
            }}>
            </Image>
          </Text>
          <Text style={{
            fontFamily: 'Kanit-Light',
            fontSize: hp('1.65%'),
            alignSelf: 'center',
            marginBottom: hp('1%'),
            marginTop: hp('1.25%'),
            marginLeft: wp('2%'),
            color: '#fff'
          }}>

            {this.state.student_prefix} {this.state.student_name}
          </Text>
          <Text style={{

            marginLeft: wp('12%'),
            marginTop: hp('0.25%'),
            marginBottom: hp('1%'),

          }}>
            <Image source={require('../../img/id-card.png')} style={{
              width: wp('7%'), height: hp('3%')
            }}>
            </Image>
          </Text>
          <Text style={{
            fontFamily: 'Kanit-Light',
            fontSize: hp('1.65%'),
            alignSelf: 'center',
            marginBottom: hp('1%'),
            marginTop: hp('1%'),
            marginLeft: wp('2%'),
            color: '#fff'
          }}>

            {this.state.student_code}
          </Text>
        </View>
        <Text style={{
          fontFamily: 'Kanit-Regular',
          fontSize: hp('2%'),
          alignSelf: 'center',
          marginTop: hp('5%')
        }}>
          กรุณาเลือกรายการที่ท่านต้องการ
                </Text>
        <ScrollView>
          <Card button 
          onPress={() => Linking.openURL('http://scholarship.sut.ac.th/sutfundNew/index.php/component/content/article/63-2011-01-04-05-07-45/794-estd-old-2561')}
          style={{
            height: hp('15%'),
            width: wp('90%'),
            marginTop: hp('5%'),
            alignSelf: 'center',
            borderRadius: 12,
            borderColor: '#000',
            borderWidth: 1,
          }}>
            <CardItem button
              style={{
                width: wp('70%'),
                borderRadius: 12,
                marginLeft: hp('10%'),
                marginTop: hp('2.5%')
              }}
              onPress={() => Linking.openURL('http://scholarship.sut.ac.th/sutfundNew/index.php/component/content/article/63-2011-01-04-05-07-45/794-estd-old-2561')}>
              <Text style={{
                fontFamily: 'Kanit-Regular',
                fontSize: hp('1.8%'),
                color: '#00008B',
                alignSelf: 'center',
                marginLeft: hp('2%')
              }}>
                กองทุนให้กู้ยืมเพื่อการศึกษา
            </Text>
            </CardItem>

            <CardItem button
              style={{
                width: wp('80%'),
                borderRadius: 12,
                marginTop: hp('-6.5%'),
                backgroundColor: 'transparent'
              }}
              onPress={() => Linking.openURL('http://scholarship.sut.ac.th/sutfundNew/index.php/component/content/article/63-2011-01-04-05-07-45/794-estd-old-2561')}>
              <Image source={require('../../img/slf.png')} style={{

                width: wp('17%'),
                height: hp('8%'),
                borderRadius: 12,

              }}>
              </Image>
            </CardItem>
            <CardItem button
              style={{
                width: wp('90%'),
                borderRadius: 12,
                marginLeft: hp('1%'),
                marginTop: hp('-3.5%'),
                marginBottom: hp('2%'),
                backgroundColor: 'transparent'
              }}
              onPress={() => Linking.openURL('http://scholarship.sut.ac.th/sutfundNew/index.php/component/content/article/63-2011-01-04-05-07-45/794-estd-old-2561')}
            >
              <Text style={{
                fontFamily: 'Kanit-Regular',
                fontSize: hp('1.8%'),
                color: '#00008B',
                alignSelf: 'center',
                marginTop: hp('-4%'),
                marginLeft: hp('11%')
              }}>
                สำหรับผู้กู้รายเก่าที่เคยกู้ที่ มทส.แล้ว
            </Text>
            </CardItem>
          </Card>

          <Card
            style={{

              width: wp('90%'),
              marginTop: hp('5%'),
              alignSelf: 'center',
              borderRadius: 12,
              borderColor: '#000',
              borderWidth: 1,
            }}>
            <CardItem button
              style={{
                width: wp('70%'),
                borderRadius: 12,
                marginLeft: hp('10%'),
                marginTop: hp('2%')
              }}
              onPress={() => Linking.openURL('http://scholarship.sut.ac.th/sutfundNew/index.php/component/content/article/89-estd-new/808-estdnew-2562')}
            >
              <Text style={{
                fontFamily: 'Kanit-Regular',
                fontSize: hp('1.8%'),
                color: '#00008B',
                marginLeft: hp('1.25%')
              }}
              >
                กองทุนให้กู้ยืมเพื่อการศึกษาสำหรับ
            </Text>
            </CardItem>
            <CardItem button
              style={{
                width: wp('80%'),
                borderRadius: 12,
                marginTop: hp('-5.5%'),
                backgroundColor: 'transparent'
              }}
              onPress={() => Linking.openURL('http://scholarship.sut.ac.th/sutfundNew/index.php/component/content/article/89-estd-new/808-estdnew-2562')}>

              <Image source={require('../../img/slf.png')} style={{

                width: wp('17%'),
                height: hp('8%'),
                borderRadius: 12,

              }}>

              </Image>
            </CardItem>
            <CardItem button
              style={{
                width: wp('85%'),
                borderRadius: 12,
                marginLeft: hp('1%'),
                marginTop: hp('-2.75%'),
                marginBottom: hp('2%'),
                backgroundColor: 'transparent'
              }}>
              <Text style={{
                fontFamily: 'Kanit-Regular',
                fontSize: hp('1.8%'),
                color: '#00008B',
                alignSelf: 'center',
                marginTop: hp('-5.5%'),
                marginLeft: hp('10%')
              }}
                onPress={() => Linking.openURL('http://scholarship.sut.ac.th/sutfundNew/index.php/component/content/article/89-estd-new/808-estdnew-2562')}>
                นักศึกษาใหม่ผู้กู้รายเก่าเปลี่ยนสถานศึกษาและผู้ประสงค์จะขอกู้รายใหม่
            </Text>
            </CardItem>
          </Card>

          <Card button onPress={() => Linking.openURL('https://www.studentloan.or.th/')}
            style={{
              width: wp('90%'),
              marginTop: hp('5%'),
              alignSelf: 'center',
              borderRadius: 12,
              borderColor: '#000',
              borderWidth: 1,
            }}
          >
            <CardItem header button
              style={{
                width: wp('70%'),
                borderRadius: 12,
                
                backgroundColor: 'transparent',
              }}
              onPress={() => Linking.openURL('https://www.studentloan.or.th/')}
            >
              <Text style={{
                fontFamily: 'Kanit-Regular',
                fontSize: hp('1.8%'),
                color: '#00008B',
                alignSelf: 'center',
                marginTop: hp('2%'),
                marginLeft: hp('1%'),

              }}>

              </Text>

              <Image source={require('../../img/slf.png')} style={{

                width: wp('17%'),
                height: hp('8%'),
                borderRadius: 12,
                marginLeft: hp('-1%')
              }}>

              </Image>
            </CardItem>
            <CardItem button
              style={{
                width: wp('85%'),
                borderRadius: 12,
                marginLeft: hp('1%'),
                marginTop: hp('-5%'),
                marginBottom: hp('2%'),
                backgroundColor: 'transparent',

              }}
              onPress={() => Linking.openURL('https://www.studentloan.or.th/')}>
              <Text style={{
                fontFamily: 'Kanit-Regular',
                fontSize: hp('1.8%'),
                color: '#00008B',
                marginTop: hp('-5.5%'),
                marginLeft: hp('10%')
              }}>
                E-Studentloan
            </Text>
            </CardItem>
          </Card>
        </ScrollView>
      </View>

    );
  }
}

