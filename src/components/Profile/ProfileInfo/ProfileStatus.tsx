import React from 'react';
import { AppStateType } from '../../../redux/redux-store';

type OwnPropsType = {
    status : string

    updateUserStatus : (status: string) => void
}

type InputEvent = React.ChangeEvent<HTMLInputElement>

class ProfileStatus extends React.Component<OwnPropsType> {

    state = {
        editMode : false,
        status : this.props.status,
    }


    
    activateEditMode = () => {
        this.setState({    //  setState - Асинхронный!!! Знач. editMode будет изменено после выхода из метода.
            editMode : true
        })
    }

    deactivateEditMode = () => {
        this.setState({
            editMode: false
        });
        this.props.updateUserStatus(this.state.status);
    }

    onStatusChange = (e : InputEvent) => {
        if (e.target.value) {
        this.setState({
            status : e.target.value, 
        });
    }
    }

    componentDidUpdate(prevProps: OwnPropsType, prevState: AppStateType) {
        
        if (prevProps.status !== this.props.status) {
            this.setState({
                status : this.props.status
            });
        }
    }

    render() {
        return (
            <div>
                {!this.state.editMode &&
                    <div>
                        <span onDoubleClick={this.activateEditMode}>Status: {this.props.status ? this.props.status : 'Не указано'}</span>
                    </div>
                }
                {this.state.editMode &&
                    <div>
                        <input onChange={this.onStatusChange} autoFocus={true} type="text" value={this.state.status} 
                        onBlur={this.deactivateEditMode}/>
                    </div>
                }
            </div>
        )
    }

}

export default ProfileStatus;