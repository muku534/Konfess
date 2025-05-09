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
import Icon from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Animated, { FadeIn } from 'react-native-reanimated';
import { COLORS, fontFamily } from '../../constants';
import LinearGradient from 'react-native-linear-gradient';
import { useTheme } from '../context/ThemeContext';

const NOTIFICATIONS = [
    {
        id: 1,
        type: 'support',
        message: 'Sarah supported your confession',
        time: '2 minutes ago',
        read: false,
    },
    {
        id: 2,
        type: 'comment',
        message: 'New comment on your confession: "I completely understand how you feel..."',
        time: '15 minutes ago',
        read: false,
    },
    {
        id: 3,
        type: 'reminder',
        message: 'Time for your evening reflection',
        time: '1 hour ago',
        read: false,
    },
    {
        id: 4,
        type: 'support',
        message: 'Alex and 5 others supported your confession',
        time: '2 hours ago',
        read: true,
    },
    {
        id: 5,
        type: 'comment',
        message: 'New comment on your confession: "Stay strong, you got this!"',
        time: '5 hours ago',
        read: true,
    },
];

const NotificationsModal = ({ visible, onClose }) => {
    const { colors } = useTheme();
    const getNotificationIcon = (type) => {
        switch (type) {
            case 'support':
                return <FontAwesome name="heart" size={hp(2.3)} color={colors.primary} />;
            case 'comment':
                return <MaterialCommunityIcons name="comment-outline" size={hp(2.3)} color={colors.primary} />;
            case 'reminder':
                return <FontAwesome name="bell-o" size={hp(2.3)} color={colors.primary} />;
            default:
                return null;
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
                        <Text style={[styles.title, { color: colors.text }]}>Notifications</Text>
                        <TouchableOpacity onPress={onClose}>
                            <Icon name="x" size={hp(3)} color={colors.text} />
                        </TouchableOpacity>
                    </View>

                    <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                        {NOTIFICATIONS.map((notification, index) => (
                            <Animated.View
                                key={notification.id}
                                entering={FadeIn.delay(index * 100)}
                                style={[
                                    styles.notificationItem,
                                    {
                                        backgroundColor: notification.read ? colors.surface : `${colors.primary}15`,
                                    },
                                ]}
                            >
                                <View style={styles.notificationIcon}>
                                    {getNotificationIcon(notification.type)}
                                </View>
                                <View style={styles.notificationContent}>
                                    <Text style={[styles.notificationMessage, { color: colors.text }]}>
                                        {notification.message}
                                    </Text>
                                    <View style={styles.notificationMeta}>
                                        <FontAwesome name="clock-o" size={hp(1.6)} color={colors.textSecondary} />
                                        <Text style={[styles.notificationTime, { color: colors.textSecondary }]}>
                                            {notification.time}
                                        </Text>
                                    </View>
                                </View>
                            </Animated.View>
                        ))}
                    </ScrollView>
                </View>
            </View>
        </Modal>
    );
};

export default NotificationsModal;

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
        paddingHorizontal: wp(4),
        paddingTop: Platform.OS === 'ios' ? hp(5) : hp(3),
        paddingBottom: hp(2),
    },
    title: {
        fontSize: hp(2.8),
        fontFamily: fontFamily.FONTS.bold,
        color: COLORS.black,
    },
    content: {
        flex: 1,
        marginVertical: hp(3),
        paddingHorizontal: wp(4),
    },
    notificationItem: {
        flexDirection: 'row',
        padding: wp(4),
        borderRadius: wp(4),
        marginBottom: hp(1.5),

    },
    notificationIcon: {
        width: wp(10),
        height: wp(10),
        borderRadius: wp(5),
        // backgroundColor: '#ffe8d8',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: wp(3),
    },
    notificationContent: {
        flex: 1,
    },
    notificationMessage: {
        fontSize: hp(1.8),
        color: COLORS.black,
        fontFamily: fontFamily.FONTS.Medium,
        marginBottom: hp(0.5),
        paddingVertical: hp(0.5),
    },
    notificationMeta: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: wp(1.5),
    },
    notificationTime: {
        fontSize: hp(1.6),
        color: COLORS.darkgray,
        marginLeft: wp(1),
    },
});
