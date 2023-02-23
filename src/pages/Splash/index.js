import React, { useEffect } from 'react';
import { ImageBackground } from 'react-native';
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Image,
  Animated,
} from 'react-native';
import { MyButton } from '../../components';
import { colors, fonts, windowHeight, windowWidth } from '../../utils';
import { getData } from '../../utils/localStorage';

export default function Splash({ navigation }) {
  const top = new Animated.Value(0.3);

  const animasi = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(top, {
          toValue: 1,
          duration: 1000,
        }),
        Animated.timing(top, {
          toValue: 0.3,
          duration: 1000,
        }),
      ]),
      {
        iterations: 1,
      },
    ).start();
  };



  useEffect(() => {
    setTimeout(() => {

      navigation.replace('GetStarted')

    }, 1500)
  }, []);


  return (
    <ImageBackground
      source={require('../../assets/splash.png')}
      style={{
        flex: 1,
      }}>
      <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
      }}>

        <Image
          source={require('../../assets/logo.png')}
          style={
            {
              width: windowWidth - 100,
              height: 200,
              borderRadius: 30,
              margin: 10,
              resizeMode: 'contain'
            }
          }
        />

        <ActivityIndicator size="large" color={colors.primary} />



      </View>

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


    </ImageBackground>
  );
}

const styles = StyleSheet.create({});
