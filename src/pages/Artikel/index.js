import { Alert, StyleSheet, Text, View, Image, FlatList, ActivityIndicator, Dimensions } from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { apiURL, getData, storeData, webURL } from '../../utils/localStorage';
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

export default function Artikel({ navigation, route }) {

    const isFocused = useIsFocused();

    const [data, setData] = useState([]);

    useEffect(() => {

        if (isFocused) {
            axios.post(apiURL + 'artikel').then(res => {
                console.log(res.data);
                setData(res.data);
            })
        }


    }, [isFocused]);


    const __renderItem = ({ item }) => {

        return (
            <TouchableOpacity onPress={() => navigation.navigate('ArtikelDetail', item)} style={{
                backgroundColor: colors.white,
                borderColor: colors.border,
                margin: 10,
                borderRadius: 10,
                overflow: 'hidden',
                elevation: 2,


            }}>
                <Image source={{
                    uri: webURL + item.cover
                }} style={{
                    width: windowWidth,
                    height: 250,
                }} />
                <View
                    style={{
                        flex: 1,
                        padding: 10,
                    }}>
                    <Text style={{ flex: 1, fontSize: windowWidth / 20, fontFamily: fonts.secondary[600] }}>{item.judul}</Text>
                    <Text style={{ flex: 1, fontSize: windowWidth / 25, fontFamily: fonts.secondary[400] }}>{moment(item.tanggal + ' ' + item.jam).local('id').format('LLLL')} WIB</Text>
                </View>



            </TouchableOpacity >
        )

    }

    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: colors.zavalabs,
        }}>

            <FlatList showsVerticalScrollIndicator={false} data={data} renderItem={__renderItem} />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})