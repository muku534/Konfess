import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform, Modal, Button } from 'react-native';
import Octicons from 'react-native-vector-icons/Octicons';
import LinearGradient from 'react-native-linear-gradient';
import Animated, {
    useAnimatedStyle,
    withRepeat,
    withSequence,
    withTiming,
    Easing,
} from 'react-native-reanimated';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from '../../components/Pixel/Index';
import { COLORS, fontFamily } from '../../../constants';
import BurnMemoryModal from '../../components/BurnMemoryModal';
import { useTheme } from '../../context/ThemeContext';

const STAR_TYPES = {
    small: { size: 1, count: 50 },
    medium: { size: 2, count: 20 },
    large: { size: 3, count: 10 },
    shooting: { size: 1, count: 5 },
};

const Star = ({ delay, duration, x, y, size, type = 'normal', colors }) => {
    const opacity = useAnimatedStyle(() => ({
        opacity: withRepeat(
            withSequence(
                withTiming(1, { duration: duration * 0.4 }),
                withTiming(0.3, { duration: duration * 0.6 })
            ),
            -1,
            true
        ),
        transform: [
            {
                translateX: type === 'shooting'
                    ? withRepeat(
                        withSequence(
                            withTiming(-100, { duration: duration * 2 }),
                            withTiming(0, { duration: 0 })
                        ),
                        -1
                    )
                    : 0,
            },
            {
                translateY: type === 'shooting'
                    ? withRepeat(
                        withSequence(
                            withTiming(100, { duration: duration * 2 }),
                            withTiming(0, { duration: 0 })
                        ),
                        -1
                    )
                    : 0,
            },
        ],
    }));

    return (
        <Animated.View
            style={[
                {
                    position: 'absolute',
                    left: `${x}%`,
                    top: `${y}%`,
                    width: size,
                    height: size,
                    borderRadius: size / 2,
                    backgroundColor: type === 'shooting' ? colors.primary : colors.textSecondary,
                },
                type === 'shooting' && {
                    width: size * 2,
                    height: size,
                },
                opacity,
            ]}
        />
    );
};

export default function BurnScreen() {
    const { colors } = useTheme();
    const [showModal, setShowModal] = useState(false);
    const [stars] = useState(() => {
        const allStars = [];

        Object.entries(STAR_TYPES).forEach(([type, config]) => {
            const isShootingStar = type === 'shooting';
            for (let i = 0; i < config.count; i++) {
                allStars.push({
                    x: Math.random() * 100,
                    y: Math.random() * 100,
                    size: config.size,
                    delay: Math.random() * 3000,
                    duration: Math.random() * 2000 + (isShootingStar ? 4000 : 2000),
                    type: isShootingStar ? 'shooting' : 'normal'
                });
            }
        });

        return allStars;
    });

    const handleBurn = (memory) => {
        setShowModal(false);
    };

    const flameScale = useAnimatedStyle(() => ({
        transform: [
            {
                scale: withRepeat(
                    withSequence(
                        withTiming(1.2, { duration: 1000, easing: Easing.inOut(Easing.ease) }),
                        withTiming(1, { duration: 1000, easing: Easing.inOut(Easing.ease) })
                    ),
                    -1,
                    true
                ),
            },
        ],
    }));

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <LinearGradient
                colors={[`${colors.background}00`, colors.background]}
                style={StyleSheet.absoluteFillObject}
            />


            <View style={styles.starsContainer}>
                {stars.map((star, index) => (
                    <Star
                        key={index}
                        x={star.x}
                        y={star.y}
                        size={star.size}
                        delay={star.delay}
                        duration={star.duration}
                        type={star.type}
                        colors={colors}
                    />
                ))}
            </View>

            <View style={styles.content}>
                <View style={styles.header}>
                    <View style={styles.titleContainer}>
                        <Animated.View style={flameScale}>
                            <Octicons name="flame" size={hp(4)} color={colors.primary} />
                        </Animated.View>
                        <Text style={[styles.title, { color: colors.text }]}>Burn it all</Text>
                        <Animated.View style={flameScale}>
                            <Octicons name="flame" size={hp(4)} color={colors.primary} />
                        </Animated.View>
                    </View>
                    <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
                        Where memories scatter like stardust across the cosmic void, and reality bends at the edges of imagination.
                    </Text>
                </View>

                <View style={styles.uploadContainer}>
                    <TouchableOpacity
                        style={[styles.beginButton, { backgroundColor: colors.primary }]}
                        onPress={() => setShowModal(true)}
                    >
                        <Text style={[styles.beginButtonText, { color: colors.text }]}>
                            Begin the Journey
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>

            <BurnMemoryModal
                visible={showModal}
                onClose={() => setShowModal(false)}
                onBurn={handleBurn}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    starsContainer: {
        ...StyleSheet.absoluteFillObject,
        overflow: 'hidden',
    },
    content: {
        flex: 1,
        padding: wp(5),
        paddingTop: Platform.OS === 'web' ? hp(5) : hp(7),
    },
    header: {
        alignItems: 'center',
        marginBottom: hp(5),
    },
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: wp(4),
        marginBottom: hp(2.5),
    },
    title: {
        fontSize: hp(4),
        fontFamily: fontFamily.FONTS.bold,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: hp(1.8),
        textAlign: 'center',
        lineHeight: hp(2.5),
        maxWidth: wp(75),
    },
    uploadContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    beginButton: {
        paddingHorizontal: wp(8),
        paddingVertical: hp(2),
        borderRadius: wp(8),
        elevation: 5,
        shadowColor: '#ff6b00',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 8,
    },
    beginButtonText: {
        fontSize: hp(2.2),
        fontFamily: fontFamily.FONTS.Medium,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: '#fff',
        height: '50%',
        width: wp(90),
        padding: wp(5),
        borderRadius: wp(4),
    },
});
