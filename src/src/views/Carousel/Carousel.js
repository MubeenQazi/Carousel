import React from "react";
import { Text, View, StyleSheet, Image, Dimensions, Animated, Platform, TouchableOpacity } from "react-native";

import { BackgroundHOC } from "../../components/BackgroundHOC";
import { Icon } from "../../components/Icon";
import { fonts, themeColor } from "../../styles/Theme";
import Header from "./Header";
import Bullet from "./Bullet";

const { width } = Dimensions.get("window");

const SPACING = 10;
const ITEM_SIZE = Platform.OS === "ios" ? width * 0.72 : width * 0.74;
const EMPTY_ITEM_SIZE = (width - ITEM_SIZE) / 2;

const MOCK_DATA = [
    {
        key: "empty-left"
    },
    {
        id: 1,
        title: "Moonstone Keychain",
        description: "Choosing the Best Gemstone for Your Necklace and Jewelry",
        media: require("../../assets/images/stone-1.png")
    },
    {
        id: 2,
        title: "Sapphire Keychain",
        description: "Choosing the Best Gemstone for Your Necklace and Jewelry",
        media: require("../../assets/images/stone-2.png")
    },
    {
        id: 3,
        title: "Add a Wearable",
        description: "Don't See One You Like?",
        description2: "Choosing the Best Gemstone for Your Necklace and Jewelry"
    },
    {
        key: "empty-right"
    }
];

const Carousel = () => {
    const [currentIndex, setCurrentIndex] = React.useState(0);
    const scrollX = React.useRef(new Animated.Value(0)).current;
    const onViewRef = React.useRef(viewableItems => {
        setCurrentIndex(viewableItems.changed[0].index);
    });
    const viewConfigRef = React.useRef({ viewAreaCoveragePercentThreshold: ITEM_SIZE });

    return (
        <View style={styles.container}>
            <Header />
            <Animated.FlatList
                onViewableItemsChanged={onViewRef.current}
                viewabilityConfig={viewConfigRef.current}
                showsHorizontalScrollIndicator={false}
                data={MOCK_DATA}
                keyExtractor={(item, index) => index}
                horizontal
                bounces={false}
                decelerationRate={Platform.OS === "ios" ? 0 : 0.98}
                renderToHardwareTextureAndroid
                contentContainerStyle={{ alignItems: "center" }}
                snapToInterval={ITEM_SIZE}
                snapToAlignment="start"
                onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], { useNativeDriver: true })}
                scrollEventThrottle={16}
                renderItem={({ item, index }) => {
                    if (!item.description) {
                        return <View style={{ width: EMPTY_ITEM_SIZE }} />;
                    }
                    const inputRange = [(index - 2) * ITEM_SIZE, (index - 1) * ITEM_SIZE, index * ITEM_SIZE];
                    const translateY = scrollX.interpolate({
                        inputRange,
                        outputRange: [25, -20, 25],
                        extrapolate: "clamp"
                    });
                    return (
                        <View style={{ width: ITEM_SIZE }}>
                            <Animated.View style={[styles.cardContainer, { transform: [{ translateY }] }]}>
                                <View style={styles.textContainer}>
                                    {!item.media ? (
                                        <View style={styles.btnContainer}>
                                            <TouchableOpacity style={styles.iconButton}>
                                                <Icon source={require("../../assets/images/plus.png")} height={30} width={30} />
                                            </TouchableOpacity>
                                        </View>
                                    ) : null}

                                    <Text style={[styles.title, !item.media ? { marginTop: 20 } : {}]}>{item.title}</Text>
                                    <View style={styles.textSubContainer}>
                                        <Text style={styles.description}>{item.description}</Text>
                                        <Text style={[styles.description, styles.description2Margin]}>{item.description2}</Text>
                                    </View>

                                    {item.media ? (
                                        <View style={styles.btnContainer}>
                                            <TouchableOpacity style={styles.btnTouchableOpacity}>
                                                <Text style={styles.btnText}>View</Text>
                                            </TouchableOpacity>
                                        </View>
                                    ) : (
                                        <View style={styles.btnContainer} />
                                    )}

                                    {item.media ? (
                                        <View style={styles.imageContainer}>
                                            <Image source={item.media} resizeMode="contain" style={styles.posterImage} />
                                        </View>
                                    ) : null}
                                </View>
                            </Animated.View>
                        </View>
                    );
                }}
            />
            <Bullet currentIndex={currentIndex} />
        </View>
    );
};

export default BackgroundHOC(Carousel);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: "relative"
    },
    imageContainer: {
        position: "absolute",
        top: -120,
        left: -10
    },
    posterImage: {
        height: 200,
        width: 200
    },
    cardContainer: {
        marginHorizontal: SPACING,
        padding: SPACING * 2,
        alignItems: "center",
        borderRadius: 34,
        backgroundColor: "#ffff",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4
    },
    textContainer: {
        marginHorizontal: 10,
        position: "relative"
    },
    textSubContainer: {
        marginVertical: 30
    },
    title: {
        fontSize: 25,
        textAlign: "center",
        color: "#4D5A75",
        marginTop: 40,
        fontFamily: fonts.fontBold
    },
    description: {
        fontSize: 14,
        textAlign: "center",
        lineHeight: 18,
        color: themeColor.secondaryColor,
        fontFamily: fonts.fontRegular
    },
    description2Margin: {
        marginHorizontal: 20,
        marginTop: 5
    },
    btnContainer: {
        justifyContent: "center",
        alignItems: "center",
        marginTop: 20,
        marginBottom: 20
    },
    iconButton: {
        backgroundColor: themeColor.primaryColor,
        height: 50,
        width: 50,
        borderRadius: 25,
        justifyContent: "center",
        alignItems: "center"
    },
    btnTouchableOpacity: {
        backgroundColor: themeColor.primaryColor,
        height: 40,
        width: 100,
        borderRadius: 50,
        alignItems: "center",
        justifyContent: "center"
    },
    btnText: {
        color: "#fff",
        fontSize: 14,
        fontFamily: fonts.fontBold
    }
});
