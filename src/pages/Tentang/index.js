import { StyleSheet, Text, View, SafeAreaView, BackHandler } from 'react-native'
import React from 'react'
import { colors, fonts, windowWidth } from '../../utils'
import { Icon } from 'react-native-elements'
import RenderHtml from 'react-native-render-html';
import { MyButton } from '../../components';
import { ImageBackground } from 'react-native';
import { storeData } from '../../utils/localStorage';
export default function Tentang({ navigation }) {
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

                }}>SEHATI-SW</Text>
                <Text style={{
                    fontFamily: fonts.primary[400],
                    fontSize: windowWidth / 20,

                }}>Sehat Makin Nikmat Untuk Lansia</Text>
            </View>
            <View style={{
                paddingTop: 10,
                flex: 1,
            }}>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                }}>
                    <Icon type='ionicon' name='fitness' size={windowWidth / 15} color={colors.primary} />
                    <Text style={{
                        left: 5,
                        fontFamily: fonts.secondary[800],
                        fontSize: windowWidth / 15,

                    }}>Tentang</Text>
                </View>


                <Text style={{
                    marginTop: 10,
                    marginHorizontal: 20,
                    fontFamily: fonts.primary[400],
                    fontSize: windowWidth / 17,
                    textAlign: 'justify'
                }}><Text style={{
                    fontFamily: fonts.primary[800],
                }}>Sehati</Text> adalah aplikasi yang mengoptimalkan edukasi mengenai Gangguan Pola Tidur pada Lansia Hipertensi dengan tampilan yang mudah digunakan dan informasi yang akurat, kita dapat membantu masyarakat dalam memahami dan mengatasi masalah ini.</Text>
                <Text style={{
                    marginTop: 10,
                    marginHorizontal: 20,
                    fontFamily: fonts.primary[400],
                    fontSize: windowWidth / 17,
                    textAlign: 'justify'
                }}>Aplikasi ini membawa solusi baru dalam memerangi Gangguan Pola Tidur pada Lansia Hipertensi dan memastikan bahwa setiap orang memiliki akses yang sama untuk informasi yang berkualitas.</Text>

            </View>

            <MyButton title="Logout" warna={colors.black} onPress={() => {

                storeData('user', null);
                navigation.replace('Home');

            }} />

        </ImageBackground>
    )
}

const styles = StyleSheet.create({})