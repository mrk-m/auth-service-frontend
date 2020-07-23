import React from 'react';
import { Link } from 'react-router-dom';

import { userService } from '../../services/user.service';

class AuthenticatedPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: []
        };
    }

    componentDidMount() {
        this.setState({ 
            user: { loading: true }
        });

        userService.getAll().then(user => this.setState({ user }));
    }

    render() {
        const { user } = this.state;
        if (typeof user.setup !== 'undefined' && !user.setup) {
            this.props.history.push({ pathname: "/setupdetails" });
        }

        return (
            <div> 
                authenticated user
                <br/>
                name: {user.name}<br/>
                email: {user.email}<br/>
                dob: {user.dob}<br/>
                <br/>
                <Link to="/signin">Sign out</Link>
            </div>
        );
    }
}

export { AuthenticatedPage };