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


export default function Skrining({ navigation, route }) {

    const [kirim, setKirim] = useState({
        pelayanan_kesehatan: 'Puskesmas',
        nama_lengkap: '',
        usia: '',
        jenis_kelamin: 'Laki-laki',
        alamat: '',
        tanggal_pemeriksaan: '',
        tekanan_darah: '',
        1: '',
        2: '',
        3: '',
        4: '',
        a5: 0,
        b5: 0,
        c5: 0,
        d5: 0,
        e5: 0,
        f5: 0,
        g5: 0,
        h5: 0,
        i5: 0,
        j5: 0,
        [6]: 0,
        [7]: 0,
        [8]: 0,
        [9]: 0,
        fid_user: route.params.id
    });


    const sendServer = () => {

        if (kirim.nama_lengkap.length == 0) {
            showMessage({
                type: 'danger',
                message: 'Nama Lengkap harus di isi'
            })
        } else if (kirim.usia.length == 0) {
            showMessage({
                type: 'danger',
                message: 'Usia harus di isi'
            })
        } else if (kirim.tanggal_pemeriksaan.length == 0) {
            showMessage({
                type: 'danger',
                message: 'tanggal pemeriksaan harus di isi'
            })
        } else if (kirim.tekanan_darah.length == 0) {
            showMessage({
                type: 'danger',
                message: 'tekanan darah harus di isi'
            })
        } else {
            console.log(kirim);
            axios.post(apiURL + 'add_skrining', kirim).then(res => {
                console.log(res.data);
                navigation.goBack();
                Alert.alert(MYAPP, "Terima kasih, Berhasil melakukan skrining pasien " + kirim.nama_lengkap)
            })
        }


    }

    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: colors.white,
            padding: 10,
        }}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <MyPicker onValueChange={x => setKirim({
                    ...kirim,
                    pelayanan_kesehatan: x
                })} label="Pelayanan Kesehatan Terdekat" iconname="fitness" data={[
                    { label: 'Puskesmas', value: 'Puskesmas' },
                    { label: 'Rumah Sakit', value: 'Rumah Sakit' },
                    { label: 'Klinik', value: 'Klinik' },
                    { label: 'Praktek Dokter', value: 'Praktek Dokter' },
                ]} />
                <MyGap jarak={10} />
                <Text style={{
                    fontFamily: fonts.secondary[600],
                    fontSize: windowWidth / 25
                }}>Pemantauan Tekanan Darah</Text>
                <MyGap jarak={10} />
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ flex: 1, paddingRight: 5 }}>
                        <MyInput onChangeText={x => setKirim({
                            ...kirim,
                            nama_lengkap: x
                        })} label="Nama Lengkap" iconname="person" placeholder="Masukan nama lengkap" />
                    </View>
                    <View style={{ flex: 1, paddingLeft: 5 }}>
                        <MyInput onChangeText={x => setKirim({
                            ...kirim,
                            usia: x
                        })} label="Usia (Tahun)" maxLength={3} iconname="aperture" placeholder="Masukan usia" keyboardType='number-pad' />
                    </View>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ flex: 1, paddingRight: 5 }}>
                        <MyPicker onValueChange={x => setKirim({
                            ...kirim,
                            jenis_kelamin: x
                        })} label="Jenis Kelamin" iconname="fitness" data={[
                            { label: 'Laki-laki', value: 'Laki-laki' },
                            { label: 'Perempuan', value: 'Perempuan' },

                        ]} />
                    </View>
                    <View style={{ flex: 1, paddingLeft: 5 }}>
                        <MyInput onChangeText={x => setKirim({
                            ...kirim,
                            alamat: x
                        })} label="Alamat" multiline iconname="location" placeholder="Masukan alamat" />
                    </View>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ flex: 1, paddingRight: 5 }}>
                        <MyInput value={kirim.tanggal_pemeriksaan} onChangeText={x => setKirim({
                            ...kirim,
                            tanggal_pemeriksaan: maskJs('99/99/9999', x)
                        })} label="Tanggal Pemeriksaan" keyboardType='number-pad' maxLength={10} iconname="calendar" placeholder="cth : 19/05/2022" />
                    </View>
                    <View style={{ flex: 1, paddingLeft: 5 }}>
                        <MyInput value={kirim.tekanan_darah} onChangeText={x => setKirim({
                            ...kirim,
                            tekanan_darah: x
                        })} label="Tekanan Darah" maxLength={7} iconname="body" placeholder="cth : 80/100" />
                    </View>
                </View>
                <MyGap jarak={10} />
                <Text style={{
                    fontFamily: fonts.secondary[600],
                    fontSize: windowWidth / 25
                }}>Kuesioner Kualitas Tidur</Text>
                <Text style={{
                    fontFamily: fonts.secondary[200],
                    fontSize: windowWidth / 25
                }}>Pittsburgh Sleep Quality Index (PSQI)</Text>
                <MyGap jarak={10} />

                <MyInput onChangeText={x => setKirim({
                    ...kirim,
                    [1]: x
                })} label="1. Pukul berapa biasanya Anda mulai tidur malam? ( 0 - 24 )" iconname="alarm" maxLength={2} keyboardType="number-pad" placeholder="masukan pukul cth: 23" />

                <MyPicker onValueChange={x => {
                    setKirim({
                        ...kirim,
                        [2]: x
                    })
                }} label="2. Berapa lama Anda biasanya baru bisa tertidur tiap malam?" iconname="bed" data={[
                    { label: '≤15 menit', value: 0 },
                    { label: '16-30 menit', value: 1 },
                    { label: '31-60 menit', value: 2 },
                    { label: '>60 menit', value: 3 },

                ]} />
                <MyInput onChangeText={x => setKirim({
                    ...kirim,
                    [3]: x
                })} label="3. Pukul berapa Anda biasanya bangun pagi? ( 0 - 24 )" iconname="alarm" maxLength={2} keyboardType="number-pad" placeholder="masukan pukul cth: 5" />


                <MyInput onChangeText={x => setKirim({
                    ...kirim,
                    [4]: x
                })} label="4. Berapa lama Anda tidur di malam hari ? ( berapa jam )" iconname="alarm" maxLength={2} keyboardType="number-pad" placeholder="masukan jam cth: 8" />

                <Text style={{
                    marginTop: 10,
                    fontFamily: fonts.secondary[600],
                    color: colors.black,
                    fontSize: windowWidth / 28,
                }}>5. Seberapa sering masalah-masalah di bawah ini mengganggu tidur Anda?</Text>
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ flex: 1, paddingRight: 5 }}>
                        <MyPicker iconshow={false} onValueChange={x => {
                            setKirim({
                                ...kirim,
                                a5: x
                            })
                        }} label="a. Tidak mampu tertidur selama 30 menit sejak berbaring" iconname="bed" data={[
                            { label: 'Tidak pernah', value: 0 },
                            { label: '1x seminggu', value: 1 },
                            { label: '2x seminggu', value: 2 },
                            { label: '>3x seminggu', value: 3 },

                        ]} />
                    </View>
                    <View style={{ flex: 1, paddingLeft: 5 }}>
                        <MyPicker iconshow={false} onValueChange={x => {
                            setKirim({
                                ...kirim,
                                b5: x
                            })
                        }} label="b. Terbangun di tengah malam atau dini hari" iconname="bed" data={[
                            { label: 'Tidak pernah', value: 0 },
                            { label: '1x seminggu', value: 1 },
                            { label: '2x seminggu', value: 2 },
                            { label: '>3x seminggu', value: 3 },

                        ]} />
                    </View>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ flex: 1, paddingRight: 5 }}>
                        <MyPicker iconshow={false} onValueChange={x => {
                            setKirim({
                                ...kirim,
                                c5: x
                            })
                        }} label="c. Terbangun untuk ke kamar mandi" iconname="bed" data={[
                            { label: 'Tidak pernah', value: 0 },
                            { label: '1x seminggu', value: 1 },
                            { label: '2x seminggu', value: 2 },
                            { label: '>3x seminggu', value: 3 },

                        ]} />
                    </View>
                    <View style={{ flex: 1, paddingLeft: 5 }}>
                        <MyPicker iconshow={false} onValueChange={x => {
                            setKirim({
                                ...kirim,
                                d5: x
                            })
                        }} label="d. Sulit bernafas dengan baik" iconname="bed" data={[
                            { label: 'Tidak pernah', value: 0 },
                            { label: '1x seminggu', value: 1 },
                            { label: '2x seminggu', value: 2 },
                            { label: '>3x seminggu', value: 3 },

                        ]} />
                    </View>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ flex: 1, paddingRight: 5 }}>
                        <MyPicker iconshow={false} onValueChange={x => {
                            setKirim({
                                ...kirim,
                                e5: x
                            })
                        }} label="e. Batuk atau mengorok" iconname="bed" data={[
                            { label: 'Tidak pernah', value: 0 },
                            { label: '1x seminggu', value: 1 },
                            { label: '2x seminggu', value: 2 },
                            { label: '>3x seminggu', value: 3 },

                        ]} />
                    </View>
                    <View style={{ flex: 1, paddingLeft: 5 }}>
                        <MyPicker iconshow={false} onValueChange={x => {
                            setKirim({
                                ...kirim,
                                f5: x
                            })
                        }} label="f. Kedinginan di malam hari" iconname="bed" data={[
                            { label: 'Tidak pernah', value: 0 },
                            { label: '1x seminggu', value: 1 },
                            { label: '2x seminggu', value: 2 },
                            { label: '>3x seminggu', value: 3 },

                        ]} />
                    </View>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ flex: 1, paddingRight: 5 }}>
                        <MyPicker iconshow={false} onValueChange={x => {
                            setKirim({
                                ...kirim,
                                g5: x
                            })
                        }} label="g. Kepanasan di malam hari" iconname="bed" data={[
                            { label: 'Tidak pernah', value: 0 },
                            { label: '1x seminggu', value: 1 },
                            { label: '2x seminggu', value: 2 },
                            { label: '>3x seminggu', value: 3 },

                        ]} />
                    </View>
                    <View style={{ flex: 1, paddingLeft: 5 }}>
                        <MyPicker iconshow={false} onValueChange={x => {
                            setKirim({
                                ...kirim,
                                h5: x
                            })
                        }} label="h. Mimpi buruk" iconname="bed" data={[
                            { label: 'Tidak pernah', value: 0 },
                            { label: '1x seminggu', value: 1 },
                            { label: '2x seminggu', value: 2 },
                            { label: '>3x seminggu', value: 3 },

                        ]} />
                    </View>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ flex: 1, paddingRight: 5 }}>
                        <MyPicker iconshow={false} onValueChange={x => {
                            setKirim({
                                ...kirim,
                                i5: x
                            })
                        }} label="i. Terasa nyeri" iconname="bed" data={[
                            { label: 'Tidak pernah', value: 0 },
                            { label: '1x seminggu', value: 1 },
                            { label: '2x seminggu', value: 2 },
                            { label: '>3x seminggu', value: 3 },

                        ]} />
                    </View>
                    <View style={{ flex: 1, paddingLeft: 5 }}>
                        <MyPicker iconshow={false} onValueChange={x => {
                            setKirim({
                                ...kirim,
                                j5: x
                            })
                        }} label="j. Alasan lain" iconname="bed" data={[
                            { label: 'Tidak pernah', value: 0 },
                            { label: '1x seminggu', value: 1 },
                            { label: '2x seminggu', value: 2 },
                            { label: '>3x seminggu', value: 3 },

                        ]} />
                    </View>
                </View>
                <MyGap jarak={10} />
                <MyPicker onValueChange={x => {
                    setKirim({
                        ...kirim,
                        [6]: x
                    })
                }} label="6. Selama sebulan terakhir, seberapa sering Anda menggunakan obat tidur?" iconname="file-tray-full" data={[
                    { label: 'Tidak pernah', value: 0 },
                    { label: '1x seminggu', value: 1 },
                    { label: '2x seminggu', value: 2 },
                    { label: '>3x seminggu', value: 3 },

                ]} />
                <MyGap jarak={10} />
                <MyPicker onValueChange={x => {
                    setKirim({
                        ...kirim,
                        [7]: x
                    })
                }} label="7. Selama sebulan terakhir, seberapa sering Anda mengantuk ketika melakukan aktivitas di siang hari?" iconname="body" data={[
                    { label: 'Tidak pernah', value: 0 },
                    { label: '1x seminggu', value: 1 },
                    { label: '2x seminggu', value: 2 },
                    { label: '>3x seminggu', value: 3 },

                ]} />
                <MyGap jarak={10} />
                <MyPicker onValueChange={x => {
                    setKirim({
                        ...kirim,
                        [8]: x
                    })
                }} label="8. Selama satu bulan terakhir, berapa banyak masalah yang Anda dapatkan dan seberapa antusias Anda selesaikan permasalahan tersebut?" iconname="body" data={[
                    { label: 'Tidak antusias', value: 0 },
                    { label: 'Keci', value: 1 },
                    { label: 'Sedang', value: 2 },
                    { label: 'Besar', value: 3 },

                ]} />
                <MyGap jarak={10} />
                <MyPicker onValueChange={x => {
                    setKirim({
                        ...kirim,
                        [9]: x
                    })
                }} label="9. Selama bulan terakhir, bagaimana Anda menilai kepuasan tidur Anda?" iconname="bed" data={[
                    { label: 'Sangat Baik', value: 0 },
                    { label: 'Cukup Baik', value: 1 },
                    { label: 'Cukup Buruk', value: 2 },
                    { label: 'Sangat Buruk', value: 3 },

                ]} />
                <MyGap jarak={20} />
                <MyButton onPress={sendServer} title="Simpan Data Skiring" warna={colors.primary} Icons="save" />
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})