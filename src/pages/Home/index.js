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
import { color } from 'react-native-elements/dist/helpers';


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
    <ImageBackground source={require('../../assets/back.png')} style={{
      flex: 1,
      position: 'relative',
      backgroundColor: colors.white,
    }}>
      {/* 
      <SliderBox
        images={ENTRIES}
        sliderBoxHeight={150}
        onCurrentImagePressed={index => console.warn(`image ${index} pressed`)}
        dotColor={colors.white}
        inactiveDotColor="#90A4AE"
      /> */}

      <View
        style={{
          position: 'relative',
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
            color: colors.white
          }}>SEHATI</Text>
          <Text style={{
            fontFamily: fonts.primary[400],
            fontSize: windowWidth / 25,
            color: colors.white
          }}>Sehat Makin Nikmat Untuk Lansia</Text>
        </View>


        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-around'
        }}>
          <TouchableOpacity onPress={() => {

            Alert.alert(MYAPP, 'Apakah Anda setuju dan bersedia mengikuti skrining ? ', [

              {
                text: 'TIDAK'
              },
              {
                text: 'YA',
                onPress: () => {
                  getData('user').then(res => {
                    if (!res) {
                      navigation.navigate('Login')
                    } else {
                      navigation.navigate('Skrining', res)
                    }
                  })

                }
              }

            ])


          }} style={{
            width: 100,
            height: 100,
            borderRadius: 50,
            backgroundColor: colors.tertiary,
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <Image source={require('../../assets/A1.png')} style={{
              width: 50,
              resizeMode: 'contain',
              height: 50
            }} />
            <Text style={{
              fontFamily: fonts.secondary[600],
              color: colors.primary
            }}>Skrining</Text>
          </TouchableOpacity>
        </View>

        <View style={{
          marginVertical: 10,
          flexDirection: 'row',
          justifyContent: 'space-between'
        }}>
          <TouchableOpacity onPress={() => navigation.navigate('Edukasi')} style={{
            width: 100,
            height: 100,
            borderRadius: 50,
            backgroundColor: colors.tertiary,
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <Image source={require('../../assets/A3.png')} style={{
              width: 50,
              resizeMode: 'contain',
              height: 50
            }} />
            <Text style={{
              fontFamily: fonts.secondary[600],
              color: colors.primary,
              textAlign: 'center'
            }}>Edukasi{'\n'}Kesehatan</Text>
          </TouchableOpacity>

          <View style={{
            width: 100,
            height: 100,
            bottom: -60,
            borderRadius: 50,
          }}>
            <Image source={require('../../assets/track.png')} style={{
              width: 100,
              height: 100
            }} />
          </View>
          <TouchableOpacity onPress={() => navigation.navigate('Hasil')} style={{
            width: 100,
            height: 100,
            borderRadius: 50,
            backgroundColor: colors.tertiary,
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <Image source={require('../../assets/A2.png')} style={{
              width: 50,
              resizeMode: 'contain',
              height: 50
            }} />
            <Text style={{
              fontFamily: fonts.secondary[600],
              color: colors.primary,
              textAlign: 'center'
            }}>Hasil{'\n'}Skrining</Text>
          </TouchableOpacity>
        </View>


        <View style={{
          marginVertical: 10,
          flexDirection: 'row',
          justifyContent: 'space-between'
        }}>
          <TouchableOpacity onPress={() => navigation.navigate('Alarm')} style={{
            width: 100,
            height: 100,
            borderRadius: 50,
            backgroundColor: colors.tertiary,
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <Image source={require('../../assets/A4.png')} style={{
              width: 50,
              resizeMode: 'contain',
              height: 50
            }} />
            <Text style={{
              fontFamily: fonts.secondary[600],
              color: colors.primary,
              textAlign: 'center'
            }}>Alarm</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('Konsultasi')} style={{
            width: 100,
            height: 100,
            borderRadius: 50,
            backgroundColor: colors.tertiary,
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <Image source={require('../../assets/A5.png')} style={{
              width: 50,
              resizeMode: 'contain',
              height: 50
            }} />
            <Text style={{
              fontFamily: fonts.secondary[600],
              color: colors.primary,
              textAlign: 'center'
            }}>Konsultasi</Text>
          </TouchableOpacity>
        </View>

        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-around'
        }}>
          <TouchableOpacity onPress={() => navigation.navigate('Tentang')} style={{
            width: 100,
            height: 100,
            borderRadius: 50,
            backgroundColor: colors.tertiary,
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <Image source={require('../../assets/A6.png')} style={{
              width: 50,
              resizeMode: 'contain',
              height: 50
            }} />
            <Text style={{
              fontFamily: fonts.secondary[600],
              color: colors.primary,
              textAlign: 'center'
            }}>Tentang</Text>
          </TouchableOpacity>
        </View>




        <Image source={require('../../assets/lansia.png')} style={{
          width: windowWidth,
          position: 'absolute',
          bottom: -10,
          left: 0,
          height: 220,

        }} />
      </View>




    </ImageBackground >
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