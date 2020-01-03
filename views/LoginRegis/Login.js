import React from 'react';
import {
    Platform, StyleSheet, Text, View, FlatList, ImageBackground, TouchableOpacity,
    ScrollView, Dimensions, Image,  TextInput,Linking,
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import AsyncStorage from '@react-native-community/async-storage';
import NetInfo from "@react-native-community/netinfo";
import {
    Segment
    ,Button,
    Card,
    CardItem,
    Body, Picker
} from "native-base"

import Student from '../../models/StudentModel';
// import SweetAlert from 'react-native-sweet-alert';

var student = new Student;
export class Login extends React.Component {
    constructor(props) {
        super(props)
        this.handleSubmit = this.handleSubmit.bind(this);
        // this.getMemberData();

        this.state = {
            school_of_group:[],
            intitute_group :[],
            username: '',
            password: '',
            
            regis_student_id:'',
            regis_email:'',
            regis_name:'',
            regis_password:'',
            regis_repassword:'',
            regis_tel:'',
            regis_intitute:'',
            regis_school_of:'',
            regis_ID:'',
            fireRedirect: false,
            seg: 1,
            selected: '0',
            selectedd:'0'
        }
    }

    // getMemberData = async () => {
    //     try {
    //       const member = await AsyncStorage.getItem('student_code')
    //       if (member !== null) {
    //         if (member.member_id !== null) {
    //           this.props.navigation.navigate("Main")
    //         }
    //       }
    //     } catch (e) {
    //       // error reading value
    //     }
    //   }

    async componentDidMount() {
        NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectivityChange);
        const intitute_group = await student.getIntituteBy()
        this.setState
            ({  
                intitute_group:intitute_group,
                seg: 1
            })        
    }

    componentWillUnmount() {
    NetInfo.isConnected.removeEventListener('connectionChange', this.handleConnectivityChange);
  }
    


    async onValueChange(value) 
    {
        const school_of_group = await student.getSchoolOfByCode(value)
        this.setState({
            selected: value ,
            school_of_group:school_of_group
        })
      }

      onValueChangeSchoolOf(value){
          this.setState({
              selectedd:value
          })
      }
    
    setSeg(number){
        this.setState({ seg: number})
    }

    async handleSubmit() {
        var arr = {};

        arr['user_username'] = this.state.username;
        arr['user_password'] = this.state.password;

        await AsyncStorage.setItem('username',this.state.username);
        await AsyncStorage.setItem('password',this.state.password);

        const information = await student.checkLogin(arr);
        if (information) {
            await AsyncStorage.setItem('student_name',information.student_name)
            await AsyncStorage.setItem('student_prefix',information.student_prefix)
            await AsyncStorage.setItem('student_code',information.student_id);    
            await AsyncStorage.setItem('ID',information.ID);         
            // console.warn(arr['user_username']);
            this.props.navigation.navigate('User')
        } else {
            
            alert('Please check your username and password!')
        }
    }

    async handleRegister(){
        var register ={};

        register['student_id'] =  this.state.regis_student_id;
        register['student_password'] = this.state.regis_password;
        register['student_name'] = this.state.regis_name;
        register['student_intitute'] = this.state.selected;
        register['student_school_of'] = this.state.selectedd;
        register['student_tel'] = this.state.regis_tel;
        register['student_email'] = this.state.regis_email;
        register['ID'] = this.state.regis_ID

        var Register = await student.registerUser(register);

        if (Register) {
            
            alert('register success !')
            AsyncStorage.setItem('student_code', Register.student_id);
            this.props.navigation.navigate('ProfilePage')

        } else {
            
            alert('fails!')
        }
    }

    handleConnectivityChange = isConnected => {
        if (isConnected) {
          this.setState({ isConnected });
        } else {
          this.setState({ isConnected });
        }
      };

    render() {
        var intitute_group_index=[]
        var school_of_group_index =[]
        intitute_group_index = this.state.intitute_group
        

            school_of_group_index = this.state.school_of_group
        
        
        var str_intitute = intitute_group_index.map(function(result){
            return <Picker.Item key={result.intitute_id} 
                    label ={result.intitute_name} 
                    value={result.intitute_id} />;
        });

        
            var str_school_of = school_of_group_index.map(function(result){
                return <Picker.Item key ={result.school_of_id} 
                        label = {result.school_of_name} 
                        value ={result.school_of_id} />;
            });
        

        return (

            <ImageBackground source={require('../../img/bg.png')}
                style={{
                    flex: 1,
                    width: wp('100%'), height: hp('100%'),
                    
                    padding: 2,
                }}>
                 <Segment style={{backgroundColor:'transparent',justifyContent:'flex-end',marginTop:hp('3%'),marginLeft:hp('-4%')}}>
                                <Button
                                    style={{
                                        backgroundColor: this.state.seg === 1 ? 'transparent': undefined,
                                        
                                        borderBottomColor:this.state.seg === 1 ? 'white' : 'transparent',
                                        borderTopColor:'transparent',
                                        borderLeftWidth:0,
                                        borderBottomWidth:2,
                                        borderRightWidth:0,
                                        width: wp('18%'),
                                        
                                    }}
                                    first
                                    active={this.state.seg === 1 ? true : false}
                                    onPress={() => this.setSeg(1)}
                                >
                                    
                                        <Text style={{ 
                                            fontFamily: 'Kanit-Regular',
                                            fontSize:hp('1.5%'),
                                            color: this.state.seg === 1 ? "#fff" : "#fff",
                                            marginLeft:hp('0.5%')
                                            }}>เข้าสู่ระบบ</Text>
                                    
                                </Button>
                                <Button
                                    last
                                    style={{
                                        backgroundColor: this.state.seg === 2 ? 'transparent' : 'transparent',
                                        borderBottomColor:this.state.seg === 2 ? 'white' : 'transparent',
                                        borderTopColor:'transparent',
                                        borderLeftWidth:0,
                                        borderBottomWidth:2,
                                        borderRightWidth:0,
                                        width: wp('23%'),
                                       
                                        
                                    }}
                                    active={this.state.seg === 2 ? true : false}
                                    onPress={() => this.setSeg(2)}
                                >
                                    <Text style={{ 
                                            fontFamily: 'Kanit-Regular',
                                            fontSize:hp('1.5%'),
                                            color: this.state.seg === 1 ? "#fff" : "#fff",
                                            marginLeft:hp('1%')}}>
                                                สมัครสมาชิก
                                    </Text>
                                </Button>
                            </Segment>
                            
                            {this.state.seg === 1 && 
                        
                             <View style={{justifyContent:'center'}}>
                                 <Image source={require('../../img/slfLogo.png')} style={{marginTop:hp('3%'),
                                    width:wp('20%'),height:hp('11%'),borderRadius:12,alignSelf:'center',alignItems:'center'}}>

                                </Image>

                                <Text style={{ fontFamily: 'Kanit-Regular',
                                            fontSize:hp('3%'),
                                            color:'#fff',
                                            alignItems:'center',
                                            alignSelf:'center'}}>
                                        Student Loan @SUT

                                </Text>
                                <Card style={{backgroundColor:"#ffffff",marginLeft:hp('2.5%'),marginTop:hp('2%'),width:wp('90%'),height:hp('35%'),borderRadius:12,elevation:3}}> 
                                <CardItem  style={{borderRadius:12}}>
                                <Body  style={{borderRadius:12}}>
                             <Text style={styles.LoginFont}>รหัสนักศึกษา / อีเมล</Text>
                             
                             <TextInput
                                            underlineColorAndroid='transparent'
                                            
                                            style={styles.TextLoginStyle}
                                            require
                                            onChangeText={(username) => {
                                                this.setState({ username })
                                            }}
                                    />
             
                             <Text style={styles.LoginFont}>รหัสผ่าน</Text>

                                    <TextInput
                                            underlineColorAndroid='transparent'
                                            
                                            keyboardType='numeric'
                                            style={styles.TextLoginStyle}
                                            require
                                            secureTextEntry={true}
                                            onChangeText={(password) => {
                                                this.setState({ password })
                                            }}
                                    />
                             
                             <Text style={{
                             marginTop:hp('4%'),
                             color: '#000',
                             fontSize:hp('2%'),
                             fontFamily: 'Kanit-Regular',
                             marginLeft:hp('26%')}}
                                 onPress={() =>   this.props.navigation.navigate('ForgetPassword')}>
                                 ลืมรหัสผ่าน ?
                             </Text>
                             </Body>
                                    </CardItem>
                                </Card>
                             <TouchableOpacity
                                 style={{
                                     marginTop: hp('5%'),
                                     height: hp('7%'),
                                     width: wp('80%'),
                                     justifyContent: 'center',
                                     alignSelf: 'center',
                                     backgroundColor: '#fff',
                                     borderRadius: 40,
                                     elevation:3
                                     
                                 }}
                                 onPress={() => this.handleSubmit()}
                             >
             
                                 <Text style={{
                                     fontFamily: 'Kanit-Regular',
                                     fontSize: hp('2.5%'),
                                     alignSelf: 'center',
                                     color: '#F87217',
                                     
                                     
                                 }}>เข้าสู่ระบบ
                 
                                 </Text>
                             </TouchableOpacity>
                             
                             </View> }

                             {this.state.seg ===2 &&
                             <ScrollView>
                                <View style={{justifyContent:'center'}}>
                                    
                                    
                            <Card style={{backgroundColor:"#ffffff",width:wp('80%'),marginLeft:hp('5%'),marginBottom:hp('3%'),borderRadius:12}}> 
                                <CardItem  style={{borderRadius:12}}>
                                <Body  style={{borderRadius:12}}>
                                <Text style={{ 
                                    fontFamily: 'Kanit-Regular',
                                    marginBottom:hp('-2%'),
                                    fontSize: hp('2%'),
                                    alignItems: 'flex-start',
                                    color: "#000"}}>
                                     ส่วนที่ 1 : บัญชีผู้ใช้</Text>
                                {/* <Text style={styles.RegisterFont}>E-mail</Text> */}
                                <TextInput
                                    underlineColorAndroid='transparent'
                                    placeholder ="E-mail"
                                    style={styles.TextRegisterStyle}
                                    require
                                    onChangeText={(regis_email) => {
                                        this.setState({ regis_email })
                                    }}
                                />

                                    
                                    {/* <Text style={styles.RegisterFont}>รหัสผ่าน</Text> */}
                                        <TextInput
                                            underlineColorAndroid='transparent'
                                            placeholder ="รหัสผ่าน"
                                            style={styles.TextRegisterStyle}
                                            require
                                            secureTextEntry={true}
                                            onChangeText={(regis_password) => {
                                            this.setState({ regis_password })
                                            }}
                                    />
                                    {/* <Text style={styles.RegisterFont}>ยืนยันรหัสผ่าน</Text> */}
                                        <TextInput
                                            underlineColorAndroid='transparent'
                                            placeholder ="ยืนยันรหัสผ่าน"
                                            style={{
                                                marginTop:hp('2%'),
                                                height: 45,  
                                                borderWidth: 2,  
                                                borderLeftColor:'#fff',
                                                borderRightColor:'#fff',
                                                borderTopColor:'#fff',
                                                borderBottomColor: '#d3d2d2',  
                                                width:wp('70%'),
                                                fontSize:hp('2%'),
                                                fontFamily: 'Kanit-Regular',
                                                marginBottom:hp('3%')
                                            }}
                                            require
                                            secureTextEntry={true}
                                            onChangeText={(regis_repassword) => {
                                            this.setState({ regis_repassword })
                                            }}
                                    />
                                    </Body>
                                    </CardItem>
                                </Card>
                                <Card style={{backgroundColor:"#ffffff",width:wp('80%'),marginLeft:hp('5%'),marginBottom:hp('3%'),borderRadius:12,elevation:5}}>
                                    <CardItem bordered style={{borderRadius:12}}>
                                        <Body bordered style={{borderRadius:12}}>
                                        <Text style={{ 
                                            fontFamily: 'Kanit-Regular',
                                            marginBottom:hp('-2%'), 
                                            fontSize: hp('2%'),
                                            alignItems: 'flex-start',
                                            color: "#000"}}>
                                             ส่วนที่ 2 : ข้อมูลผู้ใช้</Text>
                                             
                                             {/* <Text style={styles.RegisterFont}>รหัสนักศึกษา</Text> */}
                                            <TextInput
                                            underlineColorAndroid='transparent'
                                            placeholder ="รหัสนักศึกษา"
                                            style={styles.TextRegisterStyle}
                                            require
                                            onChangeText={(regis_student_id) => {
                                            this.setState({ regis_student_id })
                                            }}
                                             />
                                            {/* <Text style={styles.RegisterFont}>ชื่อ-นามสกุล</Text> */}
                                            <TextInput
                                            underlineColorAndroid='transparent'
                                            placeholder ="ชื่อ-นามสกุล"
                                            style={styles.TextRegisterStyle}
                                            require
                                            onChangeText={(regis_name) => {
                                            this.setState({ regis_name })
                                            }}
                                            />
                                            <TextInput
                                            underlineColorAndroid='transparent'
                                            placeholder ="เลขบัตรประชาชน"
                                            style={styles.TextRegisterStyle}
                                            require
                                            onChangeText={(regis_ID) => {
                                            this.setState({ regis_ID })
                                            }}
                                            />

                                                <View
                                            style={{
                                                marginTop:hp('2%'),
                                                height: 45,  
                                                borderWidth: 2,  
                                                borderLeftColor:'#fff',
                                                borderRightColor:'#fff',
                                                borderTopColor:'#fff',
                                                borderBottomColor: '#d3d2d2',  
                                                width:wp('70%'),
                                                fontSize:hp('2%'),
                                                fontFamily: 'Kanit-Regular',
                                                }}>
                                            <Picker
                                                note
                                                mode="dropdown"
                                                placeholder="สำนักวิชา"
                                                style={{
                                                        height: 45,
                                                        width:wp('70%'),
                                                        color: '#000',
                                                        }}
                                                    selectedValue={this.state.selected}
                                                    onValueChange={this.onValueChange.bind(this)}
                                            >
                                                <Picker.Item label= "สำนักวิชา" value="0" />
                                                {str_intitute}
                                                </Picker>
                                                </View>
                                            

                                            {/* <Text style={styles.RegisterFont}>สาขาวิชา</Text> */}
                                            <View
                                            style={{
                                                marginTop:hp('2%'),
                                                height: 45,  
                                                borderWidth: 2,  
                                                borderLeftColor:'#fff',
                                                borderRightColor:'#fff',
                                                borderTopColor:'#fff',
                                                borderBottomColor: '#d3d2d2',  
                                                width:wp('70%'),
                                                fontSize:hp('2%'),
                                                fontFamily: 'Kanit-Regular',
                                                }}>
                                            <Picker
                                                note
                                                mode="dropdown"
                                                placeholder="สาขาวิชา"
                                                style={{
                                                        height: 45,
                                                        width:wp('70%'),
                                                        color: '#000',
                                                        }}
                                                    selectedValue={this.state.selectedd}
                                                    onValueChange={this.onValueChangeSchoolOf.bind(this)}
                                            >
                                                <Picker.Item label="สาขาวิชา" value="0" />
                                               {str_school_of}
                                                </Picker>
                                                </View>
                                    {/* <Text style={styles.RegisterFont}>เบอร์โทรศัพท์</Text> */}
                                        <TextInput
                                            underlineColorAndroid='transparent'
                                            placeholder ="เบอร์โทรศัพท์"
                                            style={{
                                                marginTop:hp('2%'),
                                                height: 45,  
                                                borderWidth: 2,  
                                                borderLeftColor:'#fff',
                                                borderRightColor:'#fff',
                                                borderTopColor:'#fff',
                                                borderBottomColor: '#d3d2d2',  
                                                width:wp('70%'),
                                                fontSize:hp('2%'),
                                                fontFamily: 'Kanit-Regular',
                                                marginBottom:hp('3%')
                                            }}
                                            require
                                            onChangeText={(regis_tel) => {
                                            this.setState({ regis_tel })
                                            }}
                                            />
                              
                                        </Body>
                                    </CardItem>
                                </Card>
                                <View style={{height:hp('10%'),
                            
                            justifyContent:'center'}}>
                                
                                <TouchableOpacity
                                 style={{
                                     marginTop:hp('2%'),
                                     marginBottom:hp('5%'),
                                     height: hp('7%'),
                                     width: wp('40%'),
                                     justifyContent: 'center',
                                     alignSelf: 'center',
                                     backgroundColor: '#fff',
                                     borderRadius: 40,
                                     elevation:5
                                 }}
                                 onPress={() => this.handleRegister()}
                             >
             
                                 <Text style={{
                                     fontFamily: 'Kanit-Regular',
                                     fontSize: hp('2%'),
                                     alignSelf: 'center',
                                     color: '#F87217',
             
                                 }}>สมัครสมาชิก
                 
                                 </Text>
                             </TouchableOpacity>
                             </View>
                                   
                                    </View>
                                    </ScrollView>
                                }

            </ImageBackground>


        );
    }
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        // Used to set Text Component Vertically Center
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    
    LoginFont:{
        marginTop:hp('2%'),
        fontFamily: 'Kanit-Regular',
        fontSize: hp('2%'),
        alignItems: 'flex-start',
        color: "#000"
    },

    TextRegisterStyle:{
       marginTop:hp('2%'),
        height: 45,  
        borderWidth: 2,  
        borderLeftColor:'#fff',
        borderRightColor:'#fff',
        borderTopColor:'#fff',
        borderBottomColor: '#d3d2d2',  
        width:wp('70%'),
        fontSize:hp('2%'),
        fontFamily: 'Kanit-Regular',
    },
    TextLoginStyle:{
       
         height: 45,  
         borderWidth: 2,  
         borderLeftColor:'#fff',
         borderRightColor:'#fff',
         borderTopColor:'#fff',
         borderBottomColor: '#d3d2d2',  
         width:wp('80%'),
         fontSize:hp('2%'),
         fontFamily: 'Kanit-Regular',
     },
    RegisterFont:{
        marginTop:hp('2%'),
        fontFamily: 'Kanit-Regular',
        
        fontSize: hp('2%'),
        alignItems: 'flex-start',
        color: "#000"
    }
});

