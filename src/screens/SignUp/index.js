import { ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { COLORS, fontFamily } from '../../../constants';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from '../../components/Pixel/Index';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import InputField from '../../components/InputField';
import Button from '../../components/Button';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useTheme } from '../../context/ThemeContext';

const SignUp = ({ navigation }) => {
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
        <Animated.View entering={FadeInDown.delay(200)}>
          <Text style={[styles.title, { color: colors.text }]}>Create Account</Text>
          <Text style={[styles.Subtitle, { color: colors.textSecondary }]}>Begin your journey of self-discovery</Text>
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(400)} style={{ marginBottom: hp(1), marginTop: hp(2) }}>
          <InputField
            icon={<FontAwesome name="user-o" size={hp(2.5)} color={COLORS.darkgray1} />}
            placeholder="Full Name"
            value={form.name}
            onChangeText={(text) => handleChange('name', text)}
            editable={!loading}
          />

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
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(600)} style={{ marginTop: hp(1) }}>
          <Button
            title="Create Account"
            color={COLORS.red}
          />
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(800)} style={styles.bottomContainer}>
          <Text style={[styles.loginText, { color: colors.textSecondary }]}>Already have an Account? </Text>
          <TouchableOpacity onPress={() => navigation.replace("Login")}>
            <Text style={[styles.loginBold, { color: colors.primary }]}>Login Now</Text>
          </TouchableOpacity>
        </Animated.View>
      </ScrollView>
    </View>
  );
};

export default SignUp;

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
    paddingBottom: hp(1),
  },
  Subtitle: {
    fontSize: hp(1.7),
    fontFamily: fontFamily.FONTS.Medium,
    color: COLORS.Midgray,
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
});
