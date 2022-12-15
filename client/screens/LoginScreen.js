import React from 'react'
import { View, Text, StyleSheet, KeyboardAvoidingView, ScrollView, Image, TextInput, TouchableOpacity, Platform, Alert } from 'react-native'

import { Formik } from 'formik'
import * as yup from 'yup'

import { useDispatch } from 'react-redux'

import * as authAction from '../redux/actions/authAction';

import AsyncStorage from '@react-native-async-storage/async-storage';

const formSchema = yup.object({
    email: yup.string().email().required(),
    password: yup.string().required().min(6)
})

const LoginScreen = navData => {

    const dispatch = useDispatch();

    return (
        <KeyboardAvoidingView behavior={Platform.OS == 'android' ? 'height' : 'padding'} style={styles.keyboard}>
            <Formik
                initialValues={{ email: "", password: "" }}
                onSubmit={
                    (values) => {
                        dispatch(authAction.loginUser(values))
                            .then(async (result) => {
                                if (result.success) {
                                    try {
                                        await AsyncStorage.setItem('token', result.token)
                                        navData.navigation.navigate('HomeScreen')
                                    } catch (error) {
                                        console.log(error)
                                    }

                                } else {
                                    Alert.alert(result.message)
                                }
                            })
                            .catch((err) => console.log(err))
                    }
                }
                validationSchema={formSchema}
            >
                {(props) => (
                    <View style={styles.container}>
                        <View style={styles.logo}>
                            <Image source={require('../assets/icon.png')} style={styles.image} />
                        </View>
                        <View>
                            <TextInput
                                placeholder='Email'
                                placeholderTextColor='#fff'
                                style={styles.inputContainer}
                                onChangeText={props.handleChange('email')}
                                value={props.values.email}
                                onBlur={props.handleBlur('email')}
                            />
                            <Text style={styles.errorText}>{props.touched.email && props.errors.email}</Text>
                            <TextInput
                                placeholder='Password'
                                placeholderTextColor='#fff'
                                secureTextEntry={true}
                                style={styles.inputContainer}
                                onChangeText={props.handleChange('password')}
                                value={props.values.password}
                                onBlur={props.handleBlur('password')}
                            />
                            <Text style={styles.errorText}>{props.touched.password && props.errors.password}</Text>
                            <TouchableOpacity onPress={props.handleSubmit} style={styles.button}>
                                <Text style={styles.buttonText}>Login</Text>
                            </TouchableOpacity>
                            <View style={styles.registerContainer}>
                                <Text style={styles.registerText}>Don't have an account?</Text>
                                <TouchableOpacity onPress={() => navData.navigation.navigate('RegisterScreen')}>
                                    <Text style={styles.registerButton}>Register</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                )}
            </Formik>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    keyboard: {
        flex: 1
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff'
    },
    logo: {
        alignItems: 'center',
        marginBottom: 40
    },
    image: {
        width: 70,
        height: 70
    },
    inputContainer: {
        width: 300,
        backgroundColor: '#B6BFC4',
        borderRadius: 25,
        padding: 16,
        fontSize: 16,
        marginVertical: 10
    },
    input: {

    },
    button: {
        width: 300,
        backgroundColor: '#738289',
        borderRadius: 25,
        paddingVertical: 13,
        marginVertical: 10
    },
    buttonText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#fff',
        textAlign: 'center'
    },
    registerContainer: {
        alignItems: 'flex-end',
        justifyContent: 'center',
        paddingVertical: 13,
        flexDirection: 'row'
    },
    registerText: {
        color: '#738289',
        fontSize: 16
    },
    registerButton: {
        color: '#738289',
        fontSize: 16,
        fontWeight: 'bold'
    },
    errorText: {
        color: 'red'
    }
})

export default LoginScreen;