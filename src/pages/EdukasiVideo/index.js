import { StyleSheet, Text, View, SafeAreaView } from 'react-native'
import React, { useEffect, useState } from 'react'
import YoutubePlayer from "react-native-youtube-iframe";
import { colors } from 'react-native-elements';
import axios from 'axios';
import { apiURL } from '../../utils/localStorage';
export default function EdukasiVideo() {

    const [comp, setComp] = useState('');
    const [open, setOpen] = useState(false)
    useEffect(() => {
        axios.post(apiURL + 'company').then(res => {
            console.log(res.data.data.website);
            setComp(res.data.data.website.toString());
            // alert(res.data.data.website)
            setOpen(true)
        })
    }, [])

    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: colors.white
        }}>
            {open && <YoutubePlayer
                height={300}
                play={true}
                videoId={"" + comp + ""}
            // onChangeState={onStateChange}
            />}

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})