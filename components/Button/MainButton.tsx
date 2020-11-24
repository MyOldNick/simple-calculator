import React from "react";
import { TouchableOpacity, Text } from "react-native";

//types
import { MainButtonProps } from "./Types";

const MainButton: React.FC<MainButtonProps> = ({
  title,
  action,
  style,
}): JSX.Element => {
  return (
    <TouchableOpacity onPress={() => action(title)} style={style}>
      <Text style={{ color: "white" }}>{title}</Text>
    </TouchableOpacity>
  );
};

export default MainButton;
