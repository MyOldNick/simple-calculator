import React, { useState } from "react";
import { View } from "react-native";
import { StatusBar } from "expo-status-bar";

//components
import Form from "./components/Form/Form";
import MainButton from "./components/Button/MainButton";

//constants
import { BUTTONS } from "./constants/Buttons";

//styles

import { styles } from "./styleApp";

const App: React.FC = (): JSX.Element => {
  const [inputValue, setInputValue] = useState<string>("");
  const [mainValue, setMainValue] = useState<Array<string>>([]);
  const [memoryValue, setMemoryValue] = useState<any>("");

  //немного лапши :3
  const buttonEvents = (action: string): void => {
    const reg = new RegExp("[-+/*]+|[-+/*]");
    switch (action) {
      case "mr":
        setMemoryValue(inputValue);
        break;

      case "m+":
        memoryValue && setInputValue((+inputValue + +memoryValue).toString());
        break;

      case "m-":
        memoryValue && setInputValue((+inputValue - +memoryValue).toString());
        break;

      case "mc":
        setMemoryValue("");
        break;

      case "=":
        try {
          const result = eval(mainValue.join(""));

          setMainValue([result.toString()]);
          setInputValue(result.toString());
          //можно вообще убрать inputValue, но форма почему-то отображает только строку
          // просто закинуть в value импута выражение mainValue.join("") не получается, время на разбор бага решил не тратить
        } catch (error) {
          console.log(error);
        }
        break;

      case "AC":
        setMainValue([]);
        setInputValue("");
        break;

      case "+/-":
        const lastNumber = mainValue[mainValue.length - 1];
        if (Math.sign(+lastNumber) === 1 || -1) {
          const update = eval(`${lastNumber} * -1`);
          const newArr = mainValue;

          newArr.splice(
            mainValue.length - 1,
            1,
            Math.sign(update) === 1
              ? update.toString()
              : `(${update.toString()})`
          );

          setMainValue(newArr);
          setInputValue(newArr.join(""));
        }
        break;

      case "%":
        const percent: string = mainValue[mainValue.length - 1];
        const number: string = mainValue[0];
        const res: number = +number * (+percent / 100);
        const arr: Array<string> = mainValue;

        arr.splice(arr.length - 1, 1, res.toString());

        setMainValue(arr);
        setInputValue(arr.join(""));
        break;

      default:
        setInputValue(inputValue + action);

        if (mainValue.length <= 0) {
          const newArr: Array<string> = mainValue;
          newArr.push(action);

          setMainValue(newArr);
        } else if (action.match(reg)) {
          setMainValue((prev) => [...prev, action]);
        } else {
          const newArr: Array<string> = mainValue;

          if (mainValue[mainValue.length - 1].match(reg)) {
            newArr.push(action);
            setMainValue(newArr);
          } else {
            const newValue: string = mainValue[mainValue.length - 1] + action;

            newArr.splice(newArr.length - 1, 1, newValue);
            setMainValue(newArr);
          }
        }
        break;
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Form value={inputValue} />
      <View style={styles.flexContainer}>
        {BUTTONS.map(({ title, style }, index) => (
          <MainButton
            key={index}
            title={title}
            style={style}
            action={buttonEvents}
          />
        ))}
      </View>
    </View>
  );
};

export default App;
