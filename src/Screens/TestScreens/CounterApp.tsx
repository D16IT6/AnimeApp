import { Button, Text, View } from "react-native";
import { Header, Separator } from '../helpers';
import { useState } from "react";
import React from "react";


const CounterApp = () => {
    const [counter, setCounter] = useState(0)

    const counterFunction = {
        increase: () => setCounter(counter + 1),
        decrease: () => setCounter(counter - 1)
    }
    return (
        <View>
            <Header title="Chương trình tăng giảm" />
            <Text
                style={{
                    fontSize: 20
                }}>
                Giá trị hiện tại: {counter}
            </Text>
            <Button title="Tăng" onPress={counterFunction.increase} />
            <Separator />
            <Button title="Giảm" onPress={counterFunction.decrease} />
        </View>
    )
};
export { CounterApp };