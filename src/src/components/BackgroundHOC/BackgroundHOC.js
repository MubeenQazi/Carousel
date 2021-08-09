import React from "react";
import { ImageBackground, SafeAreaView, StyleSheet } from "react-native";

const bgImage = require("../../assets/images/bg-image.png");

const BackgroundHOC =
    WrappedComponent =>
    ({ ...otherProps }) => {
        const source = bgImage;

        return (
            <ImageBackground source={source} style={styles.background}>
                <SafeAreaView style={{ flex: 1 }}>
                    <WrappedComponent {...otherProps} />
                </SafeAreaView>
            </ImageBackground>
        );
    };

export default BackgroundHOC;

const styles = StyleSheet.create({
    background: {
        resizeMode: "contain",
        width: "100%",
        height: "100%"
    },
    image: {
        resizeMode: "stretch"
    }
});
