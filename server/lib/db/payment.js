const db = require('./connection');

exports.create = async function (context, data) {
    await db.insert('payment', {
        wish_id: data.wishID,
        payer_id: data.payerID,
        payment_id: data.paymentID,
        payment_token: data.paymentToken,
        user_agent: context.userAgent,
        ip_address: context.ipAddress,
    });
};
