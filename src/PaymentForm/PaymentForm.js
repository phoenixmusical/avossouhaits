import React, { PureComponent } from 'react';
import classNames from 'classnames';
import PaymentButton from './PaymentButton';
import PaymentErrorMessage from './PaymentErrorMessage';
import ValidationError from './ValidationError';
import { makeApiCall } from '../services/api';

const AMOUNT_OPTIONS = [
    {
        value: '5',
        label: '5 $ - 1 participation à la loterie',
    },
    {
        value: '10',
        label: '10 $ - 3 participations à la loterie',
    },
    {
        value: '25',
        label: '25 $ - 10 participations à la loterie',
    },
    {
        value: '50',
        label: '50 $ - 30 participations à la loterie',
    },
    {
        value: '100',
        label: '100 $ - Considère ton souhait exaucé!',
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
            newsletter: false,
            loading: false,
            paid: false,
            cancelled: false,
            validationErrors: null,
            error: null,
            wishToken: null,
        };
        this.beforePayment = this.beforePayment.bind(this);
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

    getCheckboxChangeHandler(fieldName) {
        return () => {
            this.setState(state => ({
                [fieldName]: !state[fieldName],
                validationErrors: null,
            }));
        };
    }

    async beforePayment() {
        const {
            amount,
            name,
            email,
            wish,
            newsletter,
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

        if (!isValid) {
            this.setState({ validationErrors });
            throw new Error('Validation failed');
        }

        this.setState({ validationErrors: null });
        const wishToken = await makeApiCall('addWish', {
            amount,
            name,
            email,
            wish,
            newsletter,
        });
        console.log('got wish token', wishToken);
        this.setState({ wishToken });
        return wishToken;
    }

    handlePayment(payment) {
        console.log('payment', payment);
        const { wishToken } = this.state;
        this.setState({
            loading: true,
            cancelled: false,
            error: null,
        });
        makeApiCall('addPayment', {
            wishToken,
            payerID: payment.payerID,
            paymentID: payment.paymentID,
            paymentToken: payment.paymentToken,
        })
            .then(result => {
                console.log('payment added', result);
                this.setState({
                    loading: false,
                    paid: true,
                });
            })
            .catch(error => {
                this.setState({
                    loading: false,
                    error,
                });
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
            newsletter,
            loading,
            paid,
            cancelled,
            error,
            validationErrors,
        } = this.state;
        if (loading) {
            return (
                <div>
                    Un instant s'il vous plaît.
                </div>
            );
        }

        if (paid) {
            return (
                <div className="alert alert-success mt-4">
                    <h4 className="alert-heading">Paiement reçu</h4>
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
            <div className="mt-4">
                <p className="form-info-text p-2">
                    Le Phoenix Musical réalisera 3 souhaits, tirés au hasard parmi tous les souhaits reçus. Le tirage aura lieu le 1er mai.
                    ATTENTION&nbsp;: Lis bien les <a href="#reglements">règlements</a> pour t’assurer que ton souhait est réalisable.
                </p>
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
                    <small className="form-text text-muted">
                        Pour un petit
                        5$, ton souhait sera entré une fois dans la loterie. Si tu veux avoir plus de chances de gagner, choisis
                        l’une de nos autres options.
                    </small>
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
                        type="email"
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

                <div className="form-group">
                    <div className="form-check">
                        <input
                            id="newsletterInput"
                            className="form-check-input"
                            type="checkbox"
                            checked={newsletter}
                            onChange={this.getCheckboxChangeHandler('newsletter')}
                        />
                        <label className="form-check-label" htmlFor="newsletterInput">
                            S'inscrire à l'infolettre du Phoenix Musical
                        </label>
                    </div>
                </div>

                <div style={{ textAlign: 'center' }}>
                    <PaymentButton
                        total={parseFloat(amount)}
                        currency="CAD"
                        beforePayment={this.beforePayment}
                        onSuccess={this.handlePayment}
                        onCancel={this.handleCancel}
                        onError={this.handleError}
                    />
                </div>
            </div>
        );
    }
}
