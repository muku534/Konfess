import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Modal,
    TouchableOpacity,
    ScrollView,
    TextInput,
    Image,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from './Pixel/Index';
import { COLORS, fontFamily } from '../../constants';
import InputField from './InputField';
import { useTheme } from '../context/ThemeContext';

const EditProfileModal = ({ visible, onClose }) => {
    const [profileImage, setProfileImage] = useState('https://images.unsplash.com/photo-1494790108377-be9c29b29330');
    const { colors } = useTheme();
    const [fields, setFields] = useState([
        {
            label: 'Full Name',
            value: 'Sarah Anderson',
            icon: 'user',
            placeholder: 'Enter your full name',
        },
        {
            label: 'Username',
            value: '@sarahanderson',
            icon: 'at',
            placeholder: 'Choose a username',
        },
        {
            label: 'Email',
            value: 'sarah@example.com',
            icon: 'envelope',
            placeholder: 'Enter your email',
        },
        {
            label: 'Location',
            value: 'San Francisco, CA',
            icon: 'map-pin',
            placeholder: 'Add your location',
        },
        {
            label: 'Website',
            value: 'sarah.design',
            icon: 'link',
            placeholder: 'Add your website',
        },
        {
            label: 'Bio',
            value: 'Digital designer passionate about creating meaningful experiences. Love meditation and mindfulness.',
            icon: 'edit',
            placeholder: 'Write something about yourself',
            multiline: true,
        },
    ]);

    const updateField = (index, newValue) => {
        const newFields = [...fields];
        newFields[index].value = newValue;
        setFields(newFields);
    };

    const getIcon = (iconName) => {
        switch (iconName) {
            case 'user':
                return <FontAwesome name="user" size={hp(2.2)} color={COLORS.BlazeOrange} />;
            case 'at':
                return <FontAwesome name="at" size={hp(2.2)} color={COLORS.BlazeOrange} />;
            case 'envelope':
                return <FontAwesome name="envelope" size={hp(2.2)} color={COLORS.BlazeOrange} />;
            case 'map-pin':
                return <Feather name="map-pin" size={hp(2.2)} color={COLORS.BlazeOrange} />;
            case 'link':
                return <Feather name="link" size={hp(2.2)} color={COLORS.BlazeOrange} />;
            case 'edit':
                return <Feather name="edit-3" size={hp(2.2)} color={COLORS.BlazeOrange} />;
            default:
                return null;
        }
    };

    return (
        <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
            <View style={[styles.modalContainer, { backgroundColor: 'rgba(0,0,0,0.5)' }]}>
                <View style={[styles.modalContent, { backgroundColor: colors.background }]}>
                    <View style={[styles.header, { borderBottomColor: colors.border }]}>
                        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                            <Feather name="x" size={hp(3)} color={colors.text} />
                        </TouchableOpacity>
                        <Text style={[styles.title, { color: colors.text }]}>Edit Profile</Text>
                        <TouchableOpacity
                            style={[styles.saveButton, { backgroundColor: colors.primary }]}
                            onPress={onClose}
                        >
                            <Text style={[styles.saveButtonText, { color: colors.text }]}>Save</Text>
                        </TouchableOpacity>
                    </View>

                    <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                        <View style={styles.imageSection}>
                            <View style={styles.imageContainer}>
                                <Image source={{ uri: profileImage }} style={[styles.profileImage, { borderColor: colors.surface || COLORS.white }]} />
                                <TouchableOpacity style={styles.cameraButton}>
                                    <Feather name="camera" size={hp(2)} color={COLORS.white} />
                                </TouchableOpacity>
                            </View>
                            <Text style={[styles.imageHint, { color: colors.textSecondary }]}>Tap to change profile photo</Text>
                        </View>

                        <View style={styles.fieldsContainer}>
                            {fields.map((field, index) => (
                                <View key={index} style={styles.fieldContainer}>
                                    <View style={styles.fieldHeader}>
                                        {getIcon(field.icon)}
                                        <Text style={[styles.fieldLabel, { color: colors.text }]}>{field.label}</Text>
                                    </View>
                                    <InputField
                                        placeholder={field.placeholder}
                                        value={field.value}
                                        onChangeText={(text) => updateField(index, text)}
                                        editable={true}
                                        multiline={field.multiline}
                                        numberOfLines={field.multiline ? 4 : 1}
                                    />

                                </View>
                            ))}
                        </View>
                    </ScrollView>
                </View>
            </View>
        </Modal>
    );
};

export default EditProfileModal;

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContent: {
        borderTopLeftRadius: wp(5),
        borderTopRightRadius: wp(5),
        height: '90%',
        backgroundColor: COLORS.WhiteSmoke,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: wp(4),
        borderBottomWidth: 1,
        borderBottomColor: COLORS.gray,
    },
    title: {
        fontSize: hp(2.4),
        fontFamily: fontFamily.FONTS.bold,
        color: COLORS.black,
    },
    closeButton: {
        padding: wp(2),
    },
    saveButton: {
        backgroundColor: COLORS.BlazeOrange,
        paddingHorizontal: wp(4),
        paddingVertical: hp(1),
        borderRadius: wp(5),
    },
    saveButtonText: {
        fontSize: hp(1.8),
        fontFamily: fontFamily.FONTS.Medium,
        color: COLORS.white,
    },
    content: {
        flex: 1,
    },
    imageSection: {
        alignItems: 'center',
        padding: wp(4),
    },
    imageContainer: {
        position: 'relative',
        marginBottom: hp(1.5),
    },
    profileImage: {
        width: wp(30),
        height: wp(30),
        borderWidth: 5,
        borderRadius: wp(15),
        borderColor: COLORS.white,
    },
    cameraButton: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        width: wp(10),
        height: wp(10),
        borderRadius: wp(5),
        backgroundColor: COLORS.BlazeOrange,
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageHint: {
        fontSize: hp(1.6),
        fontFamily: fontFamily.FONTS.Medium,
        color: COLORS.darkgray,
    },
    fieldsContainer: {
        padding: wp(4),
    },
    fieldContainer: {
        marginBottom: hp(1),
    },
    fieldHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: wp(2),
    },
    fieldLabel: {
        fontSize: hp(1.8),
        color: COLORS.darkgray,
        fontFamily: fontFamily.FONTS.Medium,
    },
    input: {
        fontSize: hp(1.8),
        minHeight: hp(6),
        borderRadius: wp(3),
        paddingHorizontal: wp(4),
        paddingVertical: hp(1),
        borderWidth: 1,
        borderColor: COLORS.Midgray,
        backgroundColor: COLORS.lightgray,
        color: COLORS.black,
    },
    textArea: {
        minHeight: hp(15),
        textAlignVertical: 'top',
    },
});
