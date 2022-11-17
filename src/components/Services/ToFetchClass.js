export class ToFetch {
    /**
     * @param {string} endpoint /endpoint
     * @param {string} method GET, POST, PATCH, PUT ...
     * @param {object} requestBody JSON
     * @param {string} token Bearer Token
     */
    constructor(endpoint, method, requestBody) {

        this.endpoint = endpoint;
        this.method = method;
        this.requestBody = requestBody;

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
        const response = await fetch(`http://localhost:8080/api${this.endpoint}`, this.requestObject )
        
        // if(!response.ok){

        //     const message = `Une Erreur s'est produite: ${response.status}`;
        //     throw new Error(message);
    
        // }
        
        return response.json();
    }
}