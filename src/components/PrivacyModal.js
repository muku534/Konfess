import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Modal,
    TouchableOpacity,
    ScrollView,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from './Pixel/Index';
import { COLORS, fontFamily } from '../../constants';
import LinearGradient from 'react-native-linear-gradient';
import LegalModal from './LegalModal';
import ContactModal from './ContactModal';
import { useTheme } from '../context/ThemeContext';

const PrivacyModal = ({ visible, onClose }) => {
    const { colors } = useTheme();
    const [showTerms, setShowTerms] = useState(false);
    const [showPrivacy, setShowPrivacy] = useState(false);
    const [showContact, setShowContact] = useState(false);
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

    const privacySettings = [
        {
            title: 'Legal',
            icon: 'file-text-o',
            options: [
                {
                    label: 'Terms and Conditions',
                    isLink: true,
                    onPress: () => setShowTerms(true),
                },
                {
                    label: 'Privacy Policy',
                    isLink: true,
                    onPress: () => setShowPrivacy(true),
                },
            ],
        },
        {
            title: 'Support',
            icon: 'envelope-o',
            options: [
                {
                    label: 'Contact Us',
                    isLink: true,
                    onPress: () => setShowContact(true),
                },
            ],
        },
        {
            title: 'Account',
            icon: 'shield',
            options: [
                {
                    label: 'Delete Account',
                    isDanger: true,
                    onPress: () => setShowDeleteConfirmation(true),
                },
            ],
        },
    ];

    const handleDeleteAccount = () => {
        setShowDeleteConfirmation(false);
        onClose();
    };

    return (
        <>
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
                            <Text style={[styles.title, { color: colors.text }]}>Privacy</Text>
                            <TouchableOpacity onPress={onClose}>
                                <Feather name="x" size={hp(3)} color={colors.text} />
                            </TouchableOpacity>
                        </View>

                        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                            {privacySettings.map((section, index) => (
                                <View
                                    key={index}
                                    style={[styles.section, { backgroundColor: colors.surface }, index === privacySettings.length - 1 && styles.lastSection]}
                                >
                                    <View style={styles.sectionHeader}>
                                        <FontAwesome name={section.icon} size={hp(2.5)} color={colors.primary} />
                                        <Text style={[styles.sectionTitle, { color: colors.text }]}>{section.title}</Text>
                                    </View>

                                    {section.options.map((option, i) => (
                                        <TouchableOpacity
                                            key={i}
                                            style={[styles.option, option.isDanger && { backgroundColor: `${COLORS.BlazeOrange}11` }]}
                                            onPress={option.onPress}
                                            activeOpacity={0.7}
                                        >
                                            <Text style={[styles.optionLabel, {
                                                color: option.isDanger ? colors.textDanger : colors.text, fontFamily: fontFamily.FONTS.bold
                                            }]}>
                                                {option.label}
                                            </Text>
                                            {option.isLink && (
                                                <Text style={[styles.linkText, { color: COLORS.BlazeOrange }]}>View</Text>
                                            )}
                                            {option.isDanger && <Feather name="trash-2" size={hp(2.2)} color={COLORS.BlazeOrange} />}
                                        </TouchableOpacity>
                                    ))}
                                </View>
                            ))}
                        </ScrollView>
                    </View>
                </View>
            </Modal>

            <Modal
                visible={showDeleteConfirmation}
                transparent
                animationType="fade"
                onRequestClose={() => setShowDeleteConfirmation(false)}
            >
                <View style={[styles.confirmationContainer, { backgroundColor: 'rgba(0,0,0,0.5)' }]}>
                    <View style={[styles.confirmationContent, { backgroundColor: colors.background }]}>
                        <Feather name="alert-triangle" size={hp(6)} color={colors.textDanger} style={{ marginBottom: hp(2) }} />
                        <Text style={[styles.confirmationTitle, { color: colors.text }]}>Delete Account</Text>
                        <Text style={[styles.confirmationText, { color: colors.textSecondary }]}>
                            This action cannot be undone. All your data, including confessions, reflections, and settings will be permanently deleted.
                        </Text>

                        <View style={styles.confirmationButtons}>
                            <TouchableOpacity
                                style={[styles.cancelButton, { backgroundColor: colors.surface }]}
                                onPress={() => setShowDeleteConfirmation(false)}
                            >
                                <Text style={[styles.buttonText, { color: colors.text }]}>Cancel</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[styles.deleteButton, { backgroundColor: colors.textDanger }]}
                                onPress={handleDeleteAccount}
                            >
                                <Feather name="trash-2" size={hp(2.2)} color="#fff" />
                                <Text style={[styles.buttonText, { color: '#fff' }]}>Delete</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

            <LegalModal visible={showTerms} onClose={() => setShowTerms(false)} type="terms" />
            <LegalModal visible={showPrivacy} onClose={() => setShowPrivacy(false)} type="privacy" />
            <ContactModal visible={showContact} onClose={() => setShowContact(false)} />
        </>
    );
};

export default PrivacyModal;

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContent: {
        borderTopLeftRadius: wp(6),
        borderTopRightRadius: wp(6),
        height: '90%',
        backgroundColor: COLORS.WhiteSmoke,
        padding: wp(4),
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
        padding: wp(1),
        marginBottom: hp(2),
    },
    title: {
        fontSize: hp(3),
        fontFamily: fontFamily.FONTS.bold,
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
    lastSection: {
        marginBottom: 0,
    },
    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: hp(1.5),
    },
    sectionTitle: {
        fontSize: hp(2.2),
        fontFamily: fontFamily.FONTS.bold,
        marginLeft: wp(2),
        color: COLORS.black,
    },
    option: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: hp(1.2),
        paddingHorizontal: wp(3),
        borderRadius: wp(3),
        marginBottom: hp(1),
    },
    optionLabel: {
        fontSize: hp(1.8),
        color: COLORS.black,
    },
    linkText: {
        fontSize: hp(1.6),
        fontFamily:fontFamily.FONTS.Medium,
    },
    confirmationContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
        padding: wp(5),
    },
    confirmationContent: {
        backgroundColor: COLORS.WhiteSmoke,
        borderRadius: wp(6),
        padding: wp(5),
        width: '100%',
        alignItems: 'center',
    },
    confirmationTitle: {
        fontSize: hp(2.5),
        fontFamily: fontFamily.FONTS.bold,
        color: COLORS.black,
        marginBottom: hp(1.5),
    },
    confirmationText: {
        fontSize: hp(1.8),
        color: COLORS.darkgray,
        textAlign: 'center',
        marginBottom: hp(3),
    },
    confirmationButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        gap: wp(2),
    },
    cancelButton: {
        flex: 1,
        backgroundColor: COLORS.white,
        paddingVertical: hp(1.5),
        borderRadius: wp(3),
        alignItems: 'center',
    },
    deleteButton: {
        flex: 1,
        backgroundColor: COLORS.BlazeOrange,
        paddingVertical: hp(1.5),
        borderRadius: wp(3),
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: wp(2),
    },
    buttonText: {
        fontSize: hp(1.9),
        fontFamily: fontFamily.FONTS.bold,
        color: COLORS.black,
    },
});