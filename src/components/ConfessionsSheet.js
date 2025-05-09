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
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useTheme } from '../context/ThemeContext';

const ConfessionsModal = ({ visible, onClose }) => {
    const { colors } = useTheme();
    const confessions = [
        {
            id: 1,
            title: "Career Transition Anxiety",
            text: "I've been pretending to be happy at work for months now. I'm actually looking for a new job but haven't told anyone.",
            time: '2 days ago',
            likes: 24,
            comments: 8,
            isLiked: true,
            isSaved: true,
        },
        {
            id: 2,
            title: "Imposter Syndrome",
            text: "Sometimes I feel like I'm not doing enough with my life, even though everyone tells me I'm successful.",
            time: '1 week ago',
            likes: 156,
            comments: 42,
            isLiked: false,
            isSaved: true,
        },
        {
            id: 3,
            title: "Lost Opportunity",
            text: "I secretly learned to play guitar to surprise my partner on our anniversary, but we broke up before I could show them.",
            time: '2 weeks ago',
            likes: 89,
            comments: 15,
            isLiked: true,
            isSaved: false,
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
                    <View style={[styles.header, { borderBottomColor: colors.border }]}>
                        <Text style={[styles.title, { color: colors.text }]}>My Confessions</Text>
                        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                            <Ionicons name="close" size={hp(3)} color={colors.text} />
                        </TouchableOpacity>
                    </View>

                    <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                        {confessions.map((confession) => (
                            <View
                                key={confession.id}
                                style={[styles.confessionCard, { backgroundColor: colors.surface }]}
                            >
                                <View style={styles.cardHeader}>
                                    <View style={styles.cardMeta}>
                                        <View style={[styles.dot, { backgroundColor: colors.primary }]} />
                                        <Text style={[styles.timeText, { color: colors.textSecondary }]}>{confession.time}</Text>
                                    </View>
                                    <TouchableOpacity>
                                        <Feather name="more-horizontal" size={hp(2.2)} color={colors.textSecondary} />
                                    </TouchableOpacity>
                                </View>

                                <Text style={[styles.confessionTitle, { color: colors.text }]}>
                                    {confession.title}
                                </Text>

                                <Text style={[styles.confessionText, { color: colors.text }]}>
                                    {confession.text}
                                </Text>


                                <View style={styles.cardActions}>
                                    <View style={styles.actionGroup}>
                                        <TouchableOpacity style={styles.actionButton}>
                                            <FontAwesome
                                                name={confession.isLiked ? 'heart' : 'heart-o'}
                                                size={hp(2.2)}
                                                color={confession.isLiked ? colors.primary : colors.textSecondary}
                                            />
                                            <Text style={[styles.actionText, { color: colors.textSecondary }]}>{confession.likes}</Text>
                                        </TouchableOpacity>

                                        <TouchableOpacity style={styles.actionButton}>
                                            <Ionicons name="chatbubble-outline" size={hp(2.2)} color={colors.textSecondary} />
                                            <Text style={[styles.actionText, { color: colors.textSecondary }]}>{confession.comments}</Text>
                                        </TouchableOpacity>

                                        <TouchableOpacity style={styles.actionButton}>
                                            <Ionicons name="share-social-outline" size={hp(2.2)} color={colors.textSecondary} />
                                        </TouchableOpacity>
                                    </View>

                                    <TouchableOpacity>
                                        <Feather
                                            name="bookmark"
                                            size={hp(2.2)}
                                            color={confession.isSaved ? colors.primary : colors.textSecondary}
                                        />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        ))}
                    </ScrollView>
                </View>
            </View>
        </Modal>
    );
};

export default ConfessionsModal;

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContent: {
        backgroundColor: COLORS.white,
        borderTopLeftRadius: wp(5),
        borderTopRightRadius: wp(5),
        height: '90%',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: wp(5),
        borderBottomWidth: 0.7,
        // borderBottomColor: COLORS.gray,
    },
    title: {
        fontSize: hp(2.8),
        fontFamily: fontFamily.FONTS.bold,
        color: COLORS.black,
    },
    closeButton: {
        padding: wp(2),
    },
    content: {
        flex: 1,
        padding: wp(5),
    },
    confessionCard: {
        backgroundColor: COLORS.white,
        borderRadius: wp(4),
        padding: wp(4),
        marginBottom: hp(2),
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 6,
        elevation: 2,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: hp(1.5),
    },
    cardMeta: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: wp(2),
    },
    dot: {
        width: hp(1),
        height: hp(1),
        borderRadius: hp(1),
        backgroundColor: COLORS.BlazeOrange,
        marginRight: wp(1.5),
    },
    timeText: {
        fontSize: hp(1.6),
        color: COLORS.darkgray1,
    },
    confessionTitle: {
        fontSize: hp(2.2),
        fontFamily: fontFamily.FONTS.bold,
        marginBottom: hp(1),
        color: COLORS.black,
    },
    confessionText: {
        fontSize: hp(1.9),
        lineHeight: hp(3),
        color: COLORS.black,
        marginBottom: hp(2),
    },
    cardActions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    actionGroup: {
        flexDirection: 'row',
        gap: wp(5),
    },
    actionButton: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: wp(1.5),
    },
    actionText: {
        fontSize: hp(1.6),
        color: COLORS.darkgray1,
    },
});