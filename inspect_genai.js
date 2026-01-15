import { GoogleGenAI } from "@google/genai";

try {
    const client = new GoogleGenAI({ apiKey: "dummy_key" });
    console.log("client.models keys:", Object.keys(client.models));
    console.log("client.models prototype:", Object.getOwnPropertyNames(Object.getPrototypeOf(client.models)));
} catch (e) {
    console.error("Error inspecting:", e);
}
