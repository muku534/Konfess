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
import Animated, { FadeInDown } from 'react-native-reanimated';
import Feather from 'react-native-vector-icons/Feather';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from './Pixel/Index';
import { COLORS, fontFamily } from '../../constants';
import { useTheme } from '../context/ThemeContext';

const FACTORS = [
    {
        title: 'Sincerity Score',
        icon: 'heart',
        score: 95,
        maxScore: 250,
        description: 'Based on emotional depth and authenticity of your apologies',
        impact: 'High',
        metrics: [],
    },
    {
        title: 'Response Time',
        icon: 'clock',
        score: 176,
        maxScore: 200,
        description: 'How quickly you acknowledge and address conflicts',
        impact: 'Medium',
        metrics: [],
    },
    {
        title: 'Follow-up Actions',
        icon: 'message-circle',
        score: 184,
        maxScore: 200,
        description: 'Concrete steps taken to make amends',
        impact: 'High',
        metrics: [],
    },
    {
        title: 'Acceptance Rate',
        icon: 'thumbs-up',
        score: 180,
        maxScore: 200,
        description: 'How well your apologies are received',
        impact: 'High',
        metrics: [],
    },
    {
        title: 'Growth Indicators',
        icon: 'trending-up',
        score: 135,
        maxScore: 150,
        description: 'Learning and improvement from past experiences',
        impact: 'Medium',
        metrics: [],
    },
];

const TIPS = [
    'Be specific about what you\'re apologizing for',
    'Express genuine remorse and understanding',
    'Take responsibility without making excuses',
    'Offer to make amends when appropriate',
    'Give the other person time to process',
    'Follow through on promised changes',
    'Learn from the experience',
    'Practice active listening',
];

export default function ApologyCreditScoreModal({ visible, onClose, score }) {
    const { colors } = useTheme();
    return (
        <Modal
            visible={visible}
            transparent
            animationType="slide"
            onRequestClose={onClose}
        >
            <View style={styles.modalContainer}>
                <View style={[styles.modalContent, { backgroundColor: colors.background }]}>
                    <LinearGradient
                        colors={[colors.primary, `${colors.primary}00`]}
                        style={styles.headerGradient}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 0, y: 1 }}
                    />
                    <View style={styles.header}>
                        <TouchableOpacity onPress={onClose}>
                            <Feather name="x" size={wp(5)} color={colors.text} />
                        </TouchableOpacity>
                        <Text style={[styles.headerTitle, { color: colors.text }]}>Credit Score Details</Text>
                        <View style={{ width: wp(5) }} />
                    </View>

                    <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                        <Animated.View entering={FadeInDown.delay(200)} style={[styles.scoreSection, { backgroundColor: colors.surface }]}>
                            <View style={styles.scoreHeader}>
                                <Feather name="trending-up" size={wp(7)} color={COLORS.BlazeOrange} />
                                <Text style={[styles.scoreTitle, { color: colors.text }]}>Your Apology Credit Score</Text>
                            </View>
                            <View style={styles.scoreContainer}>
                                <Text style={[styles.score, { color: COLORS.BlazeOrange }]}>{score.score}</Text>
                                <Text style={[styles.scoreTotal, { color: colors.text }]}>/{score.total}</Text>
                            </View>
                            <Text style={[styles.scoreRating, { color: colors.text }]}>Excellent</Text>
                            <Text style={[styles.lastUpdated, { color: colors.textSecondary }]}>Last updated: {score.lastUpdated}</Text>
                        </Animated.View>

                        <Animated.View entering={FadeInDown.delay(300)} style={[styles.section, { backgroundColor: colors.surface }]}>
                            <Text style={[styles.sectionTitle, { color: colors.text }]}>Score Factors</Text>
                            {FACTORS.map((factor, index) => (
                                <View key={index} style={[styles.factor, { backgroundColor: `${colors.primary}11` }]}>
                                    <View style={styles.factorHeader}>
                                        <View style={styles.factorTitleContainer}>
                                            <Feather name={factor.icon} size={wp(4.5)} color={COLORS.BlazeOrange} />
                                            <Text style={[styles.factorTitle, { color: colors.text }]}>{factor.title}</Text>
                                        </View>
                                        <View style={[styles.impactBadge, { backgroundColor: `${colors.primary}22` }]}>
                                            <Text style={[styles.impactText, { color: COLORS.BlazeOrange }]}>{factor.impact} Impact</Text>
                                        </View>
                                    </View>
                                    <View style={styles.scoreBar}>
                                        <View
                                            style={[
                                                styles.scoreProgress,
                                                {
                                                    width: `${(factor.score / factor.maxScore) * 100}%`,
                                                },
                                                { backgroundColor: COLORS.BlazeOrange }
                                            ]}
                                        />
                                    </View>
                                    <View style={styles.scoreDetails}>
                                        <Text style={[styles.scoreValue, { color: colors.text }]}>
                                            {factor.score}/{factor.maxScore}
                                        </Text>
                                        <Text style={[styles.scoreDescription, { color: colors.textSecondary }]}>{factor.description}</Text>
                                    </View>
                                </View>
                            ))}
                        </Animated.View>

                        <Animated.View entering={FadeInDown.delay(400)} style={[styles.section, { backgroundColor: colors.surface }]}>
                            <View style={styles.tipsHeader}>
                                <Feather name="shield" size={wp(5)} color={COLORS.BlazeOrange} />
                                <Text style={[styles.sectionTitle, { color: colors.text }]}>Tips to Improve Your Score</Text>
                            </View>
                            {TIPS.map((tip, index) => (
                                <View key={index} style={[styles.tip, { backgroundColor: `${colors.primary}11` }]}>
                                    <Text style={[styles.tipNumber, { color: COLORS.BlazeOrange }]}>{index + 1}</Text>
                                    <Text style={[styles.tipText, { color: colors.text }]}>{tip}</Text>
                                </View>
                            ))}
                        </Animated.View>
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
        height: hp(90),
        borderTopLeftRadius: wp(6),
        borderTopRightRadius: wp(6),
        overflow: 'hidden',
    },
    headerGradient: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: hp(25),
        opacity: 0.15,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: wp(5),
        paddingTop: Platform.OS === 'ios' ? hp(6) : hp(3),
        paddingBottom: hp(2),
    },
    headerTitle: {
        fontSize: wp(5),
        fontFamily: fontFamily.FONTS.bold
    },
    content: {
        flex: 1,
        paddingHorizontal: wp(5),
    },
    scoreSection: {
        borderRadius: wp(4),
        padding: wp(5),
        alignItems: 'center',
        marginBottom: hp(2),
    },
    scoreHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: wp(2),
        marginBottom: hp(2),
    },
    scoreTitle: {
        fontSize: wp(4.5),
        fontFamily: fontFamily.FONTS.bold,
    },
    scoreContainer: {
        flexDirection: 'row',
        alignItems: 'baseline',
    },
    score: {
        fontSize: wp(14),
        fontFamily: fontFamily.FONTS.bold,
    },
    scoreTotal: {
        fontSize: wp(8),
        marginLeft: wp(1),
    },
    scoreRating: {
        fontSize: wp(5),
        fontFamily: fontFamily.FONTS.bold,
        marginTop: hp(1),
    },
    lastUpdated: {
        fontSize: wp(3.5),
        fontFamily: fontFamily.FONTS.Medium,
        marginTop: hp(0.5),
    },
    section: {
        padding: wp(5),
        borderRadius: wp(4),
        marginBottom: hp(2),
    },
    sectionTitle: {
        fontSize: wp(5),
        fontFamily: fontFamily.FONTS.bold,
        marginBottom: hp(1),
    },
    factor: {
        padding: wp(4),
        borderRadius: wp(4),
        marginBottom: hp(1.5),
    },
    factorHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: hp(1),
    },
    factorTitleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: wp(2),
    },
    factorTitle: {
        fontSize: wp(4),
        fontFamily: fontFamily.FONTS.Medium,
    },
    impactBadge: {
        paddingHorizontal: wp(2),
        paddingVertical: hp(0.5),
        borderRadius: wp(2),
    },
    impactText: {
        fontSize: wp(3),
        fontFamily: fontFamily.FONTS.bold
    },
    scoreBar: {
        height: hp(1),
        backgroundColor: '#ddd',
        borderRadius: wp(5),
        marginBottom: hp(1),
    },
    scoreProgress: {
        height: '100%',
        borderRadius: wp(5),
    },
    scoreDetails: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: wp(2),
    },
    scoreValue: {
        fontSize: wp(4),
        fontFamily: fontFamily.FONTS.Medium,
        minWidth: wp(12),
    },
    scoreDescription: {
        flex: 1,
        fontFamily: fontFamily.FONTS.Medium,
        fontSize: wp(3.5),
    },
    tipsHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: wp(2),
        marginBottom: hp(1.5),
    },
    tip: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: wp(4),
        borderRadius: wp(4),
        marginBottom: hp(1.2),
        gap: wp(3),
    },
    tipNumber: {
        fontSize: wp(4),
        fontFamily: fontFamily.FONTS.bold,
        minWidth: wp(6),
    },
    tipText: {
        flex: 1,
        fontFamily: fontFamily.FONTS.bold,
        fontSize: wp(4),
    },
});
