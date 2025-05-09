import React from 'react';
import { Text, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from './Pixel/Index';
import { COLORS } from '../../constants';
import fontFamily from '../../constants/fontFamily';
import DeviceInfo from 'react-native-device-info';
import LinearGradient from 'react-native-linear-gradient';

const isTablet = DeviceInfo.isTablet();

const Button = ({ title, onPress, disabled, loading }) => {
    return (
        <TouchableOpacity
            style={styles.button}
            onPress={onPress}
            disabled={disabled || loading}
            activeOpacity={0.5}
        >
            <LinearGradient
                colors={[COLORS.BlazeOrange, COLORS.black]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.button}
            >
                {loading ? (
                    <ActivityIndicator color={COLORS.white} size="large" />
                ) : (
                    <Text style={styles.buttonText}>{title}</Text>
                )}
            </LinearGradient>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        height: hp(6),
        width: isTablet ? wp(50) : wp(90),
        borderRadius: isTablet ? wp(1) : wp(10),
        marginHorizontal: isTablet ? wp(20) : wp(0),
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: wp(5),
    },
    buttonText: {
        fontSize: hp(1.9),
        color: COLORS.white,
        fontFamily: fontFamily.FONTS.Medium,
    },
});

export default Button;
