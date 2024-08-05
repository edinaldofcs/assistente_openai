import OpenAI from "openai";
import { tools } from "./tools";

const assistant_id = "asst_YQBp3XnccSI28mXbF2tuMIqX";
const apiKey = process.env.REACT_APP_OPENAI_API_KEY;

export class OpenAIClient {
  constructor(supabase) {
    this.openai = new OpenAI({
      apiKey: apiKey,
      dangerouslyAllowBrowser: true,
      defaultHeaders: { "OpenAI-Beta": "assistants=v2" },
    });
    this.supabase = supabase;
    this.client = {};
  }

  loadThread = async () => {
    try {
      const thread = await this.openai.beta.threads.create();
      return thread;
    } catch (error) {
      console.error("Error creating thread:", error);
    }
  };

  handleRequiresAction = async (run, thread) => {
    if (
      run.required_action &&
      run.required_action.submit_tool_outputs &&
      run.required_action.submit_tool_outputs.tool_calls
    ) {
      let function_name = `${run.required_action.submit_tool_outputs.tool_calls[0].function.name}`;
      const functions = this.supabase.getFunctions();
     
      // console.log(this.client);
      const obj = await functions.functions[function_name](Number(this.client.clienteid));

      const toolOutputs = run.required_action.submit_tool_outputs.tool_calls.map((tool) => {
        return {
          tool_call_id: tool.id,
          output: JSON.stringify(obj),
        };
      });

      if (toolOutputs.length > 0) {
        run = await this.openai.beta.threads.runs.submitToolOutputsAndPoll(
          thread.id,
          run.id,
          { tool_outputs: toolOutputs }
        );
        console.log("Tool outputs submitted successfully.");
      } else {
        console.log("No tool outputs to submit.");
      }

      return this.handleRunStatus(run, thread);
    }
  };

  handleRunStatus = async (run, thread) => {
    if (run.status === "completed") {
      let messages = await this.openai.beta.threads.messages.list(run.thread_id, {
        run_id: run.id,
      });
      const data = {
        message: messages.data[0].content[0].text.value,
      };
      return data;
    } else if (run.status === "requires_action") {
      return await this.handleRequiresAction(run, thread);
    } else {
      console.error("Run did not complete:", run);
    }
  };

  chat = async (client, input, thread) => {
    this.client = client;
    if (this.openai && thread) {
      await this.openai.beta.threads.messages.create(thread.id, {
        role: "user",
        content: input,
      });

      let run = await this.openai.beta.threads.runs.createAndPoll(thread.id, {
        assistant_id,
        additional_messages: [
          {
            role: "user",
            content: `clientId=${this.client.clienteid}`,
          },
          {
            role: "user",
            content: `clientName=${this.client.nome}`,
          },
        ],
        tools: tools,
        tool_choice: "auto",
      });

      return this.handleRunStatus(run, thread);
    }
  };
}
