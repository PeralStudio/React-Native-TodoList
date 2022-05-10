import React, { useCallback, useState } from "react";
import { View, Text, TouchableOpacity, Image, StatusBar } from "react-native";
import firebase, { auth } from "../services/firebaseConfig";
import AntDesign from "react-native-vector-icons/AntDesign";
import { styles } from "../styles/ProfileStyles";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

export default function Profile({ task }) {
    const [loggedUser, setLoggedUser] = useState(null);
    const [taskFilter, setTaskFilter] = useState([]);

    const navigation = useNavigation();

    firebase.auth().onAuthStateChanged((firebaseUser) => {
        setLoggedUser(firebaseUser);
    });

    useFocusEffect(
        useCallback(() => {
            const tasksFilter = task.filter(
                (task) => task.userEmail === loggedUser?.email
            );
            setTaskFilter(tasksFilter);
        }, [task, loggedUser])
    );

    const handleSignOut = () => {
        auth.signOut().then(() => {
            navigation.navigate("Login");
        });
    };

    const taskPending = taskFilter.filter(
        (task) => task.status === "Pendiente"
    );
    const taskInProgress = taskFilter.filter(
        (task) => task.status === "En Curso"
    );
    const taskFinished = taskFilter.filter(
        (task) => task.status === "Finalizada"
    );
    const taskCanceled = taskFilter.filter(
        (task) => task.status === "Cancelada"
    );

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="#17181f" />

            <Image
                style={styles.profileImage}
                source={require("../../assets/profile2.png")}
            />

            <View style={styles.userEmailContainer}>
                <View style={styles.userEmailIcon}>
                    <AntDesign name="mail" size={22} color="#b738fe" />
                </View>

                <View style={styles.userEmailData}>
                    <Text style={styles.userEmailLabel}>Email</Text>

                    <Text style={styles.userEmail}>{loggedUser?.email}</Text>
                </View>
            </View>

            <TouchableOpacity
                style={styles.buttonContainer}
                onPress={handleSignOut}
            >
                <Text style={styles.buttonTitle}>CERRAR SESIÓN</Text>
            </TouchableOpacity>
            <View style={styles.footer}>
                <Text style={{ color: "white", fontSize: 18 }}>
                    {taskPending.length}{" "}
                    {taskPending.length === 1
                        ? "tarea pendiente"
                        : "tareas pendientes"}
                </Text>
                <Text style={{ color: "white", fontSize: 18 }}>
                    {taskInProgress.length}{" "}
                    {taskInProgress.length === 1
                        ? "tarea en curso"
                        : "tareas en curso"}
                </Text>
                <Text style={{ color: "white", fontSize: 18 }}>
                    {taskFinished.length}{" "}
                    {taskFinished.length === 1
                        ? "tarea finalizada"
                        : "tareas finalizadas"}
                </Text>
                <Text style={{ color: "white", fontSize: 18 }}>
                    {taskCanceled.length}{" "}
                    {taskCanceled.length === 1
                        ? "tarea cancelada"
                        : "tareas canceladas"}
                </Text>
            </View>
        </View>
    );
}
