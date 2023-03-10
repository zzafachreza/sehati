import { Alert, ImageBackground, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { createAlarm } from 'react-native-simple-alarm';
import moment from 'moment'
import { colors, fonts, windowWidth } from '../../utils';
import { MyButton, MyGap, MyInput } from '../../components';
import ReactNativeAN from 'react-native-alarm-notification';
import PushNotification, { Importance } from 'react-native-push-notification';
import DatePicker from 'react-native-datepicker'
import 'moment/locale/id'
import { Icon } from 'react-native-elements';
import { maskJs, maskCurrency } from 'mask-js';
import { MYAPP } from '../../utils/localStorage';
export default function Alarm() {

    const [waktu, setWaktu] = useState({
        tanggal: moment().format('YYYY-MM-DD'),
        jam: moment().format('HH:mm')
    })

    const [waktu2, setWaktu2] = useState({
        tanggal: moment().format('YYYY-MM-DD'),
        jam: moment().format('HH:mm')
    })

    const createAlarm = async () => {


        Alert.alert(MYAPP, `Apakah kamu yakin akan atur alarm 1 pukul ${waktu.jam} dan alarm 2 pukul ${waktu2.jam} ?`, [
            {
                text: 'BATAL'
            },
            {
                text: 'SIMPAN',
                onPress: () => {
                    console.log('waktu 1', moment(waktu.tanggal + ' ' + waktu.jam).toISOString());
                    console.log('waktu 2', moment(waktu2.tanggal + ' ' + waktu2.jam).toISOString());

                    PushNotification.localNotificationSchedule({
                        id: '1',
                        channelId: 'sehati', // (required) channelId, if the channel doesn't exist, notification will not trigger.
                        title: 'SEHATI', // (optional)
                        message: 'Waktu istirahat, silahkan tidur', // (required)
                        //... You can use all the options from localNotifications
                        date: moment(waktu.tanggal + ' ' + waktu.jam).toISOString(), // in 60 secs
                        allowWhileIdle: false, // (optional) set notification to work while on doze, default: false
                        /* Android Only Properties */
                        playSound: true, // (optional) default: true
                        soundName: "default", // (optional) See `soundName` parameter of `localNotification` function
                        importance: Importance.HIGH, // (optional) default: Importance.HIGH. Int value of the Android notification importance
                        vibrate: true,
                        repeatType: "day",

                        repeatTime: 86400 * 1000,
                        date: new Date(Date.now() + 86400 * 1000)
                    });


                    PushNotification.localNotificationSchedule({
                        id: '2',
                        channelId: 'sehati', // (required) channelId, if the channel doesn't exist, notification will not trigger.
                        title: 'SEHATI', // (optional)
                        message: 'Waktu bangun, silahkan beraktifitas', // (required)
                        //... You can use all the options from localNotifications
                        date: moment(waktu2.tanggal + ' ' + waktu2.jam).toISOString(), // in 60 secs
                        allowWhileIdle: false, // (optional) set notification to work while on doze, default: false
                        /* Android Only Properties */
                        playSound: true, // (optional) default: true
                        soundName: "default", // (optional) See `soundName` parameter of `localNotification` function
                        importance: Importance.HIGH, // (optional) default: Importance.HIGH. Int value of the Android notification importance
                        vibrate: true,
                        repeatType: "day",
                        repeatTime: 86400 * 1000,
                        date: new Date(Date.now() + 86400 * 1000)
                    });
                }
            }
        ]);









    }

    const [kondisi, setKondisi] = useState(false)

    useEffect(() => {
        if (moment().format('H') >= 19) {
            setKondisi(false)
        } else if (moment().format('H') >= 5 && moment().format('H') < 19) {
            setKondisi(true)
        }
    }, [])




    const deleteAllAlarms = () => {
        PushNotification.cancelAllLocalNotifications()
    }

    return (
        <ImageBackground source={kondisi ? require('../../assets/siang.png') : require('../../assets/malam.png')} style={{
            flex: 1,
            backgroundColor: colors.white,
            padding: 10,
        }}>
            {/* alarm 1 */}
            <View style={{
                marginTop: 10,
                backgroundColor: colors.secondary,
                padding: 10,
            }}>
                <Text style={{
                    textAlign: 'center',
                    fontFamily: fonts.primary[600],
                    fontSize: 20
                }}>Alarm 1</Text>
            </View>
            <View style={{
                flexDirection: 'row',
                backgroundColor: colors.white,
                padding: 10,
            }}>

                <View style={{
                    flex: 1.5,
                    paddingRight: 5,
                }}>
                    <View
                        style={{

                            flexDirection: 'row',
                            alignItems: 'center',
                            paddingVertical: 5,
                            marginBottom: 3,
                        }}>
                        <Icon type="ionicon" name="calendar-outline" color={colors.primary} size={16} />
                        <Text
                            style={{
                                fontFamily: fonts.secondary[600],
                                color: colors.primary,
                                left: 10,
                                fontSize: windowWidth / 28,
                            }}>
                            Tanggal Mulai
                        </Text>
                    </View>
                    <DatePicker
                        style={{ width: '100%' }}
                        mode="date"
                        date={waktu.tanggal}
                        placeholder="select date"
                        confirmBtnText="Confirm"
                        cancelBtnText="Cancel"
                        format='YYYY-MM-DD'
                        customStyles={{
                            dateIcon: {
                                position: 'absolute',
                                left: 0,
                                top: 4,
                                marginLeft: 0
                            },
                            dateInput: {
                                borderWidth: 0,
                                backgroundColor: colors.zavalabs,
                                borderColor: colors.primary,
                                borderRadius: 10,
                                // borderWidth: 1,
                                height: 48,
                                paddingLeft: 10,
                                color: colors.black,
                                fontSize: windowWidth / 25,
                                fontFamily: fonts.primary[400],
                            }
                            // ... You can check the source to find the other keys.
                        }}
                        onDateChange={x => setWaktu({
                            ...waktu,
                            tanggal: x
                        })}
                    />
                </View>
                <View style={{
                    flex: 1,
                    paddingLeft: 5,
                }}>

                    <MyInput keyboardType='number-pad' maxLength={5} onChangeText={x => {
                        setWaktu({
                            ...waktu,
                            jam: maskJs('99:99', x)
                        })
                    }} value={waktu.jam} iconname="alarm-outline" label="Jam" />
                </View>
            </View>
            {/* alarm 2 */}
            <View style={{
                marginTop: 10,
                backgroundColor: colors.black,
                padding: 10,
            }}>
                <Text style={{
                    textAlign: 'center',
                    fontFamily: fonts.primary[600],
                    fontSize: 20,
                    color: colors.white
                }}>Alarm 2</Text>
            </View>
            <View style={{
                flexDirection: 'row',
                backgroundColor: colors.white,
                padding: 10,
            }}>

                <View style={{
                    flex: 1.5,
                    paddingRight: 5,
                }}>
                    <View
                        style={{

                            flexDirection: 'row',
                            alignItems: 'center',
                            paddingVertical: 5,
                            marginBottom: 3,
                        }}>
                        <Icon type="ionicon" name="calendar-outline" color={colors.primary} size={16} />
                        <Text
                            style={{
                                fontFamily: fonts.secondary[600],
                                color: colors.primary,
                                left: 10,
                                fontSize: windowWidth / 28,
                            }}>
                            Tanggal Mulai
                        </Text>
                    </View>
                    <DatePicker
                        style={{ width: '100%' }}
                        mode="date"
                        date={waktu2.tanggal}
                        placeholder="select date"
                        confirmBtnText="Confirm"
                        cancelBtnText="Cancel"
                        format='YYYY-MM-DD'
                        customStyles={{
                            dateIcon: {
                                position: 'absolute',
                                left: 0,
                                top: 4,
                                marginLeft: 0
                            },
                            dateInput: {
                                borderWidth: 0,
                                backgroundColor: colors.zavalabs,
                                borderColor: colors.primary,
                                borderRadius: 10,
                                // borderWidth: 1,
                                height: 48,
                                paddingLeft: 10,
                                color: colors.black,
                                fontSize: windowWidth / 25,
                                fontFamily: fonts.primary[400],
                            }
                            // ... You can check the source to find the other keys.
                        }}
                        onDateChange={x => setWaktu2({
                            ...waktu2,
                            tanggal: x
                        })}
                    />
                </View>
                <View style={{
                    flex: 1,
                    paddingLeft: 5,
                }}>

                    <MyInput keyboardType='number-pad' maxLength={5} onChangeText={x => {
                        setWaktu2({
                            ...waktu,
                            jam: maskJs('99:99', x)
                        })
                    }} value={waktu2.jam} iconname="alarm-outline" label="Jam" />
                </View>
            </View>
            <MyGap jarak={10} />

            <MyGap jarak={10} />
            <View style={{
                flex: 1,
                justifyContent: 'center'
            }}>

                <View style={{
                    flexDirection: 'row',
                }}>
                    <View style={{
                        flex: 1,
                        backgroundColor: colors.secondary,
                        paddingRight: 5,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <Text style={{
                            fontFamily: fonts.primary[600],
                            color: colors.black
                        }}>Alarm 1</Text>
                        <Text style={{
                            fontFamily: fonts.primary[600],
                            color: colors.black
                        }}>{moment(waktu.tanggal).locale("id").format('LL')} Pukul {waktu.jam}</Text>
                    </View>
                    <View style={{
                        flex: 1,
                        paddingLeft: 5,
                        backgroundColor: colors.black,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <Text style={{
                            fontFamily: fonts.primary[600],
                            color: colors.white
                        }}>Alarm 2</Text>
                        <Text style={{
                            fontFamily: fonts.primary[600],
                            color: colors.white,
                        }}>{moment(waktu2.tanggal).locale("id").format('LL')} Pukul {waktu2.jam}</Text>
                    </View>
                </View>

            </View>
            <MyGap jarak={10} />
            <View style={{
                flexDirection: 'row'
            }}>
                <View style={{
                    flex: 1,
                    paddingRight: 5,
                }}>
                    <MyButton Icons="refresh" title="Reset Alarm" warna={kondisi ? colors.black : colors.primary} onPress={deleteAllAlarms} />
                </View>
                <View style={{
                    flex: 1,
                    paddingLeft: 5,
                }}>
                    <MyButton Icons="alarm" title="Atur Alarm" warna={kondisi ? colors.black : colors.primary} onPress={createAlarm} />
                </View>
            </View>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({})