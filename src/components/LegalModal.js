import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Modal,
    TouchableOpacity,
    ScrollView,
    Platform,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Feather'; // Using 'X' from Feather
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from './Pixel/Index';
import { COLORS, fontFamily } from '../../constants';
import { useTheme } from '../context/ThemeContext';

const LegalModal = ({ visible, onClose, type }) => {
    const { colors } = useTheme();
    const TERMS_CONTENT = [
        {
            title: '1. Acceptance of Terms',
            content: 'By accessing and using Konfess, you agree to be bound by these Terms and Conditions. If you do not agree to these terms, please do not use the app.',
        },
        {
            title: '2. User Conduct',
            content: 'Users must maintain respectful communication and refrain from posting harmful, offensive, or illegal content. Any violation may result in account termination.',
        },
        {
            title: '3. Privacy',
            content: 'Your privacy is important to us. While we maintain anonymity for confessions, we collect certain data as outlined in our Privacy Policy.',
        },
        {
            title: '4. Content Ownership',
            content: 'Users retain ownership of their content but grant Konfess a license to display and distribute the content within the app.',
        },
        {
            title: '5. Prohibited Activities',
            content: 'Users may not: \n- Post illegal content\n- Harass other users\n- Impersonate others\n- Distribute spam\n- Attempt to breach security measures',
        },
        {
            title: '6. Termination',
            content: 'We reserve the right to terminate or suspend accounts that violate these terms or for any other reason at our discretion.',
        },
        {
            title: '7. Disclaimer',
            content: 'Konfess is provided "as is" without warranties of any kind, either express or implied.',
        },
        {
            title: '8. Changes to Terms',
            content: 'We may modify these terms at any time. Continued use of Konfess after changes constitutes acceptance of the modified terms.',
        },
    ];

    const PRIVACY_CONTENT = [
        {
            title: '1. Information We Collect',
            content: 'We collect:\n- Account information (email)\n- Usage data\n- Device information\n- Confessions and interactions',
        },
        {
            title: '2. How We Use Information',
            content: 'We use collected information to:\n- Provide and improve services\n- Maintain security\n- Send notifications\n- Analyze usage patterns',
        },
        {
            title: '3. Data Protection',
            content: 'We implement security measures to protect your data. However, no method of transmission over the internet is 100% secure.',
        },
        {
            title: '4. Anonymous Content',
            content: 'Confessions are posted anonymously. However, account-related activities may be linked to your profile.',
        },
        {
            title: '5. Data Sharing',
            content: 'We do not sell your personal data. We may share data with:\n- Service providers\n- Law enforcement when required\n- Other users (anonymous content only)',
        },
        {
            title: '6. Your Rights',
            content: 'You have the right to:\n- Access your data\n- Request data deletion\n- Opt out of communications\n- Update your information',
        },
        {
            title: '7. Cookies',
            content: 'We use cookies and similar technologies to improve user experience and collect usage data.',
        },
        {
            title: '8. Changes to Policy',
            content: 'We may update this policy periodically. Continued use of Konfess after changes constitutes acceptance of the updated policy.',
        },
    ];

    const content = type === 'terms' ? TERMS_CONTENT : PRIVACY_CONTENT;
    const title = type === 'terms' ? 'Terms and Conditions' : 'Privacy Policy';

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
                        <Text style={[styles.title, { color: colors.text }]}>{title}</Text>
                        <TouchableOpacity onPress={onClose}>
                            <Icon name="x" size={hp(3)} color={colors.text} />
                        </TouchableOpacity>
                    </View>

                    <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                        <Text style={[styles.lastUpdated, { color: colors.textSecondary }]}>Last updated: March 15, 2024</Text>

                        {content.map((section, index) => (
                            <View key={index} style={[styles.section, { backgroundColor: colors.surface }]}>
                                <Text style={[styles.sectionTitle, { color: colors.text }]}>{section.title}</Text>
                                <Text style={[styles.sectionContent, { color: colors.textSecondary }]}>{section.content}</Text>
                            </View>
                        ))}

                        <View style={styles.footer}>
                            <Text style={[styles.footerText, { color: colors.textSecondary }]}>
                                If you have any questions about these {type === 'terms' ? 'Terms and Conditions' : 'Privacy Policy'}, please contact us.
                            </Text>
                        </View>
                    </ScrollView>
                </View>
            </View>
        </Modal>
    );
};

export default LegalModal;

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContent: {
        height: '90%',
        borderTopLeftRadius: wp(6),
        borderTopRightRadius: wp(6),
        overflow: 'hidden',
        backgroundColor: COLORS.WhiteSmoke,
    }
    ,
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
        paddingTop: Platform.OS === 'ios' ? hp(5) : hp(2.5),
        paddingBottom: hp(2),
    },
    title: {
        fontSize: hp(2.8),
        fontFamily: fontFamily.FONTS.bold,
        color: COLORS.black,
    },
    content: {
        paddingHorizontal: wp(5),
    },
    lastUpdated: {
        fontSize: hp(1.6),
        marginBottom: hp(2),
        fontStyle: 'italic',
        color: COLORS.darkgray,
    },
    section: {
        padding: wp(4),
        backgroundColor: COLORS.white,
        borderRadius: wp(4),
        marginBottom: hp(2),
    },
    sectionTitle: {
        fontSize: hp(2),
        fontFamily: fontFamily.FONTS.Medium,
        marginBottom: hp(1),
        color: COLORS.black,
    },
    sectionContent: {
        fontSize: hp(1.8),
        lineHeight: hp(3),
        color: COLORS.darkgray,
    },
    footer: {
        marginTop: hp(2),
        marginBottom: hp(5),
        paddingHorizontal: wp(5),
    },
    footerText: {
        fontSize: hp(1.6),
        textAlign: 'center',
        lineHeight: hp(2.5),
        color: COLORS.darkgray,
    },
});
