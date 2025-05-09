import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Modal,
    TouchableOpacity,
    ScrollView,
    Linking,
    Platform,
} from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from './Pixel/Index';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated';
import { COLORS, fontFamily } from '../../constants'; // Adjust path if needed
import LinearGradient from 'react-native-linear-gradient';
import { useTheme } from '../context/ThemeContext';

const COMPANY_INFO = {
    name: 'Konfess Inc.',
    address: {
        street: '123 Healing Street',
        city: 'San Francisco',
        state: 'CA',
        zip: '94105',
        country: 'United States',
    },
    phone: '+1 (555) 123-4567',
    email: 'support@konfess.com',
    website: 'www.konfess.com',
    hours: [
        { days: 'Monday - Friday', time: '9:00 AM - 6:00 PM PST' },
        { days: 'Saturday', time: '10:00 AM - 4:00 PM PST' },
        { days: 'Sunday', time: 'Closed' },
    ],
};

const ContactModal = ({ visible, onClose }) => {
    const { colors } = useTheme();
    const handleCall = () => {
        Linking.openURL(`tel:${COMPANY_INFO.phone}`);
    };

    const handleEmail = () => {
        Linking.openURL(`mailto:${COMPANY_INFO.email}`);
    };

    const handleWebsite = () => {
        Linking.openURL(`https://${COMPANY_INFO.website}`);
    };

    const handleMaps = () => {
        const address = `${COMPANY_INFO.address.street}, ${COMPANY_INFO.address.city}, ${COMPANY_INFO.address.state} ${COMPANY_INFO.address.zip}`;
        const encodedAddress = encodeURIComponent(address);
        Linking.openURL(`https://maps.google.com/?q=${encodedAddress}`);
    };

    return (
        <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
            <View style={[styles.modalContainer, { backgroundColor: 'rgba(0,0,0,0.5)' }]}>
                <View style={[styles.modalContent, { backgroundColor: colors.background }]}>
                    <LinearGradient
                        colors={[colors.primary, `${colors.primary}00`]}
                        style={styles.headerGradient}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 0, y: 1 }}
                    />
                    <View style={styles.header}>
                        <Text style={[styles.title, { color: colors.text }]}>Contact Us</Text>
                        <TouchableOpacity onPress={onClose}>
                            <Feather name="x" size={hp(3)} color={colors.text} />
                        </TouchableOpacity>
                    </View>

                    <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                        <Animated.View entering={FadeInDown.delay(200)} style={[styles.section, { backgroundColor: colors.surface }]}>
                            <Text style={[styles.companyName, { color: colors.text }]}>{COMPANY_INFO.name}</Text>
                            <TouchableOpacity style={styles.contactItem} onPress={handleMaps}>
                                <Feather name="map-pin" size={hp(2.4)} color={colors.primary} />
                                <View style={styles.contactText}>
                                    <Text style={[styles.contactLabel, { color: colors.text }]}>Address</Text>
                                    <Text style={[styles.contactValue, { color: colors.textSecondary }]}>{COMPANY_INFO.address.street}</Text>
                                    <Text style={[styles.contactValue, { color: colors.textSecondary }]}>
                                        {COMPANY_INFO.address.city}, {COMPANY_INFO.address.state} {COMPANY_INFO.address.zip}
                                    </Text>
                                    <Text style={[styles.contactValue, { color: colors.textSecondary }]}>{COMPANY_INFO.address.country}</Text>
                                </View>
                                <Feather name="external-link" size={hp(2)} color={colors.primary} />
                            </TouchableOpacity>
                        </Animated.View>

                        <Animated.View entering={FadeInDown.delay(300)} style={[styles.section, { backgroundColor: colors.surface }]}>
                            <Text style={[styles.sectionTitle, { color: colors.text }]}>Get in Touch</Text>
                            <TouchableOpacity style={styles.contactItem} onPress={handleCall}>
                                <Feather name="phone" size={hp(2.4)} color={colors.primary} />
                                <View style={styles.contactText}>
                                    <Text style={[styles.contactLabel, { color: colors.text }]}>Phone</Text>
                                    <Text style={[styles.contactValue, { color: colors.textSecondary }]}>{COMPANY_INFO.phone}</Text>
                                </View>
                                <Feather name="external-link" size={hp(2)} color={colors.primary} />
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.contactItem} onPress={handleEmail}>
                                <Feather name="mail" size={hp(2.4)} color={colors.primary} />
                                <View style={styles.contactText}>
                                    <Text style={[styles.contactLabel, { color: colors.text }]}>Email</Text>
                                    <Text style={[styles.contactValue, { color: colors.textSecondary }]}>{COMPANY_INFO.email}</Text>
                                </View>
                                <Feather name="external-link" size={hp(2)} color={colors.primary} />
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.contactItem} onPress={handleWebsite}>
                                <Feather name="globe" size={hp(2.4)} color={colors.primary} />
                                <View style={styles.contactText}>
                                    <Text style={[styles.contactLabel, { color: colors.text }]}>Website</Text>
                                    <Text style={[styles.contactValue, { color: colors.textSecondary }]}>{COMPANY_INFO.website}</Text>
                                </View>
                                <Feather name="external-link" size={hp(2)} color={colors.primary} />
                            </TouchableOpacity>
                        </Animated.View>

                        <Animated.View entering={FadeInDown.delay(400)} style={[styles.section, { backgroundColor: colors.surface }]}>
                            <Text style={[styles.sectionTitle, { color: colors.text }]}>Business Hours</Text>
                            {COMPANY_INFO.hours.map((item, index) => (
                                <View key={index} style={styles.scheduleItem}>
                                    <Feather name="clock" size={hp(2.2)} color={colors.primary} />
                                    <View style={styles.scheduleText}>
                                        <Text style={[styles.scheduleDays, { color: colors.text }]}>{item.days}</Text>
                                        <Text style={[styles.scheduleTime, { color: colors.textSecondary }]}>{item.time}</Text>
                                    </View>
                                </View>
                            ))}
                        </Animated.View>

                        <Animated.View entering={FadeIn.delay(500)} style={styles.footer}>
                            <Text style={[styles.footerText, { color: colors.textSecondary }]}>
                                We aim to respond to all inquiries within 24 hours during business hours.
                            </Text>
                        </Animated.View>
                    </ScrollView>
                </View>
            </View>
        </Modal>
    );
};

export default ContactModal;

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContent: {
        height: '90%',
        backgroundColor: COLORS.WhiteSmoke,
        borderTopLeftRadius: wp(5),
        borderTopRightRadius: wp(5),
        paddingHorizontal: wp(4),
        paddingTop: hp(2),
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
        marginBottom: hp(2),
    },
    title: {
        fontSize: hp(3),
      fontFamily:fontFamily.FONTS.bold,
        color: COLORS.black,
    },
    content: {
        flex: 1,
        marginVertical: hp(2),
    },
    section: {
        padding: wp(4),
        backgroundColor: COLORS.white,
        borderRadius: wp(4),
        marginBottom: hp(2),
    },
    companyName: {
        fontSize: hp(2.2),
        fontFamily: fontFamily.FONTS.bold,
        marginBottom: hp(1.5),
        color: COLORS.black,
    },
    sectionTitle: {
        fontSize: hp(2),
        fontFamily: fontFamily.FONTS.Medium,
        marginBottom: hp(1.5),
        color: COLORS.black,
    },
    contactItem: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: hp(1.5),
        gap: wp(3),
    },
    contactText: {
        flex: 1,
    },
    contactLabel: {
        fontSize: hp(1.8),
        fontFamily: fontFamily.FONTS.Medium,
        marginBottom: hp(0.5),
        color: COLORS.black,
    },
    contactValue: {
        fontSize: hp(1.8),
        lineHeight: hp(2.2),
        color: COLORS.darkgray,
    },
    scheduleItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: hp(1.5),
        gap: wp(3),
    },
    scheduleText: {
        flex: 1,
    },
    scheduleDays: {
        fontSize: hp(1.8),
        fontFamily: fontFamily.FONTS.Medium,
        marginBottom: hp(0.3),
        color: COLORS.black,
    },
    scheduleTime: {
        fontSize: hp(1.6),
        color: COLORS.darkgray,
    },
    footer: {
        marginTop: hp(2),
        marginBottom: hp(4),
    },
    footerText: {
        fontSize: hp(1.6),
        textAlign: 'center',
        lineHeight: hp(2.2),
        color: COLORS.darkgray,
    },
});
