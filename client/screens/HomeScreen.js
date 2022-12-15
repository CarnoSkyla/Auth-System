import React, {useEffect, useState} from 'react'

import { View, Text, StyleSheet, Button } from 'react-native'

import AsyncStorage from '@react-native-async-storage/async-storage'
import jwtDecode from 'jwt-decode'


const HomeScreen = props => {

    const [fullName, setFullName] = useState('')
    const [email, setEmail] = useState('')

    const loadProfile = async () => {
        const token = await AsyncStorage.getItem('token')
        const decoded = jwtDecode(token)

        setFullName(decoded.fullName)
        setEmail(decoded.email)
    }

    useEffect(() => {
        loadProfile()
    })

    const logout = async (props) => {
        await AsyncStorage.removeItem('token')
        .then(() => {
            props.navigation.replace('LoginScreen')
        })
        .catch((err) => {
            console.log(err)
        })
    }

    return (
        <View>
            <View>
                <Text>Welcome {fullName.split(' ')[0]}</Text>
            </View>
            <View>
                <Text>Your email is: {email}</Text>
            </View>
            <View>
                <Button title={'Logout'} onPress={() => logout(props)}/>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    
})

export default HomeScreen;