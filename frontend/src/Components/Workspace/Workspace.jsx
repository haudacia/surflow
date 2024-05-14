import React from 'react';
import FormCard from '../Form Card/FormCard';
import style from './Workspace.module.css';

const handleClick = () => {
    window.location.href = 'http://localhost:3000/createforms'
} 

const Workspace = () => {
    return (
        <div className={style.viewport}>
            <h1>My Workspace</h1>
            <div className={style.frame}>
                <button className={style.btn} onClick={handleClick}>Add New Form</button>
                <FormCard className={style.formcard} /> 
            </div>
        </div>
        
    )
}

export default Workspace