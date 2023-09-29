const movieURL = 'https://api.nomoreparties.co';

const shortMoviesDuration = 40;

export const registerErrors = {
    name: {
        required: 'Поле Имя является обязательным.',
        minLength: 'Имя должно содержать не менее 2 символов.',
        maxLength: 'Имя не должно быть длиннее 30 символов.',
        pattern: 'Имя может содержать только латиницу, кириллицу и пробел, апостроф, дефис.',
    },
    email: {
        required: 'Поле E-mail является обязательным.',
        pattern: 'Некорректный email-адрес.',
    },
    password: {
        required: 'Поле Пароль является обязательным.',
        minLength: 'Пароль должен содержать не менее 6 символов.',
        maxLength: 'Пароль не должен быть длиннее 20 символов.',
        pattern: 'Пароль должен быть длиннее 5 символов и содержать по крайней мере 1 букву и 1 цифру'
    },
};

export const apiErrorCodes = {
    401: 'Ошибка: 401',
    409: 'Ошибка: 409',
    500: 'Ошибка: 500'
}

export const loginAPIErrorsByCode = {
    401: 'Неправильный логин или пароль',
    500: 'На сервере произошла ошибка',
    ANY: 'При авторизации пользователя произошла ошибка'
}

export const registerAPIErrorsByCode = {
    409: 'Пользователь с таким email уже существует',
    500: 'На сервере произошла ошибка',
    ANY: 'При авторизации пользователя произошла ошибка'
}

export const editProfileAPIErrorsByCode = {
    ANY: 'При обновлении профиля произошла ошибка.'
}

export const windowBreakpoints = {
    md: 805,
    sm: 450
}

export const validName = /^[а-я А-ЯёЁa-zA-Z0-9'-]+$/;
export const validEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i 

//search word is not entirely made up of whitespaces
export const validMovieSearch = /^(?!^\s*$).+/

//Minimum six characters, at least one letter and one number:
export const validPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/

export { movieURL, shortMoviesDuration };