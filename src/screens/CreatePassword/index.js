import { SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View, TextInput, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, ScrollView, Keyboard } from 'react-native';
import React, { useState } from 'react';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "../../components/Pixel/Index";
import { COLORS, fontFamily } from "../../../constants";
import Ionicons from "react-native-vector-icons/Ionicons";
import Button from '../../components/Button';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Toast from 'react-native-toast-message';
import DeviceInfo from 'react-native-device-info';
import Animated, { FadeInDown } from 'react-native-reanimated';
import CreatePasswordImage from "../../../assets/images/Create_Password.svg";
import { useTheme } from '../../context/ThemeContext';
import InputField from '../../components/InputField';

const isTablet = DeviceInfo.isTablet();

const CreatePassword = ({ route, navigation }) => {
    const { colors, isDark } = useTheme();
    const { email } = route.params; // Assume the email is passed via navigation

    const [form, setForm] = useState({
        password: '',
        confirmPassword: '',
    });
    const [isPasswordShown, setIsPasswordShown] = useState(true);
    const [isConfirmPasswordShown, setIsConfirmPasswordShown] = useState(true);
    const [loading, setLoading] = useState(false);

    const handleChange = (field, value) => {
        setForm(prevState => ({
            ...prevState,
            [field]: value,
        }));
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
                            {/* Header */}
                            <Animated.View entering={FadeInDown.delay(100)} style={styles.backButton}>
                                <TouchableOpacity onPress={() => navigation.reset({ index: 0, routes: [{ name: 'Login' }] })}>
                                    <Ionicons name="arrow-back" size={isTablet ? wp(3) : wp(6)} color={colors.text} />
                                </TouchableOpacity>
                            </Animated.View>

                            <Animated.View entering={FadeInDown.delay(300)} style={{ flex: 1, }}>

                                <View style={styles.svgContainer}>
                                    <CreatePasswordImage width={hp(35)} height={hp(25)} />
                                </View>

                                {/* Forgot Password Title */}
                                <Animated.View entering={FadeInDown.delay(300)} style={{ flexDirection: 'column', alignItems: 'center' }}>
                                    <Text style={[styles.title, { color: colors.text }]}>Create Password</Text>

                                    {/* Instruction Text */}
                                    <Text style={[styles.instruction, { color: colors.textSecondary }]}>
                                        Create a Strong Password that you will never forget again
                                    </Text>
                                </Animated.View>

                                {/* Input Field */}
                                {/* Password Input */}
                                <InputField
                                    icon={<MaterialCommunityIcons name="lock-outline" size={hp(3)} color={COLORS.darkgray1} />}
                                    placeholder="Password"
                                    value={form.password}
                                    secureTextEntry={isPasswordShown}
                                    onChangeText={(text) => handleChange('password', text)}
                                    editable={!loading}
                                    toggleSecure={() => setIsPasswordShown(!isPasswordShown)}
                                    isSecure={isPasswordShown}
                                />

                                {/* Confirm Password Input */}
                                <InputField
                                    icon={<MaterialCommunityIcons name="lock-outline" size={hp(3)} color={COLORS.darkgray1} />}
                                    placeholder="Re-Enter Password"
                                    value={form.confirmPassword}
                                    secureTextEntry={isConfirmPasswordShown}
                                    onChangeText={(text) => handleChange('confirmPassword', text)}
                                    editable={!loading}
                                    toggleSecure={() => setIsConfirmPasswordShown(!isConfirmPasswordShown)}
                                    isSecure={isConfirmPasswordShown}
                                />

                                {/* Submit Button */}
                                <View style={{ marginVertical: hp(2) }}>
                                    <Button
                                        title={loading ? "Updating..." : "Confirm Password"}
                                        onPress={() => { navigation.navigate("Login") }}
                                        color={COLORS.red}
                                        style={styles.button}
                                        disabled={loading}
                                    />
                                </View>
                            </Animated.View>
                        </View>
                    </TouchableWithoutFeedback>
                </KeyboardAvoidingView>
            </ScrollView>
        </SafeAreaView >
    );
};

export default CreatePassword;

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
    svgContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: hp(3),
    },
    title: {
        fontSize: isTablet ? wp(2.5) : wp(6),
        fontFamily: fontFamily.FONTS.bold,
        color: COLORS.darkgray,
        marginBottom: hp(1),
    },
    instruction: {
        fontSize: isTablet ? wp(2) : wp(3.7),
        paddingHorizontal: wp(2),
        fontFamily: fontFamily.FONTS.Medium,
        color: COLORS.darkgray1,
        textAlign: 'center',
        marginBottom: hp(3),
    },
    inputWrapper: {
        width: '100%',
        marginBottom: hp(2),
    },
    label: {
        fontSize: hp(1.8),
        fontFamily: fontFamily.FONTS.bold,
        color: COLORS.darkgray,
    },
    inputContainer: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: hp(1),
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
        fontFamily: fontFamily.FONTS.Medium,
        fontSize: isTablet ? wp(1) : wp(4),
    },
    eyeIcon: {
        position: 'absolute',
        right: wp(4),
    },
    button: {
        width: wp(90),
        alignSelf: 'center',
        borderRadius: wp(3),
        justifyContent: 'center',
        alignItems: 'center',
    },
});
