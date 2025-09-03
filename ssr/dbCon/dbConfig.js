const util = require('util');
const mysql = require('mysql');

const dbUser = 'deshdb_admin'
const dbPass = 'yTzlVFrIdEjyNfu'


// const dbUser = 'root'
// const dbPass = ''

function bnConfig() {
    const dbConn = mysql.createConnection({
        host: '10.104.0.3',
        port: 3306,
        user: dbUser,
        password: dbPass,
        database: 'deshkalnews_content_db',
        // insecureAuth: true,
        multipleStatements: true
    });
    return {
        query(sql, args) {
            return util.promisify(dbConn.query)
                .call(dbConn, sql, args);
        },
        close() {
            return util.promisify(dbConn.end).call(dbConn);
        }
    };
}
function enConfig() {
    const dbConn = mysql.createConnection({
        host: '10.104.0.3',
        port: 3306,
        user: dbUser,
        password: dbPass,
        database: 'deshkalnews_content_db_en',
        // insecureAuth: true,
        multipleStatements: true
    });
    return {
        query(sql, args) {
            return util.promisify(dbConn.query)
                .call(dbConn, sql, args);
        },
        close() {
            return util.promisify(dbConn.end).call(dbConn);
        }
    };
}

function mediaConfig() {
    const dbConnMedia = mysql.createConnection({
        host: '10.104.0.3',
        port: 3306,
        user: dbUser,
        password: dbPass,
        database: 'deshkalnews_media_db',
        // insecureAuth: true,
        multipleStatements: true
    });
    return {
        query(sql, args) {
            return util.promisify(dbConnMedia.query)
                .call(dbConnMedia, sql, args);
        },
        close() {
            return util.promisify(dbConnMedia.end).call(dbConnMedia);
        }
    };
}

function genConfig() {
    const dbConnGeneral = mysql.createConnection({
        host: '10.104.0.3',
        port: 3306,
        user: dbUser,
        password: dbPass,
        database: 'deshkalnews_general_db',
        // insecureAuth: true,
        multipleStatements: true
    });
    return {
        query(sql, args) {
            return util.promisify(dbConnGeneral.query)
                .call(dbConnGeneral, sql, args);
        },
        close() {
            return util.promisify(dbConnGeneral.end).call(dbConnGeneral);
        }
    };
}

module.exports = { bnConfig, enConfig, mediaConfig, genConfig };