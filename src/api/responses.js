import _ from "underscore"
import {getLanguage} from "../strings";

export const HTTP = -10;

export const OK                              = 0;
export const ERROR                           = 1;
export const UNAUTHORIZED                    = 2;


const messages = {
	en: {},

	it: {}
}

messages["en"][OK]										    = "OK"
messages["en"][HTTP]										= "Server error"
messages["en"][ERROR] 									    = "Generic error"

messages["it"][OK]											= "OK"
messages["it"][HTTP]										= "Errore sul server"
messages["it"][ERROR] 										= "Si è verificato un errore"

export function msg(response) {
	let responseCode = null;

	if (typeof(response) === "object") {
		if (response.error && response.status) {
			//this is http error
			return messages[getLanguage()][HTTP] + ": " + response.status;
		}

	    if (response.message)
	        return response.message;

	    responseCode = response.responseCode;
	} else {
		responseCode = response;
	}

 	if (_.has(messages[getLanguage()], responseCode )) {
        return messages[getLanguage()][responseCode]
    }

    return "Errore n. " + responseCode
}

/**
 * Returns value of value responses. If o is a promise, a wrapped promise thar returns value will be returned
 */
export function value(o) {
	if (o instanceof Promise) {
		return new Promise((resolve, reject) => {
			o
				.then(result => {
					resolve(result.value)
				})
				.catch(e => reject(e))
		})		
	} else {
		if (_.isObject(o)) {
			return o.value
		}
	}

	logger.w(o, "is not a value response")

	return null
}