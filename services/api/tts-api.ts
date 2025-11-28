// 200 successfull will get you this-

// {
//     "audios": [
//       "audios"
//     ],
//     "request_id": "request_id"
//   }

export async function callSarvamTTS(inputText: string, languageMode: boolean): Promise<{ ttsResponse: string[] }> {
    const { SarvamAIClient } = await import("sarvamai");

    const client = new SarvamAIClient({
        apiSubscriptionKey: "8a5a0f21-183c-46b8-8034-8079e3608185",
    });

    let completeAudio: string[] = [];

    if (inputText.length < 270) {
        try {
            const response = await client.textToSpeech.convert({
                text: inputText,
                model: "bulbul:v2",
                speaker: "manisha",
                target_language_code: languageMode ? "kn-IN" : "en-IN",
                enable_preprocessing: true
            });

            completeAudio = response.audios;

        } catch (error) {
            console.error("TTS Error:", error);
            return { ttsResponse: ["TTS failed"] };
        }
    }
    else {
        try {
            const textChunks = splitTextIntoChunks(inputText, 270);
            completeAudio = [];

            for (let i = 0; i < textChunks.length; i++) {
                const response = await client.textToSpeech.convert({
                    text: textChunks[i],
                    model: "bulbul:v2",
                    speaker: "manisha",
                    target_language_code: "kn-IN",
                    enable_preprocessing: true
                });

                if (response.audios && response.audios.length > 0) {
                    completeAudio.push(response.audios[0]);
                }
            }
        }
        catch (error) {
            console.log("TTS Error:", error);
            return { ttsResponse: ["TTS failed"] };
        }
    }
    return { ttsResponse: completeAudio };
}

function splitTextIntoChunks(text: string, maxChunkSize: number): string[] {
    // this is where we put all the stuff that shows where sentence stops
    const sentenceDelimiters = ['.', '?', '!', '\n'];
    const chunks: string[] = []; // will be returning this array

    let sentences: string[] = [];
    let currentSentence = "";

    // we look at every letter one by one and add the letter to our sentence(limitation)
    for (let i = 0; i < text.length; i++) {
        const char = text[i];
        currentSentence += char;

        // we here end it at sentence delimiters as in sentenceDelimiters
        if (sentenceDelimiters.includes(char) && currentSentence.trim().length > 0) {
            console.log("current sentence before trimming::::", currentSentence)
            sentences.push(currentSentence.trim());
            currentSentence = ""; // we re initialize
        }
    }

    if (currentSentence.trim().length > 0) {
        sentences.push(currentSentence.trim());
    }

    // now to make the chunks smaller than maxChunkSize
    let currentChunk = "";

    for (const sentence of sentences) {
        // if sentence is very long we gotta break it into tiny pieces
        if (sentence.length > maxChunkSize) {
            if (currentChunk.length > 0) {
                chunks.push(currentChunk);
                currentChunk = "";
            }

            // we make sure the sentence doesnt exceed maxChunkSize
            for (let i = 0; i < sentence.length; i += maxChunkSize) {
                const chunkPart = sentence.substring(i, Math.min(i + maxChunkSize, sentence.length));
                chunks.push(chunkPart);
            }
        }
        // end it when current chunk size exceeds maxChunkSize
        else if (currentChunk.length + sentence.length > maxChunkSize) {
            chunks.push(currentChunk);
            currentChunk = sentence;
        }
        else {
            currentChunk += (currentChunk ? " " : "") + sentence;
        }
    }

    if (currentChunk.length > 0) {
        chunks.push(currentChunk);
    }

    return chunks;
}