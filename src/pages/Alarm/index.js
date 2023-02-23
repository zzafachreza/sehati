import { ImageBackground, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { createAlarm } from 'react-native-simple-alarm';
import moment from 'moment'
import { colors, fonts } from '../../utils';
import { MyButton, MyGap } from '../../components';
import ReactNativeAN from 'react-native-alarm-notification';
import PushNotification from 'react-native-push-notification';
import DatePicker from 'react-native-modern-datepicker';
import 'moment/locale/id'

export default function Alarm() {

    const [waktu, setWaktu] = useState({
        tanggal: moment().format('YYYY-MM-DD'),
        jam: moment().format('H:mm:s')
    })

    const createAlarm = async () => {

        console.log();
        console.log(waktu);

        PushNotification.localNotificationSchedule({
            id: '1',
            channelId: 'sehati', // (required) channelId, if the channel doesn't exist, notification will not trigger.
            title: 'SEHATI', // (optional)
            message: 'Waktu istirahat, silahkan tidur', // (required)
            //... You can use all the options from localNotifications
            date: moment(waktu.tanggal + ' ' + waktu.jam).toISOString(), // in 60 secs
            allowWhileIdle: false, // (optional) set notification to work while on doze, default: false
            /* Android Only Properties */
            repeatType: "day",
            repeatTime: 86400 * 1000,
            date: new Date(Date.now() + 86400 * 1000)
        });




    }

    const [kondisi, setKondisi] = useState(false)

    useEffect(() => {
        if (moment().format('H') >= 19) {
            setKondisi(false)
        } else if (moment().format('H') >= 5 && moment().format('H') < 19) {
            setKondisi(true)
        }
    }, [])


    const getAlarms = () => {

    }

    const deleteAllAlarms = () => {
        PushNotification.cancelAllLocalNotifications()
    }

    return (
        <ImageBackground source={kondisi ? require('../../assets/siang.png') : require('../../assets/malam.png')} style={{
            flex: 1,
            backgroundColor: colors.white,
            padding: 10,
        }}>
            <DatePicker
                options={{
                    backgroundColor: 'transparent',
                    textHeaderColor: colors.white,
                    textDefaultColor: colors.white,
                    selectedTextColor: colors.black,
                    mainColor: colors.white,
                    textSecondaryColor: colors.white,
                    borderColor: 'rgba(122, 146, 165, 0.1)',
                }}
                current={moment().format('YYYY-MM-DD')}

                selected={moment().format('YYYY-MM-DD')}
                mode="datepicker"
                onTimeChange={x => {
                    setWaktu({
                        ...waktu,
                        jam: x
                    })
                }}
                onDateChange={x => {
                    setWaktu({
                        ...waktu,
                        tanggal: moment(x).format('YYYY-MM-DD')
                    })
                    console.log(moment(x).format('YYYY-MM-DD'))
                }}
                on
                minuteInterval={10}
                style={{ borderRadius: 10 }}
            />
            <MyButton title="Atur Alarm" warna={kondisi ? colors.black : colors.primary} onPress={createAlarm} />
            <MyGap jarak={10} />
            <Text style={{
                textAlign: 'center',
                fontFamily: fonts.primary[600],
                color: kondisi ? colors.black : colors.white,
            }}>{moment(waktu.tanggal + ' ' + waktu.jam).locale("id").format('LLL')}</Text>
            <MyGap jarak={10} />
            <MyButton title="Hapus Alarm" warna={kondisi ? colors.black : colors.primary} onPress={deleteAllAlarms} />
        </ImageBackground>
    )
}

const styles = StyleSheet.create({})