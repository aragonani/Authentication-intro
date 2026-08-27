const userSessionId = new Map();

function setUser(id, user) {
    userSessionId.set(id, user);
}

function getUser(id) {
    return userSessionId.get(id);
}

function deleteUser(id) {
    userSessionId.delete(id);
}

module.exports = { setUser, getUser, deleteUser };