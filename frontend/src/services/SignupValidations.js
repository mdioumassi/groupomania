import Validations from "@/services/Validations";

export default  class SignupValidations {
    constructor(email, password) {
        this.email = email;
        this.password = password;
    }
    checkValidations() {
        let errors = [];

        //email validations
        if (!Validations.checkEmail(this.email)) {
            errors['email'] = 'Invalide Email';
        }

        if (!Validations.minLength(this.password, 6)) {
            errors['password'] = 'password doit être au maximum 6 caractère';
        }

        return errors;
    }

    static getErrorMessageFromCode(errorCode) {
        switch (errorCode) {
            case 'EMAIL_EXISTS': return 'Cette adresse mail est déjà utilisée';
            case 'EMAIL_NOT_FOUND': return 'L\'email n\'existe pas!';
            case 'INVALID_PASSWORD': return 'Mot de passe incorrect !';
            default:
                return 'Unexpected error occured. Please try again'
        }
    }

}