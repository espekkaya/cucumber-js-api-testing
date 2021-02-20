class CommonUtils {

    public authenticateUser(user: string, password: string): string {
        const token = user + ":" + password;

        // Base64 Encoding
        const hash = Buffer.from(token).toString('base64');

        return "Basic " + hash;
    }

    public bearerToken(token: string): string {
        return "Bearer " + token;
    }

    /**
     * Function to check if body is JSON object
     * @param data - any string
     */
    public isJson(data: string) {
        return (typeof (data) == 'object');
    }
}

export default new CommonUtils();