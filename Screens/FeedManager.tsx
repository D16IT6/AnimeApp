import { useState } from "react";
import { Button, Text, View } from "react-native"
import { Header } from "./helpers";


type catProps = {
    name?: string,
    isHungry?: boolean
}

const CatView = ({ name = "Meo", isHungry = true }: catProps) => {
    const [hungryState, setHungryState] = useState(isHungry);

    const feedCat = () => {
        setHungryState(!hungryState);
    };

    return (
        <View>
            <Text>
                Hello, my name is {name}, and I am {hungryState ? "hungry" : "full"}.
            </Text>
            <Button
                title={hungryState ? "Feed me" : "Thanks, I am full"}
                disabled={!hungryState}
                onPress={feedCat}
            />
        </View>
    );
};

const FeedManager = () => {
    return (
        <View>
            <Header title="Chương trình cho mèo ăn" />
            <CatView isHungry={true} name="Meomeo"></CatView>
            <CatView isHungry={false} name="Talon"></CatView>


        </View>
    )
}

export { FeedManager }