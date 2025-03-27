import React from 'react'
import styles from './ButtonGroup.module.css'

function ButtonGroup({setActiveComponent}) {
  return (
    <div className={styles.buttonGroup}>
        <button className={styles.nodeAdd_button} onClick={() => setActiveComponent("add_note")}>Add Note</button>
        <button className={styles.viewCalender_button} onClick={()=>setActiveComponent("view_calender")}>View Calender</button>
      
    </div>
  )
}

export default ButtonGroup
