import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';

const paypal = window.paypal;

const ReactButton = paypal.Button.driver('react', {
    React: React,
    ReactDOM: ReactDOM,
});

const env = 'production';

const client = {
    sandbox: 'AQe2DxJT0Pxo8xSBdr7ZtmTIBvIMlgEDf2BYt-EpJpBW6ZFrrUtIc4lcJlIMVCxcw95lxGd1kvXx2TZI',
    production: 'AcnNF7wbT7ZwelaswqyIvx-7vlWVBn0y1JVPjrMtcKZFsau9l1kyOSth5Nyt4izYB3UyLy0fI42hDYDz',
};

export default class PaymentButton extends PureComponent {
    constructor(props) {
        super(props);
        this.payment = this.payment.bind(this);
        this.handleAuthorize = this.handleAuthorize.bind(this);
    }

    async payment() {
        const { beforePayment } = this.props;
        const orderID = await beforePayment();

        return paypal.rest.payment.create(env, client, {
            transactions: [
                {
                    amount: {
                        total: this.props.total,
                        currency: this.props.currency,
                    },
                    invoice_number: orderID,
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
