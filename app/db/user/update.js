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
    const gmail = updateOptions.gmail;
    const googleId = updateOptions.googleId;
    const googleName = updateOptions.googleName;
    const passwordResetId = updateOptions.passwordResetId;

    const isGooglDetailsUpdate = (gmail || googleName || googleId);
    const isFbDetailsUpdate = (fbId || fbName);
    const isLocalDetailsUpdate = (email || password || name);
    const isPasswordReset = passwordResetId;

    const isOk = (isLocalDetailsUpdate || isFbDetailsUpdate || isGooglDetailsUpdate || isPasswordReset);

    user.email = email || undefined;
    user.name = name || undefined;
    user.fbid = fbId || undefined;
    user.fbname = fbName || undefined;
    user.googlename = googleName || undefined;
    user.googleid = googleId || undefined;
    user.gmail = gmail || undefined;
    user.password_reset_id = passwordResetId || null;

    for (const x in user) {
        const isPasswordResetIdProp = (x === 'password_reset_id'); 
        if (user.hasOwnProperty(x) && (!user[x]) && (!isPasswordResetIdProp)) {
            delete user[x];
        }
    }

    // console.log(user)
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
    const SQLQuery = `UPDATE users SET ? WHERE email = "${email}" OR gmail = "${email}"`;
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
