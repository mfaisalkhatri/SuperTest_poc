module.exports = {
    auth: "/auth",
    booking: "/booking",
    bookingById(id) {
        return `/booking/${id}`
    }

}