import React from 'react'
import { View, Text, StyleSheet, KeyboardAvoidingView, ScrollView, Image, TextInput, TouchableOpacity, Platform } from 'react-native'

import { Formik } from 'formik'

const LoginScreen = navData => {
    return (
        <KeyboardAvoidingView behavior={Platform.OS == 'android' ? 'height' : 'padding'} style={styles.keyboard}>
            <Formik
                initialValues={{ email: "", password: "" }}
                onSubmit={(values) => { console.log(values) }}
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
                            /> 
                            <TextInput
                                placeholder='Password'
                                placeholderTextColor='#fff'
                                secureTextEntry={true}
                                style={styles.inputContainer}
                                onChangeText={props.handleChange('password')}
                                value={props.values.password}
                            />
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
    }
})

export default LoginScreen;