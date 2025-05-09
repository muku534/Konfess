import { SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View, TextInput, KeyboardAvoidingView, ScrollView, Platform, Keyboard, TouchableWithoutFeedback } from 'react-native';
import React, { useEffect, useState } from 'react';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "../../components/Pixel/Index";
import { COLORS } from "../../../constants";
import fontFamily from "../../../constants/fontFamily";
import Ionicons from "react-native-vector-icons/Ionicons";
import Feather from "react-native-vector-icons/Feather";
import Button from '../../components/Button';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useSelector } from 'react-redux';
import DeviceInfo from 'react-native-device-info';
import Animated, { FadeInDown } from 'react-native-reanimated';
import InputField from '../../components/InputField';
import { useTheme } from '../../context/ThemeContext';

const isTablet = DeviceInfo.isTablet();

const ForgotPassword = ({ navigation, route }) => {
    const { colors, isDark } = useTheme();
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const userData = useSelector(state => state.userData);
    const [isEditable, setIsEditable] = useState(true);
    const [isSubmitted, setIsSubmitted] = useState(false);

    useEffect(() => {
        if (userData?.email) {
            setEmail(userData.email);
            setIsEditable(false); // Disable input if email exists
        }
    }, [userData]);

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const dismissKeyboard = () => {
        Keyboard.dismiss();
    };

    const handleSubmit = () => {
        // if (!validateEmail(email)) return; // optionally validate
        setIsSubmitted(true); // Show success animation
        setLoading(true); // Optional: block UI while waiting

        setTimeout(() => {
            setLoading(false);
            navigation.navigate("OtpVerification", { email });
        }, 1000); // Wait 1 second then navigate
    };


    return (
        <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
            <StatusBar backgroundColor="transparent" barStyle={isDark ? 'light-content' : 'dark-content'} translucent />
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={{ flex: 1 }}
            >
                <TouchableWithoutFeedback onPress={dismissKeyboard}>
                    <ScrollView contentContainerStyle={{ flex: 1 }}>
                        <View style={styles.container}>
                            {!isSubmitted ? (
                                <View>
                                    < Animated.View entering={FadeInDown.delay(100)} style={styles.backButton}>
                                        <TouchableOpacity onPress={() => navigation.goBack()}>
                                            <Ionicons name="arrow-back" size={isTablet ? wp(3) : wp(6)} color={colors.text} />
                                        </TouchableOpacity>
                                        <Text style={[styles.title, { color: colors.text }]}>Reset Password</Text>
                                    </Animated.View>

                                    <Animated.View entering={FadeInDown.delay(300)}>
                                        <Text style={[styles.instruction, { color: colors.textSecondary }]}>
                                            Enter your email address and we'll send you instructions to reset your password
                                        </Text>
                                    </Animated.View>


                                    <Animated.View entering={FadeInDown.delay(500)} style={styles.inputWrapper}>
                                        <InputField
                                            icon={<MaterialCommunityIcons name="email-outline" size={hp(2.5)} color={COLORS.darkgray1} />}
                                            placeholder="Email address"
                                            value={email}
                                            keyboardType="email-address"
                                            onChangeText={setEmail}
                                            editable={!loading}
                                        />
                                    </Animated.View>
                                    <Animated.View entering={FadeInDown.delay(700)}>
                                        <Button
                                            title={loading ? "Sending Instructions..." : "Send Instructions"}
                                            onPress={handleSubmit}
                                            loading={loading}
                                            disabled={loading}
                                        />
                                    </Animated.View>
                                </View>
                            ) : (
                                <Animated.View entering={FadeInDown.delay(500)} style={styles.successContainer}>
                                    <View style={[styles.successIcon, { backgroundColor: colors.primary }]}>
                                        <Feather name="check-circle" size={wp(12)} color={COLORS.white} />
                                    </View>
                                    <Text style={[styles.successTitle, { color: colors.text }]}>
                                        Check your email
                                    </Text>
                                    <Text style={[styles.successText, { color: colors.textSecondary }]}>
                                        We've sent password reset instructions to your email address
                                    </Text>
                                </Animated.View>
                            )}

                        </View>

                    </ScrollView>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </SafeAreaView >
    );
};

export default ForgotPassword;

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: COLORS.WhiteSmoke,
        paddingHorizontal: wp(4),
        alignItems: 'center',
    },
    container: {
        flex: 1,
        marginTop: Platform.OS === "ios" ? hp(0) : hp(5),
    },
    backButton: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    svgContainer: {
        marginTop: hp(10),
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: hp(5),
    },
    title: {
        marginHorizontal: wp(2),
        fontSize: isTablet ? hp(2.2) : hp(2.5),
        fontFamily: fontFamily.FONTS.bold,
        color: COLORS.darkgray,
    },
    instruction: {
        fontSize: isTablet ? hp(2) : hp(1.9),
        fontFamily: fontFamily.FONTS.Medium,
        color: COLORS.darkgray,
        textAlign: 'center',
        marginVertical: hp(3),
    },
    inputWrapper: {
        width: '100%',
        marginTop: isTablet ? hp(1) : hp(0),
        marginBottom: hp(2),
    },
    inputContainer: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        height: hp(6),
        borderColor: COLORS.Midgray,
        borderWidth: 0.5,
        borderRadius: isTablet ? wp(1) : wp(2),
        paddingLeft: wp(2),
    },
    input: {
        flex: 1,
        paddingLeft: wp(2),
        color: COLORS.darkgray,
        fontSize: isTablet ? wp(1.4) : wp(4),
    },
    button: {
        width: wp(90),
        alignSelf: 'center',
        borderRadius: wp(3),
        justifyContent: 'center',
        alignItems: 'center',
    },
    successContainer: {
        flex: 1,
        alignItems: 'center',
        paddingHorizontal: wp(5),
        paddingTop: hp(10),
    },
    successIcon: {
        width: wp(20),
        height: wp(20),
        borderRadius: wp(20),
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: hp(2),
    },
    successTitle: {
        fontSize: hp(2.8),
        fontFamily: fontFamily.FONTS.bold,
        marginBottom: hp(1),
        textAlign: 'center',
    },
    successText: {
        fontSize: hp(2),
        fontFamily: fontFamily.FONTS.Medium,
        textAlign: 'center',
        lineHeight: hp(3),
    },
});
