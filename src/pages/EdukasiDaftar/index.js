import { Alert, StyleSheet, Text, View, Image, FlatList, ActivityIndicator, Dimensions, ImageBackground } from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { apiURL, getData, storeData } from '../../utils/localStorage';
import { colors, fonts, windowHeight, windowWidth } from '../../utils';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { showMessage } from 'react-native-flash-message';
import Sound from 'react-native-sound';
import { Icon } from 'react-native-elements/dist/icons/Icon';
import { MyButton, MyGap, MyInput } from '../../components';
import { useIsFocused } from '@react-navigation/native';
import axios from 'axios';
import { FloatingAction } from "react-native-floating-action";
import 'intl';
import 'intl/locale-data/jsonp/en';
import moment from 'moment';
import 'moment/locale/id';

export default function EdukasiDaftar({ navigation, route }) {

    const isFocused = useIsFocused();

    const [data, setData] = useState([]);

    useEffect(() => {

        if (isFocused) {
            axios.post(apiURL + 'edukasi', {
                menu: route.params.menu
            }).then(res => {
                console.log(res.data);
                setData(res.data);
            })
        }


    }, [isFocused]);



    return (
        <ImageBackground source={require('../../assets/back.png')} style={{
            flex: 1,
            backgroundColor: colors.zavalabs,
        }}>
            <View style={{
                paddingHorizontal: 10,
                paddingVertical: 20,
                borderBottomRightRadius: 20,
                borderBottomLeftRadius: 20,
                backgroundColor: colors.primary,
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <Text style={{
                    fontFamily: fonts.secondary[600],
                    fontSize: windowWidth / 6,
                    textAlign: 'center',
                    color: colors.white
                }}>{route.params.menu}</Text>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
                {data.map((item, index) => {
                    return (
                        <View style={{
                            position: 'relative'
                        }}>
                            <TouchableOpacity onPress={() => navigation.navigate('EdukasiPdf', item)} style={{
                                backgroundColor: index % 2 != 0 ? colors.satu : colors.dua,
                                borderColor: colors.border,
                                marginHorizontal: 10,
                                height: 100,
                                marginVertical: 5,
                                paddingHorizontal: 10,
                                borderRadius: 50,
                                paddingVertical: 20,
                                justifyContent: 'center',
                                alignItems: 'center',
                                flexDirection: 'row'
                            }}>
                                <View style={{
                                    flex: 0.7,
                                    justifyContent: 'center',
                                    alignItems: index % 2 != 0 ? 'flex-end' : 'flex-start',
                                    padding: 10,
                                }}>
                                    <Text style={{

                                        fontSize: windowWidth / 20,
                                        fontFamily: fonts.secondary[600],
                                        color: index % 2 != 0 ? colors.dua : colors.white
                                    }}>{item.judul} {index}</Text>
                                </View>


                            </TouchableOpacity >
                            {index % 2 != 0 && <Image source={require('../../assets/M1.png')} style={{
                                width: 130,
                                position: 'absolute',
                                height: 130,
                                left: 0,
                                top: 0,
                                zIndex: 99
                            }} />}

                            {index % 2 == 0 && <Image source={require('../../assets/M2.png')} style={{
                                width: 130,
                                position: 'absolute',
                                height: 130,
                                right: 0,
                                top: 0,
                                zIndex: 99
                            }} />}

                        </View>
                    )
                })}
            </ScrollView >
        </ImageBackground >
    )
}

const styles = StyleSheet.create({})