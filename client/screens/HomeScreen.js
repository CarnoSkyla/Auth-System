import React, {useEffect, useState} from 'react'

import { View, Text, StyleSheet } from 'react-native'

import AsyncStorage from '@react-native-async-storage/async-storage'
import jwtDecode from 'jwt-decode'


const HomeScreen = () => {

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

    return (
        <View>
            <View>
                <Text>Welcome {fullName.split(' ')[0]}</Text>
            </View>
            <View>
                <Text>Your email is: {email}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    
})

export default HomeScreen;