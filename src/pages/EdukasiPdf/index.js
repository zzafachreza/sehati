import React, { useState } from 'react';
import { StyleSheet, Dimensions, View, TouchableOpacity, Text, Image, ScrollView } from 'react-native';
import Pdf from 'react-native-pdf';
import { colors, fonts, windowHeight, windowWidth } from '../../utils';
import { webURL, wenURL } from '../../utils/localStorage';




export default function EdukasiPdf({ navigation, route }) {

    const item = route.params;







    return (
        <View style={styles.container}>

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
                    fontSize: windowWidth / 20,
                    color: colors.white
                }}>{item.judul}</Text>
            </View>

            <ScrollView style={{
                flex: 1,
            }}>

                <Text style={{
                    fontFamily: fonts.secondary[400],
                    fontSize: windowWidth / 20,
                    color: colors.black,
                    margin: 10,
                }}>{item.keterangan}</Text>
                <Image style={{
                    width: windowWidth,
                    height: windowHeight,
                    resizeMode: 'contain'
                }} source={{
                    uri: webURL + item.foto_edukasi
                }} />
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