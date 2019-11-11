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
    password: {
        type: String,
        validate: {
            validator: function(value) {
                return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
                    value
                );
            },
            message: props =>
                `${props.value} Password should contain minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character:`,
        },
        required: [true, 'User password is required'],
    },
});

exports.Users = mongoose.model('users', userSchema);
