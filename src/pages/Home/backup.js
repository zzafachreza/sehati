import { Alert, StyleSheet, Text, View, Image, FlatList, ActivityIndicator, Dimensions } from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { apiURL, getData, MYAPP, storeData } from '../../utils/localStorage';
import { colors, fonts, windowHeight, windowWidth } from '../../utils';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { showMessage } from 'react-native-flash-message';
import Sound from 'react-native-sound';
import { Icon } from 'react-native-elements/dist/icons/Icon';
import { MyButton, MyGap, MyInput } from '../../components';
import { useIsFocused } from '@react-navigation/native';
import axios from 'axios';
import { FloatingAction } from "react-native-floating-action";
import 'intl';
import 'intl/locale-data/jsonp/en';
import Carousel, { ParallaxImage, Pagination } from 'react-native-snap-carousel';
import { SliderBox } from "react-native-image-slider-box";
import { ImageBackground } from 'react-native';


export default function Home({ navigation }) {


    const [ENTRIES, SETENTITIES] = useState([]);
    const [user, setUser] = useState({});
    const isFocused = useIsFocused();
    useEffect(() => {

        __getTransaction();
        if (isFocused) {
            axios.post(apiURL + 'slider').then(res => {
                console.log(res.data)
                SETENTITIES(res.data);
            })
        }

    }, [isFocused]);

    const __getTransaction = () => {
        getData('user').then(res => {
            setUser(res);
        })



    }


    const [entries, setEntries] = useState([]);
    const carouselRef = useRef(null);

    const goForward = () => {
        carouselRef.current.snapToNext();
    };



    const MyMenu = ({ img, judul, onPress, desc }) => {
        return (
            <TouchableOpacity onPress={onPress} style={{
                width: windowWidth / 3.5,
            }} >
                <View style={{
                    width: windowWidth / 3.5,
                    borderWidth: 0,
                    borderColor: colors.primary,
                    backgroundColor: colors.primary,
                    height: windowHeight / 7,
                    borderRadius: 10,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    {/* <Image source={img} style={{
            width: windowHeight / 6,
            height: windowHeight / 10,
            resizeMode: 'contain'
          }} /> */}
                    <Icon type='ionicon' name={img} color={colors.white} size={windowWidth / 7} />
                </View>
                <Text style={{
                    marginTop: 5,
                    fontFamily: fonts.secondary[600],
                    color: colors.black,
                    fontSize: windowWidth / 25,
                    textAlign: 'center'

                }}>{judul}</Text>
            </TouchableOpacity>
        )
    }


    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: colors.white,
        }}>
            {/* header */}
            <View style={{
                backgroundColor: colors.primary,
                paddingHorizontal: 10,
                paddingVertical: 10,
            }}>

                <View style={{
                    flexDirection: 'row',
                }}>
                    <View style={{
                        flex: 1,
                    }}>
                        <Text style={{
                            fontFamily: fonts.secondary[400],
                            fontSize: windowWidth / 20,
                            color: colors.white
                        }}>Selamat datang</Text>
                        <Text style={{
                            fontFamily: fonts.secondary[600],
                            fontSize: windowWidth / 20,
                            color: colors.white
                        }}>{MYAPP}</Text>
                    </View>


                </View>


            </View>
            <SliderBox
                images={ENTRIES}
                sliderBoxHeight={240}
                onCurrentImagePressed={index => console.warn(`image ${index} pressed`)}
                dotColor={colors.white}
                inactiveDotColor="#90A4AE"
            />

            <ImageBackground
                source={require('../../assets/home.png')}
                style={{
                    flex: 1,
                    padding: 10,
                }}>
                <View style={{
                    marginVertical: 10,
                    flexDirection: 'row',
                    padding: 10,
                    justifyContent: 'space-around'
                }}>
                    <MyMenu onPress={() => {

                        getData('user').then(res => {
                            if (!res) {
                                navigation.navigate('Login')
                            } else {
                                navigation.navigate('Skrining', res)
                            }
                        })

                    }} img="shield-checkmark" judul="Skrining" />
                    <MyMenu onPress={() => navigation.navigate('Hasil')} img="receipt" judul="Hasil Skrining" />
                    <MyMenu onPress={() => navigation.navigate('Edukasi')} img="fitness" judul="Edukasi Kesehatan" />
                </View>

                <View style={{
                    marginVertical: 5,
                    flexDirection: 'row',
                    padding: 10,
                    justifyContent: 'space-around'
                }}>
                    <MyMenu onPress={() => navigation.navigate('Alarm')} img="alarm-outline" judul="Alarm" />
                    <MyMenu onPress={() => navigation.navigate('Konsultasi')} img="logo-whatsapp" judul="Konsultasi" />
                    <MyMenu onPress={() => navigation.navigate('GetStarted')} img="information-circle-outline" judul="Tentang" />
                </View>

            </ImageBackground>



        </SafeAreaView >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    item: {
        width: windowHeight,
        height: windowWidth / 2,
    },
    imageContainer: {
        flex: 1,
        marginBottom: 1, // Prevent a random Android rendering issue
        backgroundColor: 'white',
        borderRadius: 8,
    },
    image: {
        ...StyleSheet.absoluteFillObject,
        resizeMode: 'cover',
    },
});