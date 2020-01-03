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
export class renewPasswordScreen extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            student_id: '',
            verify_code: '',
            new_password: '',
            confirm_password: ''
        }
    }
    async sendCodeFunction() {
        var arr = {}
        

        if (this.state.new_password === this.state.confirm_password) {
            arr['student_id'] = this.state.student_id
            arr['verify_code'] = this.state.verify_code
            arr['confirm_password'] = this.state.confirm_password
            const renew = await email.renewPassword(arr)
            if (renew) {
                Alert.alert("ดำเนินการเสร็จสิ้น",
                    "ดำเนินการเสร็จสิ้น กรุณาเข้าสู่ระบบใหม่อีกครั้ง")
                    this.props.navigation.navigate('Login')
            }
        } else {
            Alert.alert("ข้อมูลผิดพลาด",
                "กรุณากรอกรหัสผ่านให้ตรงกัน")
        }
    }
    async componentDidMount() {
        const { navigation } = this.props;
        var student_id = navigation.getParam('student_id', 'NO-ID')
        var verify_code = navigation.getParam('verify_code', 'NO-ID')
        this.setState({
            student_id: student_id,
            verify_code: verify_code
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
                    onPress={() => this.props.navigation.navigate('confirmCode')}
                >
                    <Image source={require('../../img/left-arrow.png')} style={{
                        marginTop: hp('4%'), marginBottom: hp('3%'), marginLeft: wp('5%'),
                        width: wp('7%'), height: hp('3%'),
                    }}
                        onPress={() => this.props.navigation.navigate('confirmCode')}
                    >
                    </Image>
                </TouchableOpacity>
                <View style={{
                    marginTop: hp('24%'),
                }}><Text style={{
                    marginLeft: wp('10%'),
                    fontFamily: 'Kanit-Regular',
                    fontSize: hp('2%'),
                    color: '#ffffff'
                }}>
                        รหัสผ่านใหม่
                </Text>
                    <TextInput
                        underlineColorAndroid='transparent'
                        style={styles.TextInputStyle}
                        require
                        value={this.state.firstname}
                        secureTextEntry={true}
                        onChangeText={(new_password) => {
                            this.setState({ new_password })
                        }}
                    />
                    <Text style={{
                        marginLeft: wp('10%'),
                        fontFamily: 'Kanit-Regular',
                        fontSize: hp('2%'),
                        color: '#ffffff',
                        marginTop: hp('3%')
                    }}>
                        ยืนยันรหัสผ่านใหม่
                    </Text>
                    <TextInput
                        underlineColorAndroid='transparent'
                        style={styles.TextInputStyle}
                        require
                        value={this.state.firstname}
                        secureTextEntry={true}
                        onChangeText={(confirm_password) => {
                            this.setState({ confirm_password })
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