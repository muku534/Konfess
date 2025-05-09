import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from './Pixel/Index';
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Ionicons from "react-native-vector-icons/Ionicons";
import Feather from "react-native-vector-icons/Feather";
import { COLORS, fontFamily } from '../../constants';

const mockConfessions = [
    {
        id: '1',
        title: 'Career Transition Anxiety',
        content: "I've been pretending to be happy at work for months now. I'm actually looking for a new job but haven't told anyone.",
        timeAgo: '2 days ago',
        likes: 24,
        comments: 8,
        bookmarked: true,
        liked: true,
    },
    {
        id: '2',
        title: 'Imposter Syndrome',
        content: "Sometimes I feel like I'm not doing enough with my life, even though everyone tells me I'm successful.",
        timeAgo: '1 week ago',
        likes: 156,
        comments: 42,
        bookmarked: true,
        liked: false,
    },
    {
        id: 3,
        title: "Lost Opportunity",
        content: "I secretly learned to play guitar to surprise my partner on our anniversary, but we broke up before I could show them.",
        timeAgo: '2 weeks ago',
        likes: 89,
        comments: 15,
        bookmarked: true,
        liked: false,
    },
    {
        id: 4,
        title: "Lost Opportunity",
        content: "I secretly learned to play guitar to surprise my partner on our anniversary, but we broke up before I could show them.",
        timeAgo: '2 weeks ago',
        likes: 89,
        comments: 15,
        bookmarked: true,
        liked: false,
    },
];

const ConfessionsSheet = () => {
    const renderItem = ({ item }) => (
        <View style={styles.card}>
            <View style={styles.timeContainer}>
                <View style={styles.dot} />
                <Text style={styles.timeAgo}>{item.timeAgo}</Text>
            </View>

            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.content}>{item.content}</Text>

            <View style={styles.iconRow}>
                <View style={styles.iconGroup}>
                    <TouchableOpacity activeOpacity={0.7}>
                        <View style={styles.iconGroup}>
                            {item.liked ? (
                                <FontAwesome name="heart" size={hp(2.2)} color={COLORS.BlazeOrange} />
                            ) : (
                                <FontAwesome name="heart-o" size={hp(2.2)} color={COLORS.darkgray} />
                            )}
                            <Text style={styles.iconText}>{item.likes}</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity activeOpacity={0.7}>
                        <View style={[styles.iconGroup, { marginLeft: wp(5) }]}>
                            <Ionicons name="chatbubble-outline" size={hp(2.2)} color={COLORS.darkgray} />
                            <Text style={styles.iconText}>{item.comments}</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={{ marginLeft: wp(5) }}>
                        <Ionicons name="share-social-outline" size={hp(2.2)} color={COLORS.darkgray} />
                    </TouchableOpacity>
                </View>

                {item.bookmarked && (
                    <TouchableOpacity activeOpacity={0.7}>
                        <Feather name="bookmark" size={hp(2.2)} color={COLORS.BlazeOrange} style={styles.bookmarkIcon} />
                    </TouchableOpacity>
                )}
            </View>
        </View >
    );

    return (
        <View>
            <Text style={styles.header}>My Confessions</Text>
            <FlatList
                data={mockConfessions}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
                contentContainerStyle={{ padding: wp(3), paddingTop: hp(2), paddingBottom: hp(15) }}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
};

export default ConfessionsSheet;

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        fontFamily: fontFamily.FONTS.bold,
        fontSize: hp(2.8),
        paddingBottom: hp(2),
        paddingHorizontal: wp(3),
        color: COLORS.black,
        borderBottomWidth: 0.5,
        borderBottomColor: COLORS.Midgray,
    },

    confessionCard: {
        borderRadius: wp(5),
        padding: wp(4),
        marginBottom: hp(2),
    },
    card: {
        backgroundColor: COLORS.white,
        borderRadius: hp(1),
        padding: hp(1.5),
        height: hp(22),
        marginBottom: hp(1.5),
    },
    timeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    dot: {
        width: hp(1),  // Increased size
        height: hp(1),
        borderRadius: hp(1),
        backgroundColor: COLORS.BlazeOrange,
        marginRight: wp(2),
    },
    timeAgo: {
        fontSize: hp(1.5),
        color: COLORS.darkgray1,
        marginBottom: hp(0.5),
        paddingVertical: hp(0.5),
        fontFamily: fontFamily.FONTS.Medium,
    },
    title: {
        fontSize: hp(2.1),
        fontFamily: fontFamily.FONTS.bold,
        color: COLORS.black,
        marginBottom: hp(0.5),
        paddingVertical: hp(0.5),
    },
    content: {
        fontSize: hp(1.7),
        color: COLORS.black,
        fontFamily: fontFamily.FONTS.Medium,
        paddingVertical: hp(0.5),
        marginBottom: hp(1),
    },
    iconRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    iconGroup: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: wp(1.5),
    },
    iconText: {
        fontSize: hp(1.6),
        color: COLORS.darkgray1,
    },
    bookmarkIcon: {
        marginLeft: 'auto',
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    cardMeta: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    timeText: {
        fontSize: 14,
    },
    confessionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    confessionText: {
        fontSize: 16,
        lineHeight: 24,
        marginBottom: 16,
    },
    cardActions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    actionGroup: {
        flexDirection: 'row',
        gap: 20,
    },
    actionButton: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    actionText: {
        fontSize: 14,
    },
});
