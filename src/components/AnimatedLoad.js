import React, { useState, useEffect } from "react";
import { Text, View } from "react-native";
import { Button } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import { AdMobInterstitial } from "expo-ads-admob";

import AnimatedLoader from "react-native-animated-loader";
import { styles } from "../styles/AnimatedLoadStyles";

export default function AnimatedLoad() {
    const [visible, setVisible] = useState(true);
    const [buttonDisable, setButtonDisable] = useState(true);
    useEffect(() => {
        setInterval(() => {
            setButtonDisable(false);
        }, 2500);
    }, []);

    const showAd = async () => {
        await AdMobInterstitial.setAdUnitID(
            "ca-app-pub-6203383529182342/2460925112"
        );
        await AdMobInterstitial.requestAdAsync({
            servePersonalizedAds: true,
        });
        await AdMobInterstitial.showAdAsync();
    };

    return (
        <>
            <AnimatedLoader
                visible={visible}
                overlayColor="#17181f"
                animationStyle={{
                    width: buttonDisable ? 100 : 0,
                    height: buttonDisable ? 100 : 0,
                }}
                speed={1}
            >
                <View style={styles.container}>
                    <Text style={styles.text}>
                        {buttonDisable ? "Cargando Tareas..." : ""}
                    </Text>
                    {!buttonDisable && (
                        <View>
                            <Icon
                                name="check-circle"
                                size={80}
                                color="green"
                                style={styles.icon}
                            />
                            <Text style={styles.text}>Tareas Cargadas</Text>
                        </View>
                    )}
                    <Button
                        title="ENTRAR"
                        onPress={() => {
                            showAd();
                            setVisible(false);
                        }}
                        disabled={buttonDisable}
                        buttonStyle={{
                            backgroundColor: "#b738fe",
                        }}
                    />
                </View>
            </AnimatedLoader>
        </>
    );
}
