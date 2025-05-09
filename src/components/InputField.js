import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { fontFamily } from "../../constants";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "./Pixel/Index";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import DeviceInfo from 'react-native-device-info';
import { useState } from "react";
import { useTheme } from "../context/ThemeContext";

const isTablet = DeviceInfo.isTablet();

const InputField = ({
    label,
    icon,
    placeholder,
    value,
    onChangeText,
    keyboardType = 'default',
    secureTextEntry,
    editable = true,
    toggleSecure,
    isSecure,
    multiline = false,
    numberOfLines = 2,
}) => {
    const { colors } = useTheme();
    const [isFocused, setIsFocused] = useState(false);

    return (
        <View>
            {label && <Text style={[styles.label, { color: colors.text }]}>{label}</Text>}
            <View style={[
                styles.inputContainer,
                multiline && styles.multilineContainer,
                {
                    backgroundColor: colors.surface,
                    borderColor: isFocused ? colors.primary : colors.border,
                    borderWidth: isFocused ? 1 : 0.5,
                }
            ]}>
                {icon && icon}
                <TextInput
                    placeholder={placeholder}
                    placeholderTextColor={colors.textSecondary}
                    keyboardType={keyboardType}
                    secureTextEntry={secureTextEntry}
                    style={[
                        styles.input,
                        multiline && styles.multilineInput,
                        { color: colors.text }
                    ]}
                    value={value}
                    onChangeText={onChangeText}
                    editable={editable}
                    multiline={multiline}
                    numberOfLines={numberOfLines}
                    textAlignVertical={multiline ? "top" : "center"}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                />
                {toggleSecure && !multiline && (
                    <TouchableOpacity onPress={toggleSecure} style={styles.eyeIcon}>
                        <MaterialIcons
                            name={isSecure ? "visibility-off" : "visibility"}
                            size={24}
                            color={colors.textSecondary}
                        />
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
};

export default InputField;

const styles = StyleSheet.create({
    label: {
        fontSize: hp(1.8),
        fontFamily: fontFamily.FONTS.Medium,
        marginBottom: hp(0.5),
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: hp(1),
        height: hp(6.5),
        borderRadius: isTablet ? wp(1) : wp(4),
        paddingLeft: wp(2),
    },
    multilineContainer: {
        height: 'auto',
        minHeight: hp(12),
        alignItems: 'flex-start',
        paddingVertical: hp(1),
    },
    input: {
        flex: 1,
        fontSize: hp(1.8),
        paddingHorizontal: wp(3),
        fontFamily: fontFamily.FONTS.Medium,
    },
    multilineInput: {
        minHeight: hp(10),
        paddingTop: hp(1.2),
    },
    eyeIcon: {
        position: 'absolute',
        right: wp(4),
        alignSelf: 'center',
    },
});
