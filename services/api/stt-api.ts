// 200 successfull will get you this-

// {
//     "transcript": "नमस्ते, आप कैसे हैं?",
//     "request_id": "request_id",
//     "timestamps": {
//       "words": [
//         "words"
//       ],
//       "start_time_seconds": [
//         1.1
//       ],
//       "end_time_seconds": [
//         1.1
//       ]
//     },
//     "diarized_transcript": {
//       "entries": [
//         {
//           "transcript": "transcript",
//           "start_time_seconds": 1.1,
//           "end_time_seconds": 1.1,
//           "speaker_id": "speaker_id"
//         }
//       ]
//     },
//     "language_code": "language_code"
//   }

export async function callSarvamSTT(blob: Blob, languageMode: boolean): Promise<string> {
    console.log("Calling Sarvam STT API");
    try {
        const buffer = await blob.arrayBuffer();
        const file = new File([buffer], "recording.wav", { type: "audio/wav" });

        const formData = new FormData();
        formData.append("file", file);
        formData.append("model", "saarika:v2.5");
        formData.append("language_code", languageMode ? "kn-IN" : "en-IN");

        const response = await fetch("https://api.sarvam.ai/speech-to-text", {
            method: "POST",
            headers: {
                "api-subscription-key": "8a5a0f21-183c-46b8-8034-8079e3608185"
            },
            body: formData
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error("API Error:", response.status, errorText);
            throw new Error(`API request failed with status ${response.status}: ${errorText}`);
        }

        const data = await response.json();
        console.log("STT API response:", data);

        const transcript = data.transcript || "No transcript received";
        console.log("Final transcript:", transcript);
        return transcript;
    } catch (error) {
        console.error("STT Error:", error);
        return "Voice recognition failed";
    }
}