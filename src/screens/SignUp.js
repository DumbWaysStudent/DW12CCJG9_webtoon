import React, { Component } from 'react';
import { View, StyleSheet, SafeAreaView, Image} from 'react-native';
import {Button, Text, Input, Form, Label, Item} from 'native-base'
import Icon from "react-native-vector-icons/FontAwesome5";
import Axios from "axios";

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
        nameInput: '',
        emailInput: '',
        passwordInput: '',
        hidePassword: true,
        hidePwIcon: 'eye-slash',
        loginBtnDisabled: true,
        correctName: false,
        correctEmail: false,
        correctPass: false
    };
  }

  inputVerification(currentInput) {
    if (currentInput == 'name') {
        let correct = this.state.nameInput.match(/([!"#$%&'()*=,.:;<=>?@[\]^'{|}~]+)/g);
        if (correct == null) {
            this.setState({correctName: true});
        } else {
            this.setState({correctName: false});
        }
    } else if (currentInput == 'email') {
        let
        correct = this.state.emailInput.match(/(^[a-zA-Z]+|^[0-9]+|^[a-zA-Z0-9\.]+)@([a-zA-Z0-9]+)\.([a-zA-Z]+)/g)
        if (correct != null) {
            this.setState({correctEmail: true});
        } else {
            this.setState({correctEmail: false});
        }
    } else if (currentInput == 'password') {
        if (this.state.passwordInput !== '') {
            this.setState({correctPass: true});
        } else {
            this.setState({correctPass: false});
        }
    }
    
    if (this.state.correctName == true && this.state.correctEmail == true && this.state.correctPass == true) {
        this.setState({loginBtnDisabled: false})
    } else {
        this.setState({loginBtnDisabled: true})
    }
  }

  onChangeHandler(text, type) {
      if (type == 'name') {
          this.setState({nameInput: text})
      } else if (type == 'email') {
        this.setState({emailInput: text})
      } else if (type == 'password') {
        this.setState({passwordInput: text})
      }
    this.inputVerification('name')
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

  signUpHandler()
  {
      Axios({
          method: 'post',
          url: 'http://192.168.0.35:5320/api/v1/register',
          data: {
              name: this.state.nameInput,
              email: this.state.emailInput,
              password: this.state.passwordInput
          }
      })
      .then((res) => {
          this.props.navigation.navigate('Home', {data: res})
      })
      .catch((e) => {
          console.log(e)
      })
  }

  render() {
    return (
        <SafeAreaView style={styles.appContainer}>
            <View style={styles.titleContainer}>
                <Image style={styles.logo} source={require('../assets/images/logo/bannerSomkeToonBordered.png')} />
                <Text style={styles.appTitle}>
                    - Sign Up -
                </Text>
                <Text style={styles.appSubtitle}>
                    Make your own SMOKETOON Account
                </Text>
            </View>
            <View style={styles.formContainer}>
                <Form>
                <Label style={styles.labelInput}>Name:</Label>
                    <Item style={styles.inputContainer}>
                        <Input
                            style={styles.input}
                            value={this.state.nameInput}
                            onKeyPress={() => this.inputVerification('name')}
                            onChangeText={(text) => this.onChangeHandler(text, 'name')}
                        />
                    </Item>
                    <Label style={styles.labelInput}>Email:</Label>
                    <Item style={styles.inputContainer}>
                        <Input
                            style={styles.input}
                            value={this.state.emailInput}
                            keyboardType="email-address"
                            onKeyPress={() => this.inputVerification('email')}
                            onChangeText={(text) => this.onChangeHandler(text, 'email')}
                        />
                    </Item>
                    <Label style={styles.labelInput}>Password:</Label>
                    <Item style={styles.inputContainer}>
                        <Input
                            style={styles.input}
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
                        onPress={() => this.signUpHandler()}
                        disabled={this.state.loginBtnDisabled}
                    >
                        <Text style={styles.btnSubmitText}>Sign In</Text>
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
    iconEye: {
        padding: 10,
        backgroundColor: '#eee',
    },
    btnSubmit: {
        width: '100%',
        paddingHorizontal: 94,
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
        paddingHorizontal: 94,
        marginHorizontal: 14,
        marginTop: 20,
        borderWidth: 1,
        borderColor: '#ee7a33',
        backgroundColor: '#ee7a33',
        opacity: 0.6
    }

})

export default SignUp;
