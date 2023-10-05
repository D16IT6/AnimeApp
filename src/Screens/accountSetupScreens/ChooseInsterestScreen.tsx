import { useNavigation } from "@react-navigation/native"
import React, { useState } from "react"
import { Alert, FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { AccountSetupRoutes, AccountSetupScreenNavigationProps } from "../../navigations/AccountSetupNavigator"
import { CategoryViewModel } from "../../common/viewModels"
import { PrimaryColor } from "../../common/Colors"
import { NavigationBar } from "../../common/components/navigationBar"
import { CategoryViewItem, FooterNavigation } from "../../common/components"
import { arrowLeftIcon } from "../../common/Icons"
const ChooseInterestScreen = () => {


    const navigation = useNavigation<AccountSetupScreenNavigationProps>();


    const categoryItems = ["Action",
        "Adventure",
        "Cartoon",
        "Comedy",
        "Dementia",
        "Demons",
        "Drama",
        "Ecchi",
        "Fantasy",
        "Game",
        "Harem",
        "Historical",
        "Horror",
        "Josei",
        "Kids",
        "Live Action",
        "Magic",
        "Martial Arts",
        "Mecha",
        "Military",
        "Music",
        "Mystery",
        "Parody",
        "Police",
        "Psychological",
        "Romance",
        "Samurai",
        "School",
        "Sci-Fi",
        "Seinen",
        "Shoujo",
        "Shoujo Ai",
        "Shounen",
        "Shounen Ai",
        "Slice of Life",
        "Space",
        "Sports",
        "Super Power",
        "Supernatural",
        "Thriller",
        "Tokusatsu",
        "Vampire",
        "Yaoi",
        "Yuri"];

    const categoryViewModelList = categoryItems.map(
        (value, index) => new CategoryViewModel(index + 1, value)
    )

    const styles = StyleSheet.create({
        container:
        {
            paddingHorizontal: 20,
            paddingVertical: 10,
            flex: 1,
            backgroundColor: 'white'
        },
        content:
        {
            flex: 12,
            marginVertical: 10
        },
        contentText:
        {
            fontSize: 18,
            color: '#212121'
        },
        contentCategories: {
            marginVertical: 10,
            flexDirection: 'row',
            flexWrap: 'wrap'
        }
    })
    const [selectedCategories, setSelectCategories] =
        useState<number[]>([]);
    const event = {
        updateState: (modelId: number) => {
            const exist = selectedCategories.find(x => x === modelId) ?? -1;
            if (exist > -1) {
                setSelectCategories(
                    (selectedCategories) => selectedCategories.filter(x => x !== modelId)
                )
            }
            else {
                setSelectCategories(
                    (selectedCategories) => {
                        selectedCategories.push(modelId);
                        return selectedCategories;
                    }
                )
            }
        },
        renderCategoriesList: () => {
            return (
                <View style={styles.contentCategories}>
                    {
                        categoryViewModelList.map((category) => {
                            const id = category.id;
                            return (
                                <CategoryViewItem
                                    key={id}
                                    model={category}
                                    onPress=
                                    {
                                        () => {
                                            event.updateState(id)
                                        }
                                    }
                                />
                            )
                        })
                    }
                </View>
            )
        },
    }
    return (
        <View style={styles.container}>

            <NavigationBar
                flex={1}
                title="Choose you interest"
                icon={arrowLeftIcon}
            />

            <View style={styles.content}>
                <Text style={styles.contentText}>
                    Choose your interests and get the rbest anime recommendations. Don't worry, you can always change it later.
                </Text>
                <ScrollView>
                    {event.renderCategoriesList()}
                </ScrollView>
            </View>

            <FooterNavigation
                flex={1}
                leftTitle="Skip"
                rightTitle="Continue"
                leftEvent={
                    () => {
                        navigation.navigate(AccountSetupRoutes.Profile)
                    }}
                rightEvent={() => {
                    navigation.navigate(AccountSetupRoutes.Profile)

                }}

            />

        </View >
    )
}
export { ChooseInterestScreen }