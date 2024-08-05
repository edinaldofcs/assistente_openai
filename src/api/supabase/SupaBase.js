import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.REACT_APP_SUPABASE_KEY;

export class SupaBaseClient {
  constructor() {
    this.supabase = createClient(supabaseUrl, supabaseKey);
  }

  async getClienteById(clienteID) {
    const { data, error } = await this.supabase
      .from("clientes")
      .select()
      .eq("clienteid", clienteID)
      .single();
    if (error) {
      console.error("Erro ao buscar cliente:", error);
      return null;
    }
    return data;
  }

  async getAccountInfos(clienteID) {
    console.log('aqui', clienteID);
    let { data, error } = await this.supabase
      .from("clientes")
      .select(
        `
        nome, 
        contas (contaid,tipoconta, saldo)        
        `
      )
      .eq("clienteid", clienteID);
    if (error) {
      console.error("Erro ao buscar informações da conta:", error);
      return null;
    }

    let transacoes = await this.supabase
      .from("transacoes")
      .select()
      .eq("contaid", data[0].contas[0].contaid);
    if (transacoes) {
      data[0] = { ...data[0], transacoes: transacoes.data};
    }
    // console.log(data);
    return data;
  }

  getFunctions() {
    return {
      functions: {
        getClienteById: this.getClienteById.bind(this),
        getAccountInfos: this.getAccountInfos.bind(this),
      },
    };
  }
}
