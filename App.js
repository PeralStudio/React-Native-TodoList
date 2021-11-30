import React, { useEffect, useState } from "react";
import { LogBox } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AntDesign from "react-native-vector-icons/AntDesign";

import firebase from "./src/services/firebaseConfig";
import Login from "./src/screens/Login";
import SignUp from "./src/screens/SignUp";
import HomeTasks from "./src/screens/Home";
import Profile from "./src/screens/Profile";
import EditTask from "./src/screens/EditTask";
import AddTask from "./src/screens/AddTask";
import AnimatedLoad from "./src/components/AnimatedLoad";

LogBox.ignoreLogs(["Setting a timer"]);

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export default function App(props) {
    const [loggedUser, setLoggedUser] = useState(null);
    const [task, setTask] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        getData();
    }, []);

    useEffect(async () => {
        try {
            const jsonTasks = JSON.stringify(task);
            await AsyncStorage.setItem("tasks", jsonTasks);
        } catch (e) {
            setError(e);
        }
    }, [task]);

    const getData = async () => {
        try {
            const tasks = await AsyncStorage.getItem("tasks");
            if (tasks !== null) {
                setTask(JSON.parse(tasks));
            }
        } catch (e) {
            setError(e);
        }
    };

    firebase.auth().onAuthStateChanged((firebaseUser) => {
        setLoggedUser(firebaseUser);
    });

    function HomeTabs() {
        return (
            <Tab.Navigator>
                <Tab.Screen
                    name="HomeTasks"
                    options={{
                        headerShown: false,
                        headerLeft: () => {
                            return null;
                        },
                        tabBarLabel: () => {
                            return null;
                        },
                        tabBarIcon: () => {
                            return (
                                <AntDesign
                                    name="profile"
                                    size={22}
                                    color="#fff"
                                />
                            );
                        },
                        tabBarStyle: {
                            backgroundColor: "#202128",
                            borderTopColor: "transparent",
                        },
                    }}
                >
                    {(props) => <HomeTasks task={task} setTask={setTask} />}
                </Tab.Screen>

                <Tab.Screen
                    name="Profile"
                    options={{
                        headerShown: false,
                        headerLeft: () => {
                            return null;
                        },
                        tabBarLabel: () => {
                            return null;
                        },
                        tabBarIcon: () => {
                            return (
                                <AntDesign name="user" size={22} color="#fff" />
                            );
                        },
                        tabBarStyle: {
                            backgroundColor: "#202128",
                            borderTopColor: "transparent",
                        },
                    }}
                    component={Profile}
                />
            </Tab.Navigator>
        );
    }

    return (
        <>
            <AnimatedLoad />
            <NavigationContainer>
                <Stack.Navigator>
                    {loggedUser ? (
                        <Stack.Screen
                            name="Home"
                            component={HomeTabs}
                            options={{
                                headerShown: false,
                                headerLeft: () => {
                                    return null;
                                },
                            }}
                        />
                    ) : (
                        <>
                            <Stack.Screen
                                name="Login"
                                component={Login}
                                options={{ headerShown: false }}
                            />

                            <Stack.Screen
                                name="SignUp"
                                component={SignUp}
                                options={{ headerShown: false }}
                            />
                        </>
                    )}
                    <Stack.Screen
                        name="EditTask"
                        options={{
                            headerStyle: {
                                backgroundColor: "#17181f",
                                elevation: 0,
                            },
                            headerTintColor: "#fff",
                            title: "Editar tarea",
                        }}
                    >
                        {(props) => <EditTask task={task} setTask={setTask} />}
                    </Stack.Screen>

                    <Stack.Screen
                        name="AddTask"
                        options={{
                            headerStyle: {
                                backgroundColor: "#17181f",
                                elevation: 0,
                            },
                            headerTintColor: "#fff",
                            title: "Añadir Tarea",
                        }}
                    >
                        {(props) => <AddTask task={task} setTask={setTask} />}
                    </Stack.Screen>
                </Stack.Navigator>
            </NavigationContainer>
        </>
    );
}
