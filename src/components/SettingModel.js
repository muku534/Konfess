import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Modal,
    TouchableOpacity,
    ScrollView,
    Switch,
    Platform
} from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from './Pixel/Index';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import { COLORS, fontFamily } from '../../constants';
import LinearGradient from 'react-native-linear-gradient';
import { useTheme } from '../context/ThemeContext';

export default function SettingsModal({ visible, onClose }) {
    const { colors } = useTheme();
    const settings = [
        {
            title: 'Notifications',
            icon: 'bell',
            options: [
                { label: 'Daily Reminders', value: true },
                { label: 'Comment Notifications', value: true },
                { label: 'Support Notifications', value: false },
            ],
        },
        {
            title: 'Language & Region',
            icon: 'globe',
            options: [
                { label: 'App Language', value: 'English', isButton: true },
                { label: 'Region', value: 'United States', isButton: true },
            ],
        },
    ];

    const appInfo = [
        {
            label: 'Version',
            value: '1.0.0',
            icon: 'package',
        },
        {
            label: 'Build Number',
            value: '1',
            icon: 'code',
        },
        {
            label: 'Platform',
            value: Platform.OS === 'ios' ? 'iOS' : 'Android',
            icon: 'info',
        },
        {
            label: 'Made with ❤️ by',
            value: 'StackBlitz',
            icon: 'coffee',
        },
    ];

    return (
        <Modal
            visible={visible}
            transparent
            animationType="slide"
            onRequestClose={onClose}
        >
            <View style={[styles.modalContainer, { backgroundColor: 'rgba(0,0,0,0.5)' }]}>
                <View style={[styles.modalContent, { backgroundColor: colors.background }]}>
                    <LinearGradient
                        colors={[colors.primary, `${colors.primary}00`]}
                        style={styles.headerGradient}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 0, y: 1 }}
                    />
                    <View style={styles.header}>
                        <Text style={[styles.title, { color: colors.text }]}>Settings</Text>
                        <TouchableOpacity onPress={onClose}>
                            <Feather name="x" size={hp(3)} color={colors.text} />
                        </TouchableOpacity>
                    </View>

                    <ScrollView
                        style={styles.content}
                        showsVerticalScrollIndicator={false}
                    >
                        {settings.map((section, index) => (
                            <View
                                key={index}
                                style={[
                                    styles.section,
                                    { backgroundColor: colors.surface, },
                                    index === settings.length - 1 && styles.lastSection
                                ]}
                            >
                                <View style={styles.sectionHeader}>
                                    <Feather name={section.icon} size={hp(2.5)} color={colors.primary} />
                                    <Text style={[styles.sectionTitle, { color: colors.text }]}>{section.title}</Text>
                                </View>

                                {section.options.map((option, optionIndex) => (
                                    <View
                                        key={optionIndex}
                                        style={[styles.option, { borderBottomColor: colors.border }]}
                                    >
                                        <Text style={[styles.optionLabel, { color: colors.text }]}>
                                            {option.label}
                                        </Text>
                                        {option.isButton ? (
                                            <TouchableOpacity style={[styles.button, { backgroundColor: `${colors.primary}15` }]}>
                                                <Text style={[styles.buttonText, { color: colors.primary }]}>
                                                    {option.value}
                                                </Text>
                                            </TouchableOpacity>
                                        ) : (
                                            <Switch
                                                value={option.value}
                                                onValueChange={() => { }}
                                                trackColor={{
                                                    false: colors.toggle,
                                                    true: '#ff6b00'
                                                }}
                                                thumbColor={option.value ? '#FFFFFF' : '#F4F4F4'}
                                                ios_backgroundColor={colors.toggle}
                                                style={[
                                                    Platform.OS === 'ios' && {
                                                        transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }]
                                                    }
                                                ]}
                                            />
                                        )}
                                    </View>
                                ))}
                            </View>
                        ))}

                        <View style={[styles.section, { backgroundColor: colors.surface }]}>
                            {appInfo.map((info, index) => (
                                <View
                                    key={index}
                                    style={[
                                        styles.infoItem,
                                        { borderBottomColor: colors.border },
                                        index !== appInfo.length - 1 && styles.infoItemBorder
                                    ]}
                                >
                                    <View style={styles.infoLeft}>
                                        <Feather name={info.icon} size={hp(2.2)} color={colors.primary} />
                                        <Text style={[styles.infoLabel, { color: colors.text }]}>{info.label}</Text>
                                    </View>
                                    <Text style={[styles.infoValue, { color: colors.textSecondary }]}>{info.value}</Text>
                                </View>
                            ))}
                        </View>
                    </ScrollView>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContent: {
        backgroundColor: COLORS.WhiteSmoke,
        borderTopLeftRadius: wp(6),
        borderTopRightRadius: wp(6),
        height: '90%',
        overflow: 'hidden',
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
        paddingHorizontal: wp(5),
        paddingVertical: hp(2.5),
    },
    title: {
        fontSize: hp(2.8),
        fontFamily: fontFamily.FONTS.bold,
        color: COLORS.black,
    },
    content: {
        flex: 1,
        padding: wp(5),
        marginBottom: hp(2),
    },
    section: {
        padding: wp(4),
        borderRadius: wp(4),
        backgroundColor: COLORS.white,
        marginBottom: hp(2),
    },
    lastSection: {
        marginBottom: hp(2),
    },
    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: hp(2),
        gap: wp(2),
    },
    sectionTitle: {
        fontSize: hp(2),
        fontFamily: fontFamily.FONTS.Medium,
        color: COLORS.black,
    },
    option: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: hp(1.2),
        borderBottomWidth: 1,
        borderBottomColor: COLORS.gray,
    },
    optionLabel: {
        fontSize: hp(1.8),
        fontFamily: fontFamily.FONTS.Medium,
        color: COLORS.black,
    },
    button: {
        paddingHorizontal: wp(4),
        paddingVertical: hp(1),
        borderRadius: wp(2),
        backgroundColor: `${COLORS.BlazeOrange}20`,
    },
    buttonText: {
        fontSize: hp(1.7),
        color: COLORS.BlazeOrange,
        fontFamily: fontFamily.FONTS.Medium,
    },
    infoItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: hp(2),
    },
    infoItemBorder: {
        borderBottomWidth: 1,
        // borderBottomColor: COLORS.gray,
    },
    infoLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: wp(3),
    },
    infoLabel: {
        fontSize: hp(1.8),
        fontFamily: fontFamily.FONTS.Medium,
        color: COLORS.black,
    },
    infoValue: {
        fontSize: hp(1.7),
        fontFamily: fontFamily.FONTS.Medium,
        color: COLORS.darkgray1,
    },
});
