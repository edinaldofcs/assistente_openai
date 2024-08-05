export const tools = [
  {
    type: 'function',
    function: {
      name: 'getClienteById',
      description: 'Use esta função para obter os dados de um cliente fornecendo seu ID.',
      parameters: {
        type: 'object',
        properties: {
          clienteID: {
            type: 'number',
            description: 'O ID do cliente a ser buscado.',
          },
        },
        required: ['clienteID'],
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'getAccountInfos',
      description: 'Use esta função para obter as informações da conta de um cliente fornecendo seu ID.',
      parameters: {
        type: 'object',
        properties: {
          clienteID: {
            type: 'number',
            description: 'O ID do cliente cujas informações da conta devem ser buscadas.',
          },
        },
        required: ['clienteID'],
      },
    },
  },
];
