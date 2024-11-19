declare module "transformers" {
    const AutoTokenizer: any;
    const AutoModelForCausalLM: any;
    const pipeline: any;
  
    export { AutoTokenizer, AutoModelForCausalLM, pipeline };
  }
  