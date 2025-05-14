import React from 'react';
import { StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { COLORS, fontFamily, SVGS } from '../../constants';
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from '../components/Pixel/Index';
import DeviceInfo from 'react-native-device-info';
import { Burn, Clubs, Confess, Home, Maditate, Profile } from '../screens';
import FontAwesome from "react-native-vector-icons/FontAwesome"
import Feather from "react-native-vector-icons/Feather"
import FontAwesome6 from "react-native-vector-icons/FontAwesome6"
import Octicons from "react-native-vector-icons/Octicons"
import FontAwesome5 from "react-native-vector-icons/FontAwesome5"
import { useTheme } from '../context/ThemeContext';

const Tab = createBottomTabNavigator();
const isTablet = DeviceInfo.isTablet();

const TabStack = () => {
    const { colors } = useTheme();
    return (

        <Tab.Navigator
            initialRouteName="Home"
            screenOptions={{
                tabBarShowLabel: true,
                lazy: false,
                tabBarStyle: [
                    styles.tabBar,
                    { backgroundColor: colors.surface, borderTopWidth: 0 }
                ],
                tabBarLabelStyle: {
                    fontSize: isTablet ? hp(1.8) : hp(1.4),
                    paddingTop: hp(0.7),
                    fontFamily: fontFamily.FONTS.Medium,
                    textAlign: 'center',
                    flexWrap: 'wrap',
                    width: isTablet ? wp(15) : wp(20),
                    lineHeight: hp(1.8),
                },
                tabBarActiveTintColor: colors.primary,
                tabBarInactiveTintColor: colors.textSecondary,
            }}
        >
            <Tab.Screen
                name="Home"
                component={Home}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ focused, color }) => (
                        focused
                            ? <FontAwesome name="chrome" size={hp(2.5)} color={color} />
                            : <Feather name="chrome" size={hp(2.5)} color={color} />
                    ),
                    tabBarLabel: "Home",  // ✅ Show label
                }}
            />

            <Tab.Screen
                name="Burn"
                component={Burn}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ focused, color }) => (
                        focused
                            ? <FontAwesome6 name="fire-flame-curved" size={hp(2.5)} color={color} />
                            : <Octicons name="flame" size={hp(2.5)} color={color} />
                    ),
                    tabBarLabel: "Burn",  // ✅ Show label
                }}
            />

            <Tab.Screen
                name="Confess"
                component={Confess}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ focused, color }) => (
                        focused
                            ? <FontAwesome5 name="feather" size={hp(2.5)} color={color} />
                            : <Feather name="feather" size={hp(2.5)} color={color} />
                    ),
                    tabBarLabel: "Konfess",  // ✅ Show label
                }}
            />
            <Tab.Screen
                name="meditate"
                component={Maditate}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ focused, color }) => (
                        focused
                            ? <FontAwesome6 name="headphones" size={hp(2.5)} color={color} />
                            : <Feather name="headphones" size={hp(2.5)} color={color} />
                    ),
                    tabBarLabel: "Apologies",  // ✅ Show label
                }}
            />
            <Tab.Screen
                name="Profile"
                component={Profile}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ focused, color }) => (
                        focused
                            ? <FontAwesome name="user" size={hp(2.5)} color={color} />
                            : <Feather name="user" size={hp(2.5)} color={color} />
                    ),
                    tabBarLabel: "Profile",
                }}
            />
        </Tab.Navigator>

    );
};

export default TabStack;

const styles = StyleSheet.create({
    tabBar: {
        position: 'absolute',
        bottom: hp(3),
        left: wp(5),
        right: wp(5),
        elevation: 5,
        borderRadius: wp(10),
        height: hp(8),
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        paddingBottom: hp(0.5),
        paddingTop: hp(0.5),
    },
});
