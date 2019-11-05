import React, { Component } from 'react';
import { View, StyleSheet, SafeAreaView, Image, AsyncStorage, BackHandler, Alert } from 'react-native';
import { Button, Text, Input, Form, Label, Item, Toast } from 'native-base'
import Icon from "react-native-vector-icons/FontAwesome5";
import Axios from "axios";
import SpinIcon from '../components/SpinIcon';
import { API_URL } from './../services/rest-api';

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

    componentDidMount() {
        this.backHandler = BackHandler.addEventListener('hardwareBackPress', this.handleBackPress)
    }

    componentWillUnmount() {
        this.backHandler.remove()
    }

    handleBackPress() {
        Alert.alert(
            'Exit App',
            'Exiting the application?', [{
                text: 'Cancel',
                style: 'cancel'
            }, {
                text: 'OK',
                onPress: () => BackHandler.exitApp()
            }], {
            cancelable: false
        }
        )
        return true
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
            this.setState({ loginBtnDisabled: false })
        } else {
            this.setState({ loginBtnDisabled: true })
        }
    }

    onChangeHandler(text, type) {
        if (type == 'email') {
            this.setState({ emailInput: text })
        } else if (type == 'password') {
            this.setState({ passwordInput: text })
        }
        this.inputVerification('email')
        this.inputVerification('password')
    }

    hidePasswordHandle(status) {
        if (status == true) {
            this.setState({ hidePassword: false })
            this.setState({ hidePwIcon: 'eye' })
        } else {
            this.setState({ hidePassword: true })
            this.setState({ hidePwIcon: 'eye-slash' })
        }
    }

    signInSubmitHandle() {
        this.setState({
            signIn: true,
            loginBtnDisabled: true
        })
        Axios({
            method: 'post',
            url: `${API_URL}/login`,
            data: {
                email: this.state.emailInput,
                password: this.state.passwordInput
            }
        })
            .then((response) => {
                this.setState({
                    signIn: false,
                    loginBtnDisabled: false
                })
                if (response.data.error) {
                    Toast.show({
                        text: response.data.message,
                        textStyle: { fontSize: 12, fontWeight: 'bold' },
                        duration: 1000,
                        style: styles.signIntoastError
                    });
                } else {
                    AsyncStorage.setItem('sigInData', JSON.stringify(response.data));
                    this.props.navigation.navigate('Home');
                }
            }).catch((e) => {
                this.setState({
                    signIn: false,
                    loginBtnDisabled: false
                })
                console.log(e);
            })
    }

    render() {
        return (
            <SafeAreaView style={styles.appContainer}>
                <View style={styles.titleContainer}>
                    <Image style={styles.logo} source={require('../assets/images/logo/bannerSomkeToonBordered.png')} />
                    <Text style={styles.appTitle}>
                        - Sign In -
                </Text>
                    <Text style={styles.appSubtitle}>
                        Sign In with your SMOKETOON Account
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
                                <Icon name="spinner" size={23} style={{ color: "#fff" }} />
                            </SpinIcon> : <Text></Text>}
                        </Button>
                    </Form>
                    <View style={styles.signUpDialog}>
                        <Text style={styles.signUpDialogText}>Do You Not Have an Account? </Text>
                        <Button style={styles.moveToSignUp} onPress={() => this.props.navigation.navigate('SignUp')}><Text style={styles.signUpDialogText}>Sign Up Now!</Text></Button>
                    </View>
                </View>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    appContainer: {
        padding: 10,
        flexDirection: 'column',
        backgroundColor: '#383332',
        flex: 1,
    },
    logo: {
        width: 140,
        height: 140,
        marginRight: 38
    },
    titleContainer: {
        marginHorizontal: 5,
        width: '100%',
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
        color: '#fff',
        width: '100%',
        textAlign: 'center'
    },
    formContainer: {
        marginTop: 20,
        marginHorizontal: 20
    },
    inputContainer: {
        // borderTopWidth: 2,
        // borderLeftWidth: 2,
        // borderRightWidth: 2,
        borderBottomWidth: 0,
        // borderColor: '#ddd',
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
        borderRadius: 5,
        backgroundColor: '#444',
        borderWidth: 1,
        borderColor: '#555',
        color: '#fff'
    },
    inputDisabled: {
        borderRadius: 5,
        backgroundColor: '#333',
        borderWidth: 1,
        borderColor: '#555',
        color: '#fff'
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
    },
    signUpDialog: {
        margin: 15,
        marginTop: 60,
        alignSelf: 'center'
    },
    signUpDialogText: {
        fontSize: 12,
        color: '#fff',
        fontFamily: 'KOMIKSLI',
    },
    moveToSignUp: {
        marginTop: 5,
        alignSelf: 'center',
        alignContent: 'center',
        width: 130,
        height: 20,
        backgroundColor: '#444',
        padding: 6,
        borderRadius: 4
    },
    toastStyle: {
        marginHorizontal: 5, 
        marginBottom: 70, 
        borderRadius: 5
    },
    errorToast: {
        backgroundColor: '#ff3333'
    },
    successToast: {
        backgroundColor: '#2ab325'
    },
    signIntoastError: {
        backgroundColor: '#ff3333', 
        marginHorizontal: 5, 
        marginBottom: 5, 
        borderRadius: 5
    },
})

export default SignIn;
