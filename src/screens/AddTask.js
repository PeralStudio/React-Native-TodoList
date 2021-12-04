import React, { useState } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    StatusBar,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import firebase from "../services/firebaseConfig";
import { styles } from "../styles/AddTaskStyles";
import AlertError from "../components/AlertError";
import { useNavigation } from "@react-navigation/native";
import uuid from "react-native-uuid";
import { AdMobBanner } from "expo-ads-admob";

const AddTask = ({ task, setTask }) => {
    const [description, setDescription] = useState("");
    const [title, setTitle] = useState("");
    const [status, setStatus] = useState("Pendiente");
    const [loggedUser, setLoggedUser] = useState(null);
    const [error, setError] = useState(null);

    const navigation = useNavigation();

    firebase.auth().onAuthStateChanged((firebaseUser) => {
        setLoggedUser(firebaseUser);
    });

    async function createTask() {
        if (description.length > 0 && title.length > 0) {
            setTask([
                ...task,
                {
                    description: description,
                    title: title,
                    userEmail: loggedUser.email,
                    status: status,
                    id: uuid.v4(),
                },
            ]);

            navigation.navigate("Home");
            setDescription("");
            setTitle("");
        } else {
            setError("Todos los campos son obligatorios");
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.adContainer}>
                <AdMobBanner
                    bannerSize="banner"
                    adUnitID="ca-app-pub-6203383529182342/7249329314"
                    servePersonalizedAds={true}
                    onDidFailToReceiveAdWithError={(error) =>
                        console.log(error)
                    }
                />
            </View>
            <StatusBar barStyle="light-content" backgroundColor="#17181f" />

            <Text style={styles.label}>Título</Text>
            <TextInput
                style={styles.inputText}
                onChangeText={(text) => setTitle(text)}
                value={title}
            />

            <Text style={styles.label}>Descripción</Text>
            <TextInput
                style={styles.inputText}
                onChangeText={(text) => setDescription(text)}
                value={description}
            />

            <Text style={styles.label}>Estado</Text>
            <View style={styles.selectContainer}>
                <Picker
                    style={styles.select}
                    selectedValue={status}
                    onValueChange={(itemValue) => setStatus(itemValue)}
                >
                    <Picker.Item
                        style={styles.selectItem}
                        label="Pendiente"
                        value="Pendiente"
                        key={"Pendiente"}
                    />

                    <Picker.Item
                        style={styles.selectItem}
                        label="En Curso"
                        value="En Curso"
                        key={"En Curso"}
                    />

                    <Picker.Item
                        style={styles.selectItem}
                        label="Finalizada"
                        value="Finalizada"
                        key={"Finalizada"}
                    />

                    <Picker.Item
                        style={styles.selectItem}
                        label="Cancelada"
                        value="Cancelada"
                        key={"Cancelada"}
                    />
                </Picker>
            </View>

            <TouchableOpacity
                style={styles.buttonNewTask}
                onPress={() => {
                    createTask();
                }}
            >
                <Text style={styles.iconButton}>AÑADIR</Text>
            </TouchableOpacity>
            {error && (
                <AlertError
                    error={error}
                    onPressCloseError={() => setError(null)}
                />
            )}
        </View>
    );
};

export default AddTask;
