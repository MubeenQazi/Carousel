import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { themeColor } from "../../styles/Theme";

const Bullet = props => {
    const { currentIndex } = props;

    return (
        <View style={styles.bulletMainContainer}>
            <View
                style={[
                    styles.bulletContainer,
                    [0, 1].includes(currentIndex) ? styles.activeBulletColor : styles.inactiveBulletColor
                ]}
            />
            <View style={[styles.bulletContainer, currentIndex === 2 ? styles.activeBulletColor : styles.inactiveBulletColor]} />
            <View style={[styles.bulletContainer, currentIndex === 3 ? styles.activeBulletColor : styles.inactiveBulletColor]} />
        </View>
    );
};

export default Bullet;

const styles = StyleSheet.create({
    bulletMainContainer: {
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        flexDirection: "row",
        width: "100%",
        bottom: 50
    },
    bulletContainer: {
        height: 8,
        width: 8,
        borderRadius: 4,
        marginRight: 15
    },
    activeBulletColor: {
        backgroundColor: themeColor.primaryColor
    },
    inactiveBulletColor: {
        backgroundColor: themeColor.secondaryColor
    }
});
