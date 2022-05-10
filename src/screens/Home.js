import React, { useCallback, useEffect, useState } from "react";
import {
    View,
    FlatList,
    TouchableOpacity,
    StatusBar,
    Text,
    ScrollView,
    Alert,
} from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/core";
import firebase from "../services/firebaseConfig";
import Task from "../components/Task";
import SearchInput from "../components/SearchInput";
import AntDesign from "react-native-vector-icons/AntDesign";
import { styles } from "../styles/HomeStyles";
import { Image } from "react-native-elements";
import { useToast } from "native-base";
import { Popup } from "react-native-popup-confirm-toast";

const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
};

const Home = ({ task, setTask }) => {
    const [search, setSearch] = useState("");
    const [loggedUser, setLoggedUser] = useState(null);
    const [taskFilter, setTaskFilter] = useState([]);
    const [taskFilterStatus, setTaskFilterStatus] = useState([]);

    const navigation = useNavigation();
    const toast = useToast();

    firebase.auth().onAuthStateChanged((firebaseUser) => {
        setLoggedUser(firebaseUser);
    });

    useFocusEffect(
        useCallback(() => {
            const tasksFilter = task.filter(
                (task) => task.userEmail === loggedUser?.email
            );
            setTaskFilter(tasksFilter);
        }, [task, loggedUser, taskFilterStatus])
    );

    const pending = task.filter((item) => item.status === "Pendiente");
    const inProgress = task.filter((item) => item.status === "En Curso");
    const finished = task.filter((item) => item.status === "Finalizada");
    const canceled = task.filter((item) => item.status === "Cancelada");

    useEffect(() => {
        if (taskFilterStatus.length > 0) {
            const tasksFilter = taskFilterStatus.filter(
                (task) => task.userEmail === loggedUser?.email
            );
            setTaskFilter(tasksFilter);
        } else {
            const tasksFilter = task.filter(
                (task) => task.userEmail === loggedUser?.email
            );
            setTaskFilter(tasksFilter);
        }
    }, [task, loggedUser, taskFilterStatus]);

    function deleteTask(id) {
        const taskFilter = task.filter((element) => element.id !== id);
        setTask(taskFilter);
    }

    const taskSearch = taskFilter.filter((task) =>
        task.title.toLowerCase().includes(search.toLocaleLowerCase())
    );

    const handleChangeStatus = (item) => {
        item.status === "Pendiente"
            ? setTask(
                  task.map((task) =>
                      task.id === item.id
                          ? {
                                ...task,
                                status: "En Curso",
                            }
                          : task
                  )
              )
            : item.status === "En Curso"
            ? setTask(
                  task.map((task) =>
                      task.id === item.id
                          ? {
                                ...task,
                                status: "Finalizada",
                            }
                          : task
                  )
              )
            : item.status === "Finalizada"
            ? setTask(
                  task.map((task) =>
                      task.id === item.id
                          ? {
                                ...task,
                                status: "Cancelada",
                            }
                          : task
                  )
              )
            : item.status === "Cancelada"
            ? setTask(
                  task.map((task) =>
                      task.id === item.id
                          ? {
                                ...task,
                                status: "Pendiente",
                            }
                          : task
                  )
              )
            : null;
    };

    const handleOnPressPending = (pending, setTaskFilterStatus) => {
        if (pending.length <= 0) {
            toast.show({
                title: "No hay tareas pendientes",
                duration: 2000,
                placement: "bottom",
                isClosable: false,
                backgroundColor: "#51017f",
            });
        } else if (pending.length > 0) {
            setTaskFilterStatus(pending);
        } else {
            setTaskFilterStatus(task);
        }
    };
    const handleOnPressInProgress = (inProgress, setTaskFilterStatus) => {
        if (inProgress.length <= 0) {
            toast.show({
                title: "No hay tareas en curso",
                duration: 2000,
                placement: "bottom",
                isClosable: false,
                backgroundColor: "#51017f",
            });
        } else if (inProgress.length > 0) {
            setTaskFilterStatus(inProgress);
        } else {
            setTaskFilterStatus(task);
        }
    };
    const handleOnPressFinished = (finished, setTaskFilterStatus) => {
        if (finished.length <= 0) {
            toast.show({
                title: "No hay tareas finalizadas",
                duration: 2000,
                placement: "bottom",
                isClosable: false,
                backgroundColor: "#51017f",
            });
        } else if (finished.length > 0) {
            setTaskFilterStatus(finished);
        } else {
            setTaskFilterStatus(task);
        }
    };
    const handleOnPressCanceled = (canceled, setTaskFilterStatus) => {
        if (canceled.length <= 0) {
            toast.show({
                title: "No hay tareas canceladas",
                duration: 2000,
                placement: "bottom",
                isClosable: false,
                backgroundColor: "#51017f",
            });
        } else if (canceled.length > 0) {
            setTaskFilterStatus(canceled);
        } else {
            setTaskFilterStatus(task);
        }
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="#17181f" />
            <SearchInput
                onChangeTextSearch={(s) => setSearch(s)}
                valueSearch={search}
                taskFilter={taskFilter}
            />
            {taskFilter.length > 0 && (
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        onPress={() =>
                            handleOnPressPending(pending, setTaskFilterStatus)
                        }
                    >
                        <Text
                            style={{
                                backgroundColor: "#ffc300",
                                color: "#000",
                                padding: 5,
                                marginRight: 5,
                                borderRadius: 4,
                                fontSize: 12.2,
                            }}
                        >
                            Pendiente
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() =>
                            handleOnPressInProgress(
                                inProgress,
                                setTaskFilterStatus
                            )
                        }
                    >
                        <Text
                            style={{
                                backgroundColor: "#0466c8",
                                color: "#fff",
                                padding: 5,
                                marginRight: 5,
                                borderRadius: 4,
                                fontSize: 12.2,
                            }}
                        >
                            En Curso
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() =>
                            handleOnPressFinished(finished, setTaskFilterStatus)
                        }
                    >
                        <Text
                            style={{
                                backgroundColor: "#2a9134",
                                color: "#fff",
                                padding: 5,
                                marginRight: 5,
                                borderRadius: 4,
                                fontSize: 12.2,
                            }}
                        >
                            Finalizada
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() =>
                            handleOnPressCanceled(canceled, setTaskFilterStatus)
                        }
                    >
                        <Text
                            style={{
                                backgroundColor: "#c1121f",
                                color: "#fff",
                                padding: 5,
                                borderRadius: 4,
                                marginRight: 5,
                                fontSize: 12.2,
                            }}
                        >
                            Cancelada
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setTaskFilterStatus(task)}>
                        <Text
                            style={{
                                backgroundColor: "white",
                                color: "black",
                                padding: 5,
                                borderRadius: 4,
                                fontSize: 12.2,
                            }}
                        >
                            Todas
                        </Text>
                    </TouchableOpacity>
                </View>
            )}
            {taskFilter.length <= 0 && (
                <View style={styles.line}>
                    <AntDesign name="frown" size={100} color="#83827D" />
                    <Text style={styles.emptyText}>No tienes tareas</Text>

                    <Image
                        source={require("../../assets/arrow-down.gif")}
                        containerStyle={{
                            width: 100,
                            height: 100,
                            position: "absolute",
                            top: "140%",
                        }}
                    />
                </View>
            )}
            <ScrollView>
                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={taskSearch}
                    renderItem={({ item }) => {
                        return (
                            <View
                                onPress={() =>
                                    navigation.navigate("Login", {
                                        id: item.id,
                                        description: item.description,
                                        title: item.title,
                                        responsible: item.responsible,
                                    })
                                }
                            >
                                <TouchableOpacity
                                    onPress={() =>
                                        navigation.navigate("EditTask", {
                                            id: item.id,
                                            description: item.description,
                                            title: item.title,
                                            responsible: item.responsible,
                                            status: item.status,
                                        })
                                    }
                                >
                                    <Task
                                        title={item.title}
                                        status={item.status}
                                        description={item.description}
                                        responsible={item.responsible}
                                        onPressDelete={() => {
                                            Popup.show({
                                                type: "confirm",
                                                iconEnabled: false,
                                                title: "¿Estas seguro que quiere borrar esta tarea?",
                                                textBody: `${item.title}`,
                                                buttonText: "Borrar",
                                                confirmButtonStyle: {
                                                    backgroundColor:
                                                        "rgba(183,56,254,0.4)",
                                                },
                                                confirmText: "Cancelar",
                                                confirmButtonTextStyle: {
                                                    color: "black",
                                                },
                                                background: "rgba(2,0,0,0.7)",
                                                callback: () => {
                                                    deleteTask(item.id);
                                                    Popup.hide();
                                                },
                                            });
                                        }}
                                        onPressEdit={() =>
                                            navigation.navigate("EditTask", {
                                                id: item.id,
                                                description: item.description,
                                                title: item.title,
                                                responsible: item.responsible,
                                                status: item.status,
                                            })
                                        }
                                        onPressStatus={() =>
                                            handleChangeStatus(item)
                                        }
                                    />
                                </TouchableOpacity>
                            </View>
                        );
                    }}
                />
            </ScrollView>

            <TouchableOpacity
                style={styles.buttonNewTask}
                onPress={() => navigation.navigate("AddTask")}
            >
                <AntDesign name="plus" size={25} color="#fff" />
            </TouchableOpacity>
        </View>
    );
};

export default Home;
