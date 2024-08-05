## IA assitente para bancos digitais

## Projeto de Integração React com OpenAI e Supabase

Este projeto é uma aplicação React que integra a API da OpenAI com o Supabase.

O objetivo é criar uma experiência interativa e dinâmica, combinando o poder da IA com uma base de dados em tempo real.

## Funcionalidades

- **Integração com a OpenAI**: Utiliza a API da OpenAI para gerar respostas inteligentes e interativas.
- **Gerenciamento de Dados com Supabase**: Conecta-se ao Supabase para armazenar e recuperar dados em tempo real.

- **Mock de Clientes**: Inclui um mock para simular o fluxo da aplicação, quando o cliente entra nos canais de atendimento do app.

## Tecnologias Utilizadas

- **[React](https://reactjs.org/)**: Biblioteca JavaScript para construir interfaces de usuário.
- **[OpenAI API](https://platform.openai.com/)**: Serviço de IA para gerar respostas e interações.
- **[Supabase](https://supabase.com/)**: Backend-as-a-Service para banco de dados em tempo real.

## Instalação

1. Clone o repositório:

   ```bash
   git clone https://github.com/edinaldofcs/assistente_openai.git
   cd seu-repositorio
   ```

2. Instale as dependências:

   ```bash
   npm install
   ```

3. Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

   ```env
   REACT_APP_OPENAI_API_KEY="your_openai_api_key"
   REACT_APP_SUPABASE_KEY="your_supabase_url"
   REACT_APP_SUPABASE_URL="https://ricwnqucxdilxrormyoj.supabase.co"
   ```

4. Inicie o servidor de desenvolvimento:

   ```bash
   npm start
   ```

5. Crie as tabelas no supabase:

   - `src/api/supabase/supabase_query/`: Pasta contendo consultas para o Supabase. [Veja a pasta aqui](src/api/supabase/supabase_query/).

6. Obtenha a apiKey da openai:

## Exemplos de Uso

<video width="600" controls>
  <source src="public/videos/bank_gpt.mp4" type="video/mp4">
  Seu navegador não suporta o elemento de vídeo.
</video>
