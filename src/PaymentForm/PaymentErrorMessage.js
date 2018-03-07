import React, { PureComponent } from 'react';

export default class PaymentErrorMessage extends PureComponent {
    render() {
        const { children, onClick } = this.props;
        return (
            <div className="alert alert-danger mt-4">
                <h4 className="alert-heading">Oops!</h4>
                <p>
                    {children}
                </p>
                <button
                    type="button"
                    className="btn btn-outline-danger"
                    onClick={onClick}
                >
                    Essayer de nouveau
                </button>
            </div>
        );
    }
}
