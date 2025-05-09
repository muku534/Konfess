import React from "react";
import { View, Image, TouchableOpacity, StyleSheet, Platform } from "react-native";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "./Pixel/Index";
import { COLORS, fontFamily, Images, SVGS } from "../../constants";
import { useNavigation } from "@react-navigation/native";
import DeviceInfo from "react-native-device-info";
import { Text } from "react-native-gesture-handler";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5"
import Ionicons from "react-native-vector-icons/Ionicons"

const isTablet = DeviceInfo.isTablet();

const BasicHeader = () => {
    const navigation = useNavigation()
    return (
        <View style={styles.header}>
            <Text style={{ fontSize: isTablet ? hp(2.5) : hp(3), fontFamily: fontFamily.FONTS.bold, color: COLORS.black }}>
                Konfess
            </Text>
            <View style={styles.headerIcons}>
                <TouchableOpacity onPress={() => navigation.navigate("Explore", { isSearchOnly: true })} style={{ marginHorizontal: wp(1), justifyContent: 'center', alignItems: 'center', backgroundColor: COLORS.darkgray, width: hp(5), height: hp(5), borderRadius: hp(5), padding: hp(1) }}>
                    <FontAwesome5 name="user-friends" size={hp(2)} color={COLORS.darkgray1} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate("NotificationScreen")} style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: COLORS.darkgray, width: hp(5), height: hp(5), borderRadius: hp(5), padding: hp(1) }}>
                    <Ionicons name="notifications" size={hp(2.5)} color={COLORS.darkgray1} />
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default BasicHeader;

const styles = StyleSheet.create({
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: isTablet ? wp(0) : wp(3),
        marginTop: Platform.OS === "ios" ? hp(0) : hp(5),
        paddingBottom: hp(1),
        backgroundColor: COLORS.white,
    },
    logo: {
        height: hp(4),
        width: isTablet ? wp(14) : wp(35),
        resizeMode: "contain",
    },
    headerIcons: {
        flexDirection: "row",
        alignItems: "center",
    },
    notificationIcon: {
        marginLeft: isTablet ? wp(0) : wp(2),
    },
});
