import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import {
  Splash,
  Home,
  GetStarted,
  Login,
  Konsultasi,
  Edukasi,
  EdukasiPdf,
  EdukasiVideo,
  Alarm,
  Skrining,
  Hasil,
  HasilDetail,
  EdukasiDaftar,
  Artikel,
  ArtikelDetail,
} from '../pages';
import { colors } from '../utils';
import { Icon } from 'react-native-elements';

const Stack = createStackNavigator();

export default function Router() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Splash"
        component={Splash}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="GetStarted"
        component={GetStarted}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Konsultasi"
        component={Konsultasi}
        options={{
          headerTintColor: colors.white,
          headerShown: true,
          headerStyle: {
            backgroundColor: colors.primary,
          }
        }}
      />

      <Stack.Screen
        name="Edukasi"
        component={Edukasi}
        options={{
          title: 'Edukasi Kesehatan',
          headerTintColor: colors.white,
          headerShown: true,
          headerStyle: {
            backgroundColor: colors.primary,
          }
        }}
      />
      <Stack.Screen
        name="EdukasiDaftar"
        component={EdukasiDaftar}
        options={{
          title: 'Edukasi Kesehatan',
          headerTintColor: colors.white,
          headerShown: false,
          headerStyle: {
            backgroundColor: colors.primary,
          }
        }}
      />
      <Stack.Screen
        name="Artikel"
        component={Artikel}
        options={{
          title: 'Kumpulan Artikel Kesehatan',
          headerTintColor: colors.white,
          headerShown: true,
          headerStyle: {
            backgroundColor: colors.primary,
          }
        }}
      />
      <Stack.Screen
        name="ArtikelDetail"
        component={ArtikelDetail}
        options={{
          title: 'Kumpulan Artikel Kesehatan',
          headerTintColor: colors.white,
          headerShown: false,
          headerStyle: {
            backgroundColor: colors.primary,
          }
        }}
      />
      <Stack.Screen
        name="EdukasiPdf"
        component={EdukasiPdf}
        options={{
          title: 'Edukasi Kesehatan',
          headerTintColor: colors.white,
          headerShown: false,
          headerStyle: {
            backgroundColor: colors.primary,
          }
        }}
      />
      <Stack.Screen
        name="EdukasiVideo"
        component={EdukasiVideo}
        options={{
          title: 'Edukasi Kesehatan',
          headerTintColor: colors.white,
          headerShown: false,
          headerStyle: {
            backgroundColor: colors.primary,
          }
        }}
      />

      <Stack.Screen
        name="Alarm"
        component={Alarm}
        options={{
          title: 'Alarm',
          headerTintColor: colors.white,
          headerShown: true,
          headerStyle: {
            backgroundColor: colors.primary,
          }
        }}
      />

      <Stack.Screen
        name="Skrining"
        component={Skrining}
        options={{
          title: 'Skrining',
          headerTintColor: colors.white,
          headerShown: true,
          headerStyle: {
            backgroundColor: colors.primary,
          }
        }}
      />

      <Stack.Screen
        name="Hasil"
        component={Hasil}
        options={{
          title: 'Hasil Skrining',
          headerTintColor: colors.white,
          headerShown: true,
          headerStyle: {
            backgroundColor: colors.primary,
          }
        }}
      />
      <Stack.Screen
        name="HasilDetail"
        component={HasilDetail}
        options={{
          title: 'Hasil Skrining Detail',
          headerTintColor: colors.white,
          headerShown: true,
          headerStyle: {
            backgroundColor: colors.primary,
          }
        }}
      />
    </Stack.Navigator>
  );
}
