
/**
 * @api {patch} /admin/:slug Update Event
 * @apiName UpdateEvent
 * @apiGroup Admin
 * @apiSuccess {String} status 200 OK
 * @apiError {String} status 404 Not Found
 * @apiError {String} status 400 Bad Request
 * @apiError {String} status 500 Internal Error
 * @apiDescription Update an event. The user needs to have a Bearer Token in Authorization and be an admin.
 * @apiHeader {String} Authorization Bearer Token
 * @apiPermission Admin
 * @apiExample {json} Request Body Example:
 * {
 *   "name": "prufa",
 *   "description": "Prufa",
 *   "location": "prufa",
 *   "url": "prufa"
 * }
 */

/**
 * @api {post} /admin/:slug/register Get Registered Users
 * @apiName GetRegisteredUsers
 * @apiGroup Admin
 * @apiSuccess {String} status 200 OK
 * @apiError {String} status 404 Not Found
 * @apiDescription Get all users registered for a specific event by slug.
 * @apiHeader {String} Authorization Bearer Token
 * @apiPermission Admin
 * @apiExample {json} Response Example:
 * [
 *   {
 *     "id": 2,
 *     "name": "User",
 *     "username": "user",
 *     "password": "Hashed password",
 *     "admin": true,
 *     "profile_picture": null
 *   },
 *   ...
 * ]
 */

/**
 * @api {delete} /admin/delete/:slug Delete Event
 * @apiName DeleteEvent
 * @apiGroup Admin
 * @apiSuccess {String} status 200 OK
 * @apiError {String} status 404 Not Found
 * @apiError {String} status 400 Bad Request
 * @apiDescription Delete an event by slug. The user needs to have a Bearer Token in Authorization and be an admin.
 * @apiHeader {String} Authorization Bearer Token
 * @apiPermission Admin
 */

/**
 * @api {post} /admin/:slug Create Event
 * @apiName CreateEvent
 * @apiGroup Admin
 * @apiSuccess {String} status 200 OK
 * @apiError {String} status 404 Not Found
 * @apiError {String} status 400 Bad Request
 * @apiError {String} status 500 Internal Error
 * @apiDescription Create a new event. The user needs to have a Bearer Token in Authorization and be an admin.
 * @apiHeader {String} Authorization Bearer Token
 * @apiPermission Admin
 * @apiExample {json} Request Body Example:
 * {
 *   "name": "prufa",
 *   "description": "Prufa",
 *   "location": "prufa",
 *   "url": "prufa"
 * }
 */
