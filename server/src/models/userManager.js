const {User} = require('./user');

/**
 * Singleton that manages users.
 */
class UserManager {
    /**
     * Create a new UserManager.
     */
    constructor() {
        // TODO:  DB persistance 
        this.users = {};
    }

    /**
     * Create or retrieve existing user.
     * @returns {user} - The user object if found, otherwise undefined.
    */
    static getInstance() {
        if (! UserManager.instance) {
            UserManager.instance = new UserManager();
        }
        return UserManager.instance;
    }


    /**
     * Create a new user and add it to the users hashtable.
     * @param {string} name - The name for the new user.
     * @param {string} email - The email address of user.
     * @returns {User} - The created user.
     */
    createUser(name, email='') {
        const newUser = new User(name, email);
        const id = newUser.id;
        
        // Odds of collision increases with less characters.  This is here for DB check later.
        if (this.users[id]) {
            throw new Error('User ID already exists.');
        }
    
        this.users[id] = newUser;
        return newUser;
    }


    /**
     * Retrieve a user by its ID.
     * @param {string} id - The ID of the user to retrieve.
     * @returns {User|undefined} - The user object if found, otherwise undefined.
     */
    getUserById(id) {
        return this.users[id];
    }
    
}


module.exports = UserManager;