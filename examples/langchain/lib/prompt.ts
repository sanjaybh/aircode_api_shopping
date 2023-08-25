import {
  ChatPromptTemplate,
  SystemMessagePromptTemplate,
  HumanMessagePromptTemplate,
	PromptTemplate
} from "langchain/prompts";

// const rolePrompt = `You are a helpful assistant of AirCode field. I hope you respond and answer like experts in this field. You must know that all the knowledge of experts in this field and you are always an expert in this field.`;
const rolePrompt = 'You are a helpful assistant of {field} field. I will tell you in some professional knowledge in this field, I hope you respond and answer like experts in this field. You must know that all the knowledge of experts in this field and you are always an expert in this field.';
const systemMessagePrompt = SystemMessagePromptTemplate.fromTemplate(rolePrompt);

const template = PromptTemplate.fromTemplate(rolePrompt);

const formattedPrompt = async () => {
	const prompt = await template.format({
	  field: process.env.FIELD
	});
	return prompt;
}

const chatPrompt = ChatPromptTemplate.fromPromptMessages([systemMessagePrompt]);
export {
	chatPrompt,
	formattedPrompt,
}; 
