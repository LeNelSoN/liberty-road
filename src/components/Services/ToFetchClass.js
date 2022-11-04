export class ToFetch {
    /**
     * 
     * @param {string} endpoint /endpoint
     * @param {string} method GET, POST, PATCH, PUT ...
     * @param {object} requestBody 
     * @param {string} token 
     */
    constructor(endpoint, method, requestBody, token) {

        this.endpoint = endpoint;
        this.method = method;
        this.requestBody = requestBody;

        if(token){
            this.token = token
        }
        this.token = document.cookie?.split(';').filter(value => value.includes('Bearer'))[0]?.split('=')[1];
        
        this.requestObject = this.#requestObjectConstructor();

    }

    #requestObjectConstructor(){
        let requestObject = {
            method: this.method
        };

        if (this.token) {
            requestObject = {
                ...requestObject, 
                headers:{
                    'Authorization': `Bearer ${this.token}`
                }
            };
        };

        if (this.requestBody) {
            requestObject.headers = {
                ...requestObject.headers,
                'Content-Type': 'application/json'
            };

            requestObject = {
                ...requestObject,
                body: JSON.stringify(this.requestBody)
            };
        };

        return requestObject;

    }

    async launch(){
        const response = await fetch(`http://localhost:5000/api${this.endpoint}`, this.requestObject)
        
        if(!response.ok){

            const message = `Une Erreur s'est produite: ${response.status}`;
            throw new Error(message);
    
        }
        
        return response.json();
    }
}