import React from 'react';
import PropTypes from 'prop-types';

import { FormField } from './FormField'

import './AuthForm.css';

class AuthForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: "",
            submitted: false,
            loading: false,
            error: false,
        };

        this.onSubmit = this.onSubmit.bind(this);
        this.onSubmitSuccess = this.onSubmitSuccess.bind(this);

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    static propTypes = {
        onSubmit: PropTypes.func,
        onSubmitSuccess: PropTypes.func,
        title: PropTypes.string,
        submitText: PropTypes.string,
        linkText: PropTypes.string,
        linkHref: PropTypes.string,
        bottomElement: PropTypes.object,
    }

    static defaultProps = {
        onSubmit: null,
        onSubmitSuccess: null,
        title: 'AuthForm',
        submitText: 'Submit',
        linkText: 'Link',
        linkHref: '#',
        bottomElement: null,
    }

    onSubmit(email, password) {
        if (typeof this.props.onSubmit === 'function') {
            this.props.onSubmit(email, password)
            .then(
                user => {
                    this.onSubmitSuccess()
                },
                error => this.setState({ error, loading: false })
            );
        }
    }

    onSubmitSuccess() {
        if (typeof this.props.onSubmitSuccess === 'function') {
            this.props.onSubmitSuccess();
        }
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleSubmit(e) {
        e.preventDefault();

        this.setState({ submitted: true });
        const { email, password } = this.state;

        // stop here if form is invalid
        if (!(email && password)) {
            return;
        }

        this.setState({ loading: true });
        this.onSubmit(email, password);
    }

    render() {
        const { email, password, submitted, loading, error } = this.state;
        const { title, submitText, linkHref, linkText, bottomElement } = this.props;

        return (
            <div className="auth-form">
                <h2 className="auth-form--title">{title}</h2>

                {error &&
                    <div className={'auth-form--error'}>{error}</div>
                }

                <form className="auth-form--form" name="form" onSubmit={this.handleSubmit}>

                    <FormField 
                        value={email}
                        onChange={this.handleChange}
                        htmlFor="email"
                        htmlType="email"
                        label="Email"
                        submitted={submitted}
                    />

                    <FormField 
                        value={password}
                        onChange={this.handleChange}
                        htmlFor="password"
                        htmlType="password"
                        label="Password"
                        submitted={submitted}
                    />
                    <div className="form-group">
                        <a className="auth-form--link" href={linkHref}>{linkText}</a>
                        <button className="auth-form--submit" disabled={loading}>{submitText}</button>
                        {loading &&
                            <img className="auth-form--spinner" alt="loading" src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                        }
                    </div>
                </form>
                {bottomElement &&
                <div className="auth-form--bottom">
                    {bottomElement}
                </div>}
            </div>
        );
    }
}

export { AuthForm };