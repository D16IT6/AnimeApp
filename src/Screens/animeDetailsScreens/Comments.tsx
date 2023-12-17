import React, { useEffect, useState } from "react";
import { Comments, InputComment, NavagitonTop } from "../../common/component";
import { SafeAreaView, View, Dimensions, StyleSheet, FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AuthRoutes, AuthScreenNavigationProps } from "../../navigations/AuthNavigator";
import { Color } from "../../common/Colors";
import { CommentApi } from "../../apiService/CommentService";
import { CommentResponseView } from "../../ModelView";
import { CommentsRouteProps } from "../../navigations/AuthNavigator/Type";

const { width, height } = Dimensions.get("window")
const CommentsScreens = ({ route }: CommentsRouteProps) => {
    const { animeId } = route.params;
    const navigation = useNavigation<AuthScreenNavigationProps>()
    const [backEndComments, setBackEndComments] = useState<CommentResponseView[]>();

    // const rootComments = backEndComments.filter((Comments)=>{
    //     return Comments.parentId===null
    // })
    // const getReplies = (commentId:string)=>{
    //     return backEndComments
    //     .filter((backEndComments)=> backEndComments.parentId===commentId)
    //     .sort((a,b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
    // }
    useEffect(() => {
        const fetchData = async () => {

            const resultAllComment = await CommentApi.getAllComment(animeId)
            setBackEndComments(x => resultAllComment)
        }
        fetchData()
    }, [])
    return (

        <SafeAreaView style={{ flex: 1, backgroundColor: Color.SecondaryColor }}>
            <NavagitonTop
                title={` Comments`}
                OnPressArrowBack={() => {
                    navigation.navigate(AuthRoutes.AnimeDetails, { animeId: animeId })
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