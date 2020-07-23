import React from 'react';

import { userService } from '../../services/user.service';
import { AuthForm } from '../forms/AuthForm'

class SignInPage extends React.Component {
    constructor(props) {
        super(props);

        userService.signOut();
    }
    
    onSignIn() {
        const { from } = this.props.location.state || { from: { pathname: "/" } };
        this.props.history.push(from);
    }

    render() {
        return (
            <div>
                <AuthForm 
                    onSubmit={userService.signIn} 
                    onSubmitSuccess={() => (this.onSignIn())} 
                    title="Sign in"
                    submitText="Sign in"
                    linkText="Register"
                    linkHref="signup"
                />
            </div>
        );
    }
}

export { SignInPage }; 