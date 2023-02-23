import { Alert, StyleSheet, Text, View, Image, FlatList, ActivityIndicator, Dimensions } from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { apiURL, getData, MYAPP, storeData } from '../../utils/localStorage';
import { colors, fonts, windowHeight, windowWidth } from '../../utils';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { showMessage } from 'react-native-flash-message';
import { Icon } from 'react-native-elements/dist/icons/Icon';
import { MyButton, MyGap, MyInput, MyPicker } from '../../components';
import { useIsFocused } from '@react-navigation/native';
import axios from 'axios';
import { maskJs, maskCurrency } from 'mask-js';
import moment from 'moment';
import 'moment/locale/id';
export default function HasilDetail({ route }) {
    const item = route.params;
    console.log('item', item);


    const k1 = parseFloat(item.z9);
    const k2rumus = parseInt(item.z2) + parseInt(item.z5a);
    const k2 = k2rumus == 0 ? 0 : k2rumus > 0 && k2rumus <= 2 ? 1 : k2rumus > 2 && k2rumus <= 4 ? 2 : 3;


    const k3 = parseFloat(item.z4) > 7 ? 0 : parseFloat(item.z4) > 5 && parseFloat(item.z4) <= 7 ? 1 : parseFloat(item.z4) > 4 && parseFloat(item.z4) <= 6 ? 2 : 3;


    const k4rumus = (parseFloat(item.z4) / ((24 - parseFloat(item.z1)) + parseFloat(item.z3))) * 100;
    const k4 = k4rumus > 85 ? 0 : k4rumus > 74 && k4rumus <= 84 ? 1 : k4rumus > 64 && k4rumus <= 74 ? 2 : 3;
    const k5rumus = parseInt(item.z5b) + parseInt(item.z5c) + parseInt(item.z5d) + parseInt(item.z5e) + parseInt(item.z5f) + parseInt(item.z5g) + parseInt(item.z5h) + parseInt(item.z5i) + parseInt(item.z5j);
    const k5 = k5rumus == 0 ? 0 : k5rumus > 0 && k5rumus <= 9 ? 1 : k5rumus > 9 && k5rumus <= 18 ? 2 : 3;
    const k6 = parseInt(item.z6);
    const k7 = parseInt(item.z7) + parseInt(item.z8);
    const totalK = k1 + k2 + k3 + k4 + k5 + k6 + k7;
    const indexK = totalK > 5 ? 'Buruk' : 'Baik';

    const ss = item.ztekanan_darah.split("/")[0];
    const dd = item.ztekanan_darah.split("/")[1];

    let hasil_tekanan_darah = '';

    if (ss < 120 || dd < 80) {
        hasil_tekanan_darah = 'Optiomal'
    } else if ((ss >= 120 && ss < 130) && (dd >= 80 && dd < 85)) {
        hasil_tekanan_darah = 'Normal'
    } else if ((ss >= 130 && ss < 140) && (dd >= 85 && dd < 90)) {
        hasil_tekanan_darah = 'Normal Tinggi'
    } else if ((ss >= 140 && ss < 160) && (dd >= 90 && dd < 100)) {
        hasil_tekanan_darah = 'Hipertensi Tingkat 1'
    } else if ((ss >= 160 && ss < 180) && (dd >= 100 && dd < 110)) {
        hasil_tekanan_darah = 'Hipertensi Tingkat 2'
    } else if (ss >= 180 && dd >= 100) {
        hasil_tekanan_darah = 'Hipertensi Tingkat 3'
    } else if (ss >= 140 && dd < 90) {
        hasil_tekanan_darah = 'Hipertensi Sisitolik Terisolasi'
    }

    const MyList = ({ n, l, v }) => {
        return (<View style={{
            flexDirection: 'row',
            marginVertical: 5,
            alignItems: 'center'
        }}>
            <Text style={{ fontFamily: fonts.secondary[400], marginRight: 5, fontSize: windowWidth / 25 }}>
                {n}.
            </Text>
            <Text style={{ fontFamily: fonts.secondary[400], flex: 2, fontSize: windowWidth / 25 }}>
                {l}
            </Text>
            <View style={{
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: colors.secondary,
                width: 100,
                borderRadius: 10,
                height: 30,
            }}>
                <Text style={{ fontFamily: fonts.secondary[600], flex: 1, padding: 5, fontSize: windowWidth / 25 }}>{v}</Text>
            </View>

        </View>)
    }

    const MyList2 = ({ n, l, v }) => {
        return (<View style={{
            flexDirection: 'row'
        }}>
            <Text style={{ fontFamily: fonts.secondary[400], marginRight: 5, fontSize: windowWidth / 25 }}>
                {n}.
            </Text>
            <Text style={{ fontFamily: fonts.secondary[400], flex: 1, fontSize: windowWidth / 25 }}>
                {l}
            </Text>


        </View>)
    }
    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: colors.zavalabs,
            padding: 10,
        }}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{
                    backgroundColor: colors.white,
                    padding: 10,
                    borderRadius: 10,
                }}>
                    <View style={{
                        backgroundColor: colors.secondary,
                        width: 100,
                        height: 20,
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: 5,
                    }}>
                        <Text style={{ fontFamily: fonts.secondary[600], }}>{item.zpelayanan_kesehatan}</Text>
                    </View>
                    <View style={{
                        flexDirection: 'row'
                    }}>
                        <Text style={{ flex: 0.5, fontFamily: fonts.secondary[600], fontSize: windowWidth / 25, fontSize: windowWidth / 25 }}>Hari / Tanggal</Text>
                        <Text style={{ flex: 0.1, }}>:</Text>
                        <Text style={{ flex: 1, fontFamily: fonts.secondary[400], fontSize: windowWidth / 25, }}>{moment(item.tanggal + ' ' + item.jam).locale("id").format('LLLL')}</Text>
                    </View>
                    <View style={{
                        flexDirection: 'row'
                    }}>
                        <Text style={{ flex: 0.5, fontFamily: fonts.secondary[600], fontSize: windowWidth / 25 }}>Nama Lengkap</Text>
                        <Text style={{ flex: 0.1, }}>:</Text>
                        <Text style={{ flex: 1, fontFamily: fonts.secondary[400], fontSize: windowWidth / 25, }}>{item.znama_lengkap}</Text>
                    </View>
                    <View style={{
                        flexDirection: 'row'
                    }}>
                        <Text style={{ flex: 0.5, fontFamily: fonts.secondary[600], fontSize: windowWidth / 25 }}>Usia</Text>
                        <Text style={{ flex: 0.1, }}>:</Text>
                        <Text style={{ flex: 1, fontFamily: fonts.secondary[400], fontSize: windowWidth / 25 }}>{item.zusia} Tahun</Text>
                    </View>
                    <View style={{
                        flexDirection: 'row'
                    }}>
                        <Text style={{ flex: 0.5, fontFamily: fonts.secondary[600], fontSize: windowWidth / 25 }}>Jenis Kelamin</Text>
                        <Text style={{ flex: 0.1, }}>:</Text>
                        <Text style={{ flex: 1, fontFamily: fonts.secondary[400], fontSize: windowWidth / 25, }}>{item.zjenis_kelamin}</Text>
                    </View>
                    <View style={{
                        flexDirection: 'row'
                    }}>
                        <Text style={{ flex: 0.5, fontFamily: fonts.secondary[600], fontSize: windowWidth / 25 }}>Alamat</Text>
                        <Text style={{ flex: 0.1, }}>:</Text>
                        <Text style={{ flex: 1, fontFamily: fonts.secondary[400], fontSize: windowWidth / 25, }}>{item.zalamat}</Text>
                    </View>
                    <View style={{
                        flexDirection: 'row'
                    }}>
                        <Text style={{ flex: 0.5, fontFamily: fonts.secondary[600], fontSize: windowWidth / 25 }}>Tekanan Darah</Text>
                        <Text style={{ flex: 0.1, }}>:</Text>
                        <Text style={{ flex: 1, fontFamily: fonts.secondary[400], fontSize: windowWidth / 25, }}>{item.ztekanan_darah}</Text>
                    </View>
                    <View style={{
                        flexDirection: 'row'
                    }}>
                        <Text style={{ flex: 0.5, fontFamily: fonts.secondary[600], fontSize: windowWidth / 25 }}>Skring Tekanan Darah</Text>
                        <Text style={{ flex: 0.1, }}>:</Text>
                        <Text style={{ flex: 1, fontFamily: fonts.secondary[800], color: colors.primary, fontSize: windowWidth / 22 }}>{hasil_tekanan_darah}</Text>
                    </View>
                </View>
                <View style={{
                    marginTop: 10,
                    backgroundColor: colors.white,
                    padding: 10,
                    borderRadius: 10,

                }}>
                    <Text style={{ fontFamily: fonts.secondary[600], color: colors.primary, marginVertical: 10 }}>KUESIONER KUALITAS TIDUR</Text>

                    <MyList n='1' l='Pukul berapa biasanya anda mulai tidur malam?' v={'Pukul ' + item.z1} />
                    <MyList n='2' l='Berapa lama anda biasanya baru bisa tertidur tiap malam?' v={item.z2 == 0 ? '≤15 menit' : item.z2 == 1 ? '16-30 menit' : item.z2 == 2 ? '31-60 menit' : '>60 menit'} />
                    <MyList n='3' l='Pukul berapa Anda biasanya bangun pagi?' v={'Pukul ' + item.z3} />
                    <MyList n='4' l='Berapa lama Anda tidur di malam hari?' v={item.z4 + ' Jam'} />

                    <View style={{
                        marginVertical: 10,
                        backgroundColor: colors.secondary,
                        padding: 10,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <Text style={{ fontFamily: fonts.secondary[400], color: colors.black, marginVertical: 0, fontSize: windowWidth / 25, }}>Efisiensi Tidur Rumus = Durasi Tidur : lama di tempat tidur) X 100%</Text>
                        <Text style={{ fontFamily: fonts.secondary[600], color: colors.black, marginVertical: 0, fontSize: windowWidth / 25, }}>{k4rumus.toFixed(2)}%</Text>
                    </View>
                    <MyList2 n='5' l='Seberapa sering masalah-masalah di bawah ini mengganggu tidur Anda?' />

                    <View style={{
                        padding: 10,
                    }}>
                        <MyList n='a' l='Tidak mampu tertidur selama 30 menit sejak berbaring' v={item.z5a == 0 ? 'Tidak pernah' : item.z5a == 1 ? '1x seminggu' : item.z5a == 2 ? '2x seminggu' : '>3x seminggu'} />
                        <MyList n='b' l='Terbangun di tengah malam atau dini hari' v={item.z5b == 0 ? 'Tidak pernah' : item.z5b == 1 ? '1x seminggu' : item.z5b == 2 ? '2x seminggu' : '>3x seminggu'} />
                        <MyList n='c' l='Terbangun untuk ke kamar mandi' v={item.z5c == 0 ? 'Tidak pernah' : item.z5c == 1 ? '1x seminggu' : item.z5c == 2 ? '2x seminggu' : '>3x seminggu'} />
                        <MyList n='d' l='Sulit bernafas dengan baik' v={item.z5d == 0 ? 'Tidak pernah' : item.z5d == 1 ? '1x seminggu' : item.z5d == 2 ? '2x seminggu' : '>3x seminggu'} />
                        <MyList n='e' l='Batuk atau mengorok' v={item.z5e == 0 ? 'Tidak pernah' : item.z5e == 1 ? '1x seminggu' : item.z5e == 2 ? '2x seminggu' : '>3x seminggu'} />
                        <MyList n='f' l='Kedinginan di malam hari' v={item.z5f == 0 ? 'Tidak pernah' : item.z5f == 1 ? '1x seminggu' : item.z5f == 2 ? '2x seminggu' : '>3x seminggu'} />
                        <MyList n='g' l='Kepanasan di malam hari' v={item.z5g == 0 ? 'Tidak pernah' : item.z5g == 1 ? '1x seminggu' : item.z5g == 2 ? '2x seminggu' : '>3x seminggu'} />
                        <MyList n='h' l='Mimpi buruk' v={item.z5h == 0 ? 'Tidak pernah' : item.z5h == 1 ? '1x seminggu' : item.z5h == 2 ? '2x seminggu' : '>3x seminggu'} />
                        <MyList n='i' l='Terasa nyeri' v={item.z5i == 0 ? 'Tidak pernah' : item.z5i == 1 ? '1x seminggu' : item.z5i == 2 ? '2x seminggu' : '>3x seminggu'} />
                        <MyList n='j' l='Alasan lain' v={item.z5j == 0 ? 'Tidak pernah' : item.z5j == 1 ? '1x seminggu' : item.z5j == 2 ? '2x seminggu' : '>3x seminggu'} />
                    </View>
                    <MyList n='6' l='Selama sebulan terakhir, seberapa sering Anda menggunakan obat tidur?' v={item.z6 == 0 ? 'Tidak pernah' : item.z6 == 1 ? '1x seminggu' : item.z6 == 2 ? '2x seminggu' : '>3x seminggu'} />
                    <MyList n='7' l='Selama sebulan terakhir, seberapa sering Anda mengantuk ketika melakukan aktivitas di siang hari?' v={item.z7 == 0 ? 'Tidak pernah' : item.z7 == 1 ? '1x seminggu' : item.z7 == 2 ? '2x seminggu' : '>3x seminggu'} />
                    <MyList n='8' l='Selama satu bulan terakhir, berapa banyak masalah yang Anda dapatkan dan seberapa antusias Anda selesaikan permasalahan tersebut?' v={item.z8 == 0 ? 'Tidak antusias' : item.z8 == 1 ? 'Kecil' : item.z8 == 2 ? 'Sedang' : 'Besar'} />
                    <MyList n='9' l='Selama bulan terakhir, bagaimana Anda menilai kepuasan tidur Anda?' v={item.z9 == 0 ? 'Sangat Baik' : item.z9 == 1 ? 'Cukup Baik' : item.z9 == 2 ? 'Cukup Buruk' : 'Sangat Buruk'} />
                </View>

                <View style={{
                    marginTop: 10,
                    padding: 10,
                    backgroundColor: colors.white
                }}>
                    <View style={{
                        flexDirection: 'row'
                    }}>
                        <Text style={{ flex: 0.1, }}>1. </Text>
                        <Text style={{ flex: 1, fontFamily: fonts.secondary[600] }}>kualitas Tidur Subyektif</Text>
                        <Text style={{ fontFamily: fonts.secondary[400] }}>{k1}</Text>
                    </View>
                    <View style={{
                        flexDirection: 'row'
                    }}>
                        <Text style={{ flex: 0.1, }}>2. </Text>
                        <Text style={{ flex: 1, fontFamily: fonts.secondary[600] }}>Latensi Tidur</Text>
                        <Text style={{ fontFamily: fonts.secondary[400] }}>{k2}</Text>
                    </View>


                    <View style={{
                        flexDirection: 'row'
                    }}>
                        <Text style={{ flex: 0.1, }}>3. </Text>
                        <Text style={{ flex: 1, fontFamily: fonts.secondary[600] }}>Durasi Tidur</Text>
                        <Text style={{ fontFamily: fonts.secondary[400] }}>{k3}</Text>
                    </View>

                    <View style={{
                        flexDirection: 'row'
                    }}>
                        <Text style={{ flex: 0.1, }}>4. </Text>
                        <Text style={{ flex: 1, fontFamily: fonts.secondary[600] }}>Efisiensi Tidur</Text>
                        <Text style={{ fontFamily: fonts.secondary[400] }}>{k4}</Text>
                    </View>
                    <View style={{
                        flexDirection: 'row'
                    }}>
                        <Text style={{ flex: 0.1, }}>5. </Text>
                        <Text style={{ flex: 1, fontFamily: fonts.secondary[600] }}>Gangguan Tidur</Text>
                        <Text style={{ fontFamily: fonts.secondary[400] }}>{k5}</Text>
                    </View>
                    <View style={{
                        flexDirection: 'row'
                    }}>
                        <Text style={{ flex: 0.1, }}>6. </Text>
                        <Text style={{ flex: 1, fontFamily: fonts.secondary[600] }}>Penggunaan Obat</Text>
                        <Text style={{ fontFamily: fonts.secondary[400] }}>{k6}</Text>
                    </View>
                    <View style={{
                        flexDirection: 'row'
                    }}>
                        <Text style={{ flex: 0.1, }}>7. </Text>
                        <Text style={{ flex: 1, fontFamily: fonts.secondary[600] }}>Disfungsi di siang hari</Text>
                        <Text style={{ fontFamily: fonts.secondary[400] }}>{k7}</Text>
                    </View>
                    <MyGap jarak={10} />
                    <View style={{
                        flexDirection: 'row'
                    }}>
                        <Text style={{ flex: 0.1, }}></Text>
                        <Text style={{ flex: 1, fontFamily: fonts.secondary[600], fontSize: 20 }}>Skor Akhir</Text>
                        <Text style={{ fontFamily: fonts.secondary[600], fontSize: 20 }}>{totalK}</Text>
                    </View>
                    <View style={{
                        flexDirection: 'row'
                    }}>
                        <Text style={{ flex: 0.1, }}></Text>
                        <Text style={{ flex: 1, fontFamily: fonts.secondary[600], fontSize: 20 }}>Hasil Ukur</Text>
                        <Text style={{ fontFamily: fonts.secondary[600], fontSize: 20 }}>{indexK}</Text>
                    </View>
                </View>

            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})