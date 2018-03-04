const nanoid = require('nanoid');
const db = require('../lib/db');

module.exports = async function (context, params) {
    const token = nanoid();
    await db.wish.create(context, {
        token,
        name: params.name,
        email: params.email,
        description: params.wish,
        newsletter: Boolean(params.newsletter),
    });
    return token;
};
