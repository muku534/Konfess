import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    StatusBar,
    TouchableOpacity,
    Image,
    ImageBackground
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient'; // ✅ Import here
import { COLORS, fontFamily } from '../../../constants';
import DeviceInfo from 'react-native-device-info';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from '../../components/Pixel/Index';
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Feather from "react-native-vector-icons/Feather";
import NightReflectionModal from '../../components/NightReflectionModal';
import NotificationsModal from '../../components/NotificationsModal';
import { useTheme } from '../../context/ThemeContext';
import BreathingModal from '../../components/BreathingModal';
import Animated, { FadeInDown } from 'react-native-reanimated';

const isTablet = DeviceInfo.isTablet();


const Home = ({ navigation }) => {
    const { colors, isDark } = useTheme();
    const [currentAffirmationIndex, setCurrentAffirmationIndex] = useState(0);
    const [showNightReflection, setShowNightReflection] = useState(false);
    const [showNotifications, setShowNotifications] = useState(false);
    const [showBreathing, setShowBreathing] = useState(false);

    const AFFIRMATIONS = [
        {
            text: "I am worthy of love, respect, and happiness",
            author: "Daily Affirmation",
            color: "#FF6B00",
            image: "https://images.pexels.com/photos/1557183/pexels-photo-1557183.jpeg",
        },
        {
            text: "I trust in my journey and embrace all possibilities",
            author: "Self-Love",
            color: "#4CAF50",
            image: "https://images.pexels.com/photos/1428277/pexels-photo-1428277.jpeg",
        },
        {
            text: "I have the power to create positive change",
            author: "Empowerment",
            color: "#2196F3",
            image: "https://images.pexels.com/photos/1295138/pexels-photo-1295138.jpeg",
        },
        {
            text: "I choose to be confident and self-assured",
            author: "Confidence",
            color: "#9C27B0",
            image: "https://images.pexels.com/photos/1624496/pexels-photo-1624496.jpeg",
        },
    ];

    const features = [
        {
            icon: <MaterialCommunityIcons name="waves" size={hp(2.5)} color="#4CAF50" />,
            title: "Start Breathing",
            subtitle: "Take a moment to breathe",
            bg: isDark ? '#25372c' : '#eff8ef',
            onPress: () => setShowBreathing(true),
        },
        {
            icon: <FontAwesome name="moon-o" size={hp(2.5)} color="#2196F3" />,
            title: "Night Reflection",
            subtitle: "End your day mindfully",
            bg: isDark ? '#1e2b36' : '#dbeefd',
            onPress: () => setShowNightReflection(true),
        },
        {
            icon: <Feather name="feather" size={hp(2.5)} color="#FF6B00" />,
            title: "Quick Confession",
            subtitle: "Share your thoughts anonymously",
            bg: isDark ? '#3e2f26' : '#ffe8d8',
        }
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentAffirmationIndex((prev) => (prev + 1) % AFFIRMATIONS.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    const currentAffirmation = AFFIRMATIONS[currentAffirmationIndex];


    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <LinearGradient
                colors={[colors.primary, `${colors.primary}00`]}
                style={styles.headerGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
            />
            <StatusBar backgroundColor="transparent" barStyle={isDark ? 'light-content' : 'dark-content'} translucent />


            {/* Header */}
            <Animated.View entering={FadeInDown.delay(100)} style={styles.header}>
                <View>
                    <Text style={[styles.title, { color: colors.text }]}>Konfess</Text>
                    <Text style={[styles.subtitle, { color: colors.textSecondary }]}>Your safe space for healing</Text>
                </View>
                <View style={styles.headerIcons}>
                    <TouchableOpacity style={[styles.iconWrapper, { backgroundColor: `${colors.surface}CC` }]} onPress={() => setShowNotifications(true)}>
                        <Ionicons name="notifications-outline" size={hp(2.5)} color={colors.text} />
                        <View style={styles.badge}>
                            <Text style={styles.badgeText}>3</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </Animated.View>

            {/* Affirmation Card */}
            <Animated.View entering={FadeInDown.delay(200)} style={styles.affirmationContainer}>
                <TouchableOpacity style={[styles.affirmationCard, { backgroundColor: colors.surface }]} activeOpacity={0.9}>
                    <Image
                        source={{ uri: currentAffirmation.image }}
                        style={styles.affirmationImage}
                        resizeMode='cover'
                    />
                    <LinearGradient
                        colors={['transparent', 'rgba(0,0,0,0.8)']}
                        style={styles.affirmationGradient}
                    />
                    <View style={styles.affirmationContent}>
                        <MaterialCommunityIcons name="format-quote-close-outline" size={hp(3)} color={COLORS.white} />
                        <Text style={styles.affirmationText}>{currentAffirmation.text}</Text>
                        <Text style={styles.affirmationAuthor}>{currentAffirmation.author}</Text>
                    </View>
                </TouchableOpacity>
            </Animated.View>

            {/* Features */}
            <View style={styles.featuresWrapper}>
                <View style={styles.row}>
                    {features.slice(0, 2).map((f, i) => (
                        <Animated.View style={[styles.card, { backgroundColor: colors.surface }]} entering={FadeInDown.delay(300 + i * 100)} key={i}>
                            <TouchableOpacity
                                key={i}

                                activeOpacity={0.4}
                                onPress={f.onPress}
                            >
                                <View>
                                    <View style={{
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        padding: hp(1),
                                        backgroundColor: f.bg,
                                        // backgroundColor: `${f.bg}15`, 
                                        width: wp(11),
                                        height: wp(11),
                                        borderRadius: wp(11)
                                    }}>
                                        {f.icon}
                                    </View>
                                    <Text style={[styles.cardTitle, { color: colors.text }]}>{f.title}</Text>
                                    <Text style={[styles.cardSubtitle, { color: colors.textSecondary }]}>{f.subtitle}</Text>
                                </View>
                            </TouchableOpacity>
                        </Animated.View>
                    ))}
                </View>

                {/* Quick Confession */}
                <Animated.View entering={FadeInDown.delay(500)}>
                    <TouchableOpacity
                        style={[styles.card, { backgroundColor: colors.surface, marginTop: hp(2), width: '100%' }]}
                        activeOpacity={0.4}
                        onPress={() => navigation.navigate("Burn")}
                    >
                        <View>
                            <View style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                                padding: hp(1),
                                backgroundColor: features[2].bg,
                                width: wp(11),
                                height: wp(11),
                                borderRadius: wp(11)
                            }}>
                                {features[2].icon}
                            </View>
                            <Text style={[styles.cardTitle, { color: colors.text }]}>{features[2].title}</Text>
                            <Text style={[styles.cardSubtitle, { color: colors.textSecondary }]}>{features[2].subtitle}</Text>
                        </View>
                    </TouchableOpacity>
                </Animated.View>
            </View>

            <BreathingModal
                visible={showBreathing}
                onClose={() => setShowBreathing(false)}
            />

            <NightReflectionModal
                visible={showNightReflection}
                onClose={() => setShowNightReflection(false)}
            />
            <NotificationsModal
                visible={showNotifications}
                onClose={() => setShowNotifications(false)}
            />

        </View >
    );
};
export default Home;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: wp(4),
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
        marginTop: hp(5),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    title: {
        fontSize: hp(3.5),
        fontFamily: fontFamily.FONTS.PlayfairBold,
        color: COLORS.black,
    },
    subtitle: {
        fontSize: hp(1.7),
        fontFamily: fontFamily.FONTS.Medium,
        color: COLORS.darkgray1,
        marginTop: hp(0.5),
    },
    headerIcons: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconWrapper: {
        backgroundColor: COLORS.white,
        borderRadius: hp(5),
        width: hp(5.2),
        height: hp(5.2),
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: wp(2),
    },
    badge: {
        position: 'absolute',
        top: 6,
        right: 6,
        minWidth: hp(1.9),
        height: hp(1.9),
        borderRadius: hp(1.8),
        backgroundColor: COLORS.BlazeOrange,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 3,
    },
    badgeText: {
        color: COLORS.white,
        fontSize: hp(1.3),
        fontFamily: fontFamily.FONTS.Medium,
    },
    affirmationContainer: {

    },
    affirmationCard: {
        height: hp(22.5),
        width: '100%',
        borderRadius: hp(2),
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: hp(3),
        marginBottom: hp(2),
    },
    affirmationContent: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: 10,
        alignItems: 'center',
    },
    affirmationImage: {
        ...StyleSheet.absoluteFillObject,
        width: '100%',
        height: '100%',
        borderRadius: hp(2),
        overflow: 'hidden',
    },
    affirmationGradient: {
        ...StyleSheet.absoluteFillObject,
        height: '100%',
    },
    affirmationText: {
        fontSize: hp(2.2),
        color: COLORS.white,
        textAlign: 'center',
        fontFamily: fontFamily.FONTS.bold,
        paddingHorizontal: wp(10),
        marginTop: hp(1),
    },
    affirmationAuthor: {
        paddingVertical: hp(0.5),
        color: COLORS.white,
        fontSize: hp(1.6),
        fontFamily: fontFamily.FONTS.Medium,
    },
    featuresWrapper: {
        marginTop: hp(1),
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    card: {
        borderRadius: hp(1.5),
        overflow: 'hidden',
        width: '49%',
        backgroundColor: COLORS.white,
        padding: wp(3),
        marginBottom: 0,
    },
    cardTitle: {
        fontSize: hp(1.8),
        fontFamily: fontFamily.FONTS.bold,
        color: COLORS.darkgray,
        marginTop: hp(1),
        paddingBottom: hp(0.5),
    },
    cardSubtitle: {
        fontSize: hp(1.5),
        fontFamily: fontFamily.FONTS.Medium,
        color: COLORS.Midgray,
        paddingBottom: hp(0.5),

    },
});
