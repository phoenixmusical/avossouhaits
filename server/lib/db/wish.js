const db = require('./connection');

exports.create = async function (context, data) {
    await db.insert('wish', {
        token: data.token,
        email: data.email,
        name: data.name,
        description: data.description,
        newsletter: data.newsletter,
        user_agent: context.userAgent,
        ip_address: context.ipAddress,
    });
};

exports.findIdWithToken = async function (context, token) {
    try {
        const results = await db.query('select id from wish where token = ?', [token]);
        return results && results[0] && results[0].id || null;
    } catch (error) {
        console.error(error.stack);
        return null;
    }
};
