import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableNativeFeedback,
    Keyboard,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { styles } from "../styles/EditTaskStyles";
import { useNavigation, useRoute } from "@react-navigation/native";
import { AdMobBanner } from "expo-ads-admob";

const EditTask = ({ task, setTask }) => {
    const route = useRoute();
    const navigation = useNavigation();

    const [descriptionEdit, setDescriptionEdit] = useState(
        route.params.description
    );
    const [titleEdit, setTitleEdit] = useState(route.params.title);
    const [statusEdit, setStatusEdit] = useState(route.params.status);

    console.log("1", statusEdit);

    const idTask = route.params.id;

    const editTask = (id) => {
        console.log("dentro", statusEdit);
        const taskFilter = task.findIndex((element) => element.id === id);
        task[taskFilter].description = descriptionEdit;
        task[taskFilter].title = titleEdit;
        task[taskFilter].status = statusEdit;
        setTask([...task]);

        console.log("status", statusEdit);

        // navigation.navigate("Home");
    };

    return (
        <TouchableNativeFeedback
            style={styles.container}
            onPress={Keyboard.dismiss}
        >
            <View style={styles.adContainer}>
                <AdMobBanner
                    bannerSize="banner"
                    adUnitID="ca-app-pub-6203383529182342/7249329314"
                    onDidFailToReceiveAdWithError={(error) =>
                        console.log("Admob error:", error)
                    }
                />
            </View>
            <View style={styles.container}>
                {/* <Text style={styles.label}>Título</Text> */}
                <TextInput
                    style={styles.inputTextTitle}
                    onChangeText={(text) => setTitleEdit(text)}
                    value={titleEdit}
                    onBlur={() => editTask(idTask)}
                />

                <Text style={styles.label}>Descripción</Text>
                <TextInput
                    style={styles.inputText}
                    multiline={true}
                    onChangeText={(text) => setDescriptionEdit(text)}
                    value={descriptionEdit}
                    onBlur={() => editTask(idTask)}
                />

                <Text style={styles.label}>Estado</Text>
                <View style={styles.selectContainer}>
                    <Picker
                        style={styles.select}
                        selectedValue={statusEdit}
                        onValueChange={(itemValue) => {
                            console.log("itemValue", itemValue);
                            setStatusEdit(itemValue);
                        }}
                        onBlur={() => editTask(idTask)}
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

                {/* <TouchableOpacity
                    style={styles.buttonNewTask}
                    onPress={() => {
                        editTask(idTask);
                    }}
                >
                    <Text style={styles.iconButton}>EDITAR</Text>
                </TouchableOpacity> */}
            </View>
        </TouchableNativeFeedback>
    );
};

export default EditTask;
