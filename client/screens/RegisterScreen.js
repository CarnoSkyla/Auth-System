import React from 'react'
import { View, Text, StyleSheet, KeyboardAvoidingView, TouchableOpacity, Image, TextInput, Platform } from 'react-native'

import { Formik } from 'formik';

import * as yup from 'yup'

import * as authAction from '../redux/actions/authAction';

import { useDispatch } from 'react-redux'

const formSchema = yup.object({
    fullName: yup.string().required().min(3),
    email: yup.string().email().required(),
    password: yup.string().required().min(6)
})

const RegisterScreen = navData => {

    const dispatch = useDispatch();

    return (
        <KeyboardAvoidingView behavior={Platform.OS == 'android' ? 'height' : 'padding'} style={styles.keyboard}>
            <Formik
                initialValues={{ fullName: "", email: "", password: "" }}
                onSubmit={
                    (values) => {
                        dispatch(authAction.registerUser(values))
                        .then(() => {
                            navData.navigation.navigate('HomeScreen')
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
                                placeholder='Full Name'
                                placeholderTextColor='#fff'
                                style={styles.inputContainer}
                                onChangeText={props.handleChange('fullName')}
                                onBlur={props.handleBlur('fullName')}
                                value={props.values.fullName}
                            />
                            <Text style={styles.errorText}>{props.touched.fullName && props.errors.fullName}</Text>
                            <TextInput
                                placeholder='Email'
                                placeholderTextColor='#fff'
                                style={styles.inputContainer}
                                onChangeText={props.handleChange('email')}
                                onBlur={props.handleBlur('email')}
                                value={props.values.email}
                            />
                            <Text style={styles.errorText}>{props.touched.email && props.errors.email}</Text>
                            <TextInput
                                placeholder='Password'
                                placeholderTextColor='#fff'
                                secureTextEntry={true}
                                style={styles.inputContainer}
                                onBlur={props.handleBlur('password')}
                                onChangeText={props.handleChange('password')}
                                value={props.values.password}
                            />
                            <Text style={styles.errorText}>{props.touched.password && props.errors.password}</Text>
                            <TouchableOpacity onPress={props.handleSubmit} style={styles.button}>
                                <Text style={styles.buttonText}>Register</Text>
                            </TouchableOpacity>
                            <View style={styles.registerContainer}>
                                <Text style={styles.registerText}>Have an account?</Text>
                                <TouchableOpacity onPress={() => navData.navigation.navigate('LoginScreen')}>
                                    <Text style={styles.registerButton}>Login</Text>
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

export default RegisterScreen;