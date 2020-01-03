import React, { Component } from 'react';
import {
  Platform, StyleSheet, Text, View, FlatList, ImageBackground, TouchableOpacity,
  ScrollView, Dimensions, Image, Button, Linking
} from 'react-native';
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
  Input
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
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import AsyncStorage from '@react-native-community/async-storage';
import DocumentModel from '../../models/DocumentModel';
import moment from 'moment-timezone';
var document = new DocumentModel;
export class USERDocumentdetailScreen extends Component {
  constructor(props) {
    super(props)

    this.state = {
      str_doc: null,
      str_check: [],
      ID: '',
      status: [],
      student_code: '',
      student_prefix: '',
      student_name: '',
      min_max: []
    }
  }
  RefreshPage() {
    this.componentDidMount()
  }
  loginHandler = () => {
    this.props.navigation.navigate('DrewerNav')
  }
  async componentDidMount() {
    var min_max = await document.getDateOpenUploadDocument()
    var student_code = await AsyncStorage.getItem('student_code')
    var student_prefix = await AsyncStorage.getItem('student_prefix')
    var student_name = await AsyncStorage.getItem('student_name')
    var value = await AsyncStorage.getItem('ID')
    const type_doc = await document.getTypeOfDocumentByCode()
    const check_doc = await document.checkDocumentStatusByCode()
    this.setState({
      ID: value,
      str_doc: type_doc.res,
      str_check: check_doc.res,
      student_code: student_code,
      student_prefix: student_prefix,
      student_name: student_name,
      min_max: min_max.res[0]
    })
  }
  render() {
    if (this.state.str_doc === null) {
      return (
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
      var str_show_type = []
      var status = []
      for (let i = 0; i < this.state.str_doc.length; i++) {
        status.push('ยังไม่อัพโหลดเอกสาร')
      }

      for (let i = 0; i < this.state.str_check.length; i++) {
        if (this.state.str_check[i].ID === this.state.ID) {
          var index = status.indexOf('ยังไม่อัพโหลดเอกสาร', (this.state.str_check[i].type_of_document_id - 1));
          if (index !== -1) {
            status[index] = 'รอตรวจสอบข้อมูล'
          }
        }
      }
      if (this.state.str_doc !== []) {
        for (let i = 0; i < this.state.str_doc.length; i++) {

          str_show_type.push(
            <Card button onPress={() => this.props.navigation.navigate('UploadDocumentdetailScreen',
              {
                type: this.state.str_doc[i].type_of_document_id,
                status: status[i],
                onGoBack: () => this.RefreshPage()
              })}
              style={{
                width: wp('90%'),
                marginTop: hp('3%'),
                alignSelf: 'center',
                borderRadius: 8,
                elevation: 3,
                backgroundColor: '#fff2cc',
                borderColor: '#000',
                borderWidth: 1,
              }}>
              <CardItem
                header button onPress={() => this.props.navigation.navigate('UploadDocumentdetailScreen',
                  {
                    type: this.state.str_doc[i].type_of_document_id,
                    status: status[i],
                    onGoBack: () => this.RefreshPage()
                  })}
                style={{
                  width: wp('85%'),
                  marginLeft: wp('3%'),
                  backgroundColor: '#fff2cc',
                  // borderRadius: 8,

                }}>
                <Text style={{
                  fontFamily: 'Kanit-Regular',
                  fontSize: hp('2%'),
                  // color: '#00008B',
                  marginLeft: hp('1%'),

                }}>
                  {this.state.str_doc[i].type_of_document_id}. {this.state.str_doc[i].type_of_document_name}

                </Text>
              </CardItem>
              <CardItem
                header button onPress={() => this.props.navigation.navigate('UploadDocumentdetailScreen',
                  {
                    type: this.state.str_doc[i].type_of_document_id,
                    status: status[i],
                    onGoBack: () => this.RefreshPage()
                  })}
                style={{
                  width: wp('85%'),
                  marginLeft: wp('3%'),
                  backgroundColor: '#fff2cc',
                  // borderRadius: 8,
                }}>
                {status[i] === 'ยังไม่อัพโหลดเอกสาร' ?
                  <Text style={{
                    fontFamily: 'Kanit-Regular',
                    fontSize: hp('2%'),
                    color: '#dc3545',
                    marginTop: hp('-4.5%'),
                    marginLeft: wp('6%')
                  }}>
                    {'(' + status[i] + ')'}
                  </Text>
                  : null}

                {status[i] === 'รอตรวจสอบข้อมูล' ?
                  <Text style={{
                    fontFamily: 'Kanit-Regular',
                    fontSize: hp('2%'),
                    color: '#007bff',
                    marginTop: hp('-4.5%'),
                    marginLeft: wp('6%')

                  }}>
                    {'(' + status[i] + ')'}
                  </Text>
                  : null}

                {status[i] === 'เอกสารผ่านการอนุมัติ' ?
                  <Text style={{
                    fontFamily: 'Kanit-Regular',
                    fontSize: hp('2%'),
                    color: '#28a745',
                    marginTop: hp('-4.5%'),
                    marginLeft: wp('6%')

                  }}>
                    {'(' + status[i] + ')'}
                  </Text>
                  : null}
              </CardItem>
            </Card>
          )
        }
        return (
          <Container>
            <Body>
              <View style={{
                backgroundColor: '#ebebeb',
                width: wp('100%'),
                height: hp('100%')
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

                {
                  moment(new Date()).tz('Asia/Bangkok').format('YYYY-MM-DD') >
                    moment(this.state.min_max.max_date).tz('Asia/Bangkok').format('YYYY-MM-DD') ||
                    moment(new Date()).tz('Asia/Bangkok').format('YYYY-MM-DD') <
                    moment(this.state.min_max.min_date).tz('Asia/Bangkok').format('YYYY-MM-DD') ?

                    <View style={{ flexDirection: 'row', alignSelf: 'center', marginTop: hp('30%') }}>
                      <Card style={{
                        backgroundColor: '#fff', width: wp('90%'), borderRadius: 12, elevation: 3,
                      }}
                      // key={this.state.user_details.user_code}
                      >
                        <CardItem style={{
                          borderRadius: 12, backgroundColor: '#fff',
                          borderColor: '#000',
                          borderWidth: 1,
                        }}>
                          <Body style={{ borderRadius: 12, backgroundColor: '#fff' }}>
                            <Text style={{
                              fontFamily: 'Kanit-Regular',
                              fontSize: hp('2.2%'),
                              color: 'red',
                            }}>
                              ปิดระบบอัพโหลดเอกสารการขอกู้ยืม
                                    </Text>
                            <Text style={{
                              fontFamily: 'Kanit-Regular',
                              fontSize: hp('2%'),
                              marginTop: hp('1%'),
                              marginBottom: hp('1%'),
                            }}>
                              ขออภัย ขณะนี้ระบบไม่เปิดให้ทำการอัพโหลดเอกสารการขอกู้ยืม {"\n"}
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
                    <ScrollView>
                      <View style={{ marginBottom: hp('15%') }}>
                        <Text style={{
                          fontFamily: 'Kanit-Regular',
                          fontSize: hp('2%'),
                          alignSelf: 'center',
                          marginTop: hp('3%')
                        }}>
                          กรุณาเลือกรายการที่ท่านต้องการ
                       </Text>
                        <View>
                          {str_show_type}
                        </View>
                      </View>
                    </ScrollView>
                }

              </View>
            </Body>
          </Container >
        );
      }
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