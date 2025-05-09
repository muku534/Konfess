import React, { useState, useRef, useEffect } from 'react';
import { SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View, TextInput, KeyboardAvoidingView, TouchableWithoutFeedback, ScrollView, Keyboard } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "../../components/Pixel/Index";
import { COLORS, fontFamily } from "../../../constants";
import Ionicons from "react-native-vector-icons/Ionicons";
import Button from '../../components/Button';
import Toast from 'react-native-toast-message';
import DeviceInfo from 'react-native-device-info';
import Animated, { FadeInDown } from 'react-native-reanimated';
import OTPVerification from '../../../assets/icons/OTP_Verification.svg'
import { useTheme } from '../../context/ThemeContext';
const isTablet = DeviceInfo.isTablet();

const OtpVerification = ({ navigation, route }) => {
    const { colors, isDark } = useTheme();
    const { email } = route.params;
    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const [loading, setLoading] = useState(false);
    const inputRefs = Array(6).fill().map(() => useRef());

    const handleOTPChange = (value, index) => {
        if (!/^\d?$/.test(value)) return; // Ensure only numbers are entered

        let newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        // Move focus to next input field
        if (value && index < 5) {
            inputRefs[index + 1].current.focus();
        }
    };

    // Handle backspace
    const handleBackspace = (index) => {
        let newOtp = [...otp];
        newOtp[index] = "";
        setOtp(newOtp);

        if (index > 0) {
            inputRefs[index - 1].current.focus();
        }
    };

    const dismissKeyboard = () => {
        Keyboard.dismiss();
    };

    return (
        <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
            <StatusBar backgroundColor="transparent" barStyle={isDark ? 'light-content' : 'dark-content'} translucent />
            <ScrollView contentContainerStyle={{ flex: 1 }}>
                <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>
                    <TouchableWithoutFeedback onPress={dismissKeyboard}>
                        <View style={styles.container}>
                            {/* Back Button */}
                            <Animated.View entering={FadeInDown.delay(100)} style={styles.backButton}>
                                <TouchableOpacity onPress={() => navigation.goBack()}>
                                    <Ionicons name="arrow-back" size={isTablet ? wp(3) : wp(6)} color={colors.text} />
                                </TouchableOpacity>
                            </Animated.View>

                            <Animated.View entering={FadeInDown.delay(300)} style={{ flex: 1, alignItems: 'center' }}>
                                <View style={styles.imageContainer}>
                                    <OTPVerification width={wp(60)} height={hp(25)} />
                                </View>
                                {/* Title */}
                                <Text style={[styles.title, { color: colors.text }]}>OTP Verification</Text>

                                {/* Subtitle */}
                                <Text style={[styles.subtitle, { color: colors.textSecondary }]}>Please enter the OTP to create the New Password</Text>

                                {/* OTP Input Fields */}
                                <View style={styles.otpContainer}>
                                    {otp.map((digit, index) => (
                                        <TextInput
                                            key={index}
                                            ref={inputRefs[index]}
                                            style={styles.otpBox}
                                            maxLength={1}
                                            keyboardType="numeric"
                                            value={digit}
                                            onChangeText={(value) => handleOTPChange(value, index)}
                                            onKeyPress={({ nativeEvent }) => {
                                                if (nativeEvent.key === "Backspace") {
                                                    handleBackspace(index);
                                                }
                                            }}
                                        />
                                    ))}
                                </View>

                                {/* Submit Button */}
                                <Button
                                    title={loading ? "Verifying OTP..." : "Verify OTP"}
                                    onPress={() => { navigation.navigate("CreatePassword", { email }) }}
                                    disabled={loading}
                                />

                            </Animated.View>
                        </View>
                    </TouchableWithoutFeedback>
                </KeyboardAvoidingView>
            </ScrollView>
        </SafeAreaView >
    );
};

export default OtpVerification;

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: COLORS.WhiteSmoke,
    },
    container: {
        flex: 1,
        paddingHorizontal: wp(4),
    },
    backButton: {
        marginTop: hp(8),
    },
    title: {
        fontSize: isTablet ? wp(2.5) : wp(6),
        fontFamily: fontFamily.FONTS.bold,
        color: COLORS.darkgray,
        marginBottom: hp(1),
    },
    subtitle: {
        fontSize: isTablet ? wp(2) : wp(3.8),
        textAlign: 'center',
        fontFamily: fontFamily.FONTS.Medium,
        color: COLORS.Midgray,
        marginBottom: hp(4),
        width: wp(80),
    },
    otpContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: hp(3),
    },
    otpBox: {
        width: isTablet ? wp(8) : wp(12.5),
        height: isTablet ? wp(8) : wp(12.5),
        borderRadius: wp(2),
        borderColor: COLORS.Midgray,
        marginHorizontal: wp(1.5),
        color: COLORS.darkgray,
        borderWidth: 0.5,
        textAlign: 'center',
        fontSize: wp(5),
        fontFamily: fontFamily.FONTS.bold
    },
    button: {
        width: wp(90),
        alignSelf: 'center',
        borderRadius: wp(3),
        justifyContent: 'center',
        alignItems: 'center',
    },
});