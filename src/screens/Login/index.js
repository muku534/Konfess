import { ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { COLORS, fontFamily } from '../../../constants'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from '../../components/Pixel/Index'
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import InputField from '../../components/InputField';
import Button from '../../components/Button';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useTheme } from '../../context/ThemeContext';

const Login = ({ navigation }) => {
    const { colors, isDark } = useTheme();
    const [form, setForm] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        selectedAvatar: null
    });
    const [isPasswordShown, setIsPasswordShown] = useState(true);
    const [loading, setLoading] = useState(false);

    const handleChange = (key, value) => {
        setForm(prevState => ({ ...prevState, [key]: value }));
    };
    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <StatusBar backgroundColor="transparent" barStyle={isDark ? 'light-content' : 'dark-content'} translucent />
            <ScrollView showsVerticalScrollIndicator={false}>
                <View>
                    {/* Title */}
                    <Animated.View entering={FadeInDown.delay(200)}>
                        <Text style={[styles.title, { color: colors.text }]}>Welcome back</Text>
                        <Text style={[styles.Subtitle, { color: colors.textSecondary }]}>Sign in to continue your journey</Text>
                    </Animated.View>

                    {/* Inputs */}
                    <Animated.View entering={FadeInDown.delay(400)} style={{ marginBottom: hp(2.5), marginTop: hp(2) }}>
                        <InputField
                            icon={<MaterialCommunityIcons name="email-outline" size={hp(2.5)} color={COLORS.darkgray1} />}
                            placeholder="Email address"
                            value={form.email}
                            keyboardType="email-address"
                            onChangeText={(text) => handleChange('email', text)}
                            editable={!loading}
                        />

                        <InputField
                            icon={<MaterialCommunityIcons name="lock-outline" size={hp(2.5)} color={COLORS.darkgray1} />}
                            placeholder="Password"
                            value={form.password}
                            secureTextEntry={isPasswordShown}
                            onChangeText={(text) => handleChange('password', text)}
                            editable={!loading}
                            toggleSecure={() => setIsPasswordShown(!isPasswordShown)}
                            isSecure={isPasswordShown}
                        />

                        {/* Forgot Password */}
                        <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.navigate('ForgotPassword')}>
                            <Text style={[styles.forgotPassword, { color: colors.primary }]}>Forgot Password?</Text>
                        </TouchableOpacity>
                    </Animated.View>

                    {/* Sign In Button */}
                    <Animated.View entering={FadeInDown.delay(600)}>
                        <Button
                            title="Sign In"
                            onPress={() => navigation.navigate('TabStack')}
                            color={COLORS.red}
                        />
                    </Animated.View>

                    {/* Bottom Navigation */}
                    <Animated.View entering={FadeInDown.delay(800)} style={styles.bottomContainer}>
                        <Text style={[styles.loginText, { color: colors.textSecondary }]}>Don`t have an account? </Text>
                        <TouchableOpacity onPress={() => navigation.replace("SignUp")}>
                            <Text style={[styles.loginBold, { color: colors.primary }]}>SignUp</Text>
                        </TouchableOpacity>
                    </Animated.View>
                </View>
            </ScrollView>
        </View>

    )
}

export default Login

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.WhiteSmoke,
        alignItems: 'center',
        paddingVertical: hp(10),
    },
    title: {
        fontSize: hp(3.1),
        fontFamily: fontFamily.FONTS.bold,
        color: COLORS.darkgray,
        paddingBottom: hp(1),
    },
    Subtitle: {
        fontSize: hp(1.7),
        fontFamily: fontFamily.FONTS.Medium,
        color: COLORS.Midgray,
    },
    forgotPassword: {
        alignSelf: 'flex-end',
        color: COLORS.BlazeOrange,
        fontFamily: fontFamily.FONTS.bold,
        fontSize: hp(1.8),
        marginVertical: hp(0.5)
    },
    bottomContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: hp(4),
    },
    loginText: {
        fontSize: hp(1.7),
        fontFamily: fontFamily.FONTS.Medium,
        color: COLORS.darkgray,
    },
    loginBold: {
        fontSize: hp(1.8),
        fontFamily: fontFamily.FONTS.bold,
        color: COLORS.BlazeOrange,
    },
})