import { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native"




const WordCount = () =>
{
    const [input, setInput] = useState('');

    const eventHandler = {
        onChangeText: function (newText: string) {
            setInput(newText);
        }
    }
    const render = {
        renderWordCount: function (text: string)
        {
            text = text.trim();
            return text === '' ? '0' : text.split(' ').length.toString();
            }
    }
    return (
        <View style={styles.container}>
            <TextInput
                placeholder="Nhập vào đây"
                onChangeText={
                    newText => eventHandler.onChangeText(newText)
                }>
        </TextInput>
            <Text style={styles.wordCountLabel}>
                Số từ đã nhập: {     
                render.renderWordCount(input)
                }
            </Text>
            
        </View>

    )
}
const styles = StyleSheet.create({
    container:
    {
        borderWidth: 3,
        padding: 10,
        borderColor:'green'
    },
    wordCountLabel: {
        fontSize:30,
    }
});
export {WordCount}