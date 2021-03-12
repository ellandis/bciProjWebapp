import React from 'react'
import { View, Text } from 'react-native'

export default function appCreateAccount() {
    return (
        <View>
            <Text>Create account</Text>
            <input placeholder="Email"></input>
            <input placeholder="Username"></input>
            <input placeholder="Password"></input>
            <input placeholder="Confirm Password"></input>
        </View>
    )
}
