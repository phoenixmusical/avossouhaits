const db = require('../lib/db');

module.exports = async function (context, params) {
    const {
        wishToken,
        payerID,
        paymentID,
        paymentToken,
    } = params;
    const wishID = await db.wish.findIdWithToken(context, wishToken);
    await db.payment.create(context, {
        wishID,
        payerID,
        paymentID,
        paymentToken,
    });
};
