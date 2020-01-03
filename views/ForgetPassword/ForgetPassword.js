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
export class ForgetPasswordScreen extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            ID: '',
            student_code: '',
            email: '',
            student_id: '',
        }
    }
    async sendCodeFunction() {
        var arr = {}
        var RandomNumber = Math.floor(Math.random() * 1000000) + 1;
        // const send_email = email.SendEmail()
        var student_id = this.state.student_id
        var ID = this.state.ID
        const data = await student.getStudentByCode({ student_id, ID })
        if (data) {
            arr['email'] = data.student_email
            arr['student_id'] = data.student_id
            arr['student_name'] = data.student_name
            arr['verify_code'] = RandomNumber

            // console.warn(arr);

            // const send_email = await email.SendEmail(arr)
            // if(send_email){
            const save_log = await email.insertVerifyData(arr)
            if (save_log) {
                Alert.alert("ดำเนินการเสร็จสิ้น",
                    "โปรดตรวจสอบรหัสยืนยันของคุณได้ที่อีเมล " + arr['email'])
                this.props.navigation.navigate('confirmCode', {
                    student_id: arr['student_id'],
                    email: arr['email']
                })
            }
            // }else{
            //     Alert.alert("เกิดข้อผิดพลาด",
            //             "ระบบการส่งอีเมลเกิดข้อผิดพลาด ทางทีมงานกำลังดำเนินการปรับปรุง")
            // }
        } else {
            Alert.alert("ข้อมูลผิดพลาด",
                "กรุณากรอกรหัสนักศึกษาให้ถูกต้อง")
        }


    }
    async componentDidMount() {
        AsyncStorage.getItem('student_code').then(value =>
            this.setState({ student_code: value })
        );
        var username = await AsyncStorage.getItem('username')

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
                    onPress={() => this.props.navigation.navigate('Login')}
                >
                    <Image source={require('../../img/left-arrow.png')} style={{
                        marginTop: hp('4%'), marginBottom: hp('3%'), marginLeft: wp('5%'),
                        width: wp('7%'), height: hp('3%'),
                    }}
                        onPress={() => this.props.navigation.navigate('Login')}
                    >
                    </Image>
                </TouchableOpacity>
                <View style={{
                    marginTop: hp('22%'),
                }}>
                    <Text style={{
                        marginLeft: wp('10%'),
                        fontFamily: 'Kanit-Regular',
                        fontSize: hp('2%'),
                        color: '#ffffff'
                    }}>
                        กรุณากรอกรหัสนักศึกษา
                </Text>
                    <TextInput
                        underlineColorAndroid='transparent'
                        style={styles.TextInputStyle}
                        require
                        onChangeText={(student_id) => {
                            this.setState({ student_id })
                        }}
                    />
                    <Text style={{
                        marginTop: hp('3%'),
                        marginLeft: wp('10%'),
                        fontFamily: 'Kanit-Regular',
                        fontSize: hp('2%'),
                        color: '#ffffff'
                    }}>
                        กรุณากรอกเลขบัตรประชาชน
                </Text>
                    <TextInput
                        underlineColorAndroid='transparent'
                        style={styles.TextInputStyle}
                        require
                        value={this.state.firstname}
                        onChangeText={(ID) => {
                            this.setState({ ID })
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
                        >ส่งรหัสยืนยัน</Text>
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