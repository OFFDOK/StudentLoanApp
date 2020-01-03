import React from 'react';
import {
    Platform, StyleSheet, Text, View, FlatList, ImageBackground, TouchableOpacity,
    ScrollView, Dimensions, Image, Alert
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
import Student from '../../models/StudentModel';
// import SweetAlert from 'react-native-sweet-alert';

var student = new Student;
export class ProfileDetailScreen extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            student_code: null,
            student_prefix: null,
            ID: null,
            student_name: null,
            student_intitute: null,
            student_school_of: null,
            year:null,
            student_email: null,
            student_tel: null
        }
    }
    async componentDidMount() {
        var arr = {};
        arr['user_username'] = await AsyncStorage.getItem('username');
        arr['user_password'] = await AsyncStorage.getItem('password');
        const information = await student.checkLogin(arr);
        if (information) {
            // console.warn(information);
            this.setState({
                student_code: information.student_id,
                student_prefix: information.student_prefix,
                ID: information.ID,
                student_name: information.student_name,
                student_intitute: information.student_intitute,
                student_school_of: information.student_school_of,
                year:information.year,
                student_email: information.student_email,
                student_tel: information.student_tel
            })
        }
    }
    loginHandler = () => {
        this.props.navigation.navigate('DrewerNav')
    }
    CheckLogout() {
        Alert.alert(
            'ออกจากระบบ',
            'คุณต้องการออกจากระบบใช่หรือไม่ ?',
            [

                { text: 'cancel', }
                , {
                    text: 'OK', onPress: () => this.Logout()
                }
            ],
            { cancelable: true }
        )
    }
    async Logout() {
        await AsyncStorage.removeItem('username');
        await AsyncStorage.removeItem('password');

        this.props.navigation.navigate('Login')
    }
    render() {
        if (this.state.ID === null) {
            return (
                <View style={{ backgroundColor: '#ebebeb' }}>
                    
                    <View style={{ marginTop: hp('25%'),height: hp('75%'),backgroundColor: '#ebebeb' }}>
                        <View style={{}}
                        >
                            <Image source={require('../../img/slfLogo.png')}
                                style={{
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
                </View>
            );
        } else {
            return (
                <View>
                    <ImageBackground source={require('../../img/bg.png')}
                        style={{
                            flex: 1,
                            width: wp('100%'), height: hp('45%'),
                            // justifyContent: 'center',
                            // alignItems: 'center',
                            padding: 2,
                        }}>

                        {/* <Text style={{ alignSelf: 'center' }}>Profile</Text> */}

                    </ImageBackground >
                    <View style={{
                        marginTop: hp('35%'),
                        backgroundColor: '#ebebeb',
                        height: hp('100%'),
                        borderTopColor: '#000',
                        borderLeftColor: '#ebebeb',
                        borderRightColor: '#ebebeb',
                        borderBottomColor: '#ebebeb',
                        borderWidth: 1,
                    }}>
                        <View style={{
                            marginTop: hp('-25%'),
                            width: wp('27.5%'), height: hp('14.5%'),
                            alignSelf: 'center', alignItems: 'center',
                            backgroundColor: '#fff',
                            borderRadius: wp('13.75%'),
                            borderColor: '#000',
                            borderWidth: 1,
                        }}>
                            <Image source={require('../../img/default-profile.png')} style={{
                                width: wp('23.5%'), height: hp('12%'),
                                borderRadius: 12, alignSelf: 'center', alignItems: 'center',
                                marginTop: hp('1.2%')
                            }}>

                            </Image>
                        </View>

                        <Card style={{ backgroundColor: '#fff', marginLeft: hp('2.5%'), marginTop: hp('2%'), width: wp('90%'), borderRadius: 12, elevation: 3 }}
                        // key={this.state.user_details.user_code}
                        >
                            <CardItem style={{
                                borderRadius: 12, backgroundColor: '#fff',
                                borderColor: '#000',
                                borderWidth: 1,
                            }}>
                                <Body style={{ borderRadius: 12, backgroundColor: '#fff' }}>
                                    <Text style={{
                                        fontFamily: 'Kanit-Bold',
                                        fontSize: hp('2.2%'),
                                        marginBottom: hp('1%'),
                                        color: '#02a3bb',
                                    }}>
                                        รายละเอียดข้อมูลผู้ใช้
                                        </Text>
                                    <Text style={{
                                        fontFamily: 'Kanit-Regular',
                                        fontSize: hp('2%'),
                                        marginBottom: hp('1%'),
                                        color: '#000'
                                    }}>
                                        เลขบัตรประชาชน : {this.state.ID}
                                    </Text>
                                    <Text style={{
                                        fontFamily: 'Kanit-Regular',
                                        fontSize: hp('2%'),
                                        marginBottom: hp('1%'),
                                        color: '#000'
                                    }}>
                                        รหัสนักศึกษา : {this.state.student_code}
                                    </Text>
                                    <Text style={{
                                        fontFamily: 'Kanit-Regular',
                                        fontSize: hp('2%'),
                                        marginBottom: hp('1%'),
                                        color: '#000'
                                    }}>
                                        ชื่อ-นามสกุล : {this.state.student_prefix} {this.state.student_name}
                                    </Text>
                                    <Text style={{
                                        fontFamily: 'Kanit-Regular',
                                        fontSize: hp('2%'),
                                        marginBottom: hp('1%'),
                                        color: '#000'
                                    }}>
                                        สำนักวิชา : {this.state.student_intitute}
                                    </Text>
                                    <Text style={{
                                        fontFamily: 'Kanit-Regular',
                                        fontSize: hp('2%'),
                                        marginBottom: hp('1%'),
                                        color: '#000'
                                    }}>
                                        สาขาวิชา : {this.state.student_school_of}
                                    </Text>
                                    <Text style={{
                                        fontFamily: 'Kanit-Regular',
                                        fontSize: hp('2%'),
                                        marginBottom: hp('1%'),
                                        color: '#000'
                                    }}>
                                        ชั้นปีที่ : {this.state.year}
                                    </Text>
                                    <Text style={{
                                        fontFamily: 'Kanit-Regular',
                                        fontSize: hp('2%'),
                                        marginBottom: hp('1%'),
                                        color: '#000'
                                    }}>
                                        อีเมล : {this.state.student_email}
                                    </Text>
                                    <Text style={{
                                        fontFamily: 'Kanit-Regular',
                                        fontSize: hp('2%'),
                                        marginBottom: hp('1%'),
                                        color: '#000'
                                    }}>
                                        โทรศัพท์ : {this.state.student_tel}
                                    </Text>
                                </Body>
                            </CardItem>
                        </Card>
                        <TouchableOpacity
                            activeOpacity={0.5}
                            style={{
                                alignSelf: 'center',
                                backgroundColor: '#dc3545',
                                width: wp('38%'),
                                height: hp('7%'),
                                marginTop: hp('3%'),
                                borderRadius: 40,

                            }}
                            onPress={() => this.CheckLogout()}
                        >
                            {/*Multiple files selection button*/}
                            <Text style={{
                                fontFamily: 'Kanit-Regular', color: '#fff', fontSize: hp('2%'),
                                textAlign: 'center',
                                marginTop: hp('1.75%')
                            }}>
                                ออกจากระบบ
                      </Text>

                        </TouchableOpacity>
                    </View>
                </View>
            );
        }

    }
}

