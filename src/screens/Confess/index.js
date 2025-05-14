import React, { useState } from 'react';
import {
    View, Text, StyleSheet, TouchableOpacity,
    ScrollView, Platform, Share
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from '../../components/Pixel/Index';
import Animated, {
    useAnimatedStyle,
    withSpring,
    withSequence
} from 'react-native-reanimated';
import { COLORS, fontFamily } from '../../../constants';
import CommentModal from '../../components/CommentModal';
import CreateConfessionModal from '../../components/CreateConfessionModal';
import LinearGradient from 'react-native-linear-gradient';
import { useTheme } from '../../context/ThemeContext';

const AnimatedHeart = Animated.createAnimatedComponent(FontAwesome);

export default function ConfessScreen() {
    const { colors } = useTheme();
    const [selectedConfession, setSelectedConfession] = useState(null);
    const [showComments, setShowComments] = useState(false);
    const [activeHeartId, setActiveHeartId] = useState(null);
    const [showCreateModal, setShowCreateModal] = useState(false);

    const [confessions, setConfessions] = useState([
        {
            id: 1,
            title: "The Weight of Pretense",
            text: "I've been pretending to be happy at work for months now. I'm actually looking for a new job but haven't told anyone. The stress of maintaining this facade is becoming increasingly difficult. Every morning, I put on a smile and engage in small talk with colleagues, all while secretly updating my resume and taking calls from recruiters during lunch breaks. The guilt of not being honest with my team weighs heavily on me, especially since they've been nothing but supportive. But I know this change is necessary for my professional growth and mental health. The industry I'm in no longer aligns with my values and aspirations. I find myself questioning whether I'm making the right decision, but deep down, I know staying would only lead to more unhappiness. The fear of disappointing my mentor, who helped me get this position, is particularly challenging. They've invested so much time in my development, and I worry they'll take my departure personally. I've started having trouble sleeping, constantly rehearsing how I'll eventually break the news. The anxiety of potentially burning bridges in a relatively small industry is real. Yet, I also recognize that being authentic to myself is crucial for long-term happiness. I've been journaling about this experience, trying to process my emotions and plan my next steps carefully. Some days are harder than others, especially when my colleagues talk about future projects they're excited about, knowing I won't be part of them. I hope that when I finally do make the announcement, they'll understand and support my decision. Until then, I'll continue this daily performance, counting down the days until I can finally be honest about where I stand.",
            time: '2h ago',
            supports: 15,
            comments: [
                {
                    id: 1,
                    text: "Stay strong! I've been in a similar situation before. It gets better.",
                    author: 'Anonymous',
                    time: '1h ago',
                },
                {
                    id: 2,
                    text: "Take care of yourself first. Your mental health is more important than any job.",
                    author: 'Anonymous',
                    time: '30m ago',
                }
            ],
            isSupported: false,
            isExpanded: false,
            isSaved: false,
        },
        {
            id: 2,
            title: "An Unplayed Melody",
            text: "I secretly learned to play guitar to surprise my partner on our anniversary, but we broke up before I could show them.",
            time: '4h ago',
            supports: 24,
            comments: [
                {
                    id: 1,
                    text: "That's both sweet and heartbreaking. Keep playing - do it for yourself now.",
                    author: 'Anonymous',
                    time: '3h ago',
                }
            ],
            isSupported: false,
            isExpanded: false,
            isSaved: true,
        },
    ]);

    const handleSupport = (id) => {
        setActiveHeartId(id);
        setTimeout(() => {
            setConfessions(confessions.map(c => {
                if (c.id === id) {
                    return {
                        ...c,
                        supports: c.isSupported ? c.supports - 1 : c.supports + 1,
                        isSupported: !c.isSupported
                    };
                }
                return c;
            }));
            setActiveHeartId(null);
        }, 300);
    };

    const getHeartAnimation = (id) => {
        const isActive = activeHeartId === id;
        return useAnimatedStyle(() => ({
            transform: [{
                scale: isActive
                    ? withSequence(withSpring(1.5), withSpring(1))
                    : withSpring(1)
            }]
        }));
    };

    // ...existing code...
    const handleComment = (id) => {
        const found = confessions.find(c => c.id === id);
        if (!found) return; // Prevent error if confession not found
        setSelectedConfession(found);
        setShowComments(true);
    };
    // ...existing code...

    const toggleExpand = (id) => {
        setConfessions(confessions.map(c => (
            c.id === id ? { ...c, isExpanded: !c.isExpanded } : c
        )));
    };

    const handleShare = async (confession) => {
        try {
            await Share.share({
                message: `${confession.title}\n\n${confession.text}`
            });
        } catch (error) {
            console.error('Sharing failed', error);
        }
    };

    const toggleSave = (id) => {
        setConfessions(confessions.map(c => (
            c.id === id ? { ...c, isSaved: !c.isSaved } : c
        )));
    };

    const handleAddComment = (text) => {
        if (!selectedConfession) return;
        const newComment = {
            id: Date.now(),
            text,
            author: 'Anonymous',
            time: 'Just now'
        };

        setConfessions(confessions.map(c => {
            if (c.id === selectedConfession.id) {
                return {
                    ...c,
                    comments: [...c.comments, newComment]
                };
            }
            return c;
        }));
    };

    const handleCreateConfession = ({ title, text }) => {
        const newConf = {
            id: Date.now(),
            title: title || "Untitled",
            text,
            time: 'Just now',
            supports: 0,
            comments: [],
            isSupported: false,
            isExpanded: false,
            isSaved: false
        };

        setConfessions([newConf, ...confessions]);
        setShowCreateModal(false);
    };

    const renderConfessionText = (confession) => {
        const maxLen = 300;
        const showMore = confession.text.length > maxLen && !confession.isExpanded;
        const displayText = showMore
            ? confession.text.slice(0, maxLen) + '...'
            : confession.text;

        return (
            <>
                <Text style={[styles.titleText, { color: colors.text }]}>{confession.title}</Text>
                <Text style={[styles.bodyText, { color: colors.text }]}>{displayText}</Text>
                {confession.text.length > maxLen && (
                    <TouchableOpacity onPress={() => toggleExpand(confession.id)}>
                        <Text style={[styles.readMore, { color: colors.primary }]}>
                            {confession.isExpanded ? 'Show Less' : 'Read More'}
                        </Text>
                    </TouchableOpacity>
                )}
            </>
        );
    };

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <LinearGradient
                colors={[colors.primary, `${colors.primary}00`]}
                style={styles.headerGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
            />
            <View style={styles.header}>
                <View>
                    <Text style={[styles.headerTitle, { color: colors.text }]}>Konfessions</Text>
                    <Text style={[styles.headerSubtitle, { color: colors.textSecondary }]}>Share your thoughts anonymously</Text>
                </View>
                <TouchableOpacity style={[styles.fab, { backgroundColor: colors.primary }]} onPress={() => setShowCreateModal(true)}>
                    <Icon name="plus" size={24} color={colors.text} />
                </TouchableOpacity>
            </View>

            <ScrollView style={styles.scrollList} showsVerticalScrollIndicator={false}>
                {confessions.map(conf => (
                    <View key={conf.id} style={[styles.card, { backgroundColor: colors.surface }]}>
                        {renderConfessionText(conf)}
                        <View style={styles.metaRow}>
                            <Text style={[styles.time, { color: colors.textSecondary }]}>{conf.time}</Text>
                            <View style={styles.actions}>
                                <TouchableOpacity onPress={() => handleSupport(conf.id)} style={styles.iconRow}>
                                    <Animated.View style={getHeartAnimation(conf.id)}>
                                        <AnimatedHeart
                                            name={conf.isSupported ? "heart" : "heart-o"}
                                            size={18}
                                            color={conf.isSupported ? colors.primary : colors.textSecondary}
                                        />
                                    </Animated.View>
                                    <Text style={[styles.metaText, { color: conf.isSupported ? colors.primary : colors.textSecondary }]}>
                                        {conf.supports}
                                    </Text>
                                </TouchableOpacity>

                                <TouchableOpacity onPress={() => handleComment(conf.id)} style={styles.iconRow}>
                                    <Icon name="message-circle" size={18} color={colors.textSecondary} />
                                    <Text style={[styles.metaText, { color: colors.textSecondary }]}>{conf.comments.length}</Text>
                                </TouchableOpacity>

                                <TouchableOpacity onPress={() => handleShare(conf)} style={styles.iconRow}>
                                    <Icon name="share-2" size={18} color={colors.textSecondary} />
                                </TouchableOpacity>

                                <TouchableOpacity onPress={() => toggleSave(conf.id)} style={styles.iconRow}>
                                    <FontAwesome
                                        name={conf.isSaved ? "bookmark" : "bookmark-o"}
                                        size={18}
                                        color={conf.isSaved ? colors.primary : colors.textSecondary}
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                ))}
            </ScrollView>

            {selectedConfession && (
                <CommentModal
                    visible={showComments}
                    onClose={() => {
                        setSelectedConfession(null);
                        setShowComments(false);
                    }}
                    confessionId={selectedConfession.id}
                    comments={selectedConfession.comments}
                    onAddComment={handleAddComment}
                />
            )}

            <CreateConfessionModal
                visible={showCreateModal}
                onClose={() => setShowCreateModal(false)}
                onSubmit={handleCreateConfession}
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
    },
    headerSubtitle: {
        fontSize: hp(1.7),
        fontFamily: fontFamily.FONTS.Medium,
        marginTop: hp(0.5),
    },
    scrollList: {
        paddingHorizontal: wp('5%'),
    },
    card: {
        borderRadius: wp('3%'),
        padding: wp('4%'),
        marginBottom: hp('2%'),
    },
    titleText: {
        fontSize: wp('5%'),
        fontFamily: fontFamily.FONTS.bold,
        marginBottom: hp('1%'),
    },
    bodyText: {
        fontSize: wp('4%'),
        lineHeight: hp('2.8%'),
    },
    readMore: {
        fontSize: wp('3.5%'),
        marginTop: hp('1%'),
    },
    metaRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: hp('2%'),
        alignItems: 'center',
    },
    time: {
        fontSize: wp('3.5%'),
    },
    actions: {
        flexDirection: 'row',
        gap: wp('4%'),
    },
    iconRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: wp('1.5%'),
    },
    metaText: {
        fontSize: wp('3.5%'),
    },
    fab: {
        width: wp('12%'),
        height: wp('12%'),
        borderRadius: wp('6%'),
        justifyContent: 'center',
        alignItems: 'center',
    },
});
