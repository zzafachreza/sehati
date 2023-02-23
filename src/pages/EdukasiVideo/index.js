import { StyleSheet, Text, View, SafeAreaView } from 'react-native'
import React from 'react'
import YoutubePlayer from "react-native-youtube-iframe";
import { colors } from 'react-native-elements';
export default function EdukasiVideo() {
    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: colors.white
        }}>
            <YoutubePlayer
                height={300}
                play={true}
                videoId={"OpRjjJAFhIE"}
            // onChangeState={onStateChange}
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})