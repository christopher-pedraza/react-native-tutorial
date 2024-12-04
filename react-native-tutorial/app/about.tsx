import { Text, View, StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#25292e",
        justifyContent: "center",
        alignItems: "center",
    },
    text: {
        color: "#fff",
    },
});

const AboutScreen = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>About screen</Text>
        </View>
    );
};

export default AboutScreen;