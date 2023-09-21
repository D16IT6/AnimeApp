import { Text } from "react-native";

type HeaderProps = {
    title?: string,
    fontSize?: number,
    color?: string,
}

const Header = (property: HeaderProps) => {
    const { title = "Default header", fontSize = 20, color = 'red' } = property;
    return (
        <Text style={
            {
                fontSize: fontSize,
                color: color,
                textAlign: 'center'

            }
        }>{title}
        </Text>
    )
}
export { Header };