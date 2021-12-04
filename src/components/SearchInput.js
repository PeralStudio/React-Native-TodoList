import React from "react";
import { View, TextInput } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import { styles } from "../styles/SearchInputStyles";

import { AdMobBanner } from "expo-ads-admob";

const SearchInput = ({ valueSearch, onChangeTextSearch, taskFilter }) => {
    return (
        <View style={styles.inputSection}>
            {taskFilter.length > 0 && (
                <View style={styles.inputContainer}>
                    <View style={styles.iconStyle}>
                        <AntDesign name="search1" size={16} color="#858585" />
                    </View>
                    <TextInput
                        style={styles.input}
                        value={valueSearch}
                        onChangeText={onChangeTextSearch}
                        placeholder="Buscar tarea"
                        placeholderTextColor="#858585"
                    />
                </View>
            )}
            <View style={styles.adContainer}>
                <AdMobBanner
                    bannerSize="banner"
                    adUnitID="ca-app-pub-6203383529182342/1753513956"
                    servePersonalizedAds={true}
                    onDidFailToReceiveAdWithError={(error) =>
                        console.log(error)
                    }
                />
            </View>
        </View>
    );
};

export default SearchInput;
