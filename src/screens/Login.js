import React, { useState } from "react";
import {
    View,
    Text,
    StatusBar,
    TouchableOpacity,
    Image,
    ActivityIndicator,
    Keyboard,
} from "react-native";
import FormInput from "../components/FormInput";
import { auth, store } from "../services/firebaseConfig";
import { useNavigation } from "@react-navigation/core";
import AlertError from "../components/AlertError";
import { styles } from "../styles/LoginStyles";

const Login = () => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const navigation = useNavigation();

    const handleSignIn = async () => {
        setLoading(true);

        Keyboard.dismiss();

        try {
            await auth
                .signInWithEmailAndPassword(email, password)
                .then((cred) => {
                    store.collection("users").doc(cred.user.uid).set({
                        email,
                    });
                })
                .then(() => {
                    navigation.navigate("Home");
                });
        } catch (e) {
            switch (e.code) {
                case "auth/wrong-password":
                    setError("Ops, tu contraseña es incorrecta...");
                    break;
                case "auth/user-not-found":
                    setError("Este usuario no existe...");
                    break;
                default:
                    setError("Error inesperado...");
            }
        }

        setLoading(false);
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="#17181f" />

            <Image
                style={styles.imageLogin}
                source={require("../../assets/login.png")}
            />

            <FormInput
                placeholderText="Email"
                iconType="mail"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                labelValue={email}
                onChangeText={(userEmail) => setEmail(userEmail.trim())}
            />

            <FormInput
                placeholderText="Contraseña"
                iconType="lock"
                secureTextEntry={true}
                labelValue={password}
                onChangeText={(userPassword) => setPassword(userPassword)}
            />

            <TouchableOpacity
                onPress={handleSignIn}
                style={styles.buttonContainer}
            >
                <Text style={styles.buttonTitle}>
                    {loading === true ? (
                        <ActivityIndicator size="large" color="#fff" />
                    ) : (
                        "ENTRAR"
                    )}
                </Text>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => navigation.navigate("SignUp")}
                style={styles.createAccountButton}
            >
                <Text style={styles.createAccountButtonText}>
                    ¿No tienes una cuenta? ¡Registrarse!
                </Text>
            </TouchableOpacity>

            {error ? (
                <AlertError
                    error={error}
                    onPressCloseError={() => setError(null)}
                />
            ) : null}
        </View>
    );
};

export default Login;
