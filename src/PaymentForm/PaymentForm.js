import React, { PureComponent } from 'react';
import classNames from 'classnames';
import PaymentButton from './PaymentButton';
import PaymentErrorMessage from './PaymentErrorMessage';
import ValidationError from './ValidationError';

const AMOUNT_OPTIONS = [
    {
        value: '5',
        label: '5 $',
    },
    {
        value: '10',
        label: '10 $',
    },
    {
        value: '25',
        label: '25 $',
    },
    {
        value: '50',
        label: '50 $',
    },
    {
        value: '100',
        label: '100 $',
    },
];

function formControlClasses(errors, fieldName, controlClass) {
    return classNames(controlClass || 'form-control', {
        'is-valid': errors && !errors[fieldName],
        'is-invalid': errors && errors[fieldName],
    });
}

export default class PaymentForm extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            amount: null,
            name: '',
            email: '',
            wish: '',
            paid: false,
            cancelled: false,
            validationErrors: null,
            error: null,
        };
        this.handleValidate = this.handleValidate.bind(this);
        this.handlePayment = this.handlePayment.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleError = this.handleError.bind(this);
        this.handleRetry = this.handleRetry.bind(this);
    }

    handleDataChange(fieldName, event) {
        this.setState({
            [fieldName]: event.target.value,
            validationErrors: null,
        });
    }

    getChangeHandler(fieldName) {
        return this.handleDataChange.bind(this, fieldName);
    }

    handleValidate() {
        const {
            amount,
            name,
            email,
            wish,
        } = this.state;
        let isValid = true;
        const validationErrors = {};
        if (!amount) {
            isValid = false;
            validationErrors.amount = 'Vous devez choisir une option.';
        }

        if (!name) {
            isValid = false;
            validationErrors.name = 'Vous devez inscrire votre nom.';
        }

        if (!email) {
            isValid = false;
            validationErrors.email = 'Vous devez inscrire votre adresse courriel.';
        }

        if (!wish) {
            isValid = false;
            validationErrors.wish = 'Vous devez inscrire votre souhait.';
        }

        if (isValid) {
            this.setState({ validationErrors: null });
        } else {
            this.setState({ validationErrors });
        }

        return isValid;
    }

    handlePayment(payment) {
        console.log('payment', payment);
        this.setState({
            paid: true,
            cancelled: false,
            error: null,
        });
    }

    handleCancel() {
        console.log('payment cancelled');
        this.setState({
            cancelled: true,
            error: null,
        });
    }

    handleError(error) {
        console.error('payment error', error);
        this.setState({
            cancelled: false,
            error,
        });
    }

    handleRetry() {
        this.setState({
            cancelled: false,
            error: null,
        });
    }

    render() {
        const {
            amount,
            name,
            email,
            wish,
            paid,
            cancelled,
            error,
            validationErrors,
        } = this.state;
        if (paid) {
            return (
                <div>
                    Paiement reçu
                </div>
            );
        }

        if (cancelled) {
            return (
                <PaymentErrorMessage onClick={this.handleRetry}>
                    Le paiement a été annulé. Vous devez compléter le paiement
                    sur le site de PayPal pour voir votre souhait réalisé.
                </PaymentErrorMessage>
            );
        }

        if (error) {
            return (
                <PaymentErrorMessage onClick={this.handleRetry}>
                    Une erreur est survenue lors du paiement. Nous n'avons
                    pas pu compléter la transaction.
                </PaymentErrorMessage>
            );
        }

        return (
            <div>
                <div className="form-group">
                    <div
                        className={formControlClasses(validationErrors, 'amount', 'custom-controls-stacked')}
                    >
                        {AMOUNT_OPTIONS.map(({ value, label }) => (
                            <div key={value} className="custom-control custom-radio">
                                <input
                                    className="custom-control-input"
                                    type="radio"
                                    id={`amount${value}`}
                                    value={value}
                                    checked={value === amount}
                                    onChange={this.getChangeHandler('amount')}
                                />
                                <label className="custom-control-label" htmlFor={`amount${value}`}>
                                    {label}
                                </label>
                            </div>
                        ))}
                    </div>
                    <ValidationError errors={validationErrors} name="amount" />
                </div>

                <div className="form-group">
                    <label htmlFor="nameInput">Votre nom</label>
                    <input
                        type="text"
                        id="nameInput"
                        className={formControlClasses(validationErrors, 'name')}
                        value={name}
                        onChange={this.getChangeHandler('name')}
                    />
                    <ValidationError errors={validationErrors} name="name" />
                </div>

                <div className="form-group">
                    <label htmlFor="emailInput">Votre adresse courriel</label>
                    <input
                        type="text"
                        id="emailInput"
                        className={formControlClasses(validationErrors, 'email')}
                        value={email}
                        onChange={this.getChangeHandler('email')}
                    />
                    <ValidationError errors={validationErrors} name="email" />
                </div>

                <div className="form-group">
                    <label htmlFor="wishInput">Votre souhait</label>
                    <textarea
                        id="wishInput"
                        className={formControlClasses(validationErrors, 'wish')}
                        value={wish}
                        onChange={this.getChangeHandler('wish')}
                        rows={6}
                    />
                    <ValidationError errors={validationErrors} name="wish" />
                </div>

                <div style={{ textAlign: 'center' }}>
                    <PaymentButton
                        total={parseFloat(amount)}
                        currency="CAD"
                        precheck={this.handleValidate}
                        onSuccess={this.handlePayment}
                        onCancel={this.handleCancel}
                        onError={this.handleError}
                    />
                </div>
            </div>
        );
    }
}