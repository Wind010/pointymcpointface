/**
 * JSON 404 response
 * @param {import('express').Request} _req 
 * @param {import('express').Response} res
 */
const notFound = (_req, res) => {
    return res.status(404).json({ message: 'not found' });
}

module.exports = notFound;