import React, { useState } from 'react';
import { StyleSheet, Dimensions, View, TouchableOpacity, Text, Image, ScrollView } from 'react-native';
import Pdf from 'react-native-pdf';
import { colors, fonts, windowHeight, windowWidth } from '../../utils';
import { webURL, wenURL } from '../../utils/localStorage';
import RenderHtml from 'react-native-render-html';



export default function ArtikelDetail({ navigation, route }) {

    const item = route.params;







    return (
        <View style={styles.container}>


            <ScrollView style={{
                flex: 1,
            }}>
                <Image style={{
                    width: windowWidth,
                    height: 250,
                }} source={{
                    uri: webURL + item.cover
                }} />
                <Text style={{
                    fontFamily: fonts.secondary[600],
                    fontSize: windowWidth / 20,
                    color: colors.black,
                    margin: 10,
                }}>{item.judul}</Text>
                <View style={{
                    margin: 10,
                }}>
                    <RenderHtml
                        contentWidth={windowWidth}
                        source={{
                            html: item.isi
                        }}
                    />
                </View>

            </ScrollView>


        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    pdf: {
        flex: 1,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    }
});