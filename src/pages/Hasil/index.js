import { Alert, StyleSheet, Text, View, Image, FlatList, ActivityIndicator, Dimensions } from 'react-native'
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

export default function Hasil({ navigation }) {

    const isFocused = useIsFocused();

    const [data, setData] = useState([]);

    useEffect(() => {

        if (isFocused) {
            getData('user').then(u => {
                axios.post(apiURL + 'riwayat', {
                    fid_user: u.id
                }).then(res => {
                    console.log(res.data);
                    setData(res.data);
                })
            })
        }


    }, [isFocused]);


    const __renderItem = ({ item }) => {

        return (
            <TouchableOpacity onPress={() => navigation.navigate('HasilDetail', item)} style={{

                backgroundColor: colors.white,
                borderRadius: 5,
                borderColor: colors.border,
                marginVertical: 4,
                padding: 10,
                flexDirection: 'row'
            }}>
                <View style={{
                    flex: 1,
                }}>
                    <View style={{
                        backgroundColor: colors.secondary,
                        width: 100,
                        height: 20,
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: 5,
                    }}>
                        <Text style={{ fontFamily: fonts.secondary[600], fontSize: windowWidth / 28 }}>{item.zpelayanan_kesehatan}</Text>
                    </View>
                    <View style={{

                        flexDirection: 'row'
                    }}>
                        <Text style={{ flex: 0.5, fontFamily: fonts.secondary[600], fontSize: windowWidth / 28 }}>Hari / Tanggal</Text>
                        <Text style={{ flex: 0.1, }}>:</Text>
                        <Text style={{ flex: 1, fontSize: windowWidth / 25, fontFamily: fonts.secondary[400] }}>{moment(item.tanggal + ' ' + item.jam).locale("id").format('LLLL')}</Text>
                    </View>
                    <View style={{
                        flexDirection: 'row'
                    }}>
                        <Text style={{ flex: 0.5, fontSize: windowWidth / 28, fontFamily: fonts.secondary[600] }}>Nama Lengkap</Text>
                        <Text style={{ flex: 0.1, }}>:</Text>
                        <Text style={{ flex: 1, fontSize: windowWidth / 25, fontFamily: fonts.secondary[400] }}>{item.znama_lengkap}</Text>
                    </View>
                    <View style={{
                        flexDirection: 'row'
                    }}>
                        <Text style={{ flex: 0.5, fontSize: windowWidth / 28, fontFamily: fonts.secondary[600] }}>Usia</Text>
                        <Text style={{ flex: 0.1, }}>:</Text>
                        <Text style={{ flex: 1, fontSize: windowWidth / 25, fontFamily: fonts.secondary[400] }}>{item.zusia} Tahun</Text>
                    </View>
                    <View style={{
                        flexDirection: 'row'
                    }}>
                        <Text style={{ flex: 0.5, fontSize: windowWidth / 28, fontFamily: fonts.secondary[600] }}>Tekanan Darah</Text>
                        <Text style={{ flex: 0.1, }}>:</Text>
                        <Text style={{ flex: 1, fontSize: windowWidth / 25, fontFamily: fonts.secondary[400] }}>{item.ztekanan_darah}</Text>
                    </View>

                </View>

                <View style={{
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <Icon type='ionicon' name='chevron-forward' color={colors.primary} />
                </View>
            </TouchableOpacity >
        )

    }

    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: colors.zavalabs,
            padding: 10,
        }}>
            <FlatList showsVerticalScrollIndicator={false} data={data} renderItem={__renderItem} />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})