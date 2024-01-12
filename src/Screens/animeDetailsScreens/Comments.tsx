import React, { useEffect, useState } from "react";
import { Comments, InputComment, NavagitonTop } from "../../common/components";
import { SafeAreaView, View, Dimensions, StyleSheet, FlatList, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AuthRoutes, AuthScreenNavigationProps } from "../../navigations/AuthNavigator";
import { Color } from "../../common/Colors";
import { CommentApi } from "../../apiService/CommentService";
import { CommentResponseView } from "../../ViewModel";
import { CommentsRouteProps } from "../../navigations/AuthNavigator/Type";
import LoadScreen from "../loadScreens/loadScreens";
import Screen from "../../utils/screenInformation";
import useCustomNavigation from "../../common/components/useCustomNavigation";

const CommentsScreens = ({ route }: {route:CommentsRouteProps}) => {
    const { animeId } = route.params;
    const [loading, setLoading] = useState<boolean>(true);
    const navigation = useCustomNavigation()
    const [backEndComments, setBackEndComments] = useState<CommentResponseView[]>();

   
    const rootComments : CommentResponseView[] = backEndComments?.filter((comment) => {
                return comment.ParentId === null;
              }) || [];
              
    const getReplies = (commentId: number) => {
                return (
                  backEndComments?.filter((comment) => comment.ParentId === commentId) || []
                ).sort((a, b) => new Date(a.CreatedDate).getTime() - new Date(b.CreatedDate).getTime());
              };
    const resetData=()=>{
        const fetchData = async () => {
            setLoading(true)
            const resultAllComment = await CommentApi.getAllComment(animeId)
            setBackEndComments(x => resultAllComment)
          
            setLoading(false)
        }
        fetchData()
    }
    useEffect(() => {
        const fetchData = async () => {

            const resultAllComment = await CommentApi.getAllComment(animeId)
            setBackEndComments(x => resultAllComment)
          
            setLoading(false)
        }
        fetchData()
    }, [])
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Color.SecondaryColor }}>
            <LoadScreen
                visible={loading}
                title="Đang tải Bình luận"
            />
            <NavagitonTop
                title={`Comments`}
                OnPressArrowBack={() => {
                    navigation.replace(AuthRoutes.AnimeDetails, { animeId: animeId })
                }}
                group={true}
            ></NavagitonTop>
            <FlatList style={styles.scrollViewContainer}
                data={rootComments}
                keyExtractor={(item) => item.Id.toString()}
                renderItem={({ item }: { item: CommentResponseView, index: number }) => {
                    return (
                        <Comments
                            key={item.Id}
                            comment={item}
                            replies={getReplies(item.Id)}
                        />
                    )
                }}
            />
            <View style={styles.bottomInput}>
                <InputComment
                    animeId={animeId}
                    resetData={resetData}
                ></InputComment>
            </View>
        </SafeAreaView>
    )
}

export default CommentsScreens

const styles = StyleSheet.create({
    scrollViewContainer: {
        marginBottom: Screen.height * 0.1,
    },
    bottomInput: {
        position: 'absolute',
        bottom: 0,
    }
})