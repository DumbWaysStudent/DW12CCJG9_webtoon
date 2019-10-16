import React, { Component } from 'react';
import { View, StyleSheet, SafeAreaView, Image, AsyncStorage} from 'react-native';
import {Button, Text, Input, Form, Label, Item} from 'native-base'
import Icon from "react-native-vector-icons/FontAwesome5";
import Axios from "axios";
import SpinIcon from '../components/SpinIcon';

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
        emailInput: '',
        passwordInput: '',
        hidePassword: true,
        hidePwIcon: 'eye-slash',
        loginBtnDisabled: true,
        correctEmail: false,
        correctPass: false,
        signIn: false
    };
  }

  inputVerification(currentInput) {
    if (currentInput == 'email') {
        let
        correct = this.state.emailInput.match(/(^[a-zA-Z]+|^[0-9]+|^[a-zA-Z0-9\.]+)@([a-zA-Z0-9]+)\.([a-zA-Z]+)/g)
        if (correct != null) {
            this.state.correctEmail = true
        } else {
            this.state.correctEmail = false
        }
    } else if (currentInput == 'password') {
        if (this.state.passwordInput !== '') {
            this.state.correctPass = true
        } else {
            this.state.correctPass = false
        }
    }
    
    if (this.state.correctEmail == true && this.state.correctPass == true) {
        this.setState({loginBtnDisabled: false})
    } else {
        this.setState({loginBtnDisabled: true})
    }
  }

  onChangeHandler(text, type) {
      if (type == 'email') {
        this.setState({emailInput: text})
      } else if (type == 'password') {
        this.setState({passwordInput: text})
      }
    this.inputVerification('email')
    this.inputVerification('password')
  }

  hidePasswordHandle(status) {
      if (status == true) {
          this.setState({hidePassword: false})
          this.setState({hidePwIcon: 'eye'})
      } else {
          this.setState({hidePassword: true})
          this.setState({hidePwIcon: 'eye-slash'})
      }
  }

  signInSubmitHandle()
  {
      
  }

  render() {
    return (
        <SafeAreaView style={styles.appContainer}>
            <View style={styles.titleContainer}>
                <Image style={styles.logo} source={require('../assets/images/logo/bannerSomkeToonBordered.png')} />
                <Text style={styles.appTitle}>
                    - Log In -
                </Text>
                <Text style={styles.appSubtitle}>
                    Login with your SMOKETOON Account
                </Text>
            </View>
            <View style={styles.formContainer}>
                <Form>
                    <Label style={styles.labelInput}>Email:</Label>
                    <Item style={styles.inputContainer}>
                        <Input
                            style={this.state.signIn ? styles.inputDisabled : styles.input}
                            value={this.state.emailInput}
                            keyboardType="email-address"
                            onKeyPress={() => this.inputVerification('email')}
                            onChangeText={(text) => this.onChangeHandler(text, 'email')}
                        />
                    </Item>
                    <Label style={styles.labelInput}>Password:</Label>
                    <Item style={styles.inputContainer}>
                        <Input
                            disabled={this.state.signIn}
                            style={this.state.signIn ? styles.inputDisabled : styles.input}
                            secureTextEntry={this.state.hidePassword}
                            value={this.state.passwordInput}
                            onKeyPress={() => this.inputVerification('password')}
                            onChangeText={(text) => this.onChangeHandler(text, 'password')}
                        />
                        <Icon
                            style={styles.iconEye}
                            name={this.state.hidePwIcon}
                            size={20}
                            onPress={() => this.hidePasswordHandle(this.state.hidePassword)}
                        />
                    </Item>
                    <Button
                        style={this.state.loginBtnDisabled ? styles.btnSubmitDisabled : styles.btnSubmit}
                        onPress={() => this.signInSubmitHandle()}
                        disabled={this.state.loginBtnDisabled}
                    >
                        <Text style={styles.btnSubmitText}>Sign In</Text>
                        {this.state.signIn ? <SpinIcon>
                            <Icon name="spinner" size={23} style={{color: "#fff"}} />
                        </SpinIcon>: <Text></Text>}
                    </Button>
                </Form>
            </View>
        </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
    appContainer: {
        padding: 10,
        flexDirection: 'column',
        backgroundColor:'#383332',
        flex: 1,
    },
    logo: {
        width: 140,
        height: 140,
        marginRight: 38
    },
    titleContainer: {
        marginHorizontal: 5,
        marginTop: 20,
        alignItems: 'center'
    },
    appTitle: {
        fontSize: 25,
        fontFamily: 'KOMIKAH_',
        color: '#fff'
    },
    appSubtitle: {
        fontSize: 12,
        fontFamily: 'KOMIKSLI',
        color: '#fff'
    },
    formContainer: {
        marginTop: 20,
        marginHorizontal: 20
    },
    inputContainer: {
        borderTopWidth: 2,
        borderLeftWidth: 2,
        borderRightWidth: 2,
        borderBottomWidth: 2,
        borderColor: '#ddd',
        borderRadius: 5,
        marginBottom: 8,
        backgroundColor: '#eee'
    },
    labelInput: {
        marginLeft: 14,
        marginBottom: 4,
        color: '#fff',
        fontFamily: 'KOMIKASL'
    },
    input: {
        // fontFamily: 'KOMIKASL',
        // fontSize: 12
        // height: 50,
        backgroundColor: '#eee'
    },
    inputDisabled: {
        backgroundColor: '#ddd'
    },
    iconEye: {
        padding: 12,
        width: 48,
        backgroundColor: '#eee',
    },
    btnSubmit: {
        width: '100%',
        paddingHorizontal: 91,
        marginHorizontal: 10,
        marginTop: 20,
        borderWidth: 1,
        borderColor: '#ee7a33',
        backgroundColor: '#ee7a33',
    },
    btnSubmitText: {
        textTransform: 'capitalize',
        fontSize: 16,
        color: '#fff',
        fontFamily: 'KOMIKAH_'
    },
    btnSubmitDisabled: {
        width: '95%',
        paddingHorizontal: 91,
        marginHorizontal: 14,
        marginTop: 20,
        borderWidth: 1,
        borderColor: '#ee7a33',
        backgroundColor: '#ee7a33',
        opacity: 0.6
    }

})

export default SignIn;
