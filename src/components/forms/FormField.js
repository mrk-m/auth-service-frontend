import React from 'react';
import PropTypes from 'prop-types';

import './FormField.css';

class FormField extends React.Component {
    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this); 
    }

    static propTypes = {
        value: PropTypes.string,
        onChange: PropTypes.func,
        htmlFor: PropTypes.string,
        htmlType: PropTypes.string,
        label: PropTypes.string,
        submitted: PropTypes.bool,
    }

    static defaultProps = {
        value: '',
        onChange: null,
        htmlfor: 'text',
        label: '',
        submitted: false,
    }

    handleChange(e) {
        if (typeof this.props.onChange === 'function') {
            this.props.onChange(e);
        }
    }

    render() {
        const { value, htmlFor, htmlType, label, submitted } = this.props;

        return(
            <div className={'form-field' + (submitted && !value ? ' form-field--has-error' : '')}>
                <input className="form-field--input" type={htmlType} name={htmlFor} value={value} onChange={this.handleChange} />
                <label className="form-field--label" htmlFor={htmlFor}>{label}</label>
                
                {submitted && !this.props.value &&
                    <div className="form-field--help">{label} is required</div>
                }
            </div>
        );
    }
}

export { FormField };