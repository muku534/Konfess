import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Modal,
    TouchableOpacity,
    TextInput,
    ScrollView,
    ActivityIndicator,
} from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from './Pixel/Index';
import { COLORS, fontFamily } from '../../constants';
import LinearGradient from 'react-native-linear-gradient';
import { useTheme } from '../context/ThemeContext';

const CreateConfessionModal = ({ visible, onClose, onSubmit }) => {
    const { colors } = useTheme();
    const [title, setTitle] = useState('');
    const [text, setText] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isGeneratingTitle, setIsGeneratingTitle] = useState(false);
    const [isTitleFocused, setIsTitleFocused] = useState(false);
    const [isTextFocused, setIsTextFocused] = useState(false);

    const handleSubmit = () => {
        if (!text.trim()) return;

        setIsSubmitting(true);
        onSubmit({ title, text });

        // Reset form
        setTitle('');
        setText('');
        setIsSubmitting(false);
        onClose();
    };

    const generateTitle = async () => {
        if (!text.trim() || isGeneratingTitle) return;

        setIsGeneratingTitle(true);
        try {
            const response = await fetch('/generate-title', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ text }),
            });

            if (!response.ok) {
                throw new Error('Failed to generate title');
            }

            const data = await response.json();
            setTitle(data.title);
        } catch (error) {
            console.error('Error generating title:', error);
        } finally {
            setIsGeneratingTitle(false);
        }
    };

    const isValid = text.trim().length > 0;

    return (
        <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
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
                            <Feather name="x" size={hp(3)} color={colors.text} />
                        </TouchableOpacity>
                        <Text style={[styles.headerTitle, { color: colors.text }]}>New Confession</Text>
                        <TouchableOpacity
                            style={[
                                styles.submitButton,
                                {
                                    backgroundColor: isValid ? colors.primary : colors.surfaceAccent,
                                    opacity: isValid ? 1 : 0.5,
                                },
                            ]}
                            onPress={handleSubmit}
                            disabled={!isValid || isSubmitting}
                        >
                            <Ionicons name="send" size={hp(2.2)} color={colors.text} />
                        </TouchableOpacity>
                    </View>

                    <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                        <Animated.View entering={FadeInDown.delay(200)} style={styles.section}>
                            <View style={styles.titleContainer}>
                                <TextInput
                                    style={[
                                        styles.titleInput,
                                        {
                                            backgroundColor: colors.surface,
                                            borderColor: isTitleFocused ? colors.primary : colors.border,
                                            borderWidth: isTitleFocused ? 1 : 0.5,
                                            color: colors.text,
                                        },
                                    ]}
                                    placeholder="Add a title (optional)"
                                    placeholderTextColor={colors.textSecondary}
                                    value={title}
                                    onChangeText={setTitle}
                                    maxLength={100}
                                    onFocus={() => setIsTitleFocused(true)}
                                    onBlur={() => setIsTitleFocused(false)}
                                />

                                <TouchableOpacity
                                    style={[
                                        styles.generateButton,
                                        {
                                            backgroundColor: text.trim() ? colors.primary : colors.surfaceAccent,
                                            opacity: text.trim() ? 1 : 0.5,
                                        },
                                    ]}
                                    onPress={generateTitle}
                                    disabled={!text.trim() || isGeneratingTitle}
                                >
                                    {isGeneratingTitle ? (
                                        <ActivityIndicator size="small" color={colors.text} />
                                    ) : (
                                        <FontAwesome name="magic" size={hp(2.2)} color={colors.text} />
                                    )}
                                </TouchableOpacity>
                            </View>

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
                                placeholder="What's on your mind?"
                                placeholderTextColor={colors.textSecondary}
                                multiline
                                value={text}
                                onChangeText={setText}
                                onFocus={() => setIsTextFocused(true)}
                                onBlur={() => setIsTextFocused(false)}
                            />

                        </Animated.View>

                        <Text style={[styles.disclaimer, { color: colors.textSecondary }]}>
                            Your confession will be posted anonymously. Be mindful and respectful of others.
                        </Text>
                    </ScrollView>
                </View>
            </View>
        </Modal>
    );
};

export default CreateConfessionModal;

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'flex-end',
    },
    modalContent: {
        backgroundColor: COLORS.white,
        borderTopLeftRadius: wp(5),
        borderTopRightRadius: wp(5),
        height: hp(80),
        paddingBottom: hp(2),
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
        padding: wp(4),
    },
    headerTitle: {
        fontSize: hp(2.5),
        fontFamily: fontFamily.FONTS.bold,
        color: COLORS.black,
    },
    submitButton: {
        width: wp(10),
        height: wp(10),
        borderRadius: wp(5),
        justifyContent: 'center',
        alignItems: 'center',
    },
    content: {
        flex: 1,
        paddingHorizontal: wp(4),
    },
    section: {
        marginBottom: hp(3),
        gap: hp(2),
    },
    titleContainer: {
        flexDirection: 'row',
        gap: wp(3),
        alignItems: 'center',
    },
    titleInput: {
        flex: 1,
        fontSize: hp(1.7),
        padding: hp(1.5),
        backgroundColor: COLORS.white,
        borderColor: COLORS.gray,
        borderWidth: 0.4,
        color: COLORS.black,
        fontFamily: fontFamily.FONTS.Medium,
        borderRadius: wp(3),
        backgroundColor: COLORS.white,
        minHeight: hp(6),
    },
    generateButton: {
        width: wp(12),
        height: wp(12),
        borderRadius: wp(6),
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
        fontSize: hp(1.7),
        minHeight: hp(25),
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
    disclaimer: {
        fontSize: hp(1.6),
        textAlign: 'center',
        lineHeight: hp(2.5),
        color: COLORS.darkgray,
        marginTop: hp(2),
    },
});
