import React, { useEffect, useState } from "react";
import { Alert, Dimensions, FlatList, SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import { ButtonAuthScreen, NavagitonTop, SelectorAttribtute } from "../../common/components";
import { useNavigation } from '@react-navigation/native'
import { AuthRoutes, AuthScreenNavigationProps } from "../../navigations/AuthNavigator";
import { Color } from "../../common/Colors";
import useCustomNavigation from '../../common/components/useCustomNavigation';

import { AnimeAgeRaitingModelView, AnimeCategoryModelView, AnimeSearchParams, AnimeSearchRequestViewModel, AnimeStatusModelView, AnimeTypeModelView, AttributeProps, CountryModelView } from "../../ViewModel";
import { apiFilter } from "../../apiService/FilterService";
import LoadScreen from "../loadScreens/loadScreens";

const { width, height } = Dimensions.get("window")

const handleReset = (select: AttributeProps[], setSelect: any) => {
    const newAttributes = select.map((attribute: AttributeProps) => ({
        ...attribute,
        "Selected": false,
    }));
    setSelect(newAttributes);
};

const Filter = () => {

    const navigation = useCustomNavigation()
    const [loading, setLoading] = useState<boolean>(true);
    const [listCountry, setListCountry] = useState<AttributeProps[]>([]);
    const [listAnimeAgeRaiting, setListAnimeAgeRaiting] = useState<AttributeProps[]>([]);
    const [listAnimeCategory, setListAnimeCategory] = useState<AttributeProps[]>([]);
    const [listAnimeType, setListAnimeType] = useState<AttributeProps[]>([]);
    const [listAnimeStatus, setListAnimeStatus] = useState<AttributeProps[]>([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const resultCountry: CountryModelView[] | undefined = await apiFilter.getAllCountry();
                const resultAnimeAgeRaiting: AnimeAgeRaitingModelView[] | undefined = await apiFilter.getAllAnimeAgeRating();
                const resultAnimeCategory: AnimeCategoryModelView[] | undefined = await apiFilter.getAllAnimeCategory();
                const resultAnimeType: AnimeTypeModelView[] | undefined = await apiFilter.getAllAnimeType();
                const resultAnimeStatus: AnimeStatusModelView[] | undefined = await apiFilter.getAllAnimeStatus();

                if (resultCountry !== undefined) {
                    const updateCountry = resultCountry.map((value: CountryModelView) =>
                        ({ ...value, "Selected": false }));
                    setListCountry(updateCountry);
                }
                if (resultAnimeAgeRaiting !== undefined) {
                    const updateAnimeAgeRaiting = resultAnimeAgeRaiting.map((value: AnimeAgeRaitingModelView) =>
                        ({ ...value, "Selected": false }));
                    setListAnimeAgeRaiting(updateAnimeAgeRaiting);
                }
                if (resultAnimeCategory !== undefined) {
                    const updateAnimeCategory = resultAnimeCategory.map((value: AnimeCategoryModelView) =>
                        ({ ...value, "Selected": false }));
                    setListAnimeCategory(updateAnimeCategory);
                }
                if (resultAnimeType !== undefined) {
                    const updateAnimeType = resultAnimeType.map((value: AnimeTypeModelView) =>
                        ({ ...value, "Selected": false }));
                    setListAnimeType(updateAnimeType);
                }
                if (resultAnimeStatus !== undefined) {
                    const updateAnimeStatus = resultAnimeStatus.map((value: AnimeStatusModelView) =>
                        ({ ...value, "Selected": false }));
                    setListAnimeStatus(updateAnimeStatus);
                }
                setLoading(false)
            } catch (error) {
                console.error("Lỗi khi lấy dữ liệu:", error);
            }
        };

        fetchData();
    }, []);

    const handleResetAll = () => {
        handleReset(listCountry, setListCountry);
        handleReset(listAnimeAgeRaiting, setListAnimeAgeRaiting);
        handleReset(listAnimeCategory, setListAnimeCategory);
        handleReset(listAnimeType, setListAnimeType);
        handleReset(listAnimeStatus, setListAnimeStatus);
    };

    //data
    const jsonData: AnimeSearchParams = {
        selectedCountry: listCountry.filter((attribute: AttributeProps) => {
            if (attribute.Selected === true) {
                return { ...attribute }
            }
        }),
        selectedAgeRaiting: listAnimeAgeRaiting.filter((attribute: AttributeProps) => {
            if (attribute.Selected === true) {
                return { ...attribute }
            }
        }),
        selectedType: listAnimeType.filter((attribute: AttributeProps) => {
            if (attribute.Selected === true) {
                return { ...attribute }
            }
        }),
        selectedStatus: listAnimeStatus.filter((attribute: AttributeProps) => {
            if (attribute.Selected === true) {
                return { ...attribute }
            }
        }),
        selectedCategories: listAnimeCategory.filter((attribute: AttributeProps) => {
            if (attribute.Selected === true) {
                return { ...attribute }
            }
        })
    }

    return (
        <SafeAreaView style={styles.container} >
             <LoadScreen
                visible={loading}
                title="Đang tải tìm kiếm nâng cao"
            />
            <NavagitonTop
                title="Sort & Filter"
                OnPressArrowBack={() => {
                    navigation.navigate(AuthRoutes.SearchAnime, null)
                }}
            ></NavagitonTop>
            <ScrollView>
                <SelectorAttribtute
                    title="Quốc gia"
                    listAttribute={listCountry}
                    setListAttribute={setListCountry}
                />
                <SelectorAttribtute
                    title="Độ tuổi"
                    listAttribute={listAnimeAgeRaiting}
                    setListAttribute={setListAnimeAgeRaiting}
                />
                <SelectorAttribtute
                    title="Trạng thái"
                    listAttribute={listAnimeStatus}
                    setListAttribute={setListAnimeStatus}
                />
                <SelectorAttribtute
                    title="Kiểu"
                    listAttribute={listAnimeType}
                    setListAttribute={setListAnimeType}
                />
                <SelectorAttribtute
                    title="Thể Loại"
                    listAttribute={listAnimeCategory}
                    setListAttribute={setListAnimeCategory}
                    mutiSeletion={true}
                />
            </ScrollView>


            <View style={styles.buttonContainer}>
                <ButtonAuthScreen
                    title="Reset"
                    onPressBtn={() => {
                        Alert.alert('Cảnh báo!!!', 'Bạn có chắc chắn muốn reset', [

                            {
                                text: 'Không',
                                style: 'cancel',
                            },
                            { text: 'Đồng ý', onPress: () => { handleResetAll() } },
                        ]);

                    }}
                    styleBtn={styles.btnReset}
                    styleTitle={styles.btnTitleReset}
                />

                <ButtonAuthScreen
                    title="Apply"
                    onPressBtn={() => {
                        navigation.navigate(AuthRoutes.SearchAnime,
                            jsonData
                        )

                        // console.log(JSON.stringify(jsonApi))

                    }}
                    styleBtn={styles.btnApply}
                />
            </View>

        </SafeAreaView >
    )
}
export default Filter

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Color.SecondaryColor
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-around"
    },
    btnApply: {
        width: width * 0.4,
    },
    btnReset: {
        width: width * 0.4,
        backgroundColor: "#e6f9ed",

    },
    btnTitleReset: {
        color: "#06C149"
    },

})