const requireDir = require('../lib/requireDir')(module);

const api = requireDir('../api');

async function callApi(req, res) {
    const { action, params } = req.body;
    if (!action) {
        throw new Error('Invalid request: no action name provided');
    }

    if (typeof api[action] !== 'function') {
        throw new Error('Invalid request: action name is not valid');
    }

    const context = {
        userAgent: req.get('User-Agent'),
        ipAddress: req.get('X-Real-IP'),
    };
    return api[action](context, params || {});
}

module.exports = function (req, res, next) {
    callApi(req, res)
        .then(function (result) {
            console.log('API result', { result });
            res.json({ result });
        })
        .catch(function (error) {
            console.error('API Error', error.stack || error);
            res.json({
                error: {
                    message: error.message,
                },
            });
        })
        .catch(next);
};
