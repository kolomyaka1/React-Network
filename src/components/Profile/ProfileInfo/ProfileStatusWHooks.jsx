import { useEffect, useState } from "react";



const ProfileStatusWHooks = (props) => {
    // let stateWithSetState = useState(false); // useState возвращает нам массив из 2 элементов в данном случае    

    // let editMode = stateWithSetState[0]; // Переменная принимает значение, которое мы передали в аргументе в useState
    // let setEditMode = stateWithSetState[1]; // Переменная принимает функцию, которой можем управлять значением editMode

    let [editMode, setEditMode] = useState(false);  // Используем деструктуризацию массива 
    let [status, setStatus] = useState(props.status);  // При необходимости использовании нескольких значений, можно использовать хук несколько раз

    useEffect( () => {
        debugger
        setStatus(props.status);
    }, [props.status] );

    const activateEditMode = () => {
        setEditMode(true);
    }

    const deactivateEditMode = () => {
        debugger
        props.updateUserStatus(status);
        setEditMode(false);
    }

    const onStatusChange = (e) => {
        setStatus(e.currentTarget.value)
    }

    return (
        <div>
            {!editMode && 
                <div>
                    <span onDoubleClick={activateEditMode}>Status: {props.status ? props.status : 'Не указано'}</span>
                </div>
            }
            {editMode &&
                <div>
                    <input autoFocus={true} type="text" placeholder={props.status} onBlur={ deactivateEditMode } onChange={ onStatusChange } value={status}/>
                </div>
            }
        </div>
    )
}

export default ProfileStatusWHooks;