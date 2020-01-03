import React, { Component } from 'react';
import {
    Platform, StyleSheet, Text, View, FlatList, ImageBackground, TouchableOpacity,
    ScrollView, Dimensions, Image, Button, Linking, Alert
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
import moment from 'moment-timezone';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import DocumentPicker from 'react-native-document-picker';
import AsyncStorage from '@react-native-community/async-storage';
import uploadDocByMember from '../../Controller/UploadDocController'
import DocumentModel from '../../models/DocumentModel'
import GOBALS from '../../GOBALS'

var document = new DocumentModel;
var upload = new uploadDocByMember;

export class UploadDocumentdetailScreen extends Component {
    constructor(props) {
        super(props);
        //Initialization of the state to store the selected file related attribute
        this.state = {
            singleFile: '',
            multipleFile: [],
            student_code: '',
            ID: '',
            type: '',
            str_showDoc: [],
            str_detailDoc: null,
            status: '',
            student_prefix: '',
            student_name: '',
            semester_name:''
        };
    }
    loginHandler = () => {
        this.props.navigation.navigate('DrewerNav')
    }
    async componentDidMount() {
        var semester_name = await document.getDateOpenUploadDocument()
        var student_prefix = await AsyncStorage.getItem('student_prefix')
        var student_name = await AsyncStorage.getItem('student_name')
        const { navigation } = this.props;
        var type = navigation.getParam('type', 'NO-ID')
        var status = navigation.getParam('status', 'NO-ID')
        await AsyncStorage.getItem('ID').then(value =>
            this.setState({ ID: value })
        );
        await AsyncStorage.getItem('student_code').then(value =>
            this.setState({
                semester_name:semester_name.res[0].semester_name,
                student_code: value,
                type: type,
                status: status,
                student_prefix: student_prefix,
                student_name: student_name
            })
        );
        this.getDoc()
    }

    async getDoc() {
        var ID = this.state.ID
        var type = this.state.type
        const Doc = await document.getDocBycode({ ID, type })
        if (Doc.res.length > 0) {
            this.setState({
                str_detailDoc: Doc.res
            })
        }
        // console.warn(Doc.res);
        if (Doc.res.length === 0 && this.state.status !== 'ยังไม่อัพโหลดเอกสาร') {
            const clear = await document.DeleteUpload({ ID, type })
            this.setState({
                str_detailDoc: []
            })
        }

    }

    async selectMultipleFile() {
        //Opening Document Picker for selection of multiple file
        try {
            const results = await DocumentPicker.pickMultiple({
                type: [DocumentPicker.types.pdf],
                //There can me more options as well find above
            });

            this.setState({ multipleFile: results });
        } catch (err) {

            if (DocumentPicker.isCancel(err)) {
                //If user canceled the document selection
                alert('Canceled from multiple doc picker');
            } else {
                //For Unknown Error
                alert('Unknown Error: ' + JSON.stringify(err));
                throw err;
            }
        }
        this.showDoc()
    }

    showDoc() {
        var str_showDoc = []
        if (this.state.multipleFile !== []) {
            for (let i = 0; i < this.state.multipleFile.length; i++) {
                str_showDoc.push(i + 1 + ". " + this.state.multipleFile[i].name + "\n")
            }
        }
        this.setState({
            str_showDoc: str_showDoc
        })
    }

    async Submit() {
        // console.warn(this.state.multipleFile);
        var semester = this.state.semester_name
        var date = moment(new Date()).tz('Asia/Bangkok').format('YYYY-MM-DD')
        var arr_doc = {}
        var name_doc = []
        var link_doc = []
        var detail_doc = []
        if (this.state.type !== '') {
            arr_doc['ID'] = this.state.ID
            arr_doc['student_id'] = this.state.student_code
            arr_doc['type_of_document'] = this.state.type
        }
        for (var i = 0; i < this.state.multipleFile.length; i++) {
            const formdata = new FormData();
            formdata.append('files', {
                name: this.state.multipleFile[i].name,
                type: this.state.multipleFile[i].type,
                uri: Platform.OS === "android" ? this.state.multipleFile[i].uri :
                    this.state.multipleFile[i].uri.replace("file://", "")
            });
            name_doc.push(this.state.multipleFile[i].name)
            await upload.uploadDocByMember(formdata).then((result_photo) => {
                link_doc.push(result_photo.data.doc_url)
            })
        }
        detail_doc.push(arr_doc)

        var res = await document.insertDocument({ detail_doc, name_doc, link_doc, date ,semester});
        // console.warn(res);
        
        if (res) {

            this.setState({
                multipleFile: []
            })
            Alert.alert(
                'ดำเนินการเสร็จสิ้น',
                'คุณได้ทำการบันทึกเอกสารเรียบร้อย',
                [
                    {
                        text: 'OK', onPress: () => this.componentDidMount()
                    },
                ],
                { cancelable: false }
            )

        }
    }

    back() {
        this.props.navigation.state.params.onGoBack();
        this.props.navigation.goBack()
    }

    CheckDeletePDF(uri) {
        Alert.alert(
            'ลบไฟล์เอกสาร',
            'คุณต้องการลบไฟล์เอกสารนี้หรือไม่ ?',
            [
                { text: 'Cancel', onPress: () => console.warn('Cancel Pressed'), style: 'cancel' },
                {
                    text: 'OK', onPress: () => this.DeletePDF(uri)
                },
            ],
            { cancelable: false }
        )
    }
    async DeletePDF(uri) {
        const delete_doc = await document.DeleteDocumentByCode(uri)
        if (delete_doc) {

            Alert.alert(
                'ดำเนินการเสร็จสิ้น',
                'คุณได้ทำการลบเอกสารเรียบร้อย',
                [
                    {
                        text: 'OK', onPress: () => this.componentDidMount()
                    },
                ],
                { cancelable: false }
            )
        }
    }
    render() {
       
        if (this.state.str_detailDoc === null && this.state.status !=='ยังไม่อัพโหลดเอกสาร') {
            return(
                <Container>
                <Header style={{ backgroundColor: '#ff8c00',
                                
                               }}>
                    <Left style={{ flex: 1 }}>
                        <TouchableOpacity
                            onPress={() => this.back()}
                            style={{ width: wp('15%'),
                            marginLeft:wp('-1.5%') }}
                        >
                            <Image
                                source={require('../../img/left.png')}
                                onPress={() => this.back()}
                                style={{ width:wp('3.5%'), height:hp('2.5%'), alignSelf: 'center',
                                marginLeft:wp('-1.5%')  }}
                            />
                        </TouchableOpacity>
                    </Left>
                    <Body style={{ flex: 4, alignItems: 'center', alignSelf: 'center',
                                }}>
                        <Text style={{
                            fontSize: hp('2.2%'),
                            color: '#fff',
                            fontFamily: 'Kanit-Regular'
                        }}>อัพโหลดเอกสารการขอกู้ยืม</Text>
                    </Body>
                    <Right style={{ flex: 1 }}>
                    </Right>
                </Header>
                <Body>
            <View style={{ height: hp('100%'),width:wp('100%'), backgroundColor: '#ebebeb' }}>
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
          </Body>
          </Container>
            );
        } else {
            var str_doc_name = []
            // var str_doc_link = []
            if (this.state.str_detailDoc !== null) {
                for (let i = 0; i < this.state.str_detailDoc.length; i++) {
                    str_doc_name.push(
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{
                                fontFamily: 'Kanit-Regular',
                                fontSize: hp('2%'),
                                marginLeft: wp('3%'),
                            }}>
                                {i + 1}. {this.state.str_detailDoc[i].upload_document_name}
                            </Text>
                            <Text style={{
                                color: 'blue',
                                fontFamily: 'Kanit-Regular',
                                fontSize: hp('2%'),
                                marginLeft: wp('2%'),
                            }}
                                onPress={() => Linking.openURL(GOBALS.URL + this.state.str_detailDoc[i].upload_document_url)}>
                                Link
                            </Text>
                            <Text style={{
    
                                fontFamily: 'Kanit-Regular',
                                fontSize: hp('2%'),
                                marginLeft: wp('1%'),
                            }}
                            >
                                |
                            </Text>
                            <Text style={{
                                color: 'red',
                                fontFamily: 'Kanit-Regular',
                                fontSize: hp('2%'),
                                marginLeft: wp('2%'),
                            }}
                                onPress={() => this.CheckDeletePDF(this.state.str_detailDoc[i].upload_document_url)}>
                                ลบข้อมูล
                            </Text>
                        </View>
                    )
                }
            }
            return (
                <Container>
                    <Header style={{ backgroundColor: '#ff8c00',
                                    
                                   }}>
                        <Left style={{ flex: 1 }}>
                            <TouchableOpacity
                                onPress={() => this.back()}
                                style={{ width: wp('15%'),
                                marginLeft:wp('-1.5%') }}
                            >
                                <Image
                                    source={require('../../img/left.png')}
                                    onPress={() => this.back()}
                                    style={{ width:wp('3.5%'), height:hp('2.5%'), alignSelf: 'center',
                                    marginLeft:wp('-1.5%')  }}
                                />
                            </TouchableOpacity>
                        </Left>
                        <Body style={{ flex: 4, alignItems: 'center', alignSelf: 'center',
                                    }}>
                            <Text style={{
                                fontSize: hp('2.2%'),
                                color: '#fff',
                                fontFamily: 'Kanit-Regular'
                            }}>อัพโหลดเอกสารการขอกู้ยืม</Text>
                        </Body>
                        <Right style={{ flex: 1 }}>
                        </Right>
                    </Header>
                    <Body style={{
                            backgroundColor: '#ebebeb',
                            width: wp('100%'),
                        }}>
                          
                <View style={{
                    backgroundColor: '#343a40',
                    flexDirection: 'row',
                    width: wp('100%'),
                    borderTopColor:'#fff',
                    borderBottomColor:'#343a40',
                    borderLeftColor:'#343a40',
                    borderRightColor:'#343a40',
                    borderWidth: 1,  
                  }}>
                    <Text style={{
                      fontFamily: 'Kanit-Regular',
                      fontSize: hp('2%'),
                      marginLeft: wp('5%'),
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
                    <ScrollView
                        style={{
                            backgroundColor: '#ebebeb',
                            width: wp('100%'),
                        }}
                    >
                        <Card style={{
                            width: wp('90%'),
                            marginTop: hp('3%'),
                            alignSelf: 'center',
                            borderRadius: 8,
                            elevation: 3,
                            borderColor: '#000',
                            borderWidth: 1,
                        }}>
                        <CardItem
                         style={{
                             borderTopStartRadius:8,
                             borderTopEndRadius:8,
                             backgroundColor:'#fb9211'
                         }}>
                            <Text style={{
                                fontFamily: 'Kanit-Regular',
                                fontSize: hp('2.2%'),
                                marginLeft: wp('1%'),
                                color:'#fff'
                            }}>
                                ขั้นตอนการอัพโหลดเอกสาร
                        </Text>
                        </CardItem>
                        <CardItem style={{
                             borderBottomStartRadius:8,
                             borderBottomEndRadius:8
                         }}>
                            <Text style={{
                                fontFamily: 'Kanit-Regular',
                                fontSize: hp('1.8%'),
                                marginLeft: wp('3%'),
    
                            }}>
                                1. นำเข้าไฟล์ PDF ที่ต้องการอัพโหลดไว้ในโทรศัพท์หรือใน Google Drive {"\n"}
                                2. กดเลือกที่เมนู เลือกไฟล์ {"\n"}
                                3. จากนั้นทำการเลือกไฟล์ที่ต้องการอัพโหลด {"\n"}
                                4. เมือทำการเลือกไฟล์เสร็จสิ้น ให้กดที่ปุ่มบันทึก {"\n"}
                            </Text>
                            </CardItem>
                        </Card>
                        {/*Showing the data of selected Multiple files*/}
                        {this.state.str_detailDoc !== null?
                            <Card style={{
                                borderColor: '#000',
                                borderWidth: 1,
                                width: wp('90%'),
                                marginTop: hp('3%'),
                                alignSelf: 'center',
                                borderRadius: 8,
                                elevation: 3
                            }}>
    
                                <Text style={{
                                    fontFamily: 'Kanit-Regular',
                                    fontSize: hp('2.2%'),
                                    marginLeft: wp('3%'),
                                    marginTop: hp('1.5%')
                                }}>
                                    ไฟล์ที่คุณได้ทำการอัพโหลด
                            </Text>
                                <View style={{
                                    marginBottom: hp('2%')
                                }}>
                                    {str_doc_name}
                                </View>
                            </Card>
                            : null
                        }
                        {this.state.multipleFile.length === 0 ?
                            <Card style={{
                                borderColor: '#000',
                                borderWidth: 1,
                                width: wp('90%'),
                                marginTop: hp('3%'),
                                alignSelf: 'center',
                                borderRadius: 8,
                                elevation: 3
                            }}>
    
                                <Text style={{
                                    fontFamily: 'Kanit-Regular',
                                    fontSize: hp('2%'),
                                    marginLeft: wp('3%'),
                                    marginBottom: hp('2%'),
                                    marginTop: hp('1.5%')
                                }}>
                                    กรุณาเลือกไฟล์ที่ต้องการอัพโหลด
                                    </Text>
    
                                <TouchableOpacity
                                    activeOpacity={0.5}
                                    style={{
                                        alignSelf: 'center',
                                        backgroundColor: '#007bff',
                                        width: wp('40%'),
                                        height: hp('5%'),
                                        marginBottom: hp('3%'),
                                        borderRadius: 20
                                    }}
                                    onPress={this.selectMultipleFile.bind(this)}>
                                    {/*Multiple files selection button*/}
                                    <Text style={{
                                        fontFamily: 'Kanit-Regular', color: '#fff',
                                        fontSize: hp('2%'),
                                        marginTop: hp('0.75%'),
                                        textAlign: 'center'
                                    }}>
                                        เลือกไฟล์
        
                                    </Text>
    
                                </TouchableOpacity>
    
                            </Card>
                            :
                            <Card style={{
                                borderColor: '#000',
                                borderWidth: 1,
                                width: wp('90%'),
                                marginTop: hp('3%'),
                                alignSelf: 'center',
                                borderRadius: 8,
                                elevation: 3
                            }}>
    
                                <Text style={{
                                    fontFamily: 'Kanit-Regular',
                                    fontSize: hp('2%'),
                                    marginLeft: wp('3%'),
                                    marginBottom: hp('-1%'),
                                    marginTop: hp('1.5%')
                                }}>
                                    คุณได้เลือกไฟล์จำนวน {this.state.multipleFile.length} ไฟล์ {"\n"}
                                    {this.state.str_showDoc}
                                </Text>
                                <TouchableOpacity
                                    activeOpacity={0.5}
                                    style={{
                                        alignSelf: 'center',
                                        backgroundColor: '#007bff',
                                        width: wp('40%'),
                                        height: hp('5%'),
                                        marginBottom: hp('3%'),
                                        borderRadius: 20
                                    }}
                                    onPress={this.selectMultipleFile.bind(this)}>
                                    {/*Multiple files selection button*/}
                                    <Text style={{
                                        fontFamily: 'Kanit-Regular', color: '#fff',
                                        fontSize: hp('2%'),
                                        marginTop: hp('0.75%'),
                                        textAlign: 'center'
                                    }}>
                                        เลือกไฟล์
        
                                    </Text>
    
                                </TouchableOpacity>
                            </Card>
                        }
    
    
                        <TouchableOpacity
                            activeOpacity={0.5}
                            style={{
                                alignSelf: 'center',
                                backgroundColor: 'green',
                                width: wp('35%'),
                                height: hp('6%'),
                                marginTop: hp('3%'),
                                borderRadius: 40,
    
                            }}
                            onPress={this.Submit.bind(this)}>
                            {/*Multiple files selection button*/}
                            <Text style={{
                                fontFamily: 'Kanit-Regular', color: '#fff', fontSize: hp('2%'),
                                textAlign: 'center',
                                marginTop: hp('1.5%')
                            }}>
                                บันทึก
                         </Text>
    
                        </TouchableOpacity>
    
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