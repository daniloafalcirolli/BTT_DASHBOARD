import React from "react";

const InputAlterText = function({OldValue, typeToChange, NewValue}){
    const [text, setText] = React.useState(OldValue[typeToChange]);

    React.useEffect(()=>{
        let i = OldValue;
        i[typeToChange] = text;
        NewValue(i);
    }, [text])

    return <input
        type={"text"} 
        value={text}
        onChange={(e)=>{
            setText(e.target.value);
        }}
    />
}

export default InputAlterText;