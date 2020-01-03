import React, { Component } from 'react';
import {
  createSwitchNavigator,
  createAppContainer,

} from 'react-navigation';
import {
  Platform, StyleSheet, Text, View, FlatList, ImageBackground, TouchableOpacity,
  ScrollView, Dimensions, Image
} from 'react-native';

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { AuthLogin } from './views/AuthLogin'
import { createStackNavigator } from 'react-navigation-stack'
import { createDrawerNavigator } from 'react-navigation-drawer';
import { Login } from "./views/LoginRegis/Login";
import { ProfileDetailScreen } from './views/Profile/profile'
import { USERSLFdetailScreen } from './views/User-SLF/slfdetails'
import { USERQueuedetailScreen } from './views/User-Queue/Queue'
import { ForgetPasswordScreen } from './views/ForgetPassword/ForgetPassword'
import { confirmCodeScreen } from './views/ForgetPassword/confirmCode'
import { renewPasswordScreen } from './views/ForgetPassword/renewPassword'
import { USERDocumentdetailScreen } from './views/User-Document/Document'
import { UploadDocumentdetailScreen } from './views/User-Document/UploadDocument'


class NavigationDrawerStructure extends Component {
  toggleDrawer = () => {
    //Props to open/close the drawer
    this.props.navigationProps.toggleDrawer();
  };

  render() {
    return (
      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity onPress={this.toggleDrawer.bind(this)}>
          {/*Donute Button Image */}
          <Image
            source={require('./img/menu-button.png')}
            style={{ width:wp('5%'), height:hp('3%'), marginLeft: hp('3.5%') }}
          />
        </TouchableOpacity>
      </View>
    );
  }
}

const LoginNavigation = createStackNavigator({
  LoginSystem: {
    screen: Login,
    navigationOptions: {
      header: null
    }
  },


}, {
  initialRouteParams: 'Login',
});

const ForgetPasswordNavigation = createStackNavigator({
  ForgetPassword: {
    screen: ForgetPasswordScreen,
    navigationOptions: {
      header: null
    }
  },
  confirmCode: {
    screen: confirmCodeScreen,
    navigationOptions: {
      header: null
    }
  },
  renewPassword: {
    screen: renewPasswordScreen,
    navigationOptions: {
      header: null
    }
  },

}, {
  initialRouteParams: 'ForgetPassword',
});
const ProfileNavigation = createStackNavigator({
  ProfileDetailScreen: {
    screen: ProfileDetailScreen,
    navigationOptions: ({ navigation }) => ({
      // title: 'Demo Screen 1',
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
      headerTitle:'โปรไฟล์',
      headerTitleStyle: {
        fontFamily: 'Kanit-Regular',
        textAlign: "center",
        flex: 1,
        marginLeft: wp('-14%')
      },
      headerStyle: {
        backgroundColor: '#fb900c',
        borderWidth: 0,
        shadowColor: 'transparent',
        elevation: 0
      },
      headerTintColor: '#fff',
    }),
  },
});

const USERSLFNavigation = createStackNavigator({
  USERSLFdetailScreen: {
    screen: USERSLFdetailScreen,
    navigationOptions: ({ navigation }) => ({
      // title: 'Demo Screen 2',
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
      headerTitle: 'กองทุนกู้ยืมเพื่อการศึกษา',
      headerTitleStyle: {
        fontFamily: 'Kanit-Regular',
        textAlign: "center",
        flex: 1,
        marginLeft: wp('-14%')
      },
      headerStyle: {
        borderBottomColor:'#fff',
        borderTopColor:'#ff8c00',
        borderLeftColor:'#ff8c00',
        borderRightColor:'#ff8c00',
        backgroundColor: '#ff8c00',
        borderWidth: 1,
        shadowColor: 'transparent',
        elevation: 0,
      },
      headerTintColor: '#fff',
    }) 
  },
});

const USERQueueNavigation = createStackNavigator({
  USERQueuedetailScreen: {
    screen: USERQueuedetailScreen,
    navigationOptions: ({ navigation }) => ({
      // title: 'Demo Screen 2',
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
      headerTitle: 'จองคิวยื่นเอกสารคำขอกู้',
      headerTitleStyle: {
        fontFamily: 'Kanit-Regular',
        textAlign: "center",
        flex: 1,
        marginLeft: wp('-14%')
      },
      headerStyle: {
        borderBottomColor:'#fff',
        borderTopColor:'#ff8c00',
        borderLeftColor:'#ff8c00',
        borderRightColor:'#ff8c00',
        backgroundColor: '#ff8c00',
        borderWidth: 1,
        shadowColor: 'transparent',
        elevation: 0,
      },
      headerTintColor: '#fff',
    }) 
  },
});

const USERDocumentNavigation = createStackNavigator({
  USERDocumentdetailScreen: {
    screen: USERDocumentdetailScreen,
    navigationOptions: ({ navigation }) => ({
      // title: 'Demo Screen 2',
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
      headerTitle: 'อัพโหลดเอกสารการขอกู้ยืม',
      headerTitleStyle: {
        fontFamily: 'Kanit-Regular',
        textAlign: "center",
        flex: 1,
        marginLeft: wp('-10%')
      },
      headerStyle: {
        borderBottomColor:'#fff',
        borderTopColor:'#ff8c00',
        borderLeftColor:'#ff8c00',
        borderRightColor:'#ff8c00',
        backgroundColor: '#ff8c00',
        borderWidth: 1,
        backgroundColor: '#ff8c00',
    
        shadowColor: 'transparent',
        elevation: 0,
      },
      headerTintColor: '#fff',
    })
  },
  UploadDocumentdetailScreen: {
    screen: UploadDocumentdetailScreen,
    navigationOptions: {
      header: null
    }
  },
});

const DrawerNavigator = createDrawerNavigator({
  //Drawer Optons and indexing
  ContentScreen: {
    //Title
    screen: ProfileNavigation,
    navigationOptions: {

      drawerIcon: ({ tintColor }) => (
        <Image
          source={require("./img/slfLogo.png")}
          resizeMode="contain"
          style={{ width: 30, height: 30 }}
        />
      ),
      drawerLabel: 'Student Loan @SUT',
    },
  },

  ProfileScreen: {
    //Title
    screen: ProfileNavigation,
    navigationOptions: {
      drawerLabel: 'โปรไฟล์',
      drawerIcon: ({ tintColor }) => (
        <Image
          source={require("./img/user-black.png")}
          resizeMode="contain"
          style={{ width: 30, height: 30, tintColor: tintColor }}
        />
      )
    },
  },
  USERSLFScreen: {
    //Title
    screen: USERSLFNavigation,
    navigationOptions: {
      drawerLabel: 'กองทุน กยศ.',
      drawerIcon: (
        <Image
          source={require("./img/slf.png")}
          resizeMode="contain"
          style={{ width: 50, height: 40 }}
        />
      )
    },
  },
  USERQueueScreen: {
    //Title
    screen: USERQueueNavigation,
    navigationOptions: {
      drawerLabel: 'จองคิวยื่นเอกสารคำขอกู้.',
      drawerIcon: ({ tintColor }) => (
        <Image
          source={require("./img/calendar-drawer.png")}
          resizeMode="contain"
          style={{ width: 30, height: 30, tintColor: tintColor }}
        />
      )
    },

  },
  USERDocumentScreen: {
    //Title
    screen: USERDocumentNavigation,
    navigationOptions: {
      drawerLabel: 'อัพโหลดเอกสารการขอกู้ยืม',
      drawerIcon: ({ tintColor }) => (
        <Image
          source={require("./img/document-drawer.png")}
          resizeMode="contain"
          style={{ width: 30, height: 30, tintColor: tintColor }}
        />
      )
    },
  },
});


const AuthNavigator = createSwitchNavigator({
  // screen: name
  AuthLoading: AuthLogin,
  Login: LoginNavigation,
  User: DrawerNavigator,
  ForgetPassword: ForgetPasswordNavigation
})


const App = createAppContainer(AuthNavigator);

export default App;