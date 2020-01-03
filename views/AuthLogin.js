import React from 'react';
import {
    Platform, StyleSheet, Text, View, FlatList, ImageBackground, TouchableOpacity,
    ScrollView, Dimensions, Image
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import AsyncStorage from '@react-native-community/async-storage';
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
    Segment
} from "native-base";
import {
    BallIndicator,
    BarIndicator,
    DotIndicator,
    MaterialIndicator,
    PacmanIndicator,
    PulseIndicator,
    SkypeIndicator,
    UIActivityIndicator,
    WaveIndicator,
  } from 'react-native-indicators';
import Student from '../models/StudentModel';
// import SweetAlert from 'react-native-sweet-alert';

var student = new Student;
export class AuthLogin extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            student_code: ''
        }
    }
    async componentDidMount() {
        await this.getMemberData()

    }
    getMemberData = async () => {
        try {
            var arr = {};
            arr['user_username'] = await AsyncStorage.getItem('username');
            arr['user_password'] = await AsyncStorage.getItem('password');
            
            if (arr['user_username']!==null &&arr['user_password']!==null) {
                const information = await student.checkLogin(arr);
                if (information) {
                     AsyncStorage.setItem('student_name', information.student_name)
                     AsyncStorage.setItem('student_prefix', information.student_prefix)
                     AsyncStorage.setItem('student_code', information.student_id);
                     AsyncStorage.setItem('ID', information.ID);
                     AsyncStorage.setItem('student_school_of', information.student_school_of);
                     AsyncStorage.setItem('loan_amount',information.loan_amount.toString());
                     AsyncStorage.setItem('register_course',information.register_course.toString());
                     AsyncStorage.setItem('money_scope',information.money_scope.toString());
                     AsyncStorage.setItem('kar_kongcheep',information.kar_kongcheep.toString());
                     AsyncStorage.setItem('other_scholarship',information.other_scholarship);
                     AsyncStorage.setItem('gpax',information.gpax.toString());
                     AsyncStorage.setItem('type_scholarship',information.type_scholarship);

                    this.props.navigation.navigate('User')
                }
            } else {
                this.props.navigation.navigate('Login')
            }
        } catch (e) {
            // error reading value
        }
    }
    render() {

        return (
            <View style={{ height: hp('100%'), backgroundColor: '#ebebeb' }}>
          <View style={{ marginTop: hp('25%') }}>
            <Image source={require('../img/slfLogo.png')}
              style={{
                marginTop: hp('3%'),
                width: wp('20%'), height: hp('11%'), borderRadius: 12, alignSelf: 'center'
              }}
            >
            </Image>
            <Text
              style={{
                fontFamily: 'Kanit-Regular',
                fontSize: hp('1.8%'),
                marginTop: hp('3%'),
                alignSelf: 'center'
              }}>
              กรุณารอสักครู่...
            </Text>
            <PacmanIndicator count={5} color='#ff8c00' style={{ marginTop: hp('4%') }} size={70} />
          </View>
        </View>
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