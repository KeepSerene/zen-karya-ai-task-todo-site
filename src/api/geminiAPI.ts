import model from "@/lib/googleGenAIModel";

/**
 * Generates a list of project tasks based on the given prompt using the Gemini 2.0 Flash model.
 *
 * This function requests the AI model to generate a structured list of tasks that align with
 * the provided prompt. Each task consists of a description (`content`) and an optional due date (`due_date`).
 *
 * The function ensures:
 * - Tasks are relevant to the given prompt.
 * - Due dates (if provided) are set relative to the current date.
 * - The output follows the specified JSON schema.
 *
 * If an error occurs during the generation process, the function logs the error and returns
 * a JSON string containing a descriptive error message. This ensures the application does not break.
 *
 * @async
 * @param {string} prompt - The user's input describing the project and its tasks.
 * @returns {Promise<string>} A JSON string representing an array of generated tasks or an error message if the process fails.
 */
async function generateProjectTasks(prompt: string): Promise<string> {
  model.generationConfig = {
    responseMimeType: "application/json",
  };

  try {
    const result = await model.generateContent(`
        Generate and return a list of tasks based on the provided prompt
        and the given JSON schema.

        Prompt: ${prompt}

        Task Schema:
        {
          content: string; // Description of the task
          due_date: Date | null; // Due date of the task, or null if no specific date is provided
        }

        Requirements:
        1. Ensure  tasks align with the provided prompt.
        2. Set the 'due_date' relative to today's date: ${new Date()}.
        3. Return an array of tasks matching the schema.

        Output: Array<Task>
    `);

    return result.response.text();
  } catch (err) {
    const errMsg =
      err instanceof Error
        ? err.message
        : "Unknown error generating project tasks!";
    console.error("Error:", errMsg);

    return JSON.stringify(`Task generation failed: ${errMsg}`);
  }
}

export { generateProjectTasks };
