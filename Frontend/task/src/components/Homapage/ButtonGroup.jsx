import React from 'react'
import styles from './ButtonGroup.module.css'

function ButtonGroup({setActiveComponent}) {
  return (
    <div className={styles.buttonGroup}>
        <button className={styles.nodeAdd_button} onClick={() => setActiveComponent("add_note")}><i class="fa-solid fa-notes-medical"></i></button>
        <button className={styles.viewCalender_button} onClick={()=>setActiveComponent("view_calender")}><i class="fa-solid fa-calendar-days"></i></button>
      
    </div>
  )
}

export default ButtonGroup
