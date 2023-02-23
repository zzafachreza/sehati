import React from 'react';
import { StyleSheet, Text, View, Picker } from 'react-native';
import { Icon, ListItem, Button } from 'react-native-elements';
import { colors } from '../../utils/colors';
import { fonts, windowWidth } from '../../utils/fonts';

export default function MyPicker({
  label,
  iconname,
  iconshow = true,
  onValueChange,
  onChangeText,
  value,
  keyboardType,
  secureTextEntry,
  styleInput,
  placeholder,
  label2,
  styleLabel,
  colorIcon = colors.primary,
  data = [],
}) {
  return (
    <>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingVertical: 0,
        }}>
        {iconshow && <Icon type="ionicon" name={iconname} color={colors.primary} size={16} />}
        <Text
          style={{
            fontFamily: fonts.secondary[600],
            color: colors.primary,
            left: iconshow ? 10 : 0,
            fontSize: windowWidth / 28,
            ...styleLabel,
          }}>
          {label}
        </Text>
      </View>

      <View style={{
        backgroundColor: colors.zavalabs,
        borderRadius: 10,
        marginTop: 5,
        fontFamily: fonts.secondary[600],
        borderColor: colors.primary,
      }}>
        <Picker style={{ height: 48, transform: [{ scale: 1 }] }}
          selectedValue={value} onValueChange={onValueChange}>
          {data.map(item => {
            return <Picker.Item textStyle={{ fontSize: windowWidth / 25 }} value={item.value} label={item.label} />;
          })}
        </Picker>
      </View>
    </>
  );
}

const styles = StyleSheet.create({});
