'use strict';
const exeQuery = require('../lib/exe-query');
const passwordUtil = require('../lib/password');

function generateQueryValues(updateOptions) {
    const user = {};
    const email = updateOptions.email;
    const password = updateOptions.password;
    const name = updateOptions.name;
    const fbId = updateOptions.fbId;
    const fbName = updateOptions.fbName;
    const isOk = (email || password || name || fbId || fbName);

    user.email = email || undefined;
    user.name = name || undefined;
    user.fbid = fbId || undefined;
    user.fbname = fbName || undefined;

    if (password) {
        return passwordUtil.hash(password)
            .then(passwordHash => {
                user.password = passwordHash;
                return user;
            })
    } else if (isOk) {
        return Promise.resolve(user);
    } else {
        const error = new Error('Invalid Update Options');
        return Promise.reject(error);
    }
}

function checkIsUpdated(result) {
    // console.log(result)
    const isUpdated = result && (result.changedRows === 1) && (result.affectedRows === 1);
    return isUpdated;
}

function updateById(userId, updateOptions) {
    const SQLQuery = `UPDATE users SET ? WHERE id = "${userId}"`;
    return generateQueryValues(updateOptions)
        .then(updateQueryValues => exeQuery(SQLQuery, updateQueryValues))
        .then(checkIsUpdated)
}

function updateByEmail(email, updateOptions) {
    const SQLQuery = `UPDATE users SET ? WHERE email = "${email}"`;
    return generateQueryValues(updateOptions)
        .then(updateQueryValues => exeQuery(SQLQuery, updateQueryValues))
        .then(checkIsUpdated)
}

function update(query, updateOptions) {
    if (query && updateOptions) {
        const email = query.email;
        const userId = query.userId;

        if (email) {
            return updateByEmail(email, updateOptions);
        } else if (userId) {
            return updateById(userId, updateOptions);
        } else {
            const error = new Error('Invalid Query');
            return Promise.reject(error);
        }

    } else {
        const error = new Error('Find Query And Update Options Must Be Provided');
        return Promise.reject(error);
    }
}

module.exports = update;
