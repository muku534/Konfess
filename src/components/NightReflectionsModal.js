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
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from './Pixel/Index';
import LinearGradient from 'react-native-linear-gradient';
import Animated, { FadeIn } from 'react-native-reanimated';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { COLORS, fontFamily } from '../../constants';
import { useTheme } from '../context/ThemeContext';

const reflections = [
    {
        id: 1,
        date: 'March 12, 2024',
        highlight: "Had a breakthrough at work with the new project",
        challenge: "Dealing with tight deadlines, managed by prioritizing tasks",
        gratitude: "Grateful for my supportive team and family",
        learning: "I work better under pressure than I thought",
        tomorrow: "Focus on maintaining work-life balance",
    },
    {
        id: 2,
        date: 'March 11, 2024',
        highlight: "Completed my first meditation session",
        challenge: "Staying focused during meditation, used breathing techniques",
        gratitude: "The peaceful moments of silence and reflection",
        learning: "Patience is key to personal growth",
        tomorrow: "Continue building my meditation practice",
    },
    {
        id: 3,
        date: 'March 10, 2024',
        highlight: "Had a great dinner with old friends",
        challenge: "Managing social anxiety, practiced mindfulness",
        gratitude: "The ability to reconnect with people who matter",
        learning: "I'm stronger than my fears",
        tomorrow: "Reach out to more friends",
    },
];

export default function NightReflectionsModal({ visible, onClose }) {
    const { colors } = useTheme();

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
                        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                            <Feather name="x" size={hp(2.8)} color={colors.text} />
                        </TouchableOpacity>
                        <View style={styles.titleContainer}>
                            <FontAwesome5 name="moon" size={hp(2.5)} color={colors.primary} />
                            <Text style={[styles.title, { color: colors.text }]}>Night Reflections</Text>
                            <FontAwesome5 name="star" size={hp(2.5)} color={colors.primary} solid />
                        </View>
                        <View style={{ width: wp(8) }} />
                    </View>

                    <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                        {reflections.map((reflection, index) => (
                            <Animated.View
                                key={reflection.id}
                                entering={FadeIn.delay(index * 100)}
                                style={[styles.reflectionCard, { backgroundColor: colors.surface }]}
                            >
                                <View style={styles.cardHeader}>
                                    <View style={styles.dateContainer}>
                                        <MaterialCommunityIcons name="calendar" size={hp(2.8)} color={colors.primary} />
                                        <Text style={[styles.dateText, { color: colors.text }]}>{reflection.date}</Text>
                                    </View>
                                    <Ionicons name="chevron-forward" size={hp(2.2)} color={colors.textSecondary} />
                                </View>

                                <View style={styles.cardContent}>
                                    <View style={styles.reflectionItem}>
                                        <Text style={[styles.itemLabel, { color: colors.textSecondary }]}>
                                            Highlight
                                        </Text>
                                        <Text style={[styles.itemText, { color: colors.text }]}>
                                            {reflection.highlight}
                                        </Text>
                                    </View>

                                    <View style={styles.reflectionItem}>
                                        <Text style={[styles.itemLabel, { color: colors.textSecondary }]}>
                                            Gratitude
                                        </Text>
                                        <Text style={[styles.itemText, { color: colors.text }]}>
                                            {reflection.gratitude}
                                        </Text>
                                    </View>

                                    <View style={styles.reflectionItem}>
                                        <Text style={[styles.itemLabel, { color: colors.textSecondary }]}>
                                            Tomorrow's Focus
                                        </Text>
                                        <Text style={[styles.itemText, { color: colors.text }]}>
                                            {reflection.tomorrow}
                                        </Text>
                                    </View>
                                </View>
                            </Animated.View>
                        ))}
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
        backgroundColor: COLORS.white,
        borderTopLeftRadius: wp(6),
        borderTopRightRadius: wp(6),
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
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: wp(5),
    },
    closeButton: {
        padding: wp(1),
    },
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: wp(3),
    },
    title: {
        fontSize: hp(2.5),
        fontFamily: fontFamily.FONTS.bold,
        color: COLORS.black,
    },
    content: {
        flex: 1,
        paddingHorizontal: wp(5),
        paddingTop: hp(1),
    },
    reflectionCard: {
        backgroundColor: COLORS.white,
        borderRadius: wp(4),
        marginBottom: hp(2),
        overflow: Platform.OS === 'ios' ? 'visible' : 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.07,
        shadowRadius: 6,
        elevation: 1,
    },

    cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: wp(4),
        borderBottomWidth: 0.8,
        borderBottomColor: COLORS.gray,
    },
    dateContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: wp(2),
    },
    dateText: {
        fontSize: hp(1.9),
        fontFamily: fontFamily.FONTS.bold,
        color: COLORS.darkgray,
    },
    cardContent: {
        padding: wp(4),
        gap: hp(2),
    },
    reflectionItem: {
        gap: hp(0.5),
    },
    itemLabel: {
        fontSize: hp(1.8),
        fontFamily: fontFamily.FONTS.Medium,
        color: COLORS.darkgray,
    },
    itemText: {
        fontSize: hp(1.7),
        lineHeight: hp(3),
        fontFamily: fontFamily.FONTS.Regular,
        color: COLORS.darkgray,
    },
});
