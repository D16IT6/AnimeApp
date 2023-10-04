import { useNavigation } from "@react-navigation/native"
import React, { useState } from "react"
import { Image, ScrollView, ScrollViewBase, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { AccountSetupRoutes, AccountSetupScreenNavigationProps } from "../../navigations/AccountSetupNavigator"
import { CategoryViewModel } from "../../common/ViewModels"
import { PrimaryColor } from "../../common/Colors"
import { NavigationBar } from "../../common/components/NavigationBar"
import { facebookIcon } from "../../common/Icons"

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
    const [selectCategories, setSelectCategories] =
        useState<CategoryViewModel[]>(categoryViewModelList)

    const event = {
        toggleCategory: (index: number) => {
            setSelectCategories((prevSelectedCategories) => {
                const updateSelectedCategories = { ...prevSelectedCategories }
                updateSelectedCategories[index].selected = !updateSelectedCategories[index].selected;
                return updateSelectedCategories;
            }
            )
        },
        renderCategoryItem: (categoryName: string, index: number) => {
            const currentCategory = selectCategories[index];
            return (
                <TouchableOpacity
                    key={currentCategory.id}
                    style={[
                        styles.contentCategoryItem,
                        { backgroundColor: currentCategory.selected ? PrimaryColor : 'white' },
                    ]}
                    onPress={() => {
                        event.toggleCategory(index);
                    }}>
                    <Text
                        style={
                            [
                                styles.contentCategoryText,
                                { color: currentCategory.selected ? 'white' : PrimaryColor }
                            ]
                        }
                    >
                        {categoryName}
                    </Text>
                </TouchableOpacity>
            );
        },
        getSelectedCategories: (selectCategories: CategoryViewModel[]): CategoryViewModel[] | null => {
            const selectedCategories =
                Object.values(selectCategories)
                    .filter(x => x.selected)
            return selectedCategories;
        },
        handleNavigation: (screen: string, selectedCategories: CategoryViewModel[] | null) => {
            const selectedCategoryIds = selectedCategories !== null ? selectedCategories.map(x => x.id) : null;
            navigation.navigate(screen, selectedCategoryIds);
        },
    }

    const styles = StyleSheet.create({
        container:
        {
            padding: 24,
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
        },
        contentCategoryItem:
        {
            borderColor: PrimaryColor,
            padding: 12,
            borderRadius: 50,
            marginRight: 8,
            marginBottom: 12,
            borderWidth: 2

        },
        contentCategoryText:
        {
            paddingHorizontal: 10,
            fontSize: 18,
            fontWeight: '500',
        },
        footer:
        {
            // backgroundColor: 'green',
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-evenly'
        },
        footerSkip:
        {
            // padding: 18,
            backgroundColor: '#e6f9ed',
            borderRadius: 50,
            width: '45%',
            alignItems: 'center',
            justifyContent: 'center'
        },
        footerSkipText:
        {
            color: PrimaryColor,
            fontSize: 18

        },
        footerContinue:
        {
            backgroundColor: PrimaryColor,
            borderRadius: 50,
            width: '45%',
            alignItems: 'center',
            justifyContent: 'center'
        },
        footerContinueText:
        {
            color: 'white',
            fontSize: 18
        }
    })

    return (
        <View style={styles.container}>
            <NavigationBar
                title="Test"
                icon={facebookIcon}
            />

            <View style={styles.content}>
                <Text style={styles.contentText}>
                    Choose your interests and get the rbest anime recommendations. Don't worry, you can always change it later.
                </Text>

                <ScrollView>
                    <View style={styles.contentCategories}>
                        {
                            categoryItems.map(
                                (categoryName, index) => event.renderCategoryItem(categoryName, index)
                            )
                        }
                    </View>
                </ScrollView>
            </View>

            <View style={styles.footer}>
                <TouchableOpacity
                    style={styles.footerSkip}
                    onPress={
                        () => {
                            event.handleNavigation(AccountSetupRoutes.Profile, null)
                        }
                    }>
                    <Text style={styles.footerSkipText}>Skip</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.footerContinue}
                    onPress={
                        () => {
                            const selectedCategories = event.getSelectedCategories(selectCategories);
                            event.handleNavigation
                                (
                                    AccountSetupRoutes.Profile,
                                    selectedCategories
                                )
                        }
                    }>
                    <Text style={styles.footerContinueText}>Continue</Text>
                </TouchableOpacity>
            </View>
        </View >
    )
}
export { ChooseInterestScreen }