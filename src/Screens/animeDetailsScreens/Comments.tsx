import React, { useEffect, useState } from "react";
import { Comments, InputComment, NavagitonTop } from "../../common/component";
import { SafeAreaView, View, Dimensions, StyleSheet, FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AuthRoutes, AuthScreenNavigationProps } from "../../navigations/AuthNavigator";
import { Color } from "../../common/Colors";
import { CommentApi } from "../../apiService/CommentService";
import { CommentResponseView } from "../../ModelView";
import { CommentsRouteProps } from "../../navigations/AuthNavigator/Type";
import LoadScreen from "../loadScreens/loadScreens";

const { width, height } = Dimensions.get("window")
const CommentsScreens = ({ route }: CommentsRouteProps) => {
    const { animeId } = route.params;
    const [loading, setLoading] = useState<boolean>(true);
    const navigation = useNavigation<AuthScreenNavigationProps>()
    const [backEndComments, setBackEndComments] = useState<CommentResponseView[]>();

    const rootComments = backEndComments?.filter((comment) => {
                return comment.ParentId === null;
              }) || [];
              
    const getReplies = (commentId: number) => {
                return (
                  backEndComments?.filter((comment) => comment.ParentId === commentId) || []
                ).sort((a, b) => new Date(a.CreatedDate).getTime() - new Date(b.CreatedDate).getTime());
              };
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
                data={backEndComments}
                keyExtractor={(item) => item.Id.toString()}
                renderItem={({ item }: { item: CommentResponseView, index: number }) => {
                    return (
                        <Comments
                            key={item.Id}
                            comment={item}
                            // replies={}
                        />
                    )
                }}
            />
            {/* <ScrollView style={styles.scrollViewContainer}>
             {rootComments.map((rootComments)=>{
                return<Comments 
                key={rootComments.id}
                comment ={rootComments}
                replies ={getReplies(rootComments.id)}
                /> 
             })}
        </ScrollView> */}
            <View style={styles.bottomInput}>
                <InputComment
                    animeId={animeId}
                ></InputComment>
            </View>
        </SafeAreaView>
    )
}

export default CommentsScreens

const styles = StyleSheet.create({
    scrollViewContainer: {
        marginBottom: height * 0.1,
    },
    bottomInput: {
        position: 'absolute',
        bottom: 0,
    }
})