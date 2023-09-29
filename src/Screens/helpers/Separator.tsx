import { View } from "react-native";
type separatorProperty = {
    marginY?: number,
    color?: string,
    width?: number,
}

const Separator = (property: separatorProperty) => {
    const {
        marginY = 8,
        color = '#737373',
        width = 1
    } = property;
    return (
        <View style={{
            marginVertical: marginY,
            borderColor: color,
            borderWidth: width,
        }} />
    )

}

export { Separator };