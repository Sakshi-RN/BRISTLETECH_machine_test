import React from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, StyleSheet, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';

interface Recipe {
    id: string;
    name: string;
    ratings: string;
    description: string;
    imageUrl: string;
    isFavorite?: boolean;
}

interface UserData {
    name: string;
    email: string;
    photoUrl: string;
}

const Home: React.FC<{ route: any }> = ({ route }) => {
    const recipes: Recipe[] = [
        {
            id: '1',
            name: 'Spaghetti Carbonara',
            ratings: '4.5',
            description: 'Classic Italian pasta dish with bacon and cheese.',
            imageUrl: require('../assets/images/profile.png')
        },
        {
            id: '2',
            name: 'Chicken Tikka Masala',
            ratings: '4.8',
            description: 'Creamy and flavorful Indian chicken curry.',
            imageUrl: require('../assets/images/profile.png')
        },
        {
            id: '3',
            name: 'Vegetable Stir-Fry',
            ratings: '4.2',
            description: 'Healthy and colorful mix of vegetables in a savory sauce.',
            imageUrl: require('../assets/images/profile.png')
        },
    ];

    const { userData } = route.params;
    const navigation = useNavigation();

    const navBar = () => {
        <View style={styles.navBarContainer}>
            <TouchableOpacity style={styles.iconContainer}>
                <Image
                    source={require('../assets/images/profile.png')}
                    style={styles.icon}
                />
            </TouchableOpacity>
            <View style={styles.searchBarContainer}>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search..."
                    placeholderTextColor="#999"
                />
            </View>

            <TouchableOpacity style={styles.iconContainer}>
                <Image
                    source={require('../assets/images/favourite.png')}
                    style={styles.icon}
                />
            </TouchableOpacity>
        </View>
    }
    const loginData = (
        <View>
            <Image
                source={{ uri: userData.photoUrl }}
                style={styles.userImage}
            />
            <Text style={styles.userName}>Welcome, {userData.name}</Text>
            <Text style={styles.userEmail}>Email: {userData.email}</Text>
        </View>
    );

    const handleRecipePress = () => {
        navigation.navigate('RecipeDetailsScreen');
    };

    const renderRecipeCard = ({ item }: { item: Recipe }) => {
        const { name, ratings, description, imageUrl, isFavorite } = item;

        return (
            <TouchableOpacity style={styles.recipeContainer} onPress={() => handleRecipePress(item)}>
                <Image source={{ uri: imageUrl }} style={styles.recipeImage} />
                <View style={styles.recipeContent}>
                    <Text style={styles.recipeName}>{name}</Text>
                    <Text style={styles.recipeRatings}>Ratings: {ratings}</Text>
                    <Text style={styles.recipeDescription}>{description}</Text>
                    <TouchableOpacity onPress={() => console.log('Favorite pressed for', name)}>
                        <Text style={styles.recipeFavorite}>{isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}</Text>
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.container}>
            {loginData}
            <FlatList
                data={recipes}
                renderItem={renderRecipeCard}
                keyExtractor={(item) => item.id}
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
    navBarContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 16,
        paddingVertical: 10,
        backgroundColor: "#fff",
        elevation: 4,
    },
    iconContainer: {
        padding: 5,
    },
    icon: {
        width: 30,
        height: 30,
    },
    searchBarContainer: {
        flex: 1,
        marginHorizontal: 10,
        borderRadius: 20,
        backgroundColor: "#f0f0f0",
    },
    searchInput: {
        flex: 1,
        paddingHorizontal: 12,
        fontSize: 16,
        color: "#333",
    },
    userImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    userName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    userEmail: {
        fontSize: 16,
        marginTop: 5,
    },
    recipeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
    },
    recipeImage: {
        width: 100,
        height: 100,
        borderRadius: 8,
    },
    recipeContent: {
        flex: 1,
        marginLeft: 10,
    },
    recipeName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    recipeRatings: {
        fontSize: 14,
        color: '#666',
        marginBottom: 5,
    },
    recipeDescription: {
        fontSize: 14,
        marginBottom: 5,
    },
    recipeFavorite: {
        color: 'blue',
        textDecorationLine: 'underline',
    },
});

export default Home;
