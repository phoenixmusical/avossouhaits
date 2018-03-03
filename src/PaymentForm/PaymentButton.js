import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';

const paypal = window.paypal;

const ReactButton = paypal.Button.driver('react', {
    React: React,
    ReactDOM: ReactDOM,
});

const env = 'sandbox';

const client = {
    sandbox: 'AQjE0vb2EKnV7rqRPszGrNjVMsrjWv9wD-YJFy5y_zLE5WLQ_XQ-XTBDAkkhBKJ880qXp00LtqNaIkW2',
    production: 'Abx1ilfcfQE9z52p_EPVn2FfI5vrrXNX-2MUaC5S9o1vwqhjTo1oeT2LDC0KDKMJWlFkqRLDPWrvCCkz',
};

export default class PaymentButton extends PureComponent {
    constructor(props) {
        super(props);
        this.payment = this.payment.bind(this);
        this.handleAuthorize = this.handleAuthorize.bind(this);
    }

    payment() {
        const { precheck } = this.props;
        const isValid = precheck();
        if (!isValid) {
            return Promise.reject(new Error('Validation failed'));
        }

        return paypal.rest.payment.create(env, client, {
            transactions: [
                {
                    amount: {
                        total: this.props.total,
                        currency: this.props.currency,
                    },
                },
            ],
        }, {
            input_fields: {
                no_shipping: 1,
            },
        });
    }

    handleAuthorize(data, actions) {
        return actions.payment.execute()
            .then((result) => {
                const payment = Object.assign({}, this.props.payment);
                payment.paid = true;
                payment.cancelled = false;
                payment.payerID = data.payerID;
                payment.paymentID = data.paymentID;
                payment.paymentToken = data.paymentToken;
                payment.returnUrl = data.returnUrl;
                this.props.onSuccess(payment);
            })
            .catch(error => {
                this.props.onError(error);
            });
    }

    render() {
        return (
            <ReactButton
                client={client}
                commit={true}
                payment={this.payment}
                locale="fr_CA"
                style={{
                    color: 'gold',
                    size: 'small',
                    label: 'pay',
                    tagline: false,
                    fundingicons: true,
                }}
                onAuthorize={this.handleAuthorize}
                onCancel={this.props.onCancel}
            />
        );
    }
}
