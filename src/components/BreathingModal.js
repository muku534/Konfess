import React, { useState, useRef, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Modal,
    TouchableOpacity,
    Platform,
    Animated,
    Easing,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import LinearGradient from 'react-native-linear-gradient';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from './Pixel/Index';
import { useTheme } from '../context/ThemeContext';
import SoundPlayer from 'react-native-sound-player';
import { fontFamily } from '../../constants';

const BREATHE_IN_DURATION = 4000;
const HOLD_DURATION = 2000;
const BREATHE_OUT_DURATION = 4000;

const BreathingModal = ({ visible, onClose }) => {
    const { colors } = useTheme();
    const [isPlaying, setIsPlaying] = useState(false);
    const [breatheState, setBreatheState] = useState('idle');
    const [isMuted, setIsMuted] = useState(false);

    const breatheScale = useRef(new Animated.Value(1)).current;
    const opacity = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        if (!visible) stopBreathing();
    }, [visible]);

    const startBreathing = () => {
        if (!isPlaying) {
            setIsPlaying(true);
            breathingCycle();
        } else {
            stopBreathing();
        }
    };

    const stopBreathing = () => {
        setIsPlaying(false);
        setBreatheState('idle');

        // Stop all animations
        breatheScale.stopAnimation();
        opacity.stopAnimation();
        breatheScale.setValue(1);
        opacity.setValue(1);

        // ✅ Stop the audio playback
        try {
            SoundPlayer.stop();
        } catch (e) {
            console.log('Error stopping sound', e);
        }
    };


    const playBreathingSound = () => {
        try {
            if (!isMuted) {
                SoundPlayer.playSoundFile('breathing', 'mp3');
            }
        } catch (e) {
            console.log('Error playing sound', e);
        }
    };


    const breathingCycle = () => {
        setBreatheState('in');
        playBreathingSound();

        Animated.timing(breatheScale, {
            toValue: 1.5,
            duration: BREATHE_IN_DURATION,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
        }).start(() => {
            setBreatheState('hold');

            Animated.timing(breatheScale, {
                toValue: 1.5,
                duration: HOLD_DURATION,
                easing: Easing.inOut(Easing.ease),
                useNativeDriver: true,
            }).start(() => {
                setBreatheState('out');
                playBreathingSound();

                Animated.timing(breatheScale, {
                    toValue: 1,
                    duration: BREATHE_OUT_DURATION,
                    easing: Easing.inOut(Easing.ease),
                    useNativeDriver: true,
                }).start(() => {
                    if (isPlaying) {
                        breathingCycle();
                    }
                });
            });
        });

        Animated.sequence([
            Animated.timing(opacity, {
                toValue: 0.7,
                duration: BREATHE_IN_DURATION,
                useNativeDriver: true,
            }),
            Animated.timing(opacity, {
                toValue: 0.7,
                duration: HOLD_DURATION,
                useNativeDriver: true,
            }),
            Animated.timing(opacity, {
                toValue: 1,
                duration: BREATHE_OUT_DURATION,
                useNativeDriver: true,
            }),
        ]).start();
    };


    const getBreathingText = () => {
        switch (breatheState) {
            case 'in': return 'Breathe In...';
            case 'hold': return 'Hold...';
            case 'out': return 'Breathe Out...';
            default: return 'Start Breathing';
        }
    };

    return (
        <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
            <View style={[styles.modalContainer, { backgroundColor: colors.background }]}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={onClose} style={styles.iconButton}>
                        <Feather name="x" size={hp(3)} color={colors.text} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setIsMuted(!isMuted)} style={styles.iconButton}>
                        <Feather
                            name={isMuted ? 'volume-x' : 'volume-2'}
                            size={hp(3)}
                            color={colors.text}
                        />
                    </TouchableOpacity>
                </View>

                <View style={styles.content}>
                    <Animated.View
                        style={[
                            styles.breathingCircle,
                            {
                                transform: [{ scale: breatheScale }],
                                opacity: opacity,
                                borderColor: colors.border,
                            },
                        ]}
                    >
                        <LinearGradient
                            colors={[`${colors.primary}22`, `${colors.primary}11`]}
                            style={styles.breatheGradient}
                        />
                    </Animated.View>

                    <TouchableOpacity
                        style={[styles.controlButton, { backgroundColor: colors.primary }]}
                        onPress={startBreathing}
                    >
                        <FontAwesome
                            name={isPlaying ? 'pause' : 'play'}
                            size={hp(4)}
                            color={colors.text}
                        />
                    </TouchableOpacity>

                    <Text style={[styles.breathingText, { color: colors.text }]}>
                        {getBreathingText()}
                    </Text>

                    {isPlaying && (
                        <Text style={[styles.breathingSubtext, { color: colors.textSecondary }]}>
                            Follow the circle's rhythm
                        </Text>
                    )}
                </View>
            </View>
        </Modal>
    );
};

export default BreathingModal;

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: Platform.OS === 'ios' ? hp(6) : hp(2),
        paddingHorizontal: wp(5),
    },
    iconButton: {
        padding: wp(2),
    },
    content: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        gap: hp(3),
    },
    breathingCircle: {
        width: wp(60),
        height: wp(60),
        borderRadius: wp(30),
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
    },
    breatheGradient: {
        ...StyleSheet.absoluteFillObject,
        borderRadius: wp(30),
    },
    controlButton: {
        width: wp(20),
        height: wp(20),
        borderRadius: wp(10),
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: hp(0.5),
        },
        shadowOpacity: 0.25,
        shadowRadius: hp(0.5),
    },
    breathingText: {
        fontSize: hp(3),
        fontFamily: fontFamily.FONTS.bold,
        textAlign: 'center',
    },
    breathingSubtext: {
        fontSize: hp(2),
        textAlign: 'center',
        opacity: 0.8,
    },
});
