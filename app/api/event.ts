/**
 * @api {get} /events List Events
 * @apiName ListEvents
 * @apiGroup Event
 * @apiSuccess {String} status 200 OK
 * @apiDescription Returns a list of all events.
 */

/**
 * @api {get} /events/:slug Get Event
 * @apiName GetEvent
 * @apiGroup Event
 * @apiSuccess {String} status 200 OK
 * @apiError {String} status 404 Not Found
 * @apiError {String} status 409 Conflict
 * @apiDescription Get a specific event by slug or POST to register for an event. You will get a conflict if you are already registered for that event.
 * @apiHeader {String} Authorization Bearer Token
 * @apiPermission User, Admin
 */

/**
 * @api {post} /events/:slug Register for Event
 * @apiName RegisterForEvent
 * @apiGroup Event
 * @apiSuccess {String} status 200 OK
 * @apiError {String} status 404 Not Found
 * @apiError {String} status 409 Conflict
 * @apiDescription Register for a specific event by slug. You will get a conflict if you are already registered for that event.
 * @apiHeader {String} Authorization Bearer Token
 * @apiPermission User, Admin
 */