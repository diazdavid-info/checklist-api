const mongoose = require('mongoose');
const validator = require('validator');

const {Schema} = mongoose;

const fields = {
    title: {
        type: String,
        required: true,
        trim: true,
        maxlength: 128,
    },
    completed: {
        type: Boolean,
        required: false,
    },
    description: {
        type: String,
        default: '',
        trim: true,
        maxlength: 255,
    },
    url: {
        type: String,
        default: '',
        trim: true,
        validate: {
            validator(value) {
                return value ? validator.isURL(value) : true;
            },
            message: (props) => `${props.value} is not a valid url`,
        }
    },
    dueDate: {
        type: Date,
        default: null,
    },
}

const references = {
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true,
    },
    groupId: {
        type: Schema.Types.ObjectId,
        ref: 'group',
    },
}

const task = new Schema(Object.assign(fields, references), {
    timestamps: true,
})

module.exports = {
    Model: mongoose.model('task', task),
    fields,
    references,
};