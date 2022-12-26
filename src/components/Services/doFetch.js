export const doFetch = async (endpoint, method, requestBody) => {

        let token = document.cookie?.split(';').filter(value => value.includes('Bearer'))[0]?.split('=')[1];
        
        let requestObject = {
            method
        };

        if (token) {
            requestObject = {
                ...requestObject, 
                headers:{
                    'Authorization': `Bearer ${token}`
                }
            };
        };

        if (requestBody) {
            requestObject.headers = {
                ...requestObject.headers,
                'Content-Type': 'application/json'
            };

            requestObject = {
                ...requestObject,
                body: JSON.stringify(requestBody)
            };
        };

        console.log(requestObject);

        const response = await fetch(`http://localhost:8080/api${endpoint}`, requestObject )
        
        return response.json();

}
