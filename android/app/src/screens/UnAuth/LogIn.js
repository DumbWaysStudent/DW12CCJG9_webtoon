import React, { Component } from 'react';
import { View, StyleSheet, SafeAreaView} from 'react-native';
import {Button, Text, Input, Form, Label, Item, Container, Content} from 'native-base'
import Icon from "react-native-vector-icons/FontAwesome5";

class LogIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
        emailInput: '',
        passwordInput: '',
        hidePassword: true,
        hidePwIcon: 'eye-slash',
        loginBtnDisabled: true,
        correctEmail: false,
        correctPass: false
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

  hidePasswordHandle(status) {
      if (status == true) {
          this.setState({hidePassword: false})
          this.setState({hidePwIcon: 'eye'})
      } else {
          this.setState({hidePassword: true})
          this.setState({hidePwIcon: 'eye-slash'})
      }
  }

  loginSubmitHandle()
  {
      this.props.navigation.navigate('ForYou')
  }

  render() {
    return (
        <SafeAreaView style={styles.appContainer}>
            <View style={styles.titleContainer}>
                <Text style={styles.appTitle}>
                    Log In
                </Text>
                <Text style={styles.appSubtitle}>
                    Login with your account WEBTOON
                </Text>
            </View>
            <View style={styles.formContainer}>
                <Form>
                    <Label style={styles.labelInput}>Email</Label>
                    <Item style={styles.inputContainer}>
                        <Input
                            style={styles.input}
                            value={this.state.emailInput}
                            keyboardType="email-address"
                            onKeyPress={() => this.inputVerification('email')}
                            onChangeText={(text) => this.setState({emailInput: text})}
                        />
                        <Icon name="" />
                    </Item>
                    <Label style={styles.labelInput}>Password</Label>
                    <Item style={styles.inputContainer}>
                        <Input
                            style={styles.input}
                            secureTextEntry={this.state.hidePassword}
                            value={this.state.passwordInput}
                            onKeyPress={() => this.inputVerification('password')}
                            onChangeText={(text) => this.setState({passwordInput: text})}
                        />
                        <Icon
                            style={{padding: 10}}
                            name={this.state.hidePwIcon}
                            size={20}
                            onPress={() => this.hidePasswordHandle(this.state.hidePassword)}
                        />
                    </Item>
                    <Button
                        style={this.state.loginBtnDisabled ? styles.btnSubmitDisabled : styles.btnSubmit}
                        onPress={() => this.loginSubmitHandle()}
                        disabled={this.state.loginBtnDisabled}
                    >
                        <Text style={styles.btnSubmitText}>Log In</Text>
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
    },
    titleContainer: {
        marginHorizontal: 5,
        marginTop: 150,
        // borderWidth: 1,
        alignItems: 'center'
    },
    appTitle: {
        fontSize: 30
    },
    appSubtitle: {
    },
    formContainer: {
        marginTop: 35,
        marginHorizontal: 20
    },
    inputContainer: {
        borderTopWidth: 2,
        borderLeftWidth: 2,
        borderRightWidth: 2,
        borderBottomWidth: 2,
        borderColor: '#ddd',
        borderRadius: 5,
        marginBottom: 8
    },
    labelInput: {
        marginLeft: 14,
        color: '#555'
    },
    input: {},
    btnSubmit: {
        width: '100%',
        paddingHorizontal: 108,
        marginHorizontal: 10,
        marginTop: 20,
        borderWidth: 2,
        borderColor: '#000',
        backgroundColor: 'orange'
    },
    btnSubmitText: {
        textTransform: 'capitalize',
        fontSize: 16,
        color: '#000'
    },
    btnSubmitDisabled: {
        width: '95%',
        paddingHorizontal: 100,
        marginHorizontal: 14,
        marginTop: 20,
        borderWidth: 2,
        borderColor: '#000',
        backgroundColor: 'orange',
        opacity: 0.6
    }

})

export default LogIn;
