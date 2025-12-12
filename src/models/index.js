const PartsOfSpeechSchema = {
    name: "PartsOfSpeech",
    primaryKey: "objectId",
    properties: {
        "objectId": "string",
        "type": "string",
    }
}

const WordSchema = {
    name: "Words",
    primaryKey: "objectId",
    properties: {
        "objectId": "string",
        "value": "string",
    }
};

export { PartsOfSpeechSchema, WordSchema }