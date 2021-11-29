import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import { styles } from "../styles/TaskStyles";

const Task = ({
    title,
    description,
    responsible,
    status,
    onPressDelete,
    onPressEdit,
    onPressStatus,
}) => {
    function getstyle(status) {
        if (status === "Pendiente") {
            return { backgroundColor: "#ffc300", color: "#000" };
        } else if (status === "En Curso") {
            return { backgroundColor: "#0466c8", color: "#fff" };
        } else if (status === "Finalizada") {
            return { backgroundColor: "#2a9134", color: "#fff" };
        } else {
            return { backgroundColor: "#c1121f", color: "#fff" };
        }
    }

    return (
        <View style={styles.taskContainer}>
            <View style={styles.taskHeader}>
                <Text style={styles.taskTitle}>{title}</Text>
                <Text style={styles.taskDescription}>{description}</Text>
            </View>

            <View style={styles.taskActions}>
                <TouchableOpacity onPress={onPressStatus}>
                    <Text style={[getstyle(status), styles.status]}>
                        {status}
                    </Text>
                </TouchableOpacity>

                <View style={styles.taskActionsButtons}>
                    <TouchableOpacity
                        style={styles.buttonEdit}
                        onPress={onPressEdit}
                    >
                        <AntDesign name="form" size={20} color="#b738fe" />
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.buttonDelete}
                        onPress={onPressDelete}
                    >
                        <AntDesign name="delete" size={20} color="#b738fe" />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

export default Task;
