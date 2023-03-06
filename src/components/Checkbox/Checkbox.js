import React from 'react'
import styles from './Checkbox.module.css'


const Checkbox = function(props){
    let [check, setCheck] = React.useState(false);

    const handleClick = async () => {
        if(await props.click(props.id) == true){
            setCheck(!check);
        }
    };

    React.useEffect(() => {
        setCheck(props.value);
    },[props])

    return(
        <div
            className={`${styles.view} ${ check ? styles.checked : styles.notChecked}`}
            onClick={handleClick}
            id={props.id}></div>
    );
}

export default Checkbox;