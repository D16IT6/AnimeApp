import { useNavigation } from "@react-navigation/native"
import React, { useState } from "react"
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { AccountSetupRoutes, AccountSetupScreenNavigationProps } from "../../navigations/AccountSetupNavigator"
import { Header } from '../../common/helpers'
import { arrowLeftIcon } from "../../common/Icons"
import { PrimaryColor } from "../../common/Colors"
const ChooseInterestScreen = () => {
    const navigation = useNavigation<AccountSetupScreenNavigationProps>();

    const [isSelectCategoies, setSelectCategories] = useState<{ [key: string]: boolean }>({});
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

    const event = {
        toggleCategory: (category: string) => {
            setSelectCategories((prevSelectedCategories) => ({
                ...prevSelectedCategories,
                [category]: !prevSelectedCategories[category],
            }));
        },
        renderCategoryItem: (value: string, index: number) => {
            const isSelected = isSelectCategoies[value];

            return (
                <TouchableOpacity
                    key={index}
                    style={[
                        styles.contentCategoryItem,
                        { backgroundColor: isSelected ? PrimaryColor : 'white' },
                    ]}
                    onPress={() => {
                        event.toggleCategory(value);
                    }}>
                    <Text style={[styles.contentCategoryText, { color: isSelected ? 'white' : PrimaryColor }]}>{value}</Text>
                </TouchableOpacity>
            );
        }
    }

    const styles = StyleSheet.create({
        container:
        {
            padding: 24,
            flex: 1,
            backgroundColor: 'white'
        },
        header:
        {
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            // paddingHorizontal: 20
        },
        headerIcon:
        {
            marginRight: 10,
            width: 24,
            height: 24,
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
            justifyContent:'space-evenly'
        },
        footerSkip:
        {
            // padding: 18,
            backgroundColor: '#e6f9ed',
            borderRadius: 50,
            width:'45%',
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
            width:'45%',
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
            <View style={styles.header}>
                <TouchableOpacity>
                    <Image source={arrowLeftIcon} style={styles.headerIcon} />
                </TouchableOpacity>
                <Header title="Choose Your Interest" fontSize={24} color="black" textAlign="left" />
            </View>

            <View style={styles.content}>
                <Text style={styles.contentText}>
                    Choose your interests and get the rbest anime recommendations. Don't worry, you can always change it later.
                </Text>

                <View style={styles.contentCategories}>
                    {categoryItems.map((value, index) => event.renderCategoryItem(value, index))}
                </View>
            </View>

            <View style={styles.footer}>
                <TouchableOpacity
                    style={styles.footerSkip}
                    onPress={
                        () => {
                             navigation.navigate(AccountSetupRoutes.Profile)
                        }
                    }>
                    <Text style={styles.footerSkipText}>Skip</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.footerContinue}
                    onPress={
                        () => {
                             navigation.navigate(AccountSetupRoutes.Profile)
                        }
                    }>
                    <Text style={styles.footerContinueText}>Continue</Text>
                </TouchableOpacity>
            </View>
        </View >
    )
}

export { ChooseInterestScreen }