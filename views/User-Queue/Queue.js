import React, { Component } from 'react';
import {
  Platform, StyleSheet, Text, View, FlatList, ImageBackground, TouchableOpacity,
  ScrollView, Dimensions, Image, Button, Alert, Linking
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import DatePicker from 'react-native-datepicker'
import {
  Container,
  Header,
  Left,
  Right,
  Body,
  Title,
  Footer, FooterTab,
  Content,
  Accordion,
  Card, CardItem,
  Segment,
  Input, Picker

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
import AsyncStorage from '@react-native-community/async-storage';
import moment from 'moment-timezone';
import BookingModel from '../../models/BookingModel'
var booking = new BookingModel;
export class USERQueuedetailScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      date: moment(new Date()).tz('Asia/Bangkok').format('YYYY-MM-DD'),
      start_date: '',
      end_date: '',
      booking_date: null,
      check_order: [],
      ID: '',
      define_booking_date: [],
      define_date: null,
      booking_time: [],
      order_date: '',
      student_code: '',
      student_prefix: '',
      student_name: '',
      min_max: [],
      loan_amount: '',
      register_course: '',
      money_scope: '',
      kar_kongcheep: '',
      other_scholarship: '',
      gpax: '',
      type_schoolarship: '',
      student_school_of: '',
      open_date: '',
      close_date: ''
    }

  }
  onDateChange(date) {
    this.setState({
      selectedStartDate: date,
    });
  }
  loginHandler = () => {
    this.props.navigation.navigate('DrewerNav')
  }
  async componentDidMount() {
    var value = await AsyncStorage.getItem('ID')
    var student_school_of = await AsyncStorage.getItem('student_school_of')
    var student_code = await AsyncStorage.getItem('student_code')
    var student_prefix = await AsyncStorage.getItem('student_prefix')
    var student_name = await AsyncStorage.getItem('student_name')
    var loan_amount = await AsyncStorage.getItem('loan_amount')
    var register_course = await AsyncStorage.getItem('register_course')
    var money_scope = await AsyncStorage.getItem('money_scope')
    var kar_kongcheep = await AsyncStorage.getItem('kar_kongcheep')
    var other_scholarship = await AsyncStorage.getItem('other_scholarship')
    var gpax = await AsyncStorage.getItem('gpax')
    var type_schoolarship = await AsyncStorage.getItem('type_scholarship')
    const check_order = await booking.CheckOrder({ value })
    const booking_date = await booking.getBookingDateBy()
    const min_max = await booking.getMinMaxBookingDateBy()
    this.setState({
      booking_date: booking_date,
      min_max: min_max.res[0],
      check_order: check_order.res[0],
      selected: '0',
      selectedd: '0',
      ID: value,
      student_school_of: student_school_of,
      student_code: student_code,
      student_prefix: student_prefix,
      student_name: student_name,
      loan_amount: loan_amount,
      register_course: register_course,
      money_scope: money_scope,
      kar_kongcheep: kar_kongcheep,
      other_scholarship: other_scholarship,
      gpax: gpax,
      type_schoolarship: type_schoolarship
    })
    if (check_order.res[0] !== undefined) {
      this.ChangeOrderdate(check_order)
    }
    this.Changedate(booking_date)
  }

  ChangeOrderdate(check_order) {
    var Month = [{ "เดือน": "มกราคม" }, { "เดือน": "กุมภาพันธ์" }, { "เดือน": "มีนาคม" }, { "เดือน": "เมษายน" }
      , { "เดือน": "พฤษภาคม" }, { "เดือน": "มิถุนายน" }, { "เดือน": "กรกฎาคม" }, { "เดือน": "สิงหาคม" }
      , { "เดือน": "กันยายน" }, { "เดือน": "ตุลาคน" }, { "เดือน": "พฤษจิกายน" }, { "เดือน": "ธันวาคม" }
    ]
    var date = moment(check_order.res[0].booking_date).tz('Asia/Bangkok').format('DD/MM/YYYY');
    var split = date.split("/")
    split[2] = parseInt(split[2]) + 543

    for (let i = 0; i < Month.length; i++) {
      if ((parseInt(split[1]) - 1) === i) {
        var month = Month[i].เดือน
      }
    }
    this.setState({
      order_date: parseInt(split[0]) + " " + month + " " + split[2]
    })
  }

  Changedate(booking_date) {
    var define_booking_date = []
    const define_date = []
    booking_date.forEach(obj => {
      if (!define_date.some(o => o.define_booking_date_start === obj.define_booking_date_start)) {
        define_date.push({ ...obj })
      }
    });

    var Month = [{ "เดือน": "มกราคม" }, { "เดือน": "กุมภาพันธ์" }, { "เดือน": "มีนาคม" }, { "เดือน": "เมษายน" }
      , { "เดือน": "พฤษภาคม" }, { "เดือน": "มิถุนายน" }, { "เดือน": "กรกฎาคม" }, { "เดือน": "สิงหาคม" }
      , { "เดือน": "กันยายน" }, { "เดือน": "ตุลาคม" }, { "เดือน": "พฤษจิกายน" }, { "เดือน": "ธันวาคม" }
    ]
    for (let i = 0; i < define_date.length; i++) {
      var date = moment(define_date[i].define_booking_date_start).tz('Asia/Bangkok').format('DD/MM/YYYY');
      var split = date.split("/")
      split[2] = parseInt(split[2]) + 543
      for (let j = 0; j < Month.length; j++) {
        if ((parseInt(split[1]) - 1) === j) {
          var month = Month[j].เดือน
        }
      }
      define_booking_date.push(parseInt(split[0]) + " " + month + " " + split[2])
    }

    var min_date = moment(this.state.min_max.min_date).tz('Asia/Bangkok').format('DD/MM/YYYY');
    var split_min_date = min_date.split("/")
    var max_date = moment(this.state.min_max.max_date).tz('Asia/Bangkok').format('DD/MM/YYYY');
    var split_max_date = max_date.split("/")
    split_min_date[2] = parseInt(split_min_date[2]) + 543
    split_max_date[2] = parseInt(split_max_date[2]) + 543
    for (let i = 0; i < Month.length; i++) {
      if ((parseInt(split_min_date[1]) - 1) == i) {
        var change_min_date = Month[i].เดือน;
      }
      if ((parseInt(split_max_date[1]) - 1) == i) {
        var change_max_date = Month[i].เดือน
      }
    }
    var thai_min_date = parseInt(split_min_date[0]) + " " + change_min_date + " " + split_min_date[2]
    var thai_max_date = parseInt(split_max_date[0]) + " " + change_max_date + " " + split_max_date[2]
    this.setState({
      open_date: thai_min_date,
      close_date: thai_max_date,
      define_booking_date: define_booking_date,
      define_date: define_date
    })
  }

  async onValueChange(value) {
    this.setState({
      selected: value,
    })
  }
  async onValueChangeDate(value) {
    const date = []
    for (let i = 0; i < this.state.booking_date.length; i++) {
      if (moment(this.state.booking_date[i].define_booking_date_start).tz('Asia/Bangkok').format('YYYY-MM-DD') === value) {
        date.push(this.state.booking_date[i])
      }
    }
    if (date) {
      this.setState({
        booking_time: date,
        selectedd: value,
      })
    }
  }
  CheckDeleteQueue() {
    Alert.alert(
      'ยกเลิกคิว',
      'คุณต้องการยกเลิกคิวนี้หรือไม่ ?',
      [
        { text: 'Cancel', onPress: () => console.warn('Cancel Pressed'), style: 'cancel' },
        {
          text: 'OK', onPress: () => this.CancleQueue()
        },
      ],
      { cancelable: false }
    )
  }
  async CancleQueue() {
    var ID = this.state.ID
    var date = moment(this.state.check_order.booking_date).tz('Asia/Bangkok').format('YYYY-MM-DD')
    var time = this.state.check_order.booking_time

    const deleteQueue = await booking.DeleteQueue({ ID, date, time })
    if (deleteQueue) {
      this.componentDidMount()
    }
  }
  async Submit() {
    var ID = this.state.ID
    var date = this.state.selectedd
    var time = this.state.selected
    const submit = await booking.CheckAndInsertQueue({ ID, date, time })
    if (submit) {
      this.componentDidMount()
    }
  }
  render() {
    if (this.state.booking_date === null || this.state.order_date === null) {
      return(
        <View style={{ height: hp('100%'), backgroundColor: '#ebebeb' }}>
        <View style={{ marginTop: hp('25%') }}>
          <Image source={require('../../img/slfLogo.png')}
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
    } else {
      var str_date = []
      if(this.state.define_date !== null){
      for (let i = 0; i < this.state.define_date.length; i++) {
        str_date.push(
          <Picker.Item key={this.state.define_date[i].booking_id}
            label={this.state.define_booking_date[i]}
            value={moment(this.state.define_date[i].define_booking_date_start).tz('Asia/Bangkok').format('YYYY-MM-DD')} />
        )
      }
    }
      var str_time = this.state.booking_time.map(function (result) {
        return <Picker.Item key={result.time_booking_id}
          label={result.define_booking_time_start + ' น. - ' + result.define_booking_time_end + ' น.'}
          value={result.define_booking_time_start + ' น. - ' + result.define_booking_time_end + ' น.'} />;
      });
  
      return (
        <Container>
          <Body>
          <ScrollView style={{
                backgroundColor: '#ebebeb',
                width: wp('100%'),
                height:hp('100%')
              }}>
            <View style={{
                  backgroundColor: '#343a40',
                  flexDirection: 'row',

                }}>
                  <Text style={{
                    fontFamily: 'Kanit-Regular',
                    fontSize: hp('2%'),
                    marginLeft: wp('7%'),
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
                    fontSize: hp('1.8%'),
                    alignSelf: 'center',
                    marginBottom: hp('1%'),
                    marginTop: hp('1.25%'),
                    marginLeft: wp('2%'),
                    color: '#fff'
                  }}>

                    {this.state.student_prefix} {this.state.student_name}
                  </Text>
                  <Text style={{
                    fontFamily: 'Kanit-Regular',
                    fontSize: hp('2%'),
                    marginLeft: wp('12%'),
                    marginTop: hp('0.25%'),
                    marginBottom: hp('1%'),
                    color: '#fff'
                  }}>
                    <Image source={require('../../img/id-card.png')} style={{
                      width: wp('7%'), height: hp('3%')
                    }}>
                    </Image>
                  </Text>
                  <Text style={{
                    fontFamily: 'Kanit-Light',
                    fontSize: hp('1.8%'),
                    alignSelf: 'center',
                    marginBottom: hp('1%'),
                    marginTop: hp('1%'),
                    marginLeft: wp('2%'),
                    color: '#fff'
                  }}>

                    {this.state.student_code}
                  </Text>
                </View>
            {moment(new Date()).tz('Asia/Bangkok').format('YYYY-MM-DD') >
              moment(this.state.min_max.max_date).tz('Asia/Bangkok').format('YYYY-MM-DD') ||
              moment(new Date()).tz('Asia/Bangkok').format('YYYY-MM-DD') <
              moment(this.state.min_max.min_date).tz('Asia/Bangkok').format('YYYY-MM-DD') ?
              <View style={{ flexDirection: 'row', alignSelf: 'center', marginTop: hp('32%') }}>
                <Card style={{ backgroundColor: '#fff', width: wp('90%'), borderRadius: 12, elevation: 3,
                 }}
                // key={this.state.user_details.user_code}
                >
                  <CardItem style={{ borderRadius: 12, backgroundColor: '#fff',
                  borderColor: '#000',
                borderWidth: 1, }}>
                    <Body style={{ borderRadius: 12, backgroundColor: '#fff' }}>
                    <Text style={{
                                  fontFamily: 'Kanit-Regular',
                                  fontSize: hp('2.2%'),
                                  color: 'red',
                              }}>
                                  ปิดระบบจองคิว
                                      </Text>
                    <Text style={{
                      fontFamily: 'Kanit-Regular',
                      fontSize: hp('2%'),
                      marginTop: hp('1%'),
                      marginBottom: hp('1%'),
                    }}>
                      ขออภัย ขณะนี้ระบบไม่เปิดให้ทำการจองคิว {"\n"}
                      ติดตามข้อมูลข่าวสารที่
                  <Text style={{
                        fontFamily: 'Kanit-Regular',
                        fontSize: hp('2%'),
                        marginTop: hp('1%'),
                        marginBottom: hp('1%'),
                        color: 'blue'
                      }}
                        onPress={() => Linking.openURL("http://scholarship.sut.ac.th/sutfundNew/")}>
                        {" "}Link
                  </Text>
                    </Text>
                    </Body>
                    </CardItem>
                    </Card>
  
              </View>
                  :
              <View>
                    {this.state.check_order === undefined ?
                     
                        <View>
                          <Card button
                            style={{
                              borderWidth: 0,
                              width: wp('90%'),
                              marginTop: hp('16%'),
                              alignSelf: 'center',
                              borderRadius: 8,
                              elevation: 3,
                              borderColor: '#000',
                              borderWidth: 1,
                            }}>
                            <CardItem
                              style={{
                                borderTopStartRadius: 8,
                                borderTopEndRadius: 8,
                                backgroundColor: '#fb9211',
                              }}>
                              <Text style={{
                                fontFamily: 'Kanit-Regular',
                                fontSize: hp('2%'),
                                color: '#fff'
                              }}>
                                ระบบจองคิวยื่นเอกสารคำขอกู้ 
                       </Text>
                            </CardItem>
                            <CardItem >
                              <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
                                <Text style={{
                                  fontFamily: 'Kanit-Regular',
                                  fontSize: hp('2%'),
                                  marginTop: hp('1.55%'),
                                  marginLeft: wp('3%'),
                                }}>
                                  วันจองคิว
                       </Text>
                                <View
                                  style={{
                                    marginTop: hp('1%'),
                                    height: hp('5%'),
                                    borderWidth: 2,
                                    borderRadius: 8,
                                    borderColor: '#d3d2d2',
                                    width: wp('50%'),
                                    fontSize: hp('2%'),
                                    fontFamily: 'Kanit-Regular',
                                    marginLeft: wp('5%'),
                                  }}>
                                  <Picker
                                    note
                                    mode="dropdown"
                                    placeholder="เลือกช่วงเวลา"
                                    style={{
                                      height: hp('5%'),
                                      width: wp('50%'),
                                      color: '#000',
                                    }}
                                    selectedValue={this.state.selectedd}
                                    onValueChange={this.onValueChangeDate.bind(this)}
                                  >
                                    <Picker.Item label="เลือกวันจองคิว" value="0" />
                                    {str_date}
                                  </Picker>
                                </View>
                              </View>
                            </CardItem>
                            <CardItem
                              style={{
                                borderBottomStartRadius: 8,
                                borderBottomEndRadius: 8
                              }}>
                              <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
                                <Text style={{
                                  fontFamily: 'Kanit-Regular',
                                  fontSize: hp('2%'),
                                  marginLeft: wp('2%'),
                                  marginTop: hp('1.75%')
                                }}>
                                  เวลาจองคิว
                        </Text>
                                <View
                                  style={{
                                    marginTop: hp('1%'),
                                    height: hp('5%'),
                                    borderWidth: 2,
                                    borderRadius: 8,
                                    borderColor: '#d3d2d2',
                                    width: wp('50%'),
                                    fontSize: hp('2%'),
                                    fontFamily: 'Kanit-Regular',
                                    marginLeft: wp('3%'),
                                  }}>
                                  <Picker
                                    note
                                    mode="dropdown"
                                    placeholder="เลือกช่วงเวลา"
                                    style={{
                                      height: hp('5%'),
                                      width: wp('50%'),
                                      color: '#000',
                                    }}
                                    selectedValue={this.state.selected}
                                    onValueChange={this.onValueChange.bind(this)}
                                  >
                                    <Picker.Item label="เลือกช่วงเวลา" value="0" />
                                    {str_time}
                                  </Picker>
                                </View>
                              </View>
                            </CardItem>
                            <CardItem
                              style={{
                                borderBottomStartRadius: 8,
                                borderBottomEndRadius: 8,
                                marginBottom: hp('2%'),
                              }}>
                            <Text style ={{
                                  fontFamily:'Kanit-Regular',
                                  fontSize:hp('2.25%'),
                                  marginLeft: wp('2%'),
                                  color:'red'}}>
                                  ***สามารถจองคิวได้ตั้งแต่วันที่{"\n"} {this.state.open_date} ถึง {this.state.close_date}
                                </Text>
                                </CardItem>
                          </Card>
                          <TouchableOpacity
                            activeOpacity={0.5}
                            style={{
                              alignSelf: 'center',
                              backgroundColor: '#28a745',
                              width: wp('35%'),
                              height: hp('6%'),
                              marginTop: hp('3%'),
                              borderRadius: 40,
                              borderColor:'#000',
                              borderWidth:1
  
                            }}
                            onPress={this.Submit.bind(this)}
                          >
                            {/*Multiple files selection button*/}
                            <Text style={{
                              fontFamily: 'Kanit-Regular', color: '#fff', fontSize: hp('2%'),
                              textAlign: 'center',
                              marginTop: hp('1.5%')
                            }}>
                              จองคิว
                    </Text>
  
                          </TouchableOpacity>
  
                        </View>
                     
                      :

                        <View style={{
                          backgroundColor: '#ebebeb',
                        }}>
  
                        
                            <Card button
                              style={{
                                backgroundColor: '#fff2cc',
                                borderColor: '#000',
                                borderWidth: 1,
                                width: wp('90%'),
                                marginTop: hp('3%'),
                                alignSelf: 'center',
                                borderRadius: 8,
                                elevation: 3
                              }}>
                              <View style={{ alignSelf: 'center' }}>
                                <Text style={{
                                  fontFamily: 'Kanit-Regular',
                                  fontSize: hp('2%'),
                                  marginLeft: wp('3%'),
                                  marginTop: hp('1%'),
                                  color: 'red'
                                }}>
                                  การส่งเอกสาร
      
                              </Text>
                                <View style={{ flexDirection: 'row' }}>
                                  <Text style={{
                                    fontFamily: 'Kanit-Regular',
                                    fontSize: hp('1.65%'),
                                    marginLeft: wp('3%'),
                                    marginRight: wp('3%'),
                                    marginTop: hp('1%')
                                  }}>
                                    1. แต่งกายด้วยชุดนักศึกษาหรือชุดฝึกงานเท่านั้น{"\n"}
                                    2. เอกสาร ใบคำยืนยันขอกู้จาก E-studentloan + ใบภาระค่าใช้จ่าย/ทุน+สำเนาบัตรประชาชน 2 ใบ (ไม่รวมทะเบียนบ้าน){"\n"}
                                    3. หากมีข้อสงสัย ให้แจ้งเจ้าหน้าที่ก่อนดำเนินการ (ไม่ใช่แจ้งนศ.ช่วยงาน){"\n"}
                                    4. ขอความร่วมมือให้ทำเอกสารให้ถูกต้องครบถ้วน มาตามวันเวลาที่จอง อย่าช้า อย่าเกินเวลา เพื่องานทุนการศึกษาจะได้ดำเนินการต่อไป{"\n"}
                                  </Text>
                                </View>
                              </View>
  
  
                            </Card>
                            <Card button
                              style={{
                                backgroundColor: '#fff2cc',
                                borderColor: '#000',
                                borderWidth: 1,
                                width: wp('90%'),
                                marginTop: hp('2%'),
                                alignSelf: 'center',
                                borderRadius: 8,
                                elevation: 3
                              }}>
                              <View style={{ alignSelf: 'center' }}>
                              <Text style={{
                                  fontFamily: 'Kanit-Regular',
                                  fontSize: hp('2%'),
                                  marginLeft: wp('3%'),
                                  marginTop: hp('1%'),
                                  color: 'red'
                                }}>
                                  รายละเอียดคิว
      
                              </Text>
                              <Text style={{
                                  fontFamily: 'Kanit-Regular',
                                  fontSize: hp('1.65%'),
                                  marginLeft: wp('3%'),
                                  marginTop: hp('1%')
                                }}>
                                  เลขบัตรประชาชน : [ {this.state.ID} ] {"\n"}
                                  ชื่อ-สกุล : [ {this.state.student_prefix} {this.state.student_name} ] {"\n"}
                                  สาขาวิชา : [ {this.state.student_school_of} ] {"\n"}
                                  จำนวนเงินกู้ : [ {this.state.loan_amount} ] บาท {"\n"}
                                  ลงทะเบียนจริง : [ {this.state.register_course} ] บาท/ปี {"\n"}
                                  กรอบวงเงิน : [ {this.state.money_scope} ]  กู้ค่าครองชีพ : [ {this.state.kar_kongcheep} ] {"\n"}
                                  ทุนการศึกษาอื่น : [ {this.state.other_scholarship} ] {"\n"}
                                  ผลการศึกษา : [ {this.state.gpax} ] {"\n"}
                                  ประเภทการกู้ : [ {this.state.type_schoolarship} ] {"\n"}
                                  คุณได้จองคิวในวันที่ {this.state.order_date} {"\n"}
                                  ช่วงเวลา {this.state.check_order.booking_time}
                                </Text>
                                <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
                                  <Text style={{
                                    fontFamily: 'Kanit-Regular',
                                    fontSize: hp('3%'),
                                    textAlign: 'center',
                                    marginTop: hp('1%')
                                  }}>
                                    คิวที่
                                  </Text>
                                  <Text style={{
                                    fontFamily: 'Kanit-Regular',
                                    fontSize: hp('3%'),
                                    textAlign: 'center',
                                    color: 'red',
                                    marginTop: hp('1%')
                                  }}>
                                    {" " + this.state.check_order.booking_order}
                                  </Text>
                                </View>
                                <View style={{ alignSelf: 'center' }}>
                                  <Text style={{
                                    fontFamily: 'Kanit-Regular',
                                    fontSize: hp('2%'),
                                    marginLeft: wp('3%'),
                                    marginTop: hp('1%'),
                                    marginBottom: hp('1%'),
                                    color: 'blue'
                                  }}>
                                    ***ควรมาก่อนเวลา จะเรียกคิวตามที่บันทึกได้สำเร็จในฐานข้อมูลเท่านั้น
      
                      </Text>
                                </View>
                              </View>
                              <View style={{ flexDirection: 'row', alignSelf: 'center', marginBottom: hp('3%') }}>
  
                              </View>
  
                            </Card>
                            <TouchableOpacity
                              activeOpacity={0.5}
                              style={{
                                alignSelf: 'center',
                                backgroundColor: '#dc3545',
                                width: wp('35%'),
                                height: hp('6%'),
                                marginTop: hp('2%'),
                                borderRadius: 40,
                                marginBottom:hp('3%')
  
                              }}
                              onPress={this.CheckDeleteQueue.bind(this)}
                            >
                              {/*Multiple files selection button*/}
                              <Text style={{
                                fontFamily: 'Kanit-Regular', color: '#fff', fontSize: hp('2%'),
                                textAlign: 'center',
                                marginTop: hp('1.5%')
                              }}>
                                ยกเลิกคิว
                      </Text>
  
                            </TouchableOpacity>
                       
                        </View>
                       
                    
                    }
                  </View>
                  }
                  </ScrollView>
          </Body>
        </Container>
  
      );
    }
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