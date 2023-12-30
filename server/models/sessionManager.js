const unique = require('../common/unique');
const session = require('./session.js');

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
     * Create a new session and add it to the sessions array.
     * @param {string} sessionId - The ID for the new session.
     * @returns {Object} - The created session.
     */
    createSession(sessionId) {
        if (sessionId === null) {
            sessionId = unique.randomCharactersFromArray()
        }

        if (this.sessions[sessionId]) {
            throw new Error('Session ID already exists.');
        }

        const newSession = new session.Session();
        this.sessions[sessionId] = { id: newSession };
        return newSession;
    }


    /**
     * Retrieve a session by its ID.
     * @param {string} sessionId - The ID of the session to retrieve.
     * @returns {Object|undefined} - The session object if found, otherwise undefined.
     */
    getSessionById(sessionId) {
        return this.sessions[sessionId];
    }
    
}


module.exports = SessionManager;