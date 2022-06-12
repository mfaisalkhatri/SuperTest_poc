module.exports = {

    allUsers: "/api/users",
    userByPage(page) {
        return `/api/users/${page}`
    }
}