/**
 * Formats a given number with spaces as thousands separators.
 *
 * @param {number} number   - The numeric value to be formatted.
 * @returns {string}        - The formatted string with spaces as thousands separators.
 */
export const formatNumberWithSpaces = (number) => {
    // Use toLocaleString to format the number with commas as thousands separators
    // and then replace commas with spaces to achieve the desired formatting.
    return number.toLocaleString('en-US').replace(/,/g, ' ');
}


// formatter datetime like 12/24/2023 08:30:00
/**
 * Formats a given datetime string or timestamp into a standardized format.
 *
 * @param {string | number} datetime    - The datetime string or timestamp to be formatted.
 * @returns {string}                    - The formatted datetime string in 'YYYY-MM-DD HH:mm:ss' format.
 */
export const formatDatetime = (datetime) => {

    // Define formatting options for the toLocaleString method
    const options = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
    };

    // Convert the input datetime to a Date object and format it using toLocaleString
    const formattedDatetime = new Date(datetime).toLocaleString('en-US', options);

    // Remove any commas that may be present in the formatted datetime string
    return formattedDatetime.replace(/,/g, '');
}

/**
 * Converts a JSON object to a string and removes double quotes and whitespaces.
 *
 * @param {Object} jsonObject   - The JavaScript object to be converted and processed.
 * @returns {string}            - The JSON string without double quotes and whitespaces.
 */
export const toStringForQRCode = (jsonObject) => {
    // Extract the required properties from the JSON object
    const {id, price, minQuantity, quantity, photo, options} = jsonObject;

    // Process options array and create a string
    const optionsString = options.map(option => {
        const key = Object.keys(option)[0];
        return `,${key}:${option[key]}`;
    }).join('');

    // Construct the final string with both required and optional parameters
    return `id:${id},price:${price},minQuantity:${minQuantity},quantity:${quantity},photo:${photo}${optionsString}`;
}

export const fromStringForQRCode = (inputString) => {
    // Check if the input string has the expected format
    const formatCheck = /^id:\w+,price:\w+,minQuantity:\w+,quantity:\w+,photo:\w+(,[^:]+:\w+)*$/;

    if (!formatCheck.test(inputString)) {
        // Return null if the format is not as expected
        return null;
    }

    // Split the input string into an array of key-value pairs
    const keyValuePairs = inputString.split(',');

    // Initialize an object to store the reconstructed JSON
    const reconstructedObject = {};

    // Iterate through key-value pairs and populate the object
    keyValuePairs.forEach(pair => {
        const [key, value] = pair.split(':');
        reconstructedObject[key] = value;
    });

    // Process the options string and convert it back to an array of objects
    if (reconstructedObject.options) {
        const optionsArray = reconstructedObject.options.split(',').map(option => {
            const [key, value] = option.split(':');
            const optionObject = {};
            optionObject[key] = value;
            return optionObject;
        });
        reconstructedObject.options = optionsArray;
    }

    // Return the reconstructed JSON object
    return reconstructedObject;
}

