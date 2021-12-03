import React, { useEffect, useState } from "react";
import {
    View,
    FlatList,
    TouchableOpacity,
    StatusBar,
    Alert,
    Text,
} from "react-native";
import { useNavigation } from "@react-navigation/core";
import firebase from "../services/firebaseConfig";
import Task from "../components/Task";
import SearchInput from "../components/SearchInput";
import AntDesign from "react-native-vector-icons/AntDesign";
import { styles } from "../styles/HomeStyles";
import { AdMobBanner } from "expo-ads-admob";
import { Image } from "react-native-elements";

const Home = ({ task, setTask }) => {
    const [search, setSearch] = useState("");
    const [loggedUser, setLoggedUser] = useState(null);
    const [taskFilter, setTaskFilter] = useState([]);

    const navigation = useNavigation();

    firebase.auth().onAuthStateChanged((firebaseUser) => {
        setLoggedUser(firebaseUser);
    });

    useEffect(() => {
        const tasksFilter = task.filter(
            (task) => task.userEmail === loggedUser?.email
        );
        setTaskFilter(tasksFilter);
    }, [task, loggedUser]);

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

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="#17181f" />

            <SearchInput
                onChangeTextSearch={(s) => setSearch(s)}
                valueSearch={search}
            />
            {taskFilter.length === 0 && (
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
                            <Task
                                title={item.title}
                                status={item.status}
                                description={item.description}
                                responsible={item.responsible}
                                onPressDelete={() => {
                                    Alert.alert(
                                        "Estas seguro que quiere borrar esta tarea",
                                        `${item.title}`,
                                        [
                                            {
                                                text: "Cancelar",
                                                onPress: () =>
                                                    console.log(
                                                        "Cancel Pressed"
                                                    ),
                                                style: "cancel",
                                            },
                                            {
                                                text: "SI",
                                                onPress: () =>
                                                    deleteTask(item.id),
                                            },
                                        ],
                                        { cancelable: false }
                                    );
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
                                onPressStatus={() => handleChangeStatus(item)}
                            />
                        </View>
                    );
                }}
            />

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
