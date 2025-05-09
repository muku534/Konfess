import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Modal,
    TouchableOpacity,
    TextInput,
    ScrollView,
    Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Animated, { FadeInDown, useAnimatedStyle, withRepeat, withSequence, withTiming, Easing } from 'react-native-reanimated';
import LinearGradient from 'react-native-linear-gradient';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from './Pixel/Index';
import { COLORS, fontFamily } from '../../constants';
import InputField from './InputField';
import { useTheme } from '../context/ThemeContext';

const NightReflectionModal = ({ visible, onClose }) => {
    const { colors } = useTheme();
    const [questions, setQuestions] = useState([
        {
            id: 1,
            text: "What was the highlight of your day?",
            answer: "",
        },
        {
            id: 2,
            text: "What challenged you today, and how did you handle it?",
            answer: "",
        },
        {
            id: 3,
            text: "What are you grateful for today?",
            answer: "",
        },
        {
            id: 4,
            text: "What did you learn about yourself today?",
            answer: "",
        },
        {
            id: 5,
            text: "What would you like to focus on tomorrow?",
            answer: "",
        },
    ]);

    const starOpacity = useAnimatedStyle(() => ({
        opacity: withRepeat(
            withSequence(
                withTiming(0.3, { duration: 1500, easing: Easing.inOut(Easing.ease) }),
                withTiming(1, { duration: 1500, easing: Easing.inOut(Easing.ease) })
            ),
            -1,
            true
        ),
    }));

    const handleAnswerChange = (id, answer) => {
        setQuestions(prev =>
            prev.map(q => q.id === id ? { ...q, answer } : q)
        );
    };

    const handleSave = () => {
        // Save reflection logic here
        onClose();
    };

    const isFormValid = () => {
        return questions.some(q => q.answer.trim().length > 0);
    };

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
                        <TouchableOpacity onPress={onClose}>
                            <Icon name="x" size={wp(5.5)} color={colors.text} />
                        </TouchableOpacity>

                        <View style={styles.titleContainer}>
                            <Ionicons name="moon" size={wp(5.5)} color={colors.primary} />
                            <Text style={[styles.title, { color: colors.text }]}>Night Reflection</Text>
                            <Animated.View style={starOpacity}>
                                <FontAwesome name="star" size={wp(5)} color={colors.primary} />
                            </Animated.View>
                        </View>

                        <TouchableOpacity
                            style={[
                                styles.saveButton,
                                {
                                    backgroundColor: isFormValid() ? colors.primary : colors.surfaceAccent,
                                    opacity: isFormValid() ? 1 : 0.5,
                                }
                            ]}
                            onPress={handleSave}
                            disabled={!isFormValid()}
                        >
                            <FontAwesome name="save" size={hp(2.5)} color={colors.text} />
                        </TouchableOpacity>
                    </View>

                    <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
                        Take a moment to reflect on your day and set intentions for tomorrow
                    </Text>

                    <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                        {questions.map((question, index) => (
                            <Animated.View
                                key={question.id}
                                entering={FadeInDown.delay(index * 100)}
                                style={styles.questionContainer}
                            >
                                <Text style={[styles.questionText, { color: colors.text }]}>{question.text}</Text>
                                <InputField
                                    placeholder="Write your thoughts here..."
                                    value={question.answer}
                                    onChangeText={(text) => handleAnswerChange(question.id, text)}
                                    multiline={true}
                                    numberOfLines={6}
                                />
                            </Animated.View>
                        ))}
                    </ScrollView>

                    <TouchableOpacity
                        style={[
                            styles.submitButton,
                            {
                                backgroundColor: isFormValid() ? colors.primary : colors.surfaceAccent,
                                opacity: isFormValid() ? 1 : 0.5,
                            }
                        ]}
                        onPress={handleSave}
                        disabled={!isFormValid()}
                    >
                        <FontAwesome name="send" size={wp(4.5)} color={colors.text} />
                        <Text style={[styles.submitText, { color: colors.text }]}>Complete Reflection</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

export default NightReflectionModal;

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContent: {
        height: '90%',
        borderTopLeftRadius: wp(6),
        borderTopRightRadius: wp(6),
        overflow: 'hidden',
        backgroundColor: COLORS.white,
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
        paddingTop: Platform.OS === 'ios' ? hp(6) : hp(3),
    },
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: wp(2),
    },
    title: {
        fontSize: hp(2.8),
        fontFamily: fontFamily.FONTS.bold,
        color: COLORS.darkgray,
    },
    saveButton: {
        width: wp(10),
        height: wp(10),
        borderRadius: wp(5),
        justifyContent: 'center',
        alignItems: 'center',
    },
    subtitle: {
        fontSize: hp(2),
        textAlign: 'center',
        paddingHorizontal: wp(5),
        color: COLORS.darkgray1,
        marginBottom: hp(2),
    },
    content: {
        flex: 1,
        paddingHorizontal: wp(5),
    },
    questionContainer: {
        marginBottom: hp(3),
    },
    questionText: {
        fontSize: hp(1.9),
        fontFamily: fontFamily.FONTS.bold,
        color: COLORS.darkgray,
        marginBottom: hp(1.5),
    },
    input: {
        fontSize: hp(1.9),
        minHeight: hp(15),
        borderRadius: wp(4),
        paddingHorizontal: wp(4),
        paddingVertical: hp(1.5),
        borderWidth: 1,
        borderColor: COLORS.border,
        backgroundColor: COLORS.white,
        color: COLORS.black,
        textAlignVertical: 'top',
    },
    submitButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: hp(2),
        borderRadius: wp(4),
        marginHorizontal: wp(5),
        marginBottom: hp(2.5),
        gap: wp(2),
    },
    submitText: {
        fontSize: hp(2),
        fontFamily: fontFamily.FONTS.Medium,
        color: COLORS.darkgray,
    },
});
