import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { GoogleSignin, GoogleSigninButton, statusCodes, User } from '@react-native-google-signin/google-signin';

interface IUser extends User {
    name?: string;
    email?: string;
    photoUrl?: string;
}

const GoogleSigninScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
    const [userInfo, setUserInfo] = useState<IUser | null>(null);

    useEffect(() => {
        GoogleSignin.configure({
            webClientId: '269732174883-qdkvo5knrijmvhb4snfijm83q4k8qo9t.apps.googleusercontent.com',
        });
    }, []);

    const signIn = async () => {
        try {
            await GoogleSignin.hasPlayServices();
            const user: User | null = await GoogleSignin.signIn();
            if (user) {
                const userData: IUser = {
                    ...user,
                    name: user.name ?? '',
                    email: user.email ?? '',
                    photoUrl: user.photo ?? '',
                };
                setUserInfo(userData);
                navigation.navigate('Home', { userData });
            }
        } catch (error: any) {
            console.error('Sign-in error:', error);
        }
    };

    const signOut = async () => {
        try {
            await GoogleSignin.signOut();
            setUserInfo(null);
        } catch (error: any) {
            console.error('Sign-out error:', error);
        }
    };

    return (
        <View style={styles.container}>
            {userInfo ? (
                <View>
                    <Image
                        source={{ uri: userInfo.photoUrl }}
                        style={styles.image}
                    />
                    <Text>Welcome, {userInfo.name}</Text>
                    <Text>Email: {userInfo.email}</Text>
                    <TouchableOpacity style={styles.button} onPress={signOut}>
                        <Text>Sign out</Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <GoogleSigninButton
                    style={styles.googleButton}
                    size={GoogleSigninButton.Size.Wide}
                    color={GoogleSigninButton.Color.Light}
                    onPress={signIn}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    button: {
        padding: 10,
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        borderRadius: 5,
    },
    googleButton: {
        width: 192,
        height: 48,
    },
});

export default GoogleSigninScreen;
