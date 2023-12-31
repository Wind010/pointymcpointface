const Session = require('./session');

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

    /**
     * Create or retrieve existing session.
     * @returns {Session} - The session object if found, otherwise undefined.
    */
    static getInstance() {
        if (! SessionManager.instance) {
            SessionManager.instance = new SessionManager();
        }
        return SessionManager.instance;
    }


    /**
     * Create a new session and add it to the sessions hashtable.
     * @param {string} name - The name for the new session.
     * @param {string} userId - The userId for the creator of the session.
     * @param {string} id - The ID for the new session.
     * @returns {Session} - The created session.
     */
    createSession(name, user, id=null) {
        if (this.sessions[id]) {
            throw new Error('Session ID already exists.');
        }
        
        // Layer above should have already validated userId.
        
        const newSession = new Session(id, user, name);
        id = newSession.id;
        this.sessions[id] = newSession;
        return newSession;
    }


    /**
     * Retrieve a session by its ID.
     * @param {string} id - The ID of the session to retrieve.
     * @returns {Session|undefined} - The session object if found, otherwise undefined.
     */
    getSessionById(id) {
        return this.sessions[id];
    }
    
}


module.exports = SessionManager;