import React from "react";
import { TextInput } from "react-native";

//types
import { FormProps } from "./Types";

//styles
import { style } from "./Styles";

const Form: React.FC<FormProps> = ({ value }): JSX.Element => {
  return <TextInput style={style.input} value={value} editable={false} />;
};

export default Form;
