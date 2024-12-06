import { View } from "react-native";

// expo components
import { Image, type ImageSource } from "expo-image";

// animations and gestures
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withSpring,
} from "react-native-reanimated";
import { Gesture, GestureDetector } from "react-native-gesture-handler";

type Props = {
    imageSize: number;
    stickerSource: ImageSource;
};

export default function EmojiSticker({ imageSize, stickerSource }: Props) {
    // properties of the image
    const scaleImage = useSharedValue(imageSize);
    const translateX = useSharedValue(0);
    const translateY = useSharedValue(0);

    // GESTURES
    // change the size of the image when double tapped
    const doubleTap = Gesture.Tap()
        .numberOfTaps(2)
        .onStart(() => {
            if (scaleImage.value !== imageSize * 2) {
                scaleImage.value = scaleImage.value * 2;
            } else {
                scaleImage.value = Math.round(scaleImage.value / 2);
            }
        });
    // change the position of the image when dragged
    const drag = Gesture.Pan().onChange((event) => {
        translateX.value += event.changeX;
        translateY.value += event.changeY;
    });

    // ANIMATIONS
    // animate the increase/decrease size of the image
    const imageStyle = useAnimatedStyle(() => {
        return {
            width: withSpring(scaleImage.value),
            height: withSpring(scaleImage.value),
        };
    });
    // animate the position of the image
    const containerStyle = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    translateX: translateX.value,
                },
                {
                    translateY: translateY.value,
                },
            ],
        };
    });

    return (
        <GestureDetector gesture={drag}>
            <Animated.View style={[containerStyle, { top: -350 }]}>
                <GestureDetector gesture={doubleTap}>
                    <Animated.Image
                        source={stickerSource}
                        resizeMode="contain"
                        style={[
                            imageStyle,
                            { width: imageSize, height: imageSize },
                        ]}
                    />
                </GestureDetector>
            </Animated.View>
        </GestureDetector>
    );
}
