import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Modal,
    TextInput,
    TouchableOpacity,
    ScrollView,
    Platform,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import LinearGradient from 'react-native-linear-gradient';
import Animated, { FadeIn } from 'react-native-reanimated';
import { COLORS, fontFamily } from '../../constants';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from './Pixel/Index';
import { useTheme } from '../context/ThemeContext';

const CommentModal = ({ visible, onClose, confessionId, comments, onAddComment }) => {
    const { colors } = useTheme();
    const [newComment, setNewComment] = useState('');
    const [isFocused, setIsFocused] = useState(false);


    const handleSubmit = () => {
        if (newComment.trim()) {
            onAddComment(newComment);
            setNewComment('');
        }
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
                            <Feather name="x" size={hp(3)} color={colors.text} />
                        </TouchableOpacity>
                        <Text style={[styles.headerTitle, { color: colors.text }]}>Comments</Text>
                        <View style={{ width: hp(3) }} />
                    </View>

                    <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                        {comments?.map((comment, index) => (
                            <Animated.View
                                key={comment.id}
                                entering={FadeIn.delay(index * 100)}
                                style={[styles.commentItem, { backgroundColor: colors.surface }]}
                            >
                                <View style={styles.commentHeader}>
                                    <Text style={[styles.commentAuthor, { color: colors.text }]}>
                                        {comment.author}
                                    </Text>
                                    <Text style={[styles.commentTime, { color: colors.textSecondary }]}>
                                        {comment.time}
                                    </Text>
                                </View>
                                <Text style={[styles.commentText, { color: colors.text }]}>
                                    {comment.text}
                                </Text>
                            </Animated.View>
                        ))}
                    </ScrollView>

                    <View style={styles.inputSection}>
                        <TextInput
                            style={[
                                styles.input,
                                {
                                    backgroundColor: colors.surface,
                                    borderColor: isFocused ? colors.primary : colors.border,
                                    borderWidth: isFocused ? 1 : 0.5,
                                    color: colors.text, // <-- this is needed!
                                },
                            ]}
                            placeholder="Write a comment..."
                            placeholderTextColor={colors.textSecondary}
                            value={newComment}
                            onChangeText={setNewComment}
                            multiline
                            onFocus={() => setIsFocused(true)}
                            onBlur={() => setIsFocused(false)}
                        />


                        <TouchableOpacity
                            style={[
                                styles.sendButton,
                                {
                                    backgroundColor: newComment.trim()
                                        ? COLORS.BlazeOrange
                                        : COLORS.Midgray,
                                    opacity: newComment.trim() ? 1 : 0.5,
                                },
                            ]}
                            onPress={handleSubmit}
                            disabled={!newComment.trim()}
                        >
                            <FontAwesome name="send" size={hp(2.2)} color={COLORS.white} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

export default CommentModal;

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
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: wp(4),
        paddingTop: Platform.OS === 'ios' ? hp(5) : hp(2),
    },
    headerTitle: {
        fontSize: hp(2.5),
        fontFamily: fontFamily.FONTS.bold,
        color: COLORS.black,
    },
    content: {
        flex: 1,
        padding: wp(4),
    },
    commentItem: {
        padding: wp(4),
        borderRadius: wp(3),
        backgroundColor: COLORS.white,
        marginBottom: hp(1.5),
    },
    commentHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: hp(0.5),
    },
    commentAuthor: {
        fontSize: hp(1.8),
        fontFamily: fontFamily.FONTS.Medium,
        color: COLORS.black,
    },
    commentTime: {
        fontSize: hp(1.5),
        color: COLORS.darkgray,
    },
    commentText: {
        fontSize: hp(1.8),
        lineHeight: hp(2.4),
        color: COLORS.black,
    },
    inputSection: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        gap: wp(2),
        padding: wp(4),
    },
    input: {
        flex: 1,
        fontSize: hp(1.8),
        minHeight: hp(6),
        maxHeight: hp(15),
        borderRadius: wp(3),
        paddingHorizontal: wp(4),
        paddingVertical: hp(1.5),
        backgroundColor: COLORS.white,
        borderColor: COLORS.gray,
        borderWidth: 0.4,
        color: COLORS.black,
        textAlignVertical: 'top',
    },
    sendButton: {
        width: hp(6),
        height: hp(6),
        borderRadius: hp(3),
        justifyContent: 'center',
        alignItems: 'center',
    },
});
