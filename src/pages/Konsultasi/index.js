import { Alert, StyleSheet, Text, View, Image, FlatList, ActivityIndicator, Dimensions, TouchableOpacity, Linking } from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { apiURL, getData, MYAPP, storeData } from '../../utils/localStorage';
import { colors, fonts, windowHeight, windowWidth } from '../../utils';
import { Icon } from 'react-native-elements';

export default function Konsultasi({ navigation }) {
    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: colors.white,
            padding: 10,
        }}>
            <TouchableOpacity onPress={() => Linking.openURL('https://wa.me/6285337268839')} style={{
                flex: 1,
                backgroundColor: colors.whatsapp,
                marginVertical: 10,
                borderRadius: 20,
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <Icon type='ionicon' name='logo-whatsapp' size={windowHeight / 5} color={colors.white} />
                <Text style={{
                    fontFamily: fonts.secondary[600],
                    color: colors.white,
                    fontSize: windowWidth / 20,
                }}>whatsapp</Text>
                <Text style={{
                    fontFamily: fonts.secondary[400],
                    color: colors.white,
                    fontSize: windowWidth / 20,
                }}>085337268839</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => Linking.openURL('https://www.instagram.com/iwiiq_')} style={{
                flex: 1,
                backgroundColor: colors.instagram,
                borderRadius: 20,
                marginVertical: 10,
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <Icon type='ionicon' name='logo-instagram' size={windowHeight / 5} color={colors.white} />
                <Text style={{
                    fontFamily: fonts.secondary[600],
                    color: colors.white,
                    fontSize: windowWidth / 20,
                }}>Instagram</Text>
                <Text style={{
                    fontFamily: fonts.secondary[400],
                    color: colors.white,
                    fontSize: windowWidth / 20,
                }}>@iwiiq_</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})