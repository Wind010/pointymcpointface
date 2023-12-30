const unique = require('../common/unique');
const Session = require('./session');
const config = require('../../config');

/**
 * Singleton that manages sessions.
 */
class SessionManager {
    /**
     * Create a new SessionManager.
     */
    constructor() {
        // TODO:  DB persistance 
        this.sessions = {};
    }

    static getInstance() {
        if (! SessionManager.instance) {
            SessionManager.instance = new SessionManager();
        }
        return SessionManager.instance;
    }


    /**
     * Create a new session and add it to the sessions hashtable.
     * @param {string} name - The name for the new session. 
     * @param {string} id - The ID for the new session.
     * @returns {Object} - The created session.
     */
    createSession(name, id) {
        if (id === null) {
            id = unique.generateRandomId(config.idCharacterSet, config.sessionIdLength);
        }

        if (this.sessions[id]) {
            throw new Error('Session ID already exists.');
        }

        const newSession = new Session(id, name);
        this.sessions[id] = { id: newSession };
        return newSession;
    }


    /**
     * Retrieve a session by its ID.
     * @param {string} id - The ID of the session to retrieve.
     * @returns {Object|undefined} - The session object if found, otherwise undefined.
     */
    getSessionById(id) {
        return this.sessions[id];
    }
    
}


module.exports = SessionManager;