import { StyleSheet, Text, View, Image, Switch, TouchableOpacity, ActivityIndicator, ScrollView } from 'react-native';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import { COLORS, fontFamily } from '../../../constants';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from '../../components/Pixel/Index';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import DeviceInfo from 'react-native-device-info';
import LinearGradient from 'react-native-linear-gradient';
import NightReflectionsModal from '../../components/NightReflectionsModal';
import ConfessionsModal from '../../components/ConfessionsSheet';
import EditProfileModal from '../../components/EditProfileModal';
import PrivacyModal from '../../components/PrivacyModal';
import SettingsModal from '../../components/SettingModel';
import { useTheme } from '../../context/ThemeContext';
import Animated, { FadeInDown } from 'react-native-reanimated';

const isTablet = DeviceInfo.isTablet();

// Reusable StatBox component
const StatBox = ({ icon, iconProps, value, colors = {}, label, bgColor, onPress }) => (
    <Animated.View entering={FadeInDown.delay(100)}>
        <TouchableOpacity style={[styles.statBox, { backgroundColor: colors.surface || COLORS.white }]} onPress={onPress} activeOpacity={0.8}>
            <View style={{ alignItems: 'center' }}>
                <View style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: hp(1),
                    backgroundColor: bgColor,
                    width: wp(11),
                    height: wp(11),
                    borderRadius: wp(11)
                }}>
                    {React.createElement(icon, iconProps)}
                </View>
                <Text style={[styles.statValue, { color: colors.text || COLORS.darkgray }]}>{value}</Text>
                <Text style={[styles.statLabel, { color: colors.textSecondary || COLORS.darkgray1 }]}>{label}</Text>
            </View>
        </TouchableOpacity>
    </Animated.View>
);
// Reusable SettingItem component
const SettingItem = ({ icon, iconProps, colors = {}, title, subtext, rightComponent, onPress }) => {
    const Content = (
        <Animated.View entering={FadeInDown.delay(200)} style={[styles.settingItem, { backgroundColor: colors.surface || COLORS.white }]}>
            <View style={styles.settingLeft}>
                <View style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: hp(1),
                    backgroundColor: colors.primaryLight || '#ffe8d8',
                    width: wp(9.5),
                    height: wp(9.5),
                    borderRadius: wp(9.5)
                }}>
                    {React.createElement(icon, iconProps)}
                </View>
                <View>
                    <Text style={[styles.settingTitle, { color: colors.text || COLORS.darkgray }]}>{title}</Text>
                    {subtext ? <Text style={[styles.settingSubtext, { color: colors.textSecondary || COLORS.darkgray1 }]}>{subtext}</Text> : null}
                </View>
            </View>
            {rightComponent}
        </Animated.View>
    );
    return onPress ? (
        <TouchableOpacity activeOpacity={0.7} onPress={onPress}>
            {Content}
        </TouchableOpacity>
    ) : Content;
};

const Profile = () => {
    const { colors, isDark, toggleTheme } = useTheme();
    const [darkMode, setDarkMode] = useState(false);
    const [notifications, setNotifications] = useState(true);
    const [loading, setLoading] = useState(false);
    const [disabled, setDisabled] = useState(false);
    const [showSettings, setShowSettings] = useState(false);
    const [showPrivacy, setShowPrivacy] = useState(false);
    const [showEditProfile, setShowEditProfile] = useState(false);
    const [showConfessions, setShowConfessions] = useState(false);
    const [showReflections, setShowReflections] = useState(false);

    const stats = [
        {
            icon: Feather,
            iconProps: { name: 'message-circle', size: hp(2.8), color: COLORS.BlazeOrange },
            value: 23,
            label: 'Saved Confessions',
            bgColor: isDark ? '#3e2f26' : '#ffe8d8',
            onPress: () => { },
        },
        {
            icon: Ionicons,
            iconProps: { name: 'chatbubbles-outline', size: hp(2.8), color: '#4CAF50' },
            value: 12,
            label: 'Confessions',
            bgColor: isDark ? '#25372c' : '#eff8ef',
            onPress: () => setShowConfessions(true),
        },
        {
            icon: Ionicons,
            iconProps: { name: 'book-outline', size: hp(2.7), color: '#0e8df2' },
            value: 15,
            label: 'Night Reflections',
            bgColor: isDark ? '#1e2b36' : '#dbeefd',
            onPress: () => setShowReflections(true),
        },
    ];

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <LinearGradient
                colors={[colors.primary, `${colors.primary}00`]}
                style={styles.headerGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
            />
            <ScrollView>
                {/* Header */}
                <Animated.View entering={FadeInDown.delay(100)} style={styles.header}>
                    <Text style={[styles.headerTitle, { color: colors.text }]}>Profile</Text>
                    <TouchableOpacity
                        style={[styles.editButton, { backgroundColor: colors.surface }]}
                        onPress={() => setShowEditProfile(true)}
                        activeOpacity={0.7}
                    >
                        <MaterialIcons name="credit-card" size={hp(2.4)} color={colors.primary} />
                    </TouchableOpacity>
                </Animated.View>

                {/* Profile Info */}
                <Animated.View entering={FadeInDown.delay(100)} style={styles.profileInfo}>
                    <View style={[styles.avatarWrapper, { borderColor: colors.surface || COLORS.white }]}>
                        <Image
                            source={{ uri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330' }}
                            style={[styles.avatar,]}
                        />
                        <TouchableOpacity style={[styles.cameraIcon, { backgroundColor: colors.primary }]} activeOpacity={0.7} onPress={() => setShowEditProfile(true)}>
                            <FontAwesome name="camera" size={hp(1.8)} color={COLORS.white} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.profileTextWrapper}>
                        <Text style={[styles.name, { color: colors.text }]}>Sarah Anderson</Text>
                        <Text style={[styles.email, { color: colors.textSecondary }]}>sarah@example.com</Text>
                    </View>
                </Animated.View>

                {/* Stats */}
                <View style={styles.statsRow}>
                    {stats.map((stat, idx) => (
                        <StatBox key={idx} {...stat} colors={colors} />
                    ))}
                </View>

                {/* Settings */}
                <View style={styles.settingsList}>
                    <SettingItem
                        icon={Ionicons}
                        iconProps={{ name: 'moon-outline', size: hp(2.2), color: colors.primary }}
                        title="Dark Mode"
                        rightComponent={
                            <Switch
                                value={isDark}
                                onValueChange={toggleTheme}
                                trackColor={{ false: '#ccc', true: colors.primary }}
                                thumbColor={COLORS.white}
                            />
                        }
                        colors={colors}
                    />
                    <SettingItem
                        icon={Ionicons}
                        iconProps={{ name: 'notifications-outline', size: hp(2.2), color: colors.primary }}
                        title="Notifications"
                        rightComponent={
                            <Switch
                                value={notifications}
                                onValueChange={setNotifications}
                                trackColor={{ false: '#ccc', true: colors.primary }}
                                thumbColor={COLORS.white}
                            />
                        }
                        colors={colors}
                    />
                    <SettingItem
                        icon={Feather}
                        iconProps={{ name: 'shield', size: hp(2.2), color: '#FF6B00' }}
                        title="Privacy"
                        subtext="Manage your privacy settings"
                        rightComponent={<Feather name="chevron-right" size={hp(2.5)} color={colors.textSecondary} />}
                        onPress={() => setShowPrivacy(true)}
                        colors={colors}
                    />
                    <SettingItem
                        icon={Feather}
                        iconProps={{ name: 'settings', size: hp(2.2), color: '#FF6B00' }}
                        title="Settings"
                        subtext="App preferences and account settings"
                        rightComponent={<Feather name="chevron-right" size={hp(2.5)} color={colors.textSecondary} />}
                        onPress={() => setShowSettings(true)}
                        colors={colors}
                    />
                </View>

                <View>
                    <TouchableOpacity
                        style={styles.button}
                        disabled={disabled || loading}
                        activeOpacity={0.7}
                    >
                        {loading ? (
                            <ActivityIndicator color={COLORS.white} size="large" />
                        ) : (
                            <Text style={styles.buttonText}>Logout</Text>
                        )}
                    </TouchableOpacity>
                </View>
            </ScrollView>

            <SettingsModal visible={showSettings} onClose={() => setShowSettings(false)} />
            <EditProfileModal visible={showEditProfile} onClose={() => setShowEditProfile(false)} />
            <PrivacyModal visible={showPrivacy} onClose={() => setShowPrivacy(false)} />
            <ConfessionsModal visible={showConfessions} onClose={() => setShowConfessions(false)} />
            <NightReflectionsModal visible={showReflections} onClose={() => setShowReflections(false)} />
        </View>
    );
};

export default Profile;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: wp(4),
    },
    headerGradient: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 200,
        opacity: 0.15,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: hp(5),
        marginBottom: hp(2),
    },
    headerTitle: {
        fontSize: hp(3),
        fontFamily: fontFamily.FONTS.bold,
        color: COLORS.darkgray,
    },
    editButton: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: hp(0.7),
        width: wp(10),
        height: wp(10),
        borderRadius: wp(10),
    },
    profileInfo: {
        marginTop: hp(1),
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: hp(2),
    },
    avatarWrapper: {
        borderWidth: 2,
        borderColor: COLORS.white,
        borderRadius: hp(8.5),
    },
    avatar: {
        width: hp(8.5),
        height: hp(8.5),
        borderRadius: hp(8.5),
        // borderColor: COLORS.white,
    },
    cameraIcon: {
        position: 'absolute',
        bottom: 0,
        right: -wp(1),
        backgroundColor: COLORS.BlazeOrange,
        borderRadius: hp(2),
        padding: hp(0.7),
    },
    profileTextWrapper: {
        flexDirection: 'column',
        marginLeft: wp(4.5),
    },
    name: {
        fontSize: hp(2.4),
        fontFamily: fontFamily.FONTS.bold,
        color: COLORS.darkgray,
        marginVertical: hp(0.1),
    },
    email: {
        fontSize: hp(1.8),
        marginVertical: hp(0.1),
        color: COLORS.darkgray1,
        fontFamily: fontFamily.FONTS.Medium,
    },
    statsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: hp(2),
    },
    statBox: {
        width: wp(29),
        height: hp(18.5),
        // backgroundColor: COLORS.white,
        borderRadius: hp(1.5),
        alignItems: 'center',
        marginRight: wp(3),
        padding: hp(2),
        paddingVertical: hp(2),
        elevation: 1,
    },
    statValue: {
        fontSize: hp(2.4),
        fontFamily: fontFamily.FONTS.bold,
        color: COLORS.darkgray,
        marginVertical: hp(1),
    },
    statLabel: {
        fontSize: hp(1.5),
        textAlign: 'center',
        fontFamily: fontFamily.FONTS.Medium,
        color: COLORS.darkgray1,
    },
    settingsList: {
        borderRadius: hp(1.5),
        backgroundColor: 'transparent',
        overflow: 'hidden',
        marginTop: hp(1),
        marginBottom: hp(3),
    },
    settingItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: COLORS.white,
        paddingVertical: hp(1.5),
        paddingHorizontal: wp(3),
        marginBottom: hp(0.2),
    },
    settingLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: wp(3.5),
    },
    settingTitle: {
        fontSize: hp(1.7),
        fontFamily: fontFamily.FONTS.bold,
        color: COLORS.darkgray,
    },
    settingSubtext: {
        fontSize: hp(1.5),
        fontFamily: fontFamily.FONTS.Regular,
        color: COLORS.darkgray1,
        marginTop: hp(0.3),
    },
    button: {
        backgroundColor: COLORS.red,
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