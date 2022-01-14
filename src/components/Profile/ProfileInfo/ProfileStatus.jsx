import React from 'react';

class ProfileStatus extends React.Component {

    state = {
        editMode : false
    }

    render() {
        return (
            <div>
                {!this.props.editMode &&
                    <div>
                        <span>Status: {this.props.status ? this.props.status : 'Не указано'}</span>
                    </div>
                }
                {this.props.editMode &&
                    <div>
                        <input type="text" value={this.props.status} />
                    </div>
                }
            </div>
        )
    }

}

export default ProfileStatus;