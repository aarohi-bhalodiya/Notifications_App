function Config() {
    this.SUCCESS = true;
    this.ERROR = false;
    this.HTTP_SUCCESS = 200; // Success
    this.HTTP_ACCEPTED = 202; // Accepted but not processed successfully
    this.HTTP_BAD_REQUEST = 400; // Bad Request URI or Field missing or not valid
    this.HTTP_FORBIDDEN = 403; // Unauthorized access or no premission
    this.HTTP_NOT_FOUND = 404; // Not Found
    this.HTTP_SERVER_ERROR = 500; // Server Error
}
module.exports = new Config();