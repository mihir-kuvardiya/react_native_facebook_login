import React from "react";

import { Text, View, StatusBar, Image, StyleSheet, Button, Alert } from 'react-native';
import { LoginManager, GraphRequest, GraphRequestManager } from 'react-native-fbsdk';

const Login = () => {
  

  const fblogin = (rescallback) => {
    LoginManager.logOut();
    return LoginManager.logInWithPermissions(['email', 'public_profile']).then(
      result => {
        console.log("result==>>>", result);
        if (result.declinedPermissions) {
          rescallback({ message: "email is required" })
        }
        if (result.isCancelled) { console.log("error") }
        else {
          const infoRequest = new GraphRequest(
            '/me?fields=email,name',
            null,
            rescallback
          );
          new GraphRequestManager().addRequest(infoRequest).start()
        }
      },
      function (error) { console.log("login with fail error:" + error) }
    )
  }
  const onfblogin = async () => {
    try {
      await fblogin(_responseInfoCallBack)
    } catch (error) {
      console.log("error raised", error)

    }
  }
  const _responseInfoCallBack = async (error, result) => {
    if (error) {
      console.log("error top", error)
      return;
    }
    else {
      const userData = result
      console.log("fb dat+++", userData.name)
     Alert.alert("Hello "+userData.name);
      
    }
  }
  return (
    <View style={styles.container}>
      <StatusBar
        animated={true}
        backgroundColor="#6495ED"
        barStyle={'default'}
      />

      <Text style={{ marginTop: 20, marginBottom: 20, fontSize: 20, fontWeight: "bold" }}>Hello world </Text>


      <Image source={require('E:/recnat/Login/Indian1.png')}
        style={{ width: 100, height: 100, alignItems: 'center', borderRadius: 10, marginBottom: 20 }}
      />
      <Button
        title="login with facebook"
        onPress={onfblogin}
        style={styles.btn}
      />

    </View>
  )
}

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 30,
    marginVertical: 16,
    marginBottom: 20,

  },
  btn: {
    alignItems: 'center',
    paddingTop: 20,
    marginTop: 20,
    marginVertical: 16,
    marginBottom: 20,
    borderRadius: 10,
  },
});