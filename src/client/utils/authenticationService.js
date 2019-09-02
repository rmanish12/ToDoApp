class authenticationService {
    
    authenticateUser(email) {
        sessionStorage.setItem('user', email)
    }

    logout() {
        sessionStorage.removeItem('user')
    }

    isUserLoggedIn() {
        let user = sessionStorage.getItem('user')

        if(user===null) return false

        return true
    }

}

export default new authenticationService()