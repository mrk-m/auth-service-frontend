import React from 'react';

import { userService } from '../../services/user.service';
import { AuthForm } from '../forms/AuthForm'

class SignUpPage extends React.Component {
    constructor(props) {
        super(props);

        userService.signOut();
    }

    onSignUp() {
        this.props.history.push({ pathname: "/setupdetails" });
    }

    render() {
        return (
            <div>
                <AuthForm 
                    onSubmit={userService.signUp} 
                    onSubmitSuccess={() => (this.onSignUp())} 
                    title="Register"
                    submitText="Register"
                    linkText="← Back to sign in"
                    linkHref="signin"
                    bottomElement={
                        <small>By registering an account you acknowledge that you have read and
                        accept the <a className="auth-form--link" href="legal/termsandconditions">Terms and Conditions</a> as well as the <a className="auth-form--link" href="legal/privacypolicy">Privacy Policy</a>.
                        </small>
                    }
                />
            </div>
        );
    }
}

export { SignUpPage }; 