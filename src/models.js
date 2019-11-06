const crypto = require('crypto');
const mongoose = require('./mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        minlength: [2, 'min length should be 2'],
        maxlength: [20, 'max length should be 20'],
        validate: {
            validator: function(value) {
                return /^[A-Za-z]+$/.test(value);
            },
            message: props =>
                `${props.value} is not a valid name, should contain only letters.`,
        },
        required: [true, 'User name is required'],
    },
    surname: {
        type: String,
        minlength: [2, 'min length should be 2'],
        maxlength: [20, 'max length should be 20'],
        validate: {
            validator: function(value) {
                return /^[A-Za-z]+$/.test(value);
            },
            message: props =>
                `${props.value} is not a valid surname, should contain only letters.`,
        },
        required: [true, 'User surname is required'],
    },
    hashedPassword: {
        type: String,
        required: true,
    },
    salt: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        minlength: 3,
        maxlength: 256,
        validate: {
            validator: function(value) {
                return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(value);
            },
            message: props => `${props.value} is not a valid email`,
        },
        required: [true, 'User email is required'],
        unique: true,
    },
});

userSchema.methods.encryptPassword = function(password) {
    return crypto
        .createHmac('sha1', this.salt)
        .update(password)
        .digest('hex');
};

userSchema
    .virtual('password')
    .set(function(password) {
        const validationError = new mongoose.Error.ValidationError();
        if (!password) {
            validationError.message =
                'users validation failed: password: User password is required';
            throw validationError;
        } else {
            const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
            if (!passwordRegex.test(password)) {
                validationError.message =
                    'users validation failed: password: Password should contain minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character:';
                throw validationError;
            }
        }
        this._plainPassword = password;
        this.salt = Math.random() + '';
        this.hashedPassword = this.encryptPassword(password);
    })
    .get(function() {
        return this._plainPassword;
    });

userSchema.methods.verifyPassword = function(password) {
    return this.encryptPassword(password) === this.hashedPassword;
};

exports.Users = mongoose.model('users', userSchema);
