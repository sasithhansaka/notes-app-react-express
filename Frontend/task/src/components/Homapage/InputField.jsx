import React from 'react'
import styles from "./InputField.module.css";

function InputField({type , placeholder , value , onChange}) {
  return (
    <div>
        {type === "text"?(
             <input
                className={styles.inputField}
                type="text"
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                required></input>
        ):(
            <textarea
                className={styles.textArea}
                placeholder={placeholder}
                onChange={onChange}
                value={value}
                rows="5"
                cols="30"
                required></textarea>
            
        )}
    </div>
  )
}

export default InputField
