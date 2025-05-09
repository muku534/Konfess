import { ImageBackground, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { COLORS, fontFamily, Images } from '../../../constants';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from '../../components/Pixel/Index';
import Button from '../../components/Button';
import Animated, { FadeInDown } from 'react-native-reanimated';

const Welcome = ({ navigation }) => {
    return (
        <ImageBackground
            source={Images.WelcomeImage}
            style={styles.container}
            resizeMode="cover"
        >
            <View style={styles.innerContainer}>
                {/* Heading */}
                <Animated.View
                    entering={FadeInDown.delay(200)}
                    style={styles.textWrapper}
                >
                    <Text style={styles.title}>Welcome to Konfess</Text>
                    <Text style={styles.subtitle}>
                        Your safe space for healing, reflection, and personal growth
                    </Text>
                </Animated.View>

                {/* Button */}
                <Animated.View entering={FadeInDown.delay(500)}>
                    <Button
                        title="Get Started"
                        onPress={() => navigation.navigate('SignUp')}
                        loading={false}
                        disabled={false}
                    />
                </Animated.View>
            </View>
        </ImageBackground>
    );
};

export default Welcome;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    innerContainer: {
        marginVertical: hp(5),
        alignItems: 'center',
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: wp(5),
        marginBottom: hp(5),
    },
    textWrapper: {
        alignItems: 'center',
        marginBottom: hp(3),
    },
    title: {
        fontSize: hp(3.5),
        fontFamily: fontFamily.FONTS.bold,
        color: COLORS.tertiaryWhite,
        paddingBottom: hp(1.5),
    },
    subtitle: {
        fontSize: hp(2.2),
        fontFamily: fontFamily.FONTS.Medium,
        color: COLORS.tertiaryWhite,
        textAlign: 'center',
    },
});
