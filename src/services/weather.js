import Api from "./api.js";


export const getTown = async (town) => {
    try {
        const response = await Api.get(town);
        console.log("response",response)
        return response.results;
    } catch (error) {
        console.error(error);
    }
};
