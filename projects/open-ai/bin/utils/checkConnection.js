const dns = require('dns');

const checkConnection = async () => {
    return new Promise((resolve, reject) => {
        dns.lookup('google.com', (err) => {
        if (err && err.code === 'ENOTFOUND') {
            console.log('Sem conexão com a internet\n');
            reject();
        } else {
            resolve();
        }
        });
    });
};

module.exports = checkConnection;