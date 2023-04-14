import { StyleSheet, Text, View, SafeAreaView } from 'react-native'
import React from 'react'
import { colors, fonts, windowWidth } from '../../utils'
import { Icon } from 'react-native-elements'
import RenderHtml from 'react-native-render-html';
import { MyButton } from '../../components';
import { ImageBackground } from 'react-native';
export default function GetStarted({ navigation }) {
    return (
        <ImageBackground
            source={require('../../assets/get.png')}
            style={{
                flex: 1,
                padding: 10,
            }}>
            <View style={{
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <Text style={{
                    fontFamily: fonts.secondary[800],
                    fontSize: windowWidth / 10,

                }}>SEHATI-WH</Text>
                <Text style={{
                    fontFamily: fonts.primary[400],
                    fontSize: windowWidth / 20,

                }}>Sehat Makin Nikmat Untuk Lansia</Text>
            </View>
            <View style={{
                paddingTop: 10,
                flex: 1,
            }}>





                <Text style={{
                    marginTop: 10,
                    marginHorizontal: 20,
                    fontFamily: fonts.primary[400],
                    fontSize: windowWidth / 18,
                    textAlign: 'justify'
                }}>“Hal yang paling menyenangkan di tengah masa sulit adalah kesehatan yang baik dan tidur yang cukup.”  {'\n'} – <Text style={{ fontFamily: fonts.secondary[800] }}>Knute Nelson</Text>

                </Text>


                <Text style={{
                    marginTop: 10,
                    marginHorizontal: 20,
                    fontFamily: fonts.primary[400],
                    fontSize: windowWidth / 18,
                    textAlign: 'justify'
                }}>“Untuk menikmati cahaya kesehatan yang baik, Anda harus berolahraga.”  {'\n'} – <Text style={{ fontFamily: fonts.secondary[800] }}>Gene Tunney</Text>

                </Text>

                <Text style={{
                    marginTop: 10,
                    marginHorizontal: 20,
                    fontFamily: fonts.primary[400],
                    fontSize: windowWidth / 18,
                    textAlign: 'justify'
                }}>“Kesehatan adalah renungan yang pertama dan tidur adalah syarat untuk mendapatkannya”   {'\n'} –
                    <Text style={{ fontFamily: fonts.secondary[800] }}>Waldo Emerson</Text>
                </Text>

            </View>
            <View>
                <MyButton onPress={() => navigation.navigate('Home')} title="Selanjutnya" warna={colors.primary} Icons="fitness" />
            </View>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({})