import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { fonts } from "../../styles/Theme";

const Header = () => {
    return (
        <View style={styles.headerContainer}>
            <Image source={require("../../assets/images/avatar.jpeg")} resizeMode="cover" style={styles.avatar} />
            <Text style={styles.userNameText}>Lootie Curtis</Text>
            <View style={styles.itemTextContainer}>
                <Text style={styles.productCount}>You have 3 Products</Text>
            </View>
        </View>
    );
};

export default Header;

const styles = StyleSheet.create({
    headerContainer: {
        justifyContent: "center",
        alignItems: "center",
        marginTop: 20
    },
    avatar: {
        height: 60,
        width: 60,
        borderRadius: 30
    },
    userNameText: {
        color: "#fff",
        marginVertical: 10,
        fontSize: 20,
        fontFamily: fonts.fontBold
    },
    itemTextContainer: {
        backgroundColor: "#fff",
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 20
    },
    productCount: {
        fontFamily: fonts.fontRegular
    }
});
