import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Modal,
    TouchableOpacity,
    TextInput,
    ScrollView,
    Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather'; // Replace with any vector icon lib
import Octicons from 'react-native-vector-icons/Octicons'; // Replace with any vector icon lib
import { launchImageLibrary } from 'react-native-image-picker';
import Animated, {
    useAnimatedStyle,
    withSpring,
    withSequence,
    withRepeat,
    withTiming,
    Easing,
} from 'react-native-reanimated';
import { COLORS, fontFamily } from '../../constants';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from './Pixel/Index';
import LinearGradient from 'react-native-linear-gradient';
import InputField from './InputField';
import { useTheme } from '../context/ThemeContext';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const Particle = ({ initialX, size = 4 }) => {
    const FIFTY_HP = hp(50);
    const TWENTYFIVE_WP = wp(25);

    const moveY = useAnimatedStyle(() => {
        const randomDuration = 3000 + Math.random() * 2000;
        const randomX = (Math.random() - 0.5) * TWENTYFIVE_WP;

        return {
            transform: [
                {
                    translateY: withRepeat(
                        withSequence(
                            withTiming(0, { duration: 0 }),
                            withTiming(-FIFTY_HP, {
                                duration: randomDuration,
                                easing: Easing.bezier(0.25, 0.1, 0.25, 1),
                            })
                        ),
                        -1,
                        true
                    ),
                },
                {
                    translateX: withRepeat(
                        withSequence(
                            withTiming(0, { duration: 0 }),
                            withTiming(randomX, {
                                duration: randomDuration,
                                easing: Easing.bezier(0.25, 0.1, 0.25, 1),
                            })
                        ),
                        -1,
                        true
                    ),
                },
            ],
            opacity: withRepeat(
                withSequence(
                    withTiming(0.8, { duration: 0 }),
                    withTiming(0, {
                        duration: randomDuration,
                        easing: Easing.bezier(0.25, 0.1, 0.25, 1),
                    })
                ),
                -1,
                true
            ),
        };
    });

    return (
        <Animated.View
            style={[
                {
                    position: 'absolute',
                    bottom: 0,
                    left: initialX,
                    width: size,
                    height: size,
                    backgroundColor: COLORS.BlazeOrange,
                    borderRadius: size / 2,
                    zIndex: 10,
                },
                moveY,
            ]}
        />
    );
};

const EmberParticle = ({ initialX }) => {
    const FORTY_HP = hp(40);
    const THIRTY_WP = wp(30);

    const moveY = useAnimatedStyle(() => {
        const randomDuration = 2000 + Math.random() * 1500;
        const randomX = (Math.random() - 0.5) * THIRTY_WP;

        return {
            transform: [
                {
                    translateY: withRepeat(
                        withSequence(
                            withTiming(0, { duration: 0 }),
                            withTiming(-FORTY_HP, {
                                duration: randomDuration,
                                easing: Easing.bezier(0.25, 0.1, 0.25, 1),
                            })
                        ),
                        -1,
                        true
                    ),
                },
                {
                    translateX: withRepeat(
                        withSequence(
                            withTiming(0, { duration: 0 }),
                            withTiming(randomX, {
                                duration: randomDuration,
                                easing: Easing.bezier(0.25, 0.1, 0.25, 1),
                            })
                        ),
                        -1,
                        true
                    ),
                },
            ],
            opacity: withRepeat(
                withSequence(
                    withTiming(0.8, { duration: 0 }),
                    withTiming(0, {
                        duration: randomDuration,
                        easing: Easing.bezier(0.25, 0.1, 0.25, 1),
                    })
                ),
                -1,
                true
            ),
        };
    });

    return (
        <Animated.View
            style={[
                {
                    position: 'absolute',
                    bottom: 0,
                    left: initialX,
                    width: 3,
                    height: 3,
                    backgroundColor: '#ffcc00',
                    borderRadius: 1.5,
                    shadowColor: COLORS.BlazeOrange,
                    shadowOffset: { width: 0, height: 0 },
                    shadowOpacity: 0.8,
                    shadowRadius: 4,
                    zIndex: 10,
                },
                moveY,
            ]}
        />
    );
};


export default function BurnMemoryModal({ visible, onClose, onBurn }) {
    const { colors } = useTheme();
    const [text, setText] = useState('');
    const [images, setImages] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isTextFocused, setIsTextFocused] = useState(false);

    const particles = Array.from({ length: 50 }, (_, i) => ({
        id: `particle-${i}`,
        initialX: Math.random() * SCREEN_WIDTH,
        size: Math.random() * 4 + 2,
    }));

    const embers = Array.from({ length: 30 }, (_, i) => ({
        id: `ember-${i}`,
        initialX: Math.random() * SCREEN_WIDTH,
    }));

    const flameScale = useAnimatedStyle(() => ({
        transform: [
            {
                scale: withRepeat(
                    withSequence(
                        withTiming(1.2, { duration: 1000 }),
                        withTiming(1, { duration: 1000 })
                    ),
                    -1,
                    true
                ),
            },
        ],
    }));

    const pickImage = () => {
        const options = {
            mediaType: 'photo',
            selectionLimit: 0, // allows multiple selection
        };

        launchImageLibrary(options, (response) => {
            if (response.didCancel) return;
            if (response.errorCode) {
                console.warn('ImagePicker Error: ', response.errorMessage);
                return;
            }

            if (response.assets) {
                const selectedImages = response.assets.map((a) => a.uri);
                setImages((prev) => [...prev, ...selectedImages]);
            }
        });
    };


    const handleSubmit = () => {
        if (!text && images.length === 0) return;

        setIsSubmitting(true);
        setTimeout(() => {
            onBurn({ text, images });
            setText('');
            setImages([]);
            setIsSubmitting(false);
        }, 500);
    };

    return (
        <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
            <View style={[styles.modalContainer, { backgroundColor: 'rgba(0,0,0,0.5)' }]}>
                <View style={[styles.modalContent, { backgroundColor: colors.background }]}>
                    <LinearGradient
                        colors={[
                            'transparent',
                            'rgba(255, 107, 0, 0.05)',
                            'rgba(255, 107, 0, 0.1)',
                            'rgba(255, 107, 0, 0.2)',
                        ]}
                        style={StyleSheet.absoluteFillObject}
                        locations={[0, 0.3, 0.6, 1]}
                    />
                    <View style={styles.particlesContainer}>
                        {particles.map((particle) => (
                            <Particle key={particle.id} initialX={particle.initialX} size={particle.size} />
                        ))}
                        {embers.map((ember) => (
                            <EmberParticle key={ember.id} initialX={ember.initialX} />
                        ))}
                    </View>

                    <View style={styles.contentWrapper}>
                        <View style={styles.header}>
                            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                                <Icon name="x" size={hp(3)} color={colors.text} />
                            </TouchableOpacity>
                            <Text style={[styles.title, { color: colors.text }]}>Release Your Memory</Text>
                            <Animated.View style={flameScale}>
                                <Octicons name="flame" size={hp(3)} color={colors.primary} />
                            </Animated.View>
                        </View>

                        <ScrollView style={styles.content}>
                            <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
                                Write down your thoughts, attach images, and let them transform into stardust...
                            </Text>
                            <TextInput
                                style={[
                                    styles.input,
                                    {
                                        backgroundColor: colors.surface,
                                        borderColor: isTextFocused ? colors.primary : colors.border,
                                        borderWidth: isTextFocused ? 1 : 0.5,
                                        color: colors.text,
                                    },
                                ]}
                                placeholder="What memory would you like to release?"
                                placeholderTextColor={colors.textSecondary}
                                multiline
                                value={text}
                                onChangeText={setText}
                                onFocus={() => setIsTextFocused(true)}
                                onBlur={() => setIsTextFocused(false)}
                            />


                            {images.length > 0 && (
                                <View style={styles.imagesPreview}>
                                    <Text style={[styles.imagesTitle, { color: colors.text }]}>
                                        {images.length} {images.length === 1 ? 'image' : 'images'} selected
                                    </Text>
                                </View>
                            )}

                            <View style={styles.actions}>
                                <TouchableOpacity style={[styles.actionButton, { backgroundColor: `${colors.surface}CC` }]} onPress={pickImage}>
                                    <Icon name="image" size={20} color={colors.primary} />
                                    <Text style={[styles.actionText, { color: colors.text }]}>Add Images</Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={[
                                        styles.submitButton,
                                        {
                                            backgroundColor: text || images.length > 0 ? colors.primary : `${colors.surface}CC`,
                                            opacity: isSubmitting ? 0.7 : 1,
                                        },
                                    ]}
                                    onPress={handleSubmit}
                                    disabled={(!text && images.length === 0) || isSubmitting}
                                >
                                    <Icon name="send" size={20} color={colors.text} />
                                    <Text style={[styles.submitText, { color: colors.text }]}>
                                        {isSubmitting ? 'Releasing...' : 'Release to the Cosmos'}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </ScrollView>
                    </View>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'flex-end',
    },
    modalContent: {
        borderTopLeftRadius: wp(5),
        borderTopRightRadius: wp(5),
        width: '100%',
        height: hp(70),
        backgroundColor: COLORS.WhiteSmoke,
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
    particlesContainer: {
        ...StyleSheet.absoluteFillObject,
        zIndex: 1,
    },
    contentWrapper: {
        flex: 1,
        padding: wp(5),
        zIndex: 2,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: hp(2),
    },
    closeButton: {
        padding: wp(2),
    },
    title: {
        fontSize: wp(5),
        fontFamily: fontFamily.FONTS.bold,
        color: COLORS.black,
    },
    content: {
        flex: 1,
    },
    subtitle: {
        fontSize: wp(4),
        marginBottom: hp(2),
        color: COLORS.darkgray,
    },
    inputContainer: {
        backgroundColor: COLORS.white,
        borderRadius: wp(3),
        padding: wp(4),
        marginBottom: hp(4),
    },
    input: {
        marginBottom: hp(2),
        fontSize: hp(1.7),
        minHeight: hp(20),
        textAlignVertical: 'top',
        lineHeight: hp(3),
        padding: hp(2),
        borderRadius: wp(3),
        fontFamily: fontFamily.FONTS.Medium,
        backgroundColor: COLORS.white,
        borderColor: COLORS.gray,
        borderWidth: 0.4,
        color: COLORS.black,
        backgroundColor: COLORS.white,
    },
    imagesPreview: {
        marginBottom: hp(2),
    },
    imagesTitle: {
        fontSize: wp(3.5),
        fontFamily: fontFamily.FONTS.Medium,
        color: COLORS.black,
    },
    actions: {
        gap: hp(1.5),
    },
    actionButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: hp(2),
        borderRadius: wp(3),
        backgroundColor: COLORS.white,
    },
    actionText: {
        fontSize: wp(4),
        fontFamily: fontFamily.FONTS.bold,
        marginLeft: wp(2),
        color: COLORS.black,
    },
    submitButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: hp(2),
        borderRadius: wp(3),
    },
    submitText: {
        fontSize: wp(4),
        fontFamily: fontFamily.FONTS.bold,
        marginLeft: wp(2),
        color: COLORS.darkgray,
    },
});
