import React from 'react';

import { userService } from '../../services/user.service';
import { UpdateDetailsForm } from '../forms/UpdateDetailsForm'


class SetupDetailsPage extends React.Component {
    onDetailsUpdated() {
        this.props.history.push({ pathname: "/" });
    }

    render() {
        return (
            <div>
                <UpdateDetailsForm 
                onSubmit={userService.updateDetails} 
                onSubmitSuccess={() => (this.onDetailsUpdated())} 
                />
            </div>
        );
    }
}

export { SetupDetailsPage };