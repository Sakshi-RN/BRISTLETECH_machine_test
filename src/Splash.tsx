import React, { useEffect } from 'react';
import { View, Image, StyleSheet } from 'react-native';

const Splash: React.FC<{ navigation: any }> = ({ navigation }) => {
    useEffect(() => {
        setTimeout(() => {
            navigation.replace('GoogleSigninScreen');
        }, 3000); 
    }, []);

    return (
        <View style={styles.container}>
            <Image
                source={require('../assets/images/splash.png')}
                style={styles.image}
            />
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
        width: '100%',
        height: '100%',
    },
});

export default Splash;