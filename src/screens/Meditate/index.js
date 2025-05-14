import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Platform
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Animated, { FadeInDown } from 'react-native-reanimated';
import ApologyCreditScoreModal from '../../components/ApologyCreditScoreModal';
import ApologyHoroscopeModal from '../../components/ApologyHoroscopeModal';
import SendApologyModal from '../../components/SendApologyModal';
import ApologyInboxModal from '../../components/ApologyInboxModal';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from '../../components/Pixel/Index';
import { COLORS, fontFamily } from '../../../constants';
import { useTheme } from '../../context/ThemeContext';
import LinearGradient from 'react-native-linear-gradient';

export default function Meditate() {
    const [showCreditScore, setShowCreditScore] = useState(false);
    const [showHoroscope, setShowHoroscope] = useState(false);
    const [showSendApology, setShowSendApology] = useState(false);
    const [showInbox, setShowInbox] = useState(false);
    const { colors } = useTheme();

    const creditScore = {
        score: 850,
        total: 1000,
        lastUpdated: '2024-03-15',
    };

    const horoscope = {
        sign: 'Libra',
        date: 'March 15, 2024',
        prediction:
            'Today is an excellent day for making amends. Your sincere apologies will be well-received, and relationships will strengthen.',
    };

    const handleSendApology = (apologyData) => {
        console.log('Sending apology:', apologyData);
    };

    const handleAcceptApology = (apologyId) => {
        console.log('Accepting apology:', apologyId);
    };

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <ScrollView
                style={styles.scrollView}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: hp(11) }}
            >
                <LinearGradient
                    colors={[colors.primary, `${colors.primary}00`]}
                    style={styles.headerGradient}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 0, y: 1 }}
                />
                <View style={styles.header}>
                    <View>
                        <Text style={[styles.headerTitle, { color: colors.text }]}>Apologies</Text>
                        <Text style={[styles.headerSubtitle, { color: colors.textSecondary }]}>Make amends and grow together</Text>
                    </View>
                </View>


                {/* Credit Score */}
                <TouchableOpacity onPress={() => setShowCreditScore(true)} activeOpacity={0.8}>
                    <Animated.View entering={FadeInDown.delay(200)} style={[styles.section, { backgroundColor: colors.surface }]}>
                        <View style={styles.sectionHeader}>
                            <MaterialIcons name="trending-up" size={hp(3)} color={COLORS.BlazeOrange} />
                            <Text style={[styles.sectionTitle, { color: colors.text }]}>Apology Credit Score</Text>
                        </View>
                        <View style={styles.creditScoreContainer}>
                            <Text style={styles.creditScore}>{creditScore.score}</Text>
                            <Text style={[styles.creditScoreTotal, { color: colors.textSecondary }]}>/{creditScore.total}</Text>
                        </View>
                        <Text style={[styles.lastUpdated, { color: colors.textSecondary }]}>Last updated: {creditScore.lastUpdated}</Text>
                    </Animated.View>
                </TouchableOpacity>

                {/* Horoscope */}
                <TouchableOpacity onPress={() => setShowHoroscope(true)} activeOpacity={0.8}>
                    <Animated.View entering={FadeInDown.delay(300)} style={[styles.section, { backgroundColor: colors.surface }]}>
                        <View style={styles.sectionHeader}>
                            <Feather name="star" size={hp(3)} color={COLORS.BlazeOrange} />
                            <Text style={[styles.sectionTitle, { color: colors.text }]}>Apology Horoscope</Text>
                        </View>
                        <View style={styles.horoscopeContainer}>
                            <Text style={[styles.horoscopeSign, { color: colors.text }]}>{horoscope.sign}</Text>
                            <Text style={[styles.horoscopeDate, { color: colors.textSecondary }]}>{horoscope.date}</Text>
                            <Text style={[styles.horoscopePrediction, { color: colors.text }]}>{horoscope.prediction}</Text>
                        </View>
                    </Animated.View>
                </TouchableOpacity>

                {/* Inbox */}
                <TouchableOpacity onPress={() => setShowInbox(true)} activeOpacity={0.8}>
                    <Animated.View entering={FadeInDown.delay(400)} style={[styles.section, { backgroundColor: colors.surface }]}>
                        <View style={styles.sectionHeader}>
                            <Ionicons name="chatbubble-ellipses-outline" size={hp(3)} color={COLORS.BlazeOrange} />
                            <Text style={[styles.sectionTitle, { color: colors.text }]}>Received Apologies</Text>
                        </View>
                        <Text style={[styles.inboxPreview, { color: colors.textSecondary }]}>
                            You have new apologies waiting for your response
                        </Text>
                    </Animated.View>
                </TouchableOpacity>

                {/* Send Apology */}
                <Animated.View entering={FadeInDown.delay(500)} style={{
                    marginHorizontal: wp(5),
                    marginVertical: hp(1),
                }}>
                    <TouchableOpacity
                        style={styles.sendButton}
                        onPress={() => setShowSendApology(true)}
                        activeOpacity={0.9}
                    >
                        <Feather name="send" size={hp(2.5)} color={COLORS.white} />
                        <Text style={styles.sendButtonText}>Send New Apology</Text>
                    </TouchableOpacity>
                </Animated.View>
            </ScrollView>

            {/* Modals */}
            <ApologyCreditScoreModal
                visible={showCreditScore}
                onClose={() => setShowCreditScore(false)}
                score={creditScore}
            />
            <ApologyHoroscopeModal
                visible={showHoroscope}
                onClose={() => setShowHoroscope(false)}
                horoscope={horoscope}
            />
            <SendApologyModal
                visible={showSendApology}
                onClose={() => setShowSendApology(false)}
                onSend={handleSendApology}
            />
            <ApologyInboxModal
                visible={showInbox}
                onClose={() => setShowInbox(false)}
                onAccept={handleAcceptApology}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    headerGradient: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 200,
        opacity: 0.15,
    },
    scrollView: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: wp('5%'),
        paddingTop: Platform.OS === 'android' ? hp('6%') : hp('8%'),
        paddingBottom: hp('2%'),
    },
    headerTitle: {
        fontSize: hp(3),
        fontFamily: fontFamily.FONTS.bold,
        color: COLORS.black,
    },
    headerSubtitle: {
        fontSize: hp(1.7),
        fontFamily: fontFamily.FONTS.Medium,
        color: COLORS.darkgray1,
        marginTop: hp(0.5),
    },
    section: {
        marginHorizontal: wp(5),
        marginVertical: hp(1),
        padding: wp(5),
        borderRadius: wp(4),
    },
    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: hp(1.5),
        gap: wp(2),
    },
    sectionTitle: {
        fontSize: hp(2.1),
        fontFamily: fontFamily.FONTS.bold,
        color: COLORS.black,
    },
    creditScoreContainer: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'center',
        marginBottom: hp(1),
    },
    creditScore: {
        fontSize: hp(5),
        fontFamily: fontFamily.FONTS.bold,
        color: COLORS.BlazeOrange,
    },
    creditScoreTotal: {
        fontSize: hp(3),
        marginLeft: wp(1),
    },
    lastUpdated: {
        fontSize: hp(1.6),
        color: COLORS.gray,
        textAlign: 'center',
    },
    horoscopeContainer: {
        alignItems: 'center',
    },
    horoscopeSign: {
        fontSize: hp(3),
        fontFamily: fontFamily.FONTS.bold,
        marginBottom: hp(0.5),
        color: COLORS.black,
    },
    horoscopeDate: {
        fontSize: hp(1.8),
        color: COLORS.gray,
        marginBottom: hp(1),
    },
    horoscopePrediction: {
        fontSize: hp(2),
        lineHeight: hp(3),
        textAlign: 'center',
        color: COLORS.black,
    },
    inboxPreview: {
        fontSize: hp(2),
        textAlign: 'center',
        color: COLORS.gray,
    },
    sendButton: {
        height: hp(6.5),
        borderRadius: hp(3.25),
        backgroundColor: COLORS.BlazeOrange,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: wp(2),
    },
    sendButtonText: {
        fontSize: hp(2),
        color: COLORS.white,
        fontFamily:fontFamily.FONTS.bold
    },
});
