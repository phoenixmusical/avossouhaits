import React, { PureComponent } from 'react';

export default class ValidationError extends PureComponent {
    render() {
        const { errors, name } = this.props;
        if (!errors || !errors[name]) {
            return null;
        }

        return (
            <div className="invalid-feedback">
                {errors[name]}
            </div>
        );
    }
}
