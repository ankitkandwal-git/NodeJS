const sqlite3 = require('sqlite3').verbose();

const userSchema = () => {
    return {
        email: {
            type: String,
            required: true,
            unique: true,
        }
    };
}