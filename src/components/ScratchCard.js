// ScratchCard.js (Flip Animation + Back Button After Scratch)
import React, { useRef, useState, useEffect } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Modal,
    Animated,
    Easing,
    Platform,
} from "react-native";
import {
    Canvas,
    Path,
    Skia,
    Group,
    Mask,
    useCanvasRef,
    useImage,
    Image,
    Rect,
} from "@shopify/react-native-skia";
import LottieView from "lottie-react-native";
import Icon from "react-native-vector-icons/Feather";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "./Pixel/Index";
import { COLORS, fontFamily } from "../../constants";

const CARD_WIDTH = wp(90);
const CARD_HEIGHT = hp(25);
const SCRATCH_STROKE = 45;

export default function ScratchCard({ visible, gift, onClose }) {
    const canvasRef = useCanvasRef();
    const scratchTexture = useImage(require("../../assets/scratch-texture.png"));
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
    const [isScratched, setIsScratched] = useState(false);
    const [hasMoved, setHasMoved] = useState(false);
    const [points, setPoints] = useState([]);
    const [showConfetti, setShowConfetti] = useState(false);
    const confettiRef = useRef(null);
    const flipAnim = useRef(new Animated.Value(0)).current;
    const [flipped, setFlipped] = useState(false);

    const content = gift || "🎉 Here's a surprise for you! 🎉";

    useEffect(() => {
        if (visible) {
            flipAnim.setValue(0);
            setFlipped(false);
            setTimeout(() => {
                Animated.timing(flipAnim, {
                    toValue: 180,
                    duration: 700,
                    easing: Easing.out(Easing.ease),
                    useNativeDriver: true,
                }).start(() => setFlipped(true));
            }, 10);
        } else {
            flipAnim.setValue(0);
            setFlipped(false);
        }
    }, [visible]);

    const interpolateRotation = flipAnim.interpolate({
        inputRange: [0, 180],
        outputRange: Platform.select({ ios: ["0deg", "180deg"], android: ["180deg", "360deg"] }),
    });

    const onLayout = (e) => {
        const { width, height } = e.nativeEvent.layout;
        setDimensions({ width, height });
    };

    const checkScratchCompletion = () => {
        const image = canvasRef.current?.makeImageSnapshot();
        if (!image) return;

        const pixels = image.readPixels();
        let transparentPixels = 0;
        const totalPixels = pixels.length / 4;

        for (let i = 3; i < pixels.length; i += 4) {
            if (pixels[i] < 50) transparentPixels++;
        }

        const percent = transparentPixels / totalPixels;
        if (percent > 0.4 && !isScratched) {
            setIsScratched(true);
            setShowConfetti(true);
            confettiRef.current?.play();
        }
    };

    return (
        <Modal visible={visible} animationType="fade" transparent>
            <View style={styles.container}>
                <Animated.View
                    style={[{
                        transform: [{ rotateY: interpolateRotation }],
                    }]}
                >
                    <View
                        onLayout={onLayout}
                        style={[styles.cardContainer, { width: CARD_WIDTH, height: CARD_HEIGHT }]}
                    >
                        {flipped && (
                            <View style={[styles.revealContent]}>
                                <Text style={[styles.quoteText]}>{content}</Text>
                            </View>
                        )}

                        {!!scratchTexture && dimensions.width > 0 && dimensions.height > 0 && (
                            <Canvas
                                style={StyleSheet.absoluteFill}
                                ref={canvasRef}
                                onTouchStart={({ nativeEvent }) => {
                                    setHasMoved(true);
                                    const newPoints = [{ x: nativeEvent.locationX, y: nativeEvent.locationY }];
                                    setPoints((prev) => [...prev, newPoints]);
                                }}
                                onTouchMove={({ nativeEvent }) => {
                                    setPoints((prev) => {
                                        const updated = [...prev];
                                        const lastPath = updated.pop();
                                        if (lastPath) lastPath.push({ x: nativeEvent.locationX, y: nativeEvent.locationY });
                                        return [...updated, lastPath];
                                    });
                                }}
                                onTouchEnd={checkScratchCompletion}
                            >
                                <Mask
                                    mode="luminance"
                                    mask={
                                        <Group>
                                            <Rect x={0} y={0} width={dimensions.width} height={dimensions.height} color="white" />
                                            {points.map((stroke, index) => {
                                                const path = Skia.Path.Make();
                                                stroke.forEach((pt, i) => {
                                                    if (i === 0) path.moveTo(pt.x, pt.y);
                                                    else path.lineTo(pt.x, pt.y);
                                                });
                                                return (
                                                    <Path
                                                        key={index}
                                                        path={path}
                                                        color="black"
                                                        style="stroke"
                                                        strokeWidth={SCRATCH_STROKE}
                                                        strokeCap="round"
                                                        strokeJoin="round"
                                                    />
                                                );
                                            })}
                                        </Group>
                                    }
                                >
                                    {!isScratched && (
                                        <Image
                                            image={scratchTexture}
                                            x={0}
                                            y={0}
                                            width={dimensions.width}
                                            height={dimensions.height}
                                            fit="cover"
                                        />
                                    )}
                                </Mask>
                            </Canvas>
                        )}
                    </View>
                </Animated.View>

                {showConfetti && (
                    <LottieView
                        ref={confettiRef}
                        source={require("../../assets/confetti.json")}
                        autoPlay
                        loop={false}
                        style={styles.confetti}
                        onAnimationFinish={() => setShowConfetti(false)}
                    />
                )}

                {isScratched && (
                    <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                        <Text style={{ fontFamily: fontFamily.FONTS.bold, fontSize: hp(2.1), color: COLORS.white }}>
                            Back
                        </Text>
                    </TouchableOpacity>
                )}
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: "center",
    },
    closeButton: {
        marginTop: hp(2),
        width: wp(30),
        justifyContent: 'center',
        alignItems: 'center',
        height: hp(5),
        borderRadius: wp(3),
        backgroundColor: COLORS.BlazeOrange,
    },
    title: {
        fontSize: hp(2.8),
        marginBottom: hp(2),
        fontFamily: fontFamily.FONTS.bold,
    },
    cardContainer: {
        borderRadius: wp(5),
        overflow: "hidden",
        position: "relative",
        backgroundColor: COLORS.white,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 8,
        elevation: 6,
        marginBottom: hp(2),
        backfaceVisibility: 'hidden',
    },
    revealContent: {
        ...StyleSheet.absoluteFillObject,
        alignItems: "center",
        justifyContent: "center",
        padding: wp(4),
    },
    quoteText: {
        fontSize: hp(2.2),
        fontFamily: fontFamily.FONTS.bold,
        textAlign: "center",
        color: COLORS.darkgray,
    },
    confetti: {
        position: "absolute",
        top: 0,
        width: wp(100),
        height: hp(40),
    },
});
