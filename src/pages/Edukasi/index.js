import { Alert, StyleSheet, Text, View, Image, FlatList, ActivityIndicator, Dimensions, TouchableOpacity, Linking } from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { apiURL, getData, MYAPP, storeData } from '../../utils/localStorage';
import { colors, fonts, windowHeight, windowWidth } from '../../utils';
import { Icon } from 'react-native-elements';

export default function Edukasi({ navigation }) {
    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: colors.white,
            padding: 10,
        }}>
            <TouchableOpacity onPress={() => navigation.navigate('EdukasiDaftar', {
                menu: 'Hipertensi'
            })} style={{
                flex: 1,
                backgroundColor: colors.whatsapp,
                marginVertical: 10,
                borderRadius: 20,
                paddingHorizontal: 10,
                flexDirection: 'row',
                alignItems: 'center'
            }}>
                <Icon type='ionicon' name='fitness' size={windowHeight / 10} color={colors.white} />
                <View style={{
                    paddingLeft: 10,
                }}>
                    <Text style={{
                        fontFamily: fonts.secondary[600],
                        color: colors.white,
                        fontSize: windowWidth / 20,
                    }}>Hipertensi</Text>
                    <Text style={{
                        fontFamily: fonts.secondary[400],
                        color: colors.white,
                        fontSize: windowWidth / 25,
                    }}>Berisi materi mengenai hipertensi</Text>
                </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('EdukasiDaftar', {
                menu: 'Gangguan Pola Tidur'
            })} style={{
                flex: 1,
                paddingHorizontal: 10,
                backgroundColor: colors.primary,
                marginVertical: 10,
                borderRadius: 20,
                flexDirection: 'row',
                alignItems: 'center'
            }}>
                <Icon type='ionicon' name='bed' size={windowHeight / 10} color={colors.white} />
                <View style={{
                    paddingLeft: 10,

                }}>
                    <Text style={{
                        fontFamily: fonts.secondary[600],
                        color: colors.white,
                        fontSize: windowWidth / 20,
                    }}>Gangguan Pola Tidur</Text>
                    <Text style={{
                        fontFamily: fonts.secondary[400],
                        color: colors.white,
                        fontSize: windowWidth / 25,
                    }}>Berisi materi gangguan pola tidur</Text>
                </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => {
                Alert.alert(MYAPP, 'Pilih jenis materi yang dilihat', [
                    {
                        text: 'TUTUP',

                    },
                    {
                        text: 'FOTO',
                        onPress: () => navigation.navigate('EdukasiDaftar', {
                            menu: 'Cara Mengatasi'
                        })
                    },
                    {
                        text: 'VIDEO',
                        onPress: () => navigation.navigate('EdukasiVideo', {
                            menu: 'Cara Mengatasi'
                        })
                    },

                ])

            }} style={{
                flex: 1,
                paddingHorizontal: 10,
                backgroundColor: colors.border,
                marginVertical: 10,
                borderRadius: 20,
                flexDirection: 'row',
                alignItems: 'center'
            }}>
                <Icon type='ionicon' name='search' size={windowHeight / 10} color={colors.white} />
                <View style={{
                    paddingLeft: 10,

                }}>
                    <Text style={{
                        fontFamily: fonts.secondary[600],
                        color: colors.white,
                        fontSize: windowWidth / 20,
                    }}>Cara Mengatasi</Text>
                    <Text style={{
                        fontFamily: fonts.secondary[400],
                        color: colors.white,
                        fontSize: windowWidth / 25,
                    }}>Berisi materi foto dan video</Text>
                </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('Artikel')} style={{
                flex: 1,
                backgroundColor: colors.instagram,
                marginVertical: 10,
                paddingHorizontal: 10,
                borderRadius: 20,
                flexDirection: 'row',
                alignItems: 'center'
            }}>
                <Icon type='ionicon' name='newspaper' size={windowHeight / 10} color={colors.white} />
                <View style={{
                    paddingLeft: 10,
                }}>
                    <Text style={{
                        fontFamily: fonts.secondary[600],
                        color: colors.white,
                        fontSize: windowWidth / 20,
                    }}>Artikel</Text>
                    <Text style={{
                        fontFamily: fonts.secondary[400],
                        color: colors.white,
                        fontSize: windowWidth / 25,
                    }}>Kumpulan artikel edukasi</Text>
                </View>
            </TouchableOpacity>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})