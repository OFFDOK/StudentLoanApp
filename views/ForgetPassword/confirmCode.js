import React from 'react';
import {
    Platform, StyleSheet, Text, View, FlatList, ImageBackground, TouchableOpacity,
    ScrollView, Dimensions, Image, PermissionsAndroid, TextInput, Alert
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
} from "native-base"

import Email from '../../models/EmailModel';
import Student from '../../models/StudentModel';
// import SweetAlert from 'react-native-sweet-alert';

var email = new Email;
var student = new Student;
export class confirmCodeScreen extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            student_code: '',
            verify_code: '',
            email: ''
        }
    }
    async sendCodeFunction() {
        // console.warn(this.state.verify_code);
        var arr = {}
        arr['verify_code'] = this.state.verify_code
        arr['student_id'] = this.state.student_id

        const checkCode = await email.checkVerifyCode(arr)
        if (checkCode) {
            // console.warn(checkCode.verify_status);
            if (checkCode.verify_status === 'not use') {
                this.props.navigation.navigate('renewPassword', {
                    student_id: arr['student_id'],
                    verify_code: arr['verify_code'],
                    email: this.state.email
                })
            }
            else {
                Alert.alert("เกิดความผิดพลาด",
                    "รหัสยืนยันดังกล่าวถูกใช้งานไปแล้ว กรุณากรอกรหัสยืนยันใหม่หรือติดต่อรับรหัสใหม่อีกครั้ง")
            }
        } else {
            Alert.alert("ข้อมูลไม่ถูกต้อง",
                "กรุณากรอกรหัสยืนยันให้ถูกต้อง")
        }

    }
    async componentDidMount() {
        const { navigation } = this.props;
        var student_id = navigation.getParam('student_id', 'NO-ID')
        var email = navigation.getParam('email', 'NO-ID')
        this.setState({
            student_id: student_id,
            email: email
        })
    }
    loginHandler = () => {
        this.props.navigation.navigate('DrewerNav')
    }
    render() {

        return (
            <ImageBackground source={require('../../img/bg.png')}
                style={{
                    flex: 1,
                    width: wp('100%'),
                    height: hp('100%')
                }}>
                <TouchableOpacity
                    style={{
                        width: wp('15%'), marginLeft: wp('1%'), height: hp('8%')
                    }}
                    onPress={() => this.props.navigation.navigate('ForgetPassword')}
                >
                    <Image source={require('../../img/left-arrow.png')} style={{
                        marginTop: hp('4%'), marginBottom: hp('3%'), marginLeft: wp('5%'),
                        width: wp('7%'), height: hp('3%'),
                    }}
                        onPress={() => this.props.navigation.navigate('ForgetPassword')}
                    >
                    </Image>
                </TouchableOpacity>
                <View style={{
                    marginTop: hp('24%'),
                }}>
                    
                    <Text style={{
                        marginLeft: wp('10%'),
                        fontFamily: 'Kanit-Regular',
                        fontSize: hp('2%'),
                        color: '#ffffff',
                        marginTop: hp('3%')
                    }}>
                        กรอกรหัสยืนยันการเปลี่ยนรหัสผ่าน
                    </Text>
                    <TextInput
                        underlineColorAndroid='transparent'
                        style={styles.TextInputStyle}
                        require
                        value={this.state.firstname}
                        keyboardType={'numeric'}
                        onChangeText={(verify_code) => {
                            this.setState({ verify_code })
                        }}
                    />
                    <TouchableOpacity
                        style={{
                            marginTop: hp('5%'),
                            height: hp('7%'),
                            width: wp('40%'),
                            justifyContent: 'center',
                            alignSelf: 'center',
                            backgroundColor: '#fff',
                            borderRadius: 40,
                            elevation: 3
                        }}
                        onPress={this.sendCodeFunction.bind(this)}>

                        <Text
                            style={{
                                fontFamily: 'Kanit-Regular',
                                fontSize: hp('2.5%'),
                                alignSelf: 'center',
                                color: '#F87217',
                            }}
                        >บันทึก</Text>
                    </TouchableOpacity>
                </View>
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
    TextInputStyle: {
        marginTop: hp('2%'),
        height: 45,

        width: wp('80%'),
        fontSize: hp('2%'),
        fontFamily: 'Kanit-Regular',
        borderRadius: 12,
        alignSelf: 'center',
        backgroundColor: '#ffffff'
    },
});