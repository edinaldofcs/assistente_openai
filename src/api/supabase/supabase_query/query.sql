CREATE TABLE Clientes (
    ClienteID SERIAL PRIMARY KEY,
    Nome VARCHAR(100) NOT NULL,
    Email VARCHAR(100) NOT NULL UNIQUE,
    Telefone VARCHAR(15),
    DataNascimento DATE,
    Endereco VARCHAR(255),
    DataCadastro DATE NOT NULL DEFAULT CURRENT_DATE
);

CREATE TABLE Contas (
    ContaID SERIAL PRIMARY KEY,
    ClienteID INT REFERENCES Clientes(ClienteID) ON DELETE CASCADE,
    TipoConta VARCHAR(50) NOT NULL, -- Ex: Corrente, Poupança
    Saldo DECIMAL(15, 2) NOT NULL DEFAULT 0,
    DataAbertura DATE NOT NULL DEFAULT CURRENT_DATE
);


CREATE TABLE Transacoes (
    TransacaoID SERIAL PRIMARY KEY,
    ContaID INT REFERENCES Contas(ContaID) ON DELETE CASCADE,
    TipoTransacao VARCHAR(50) NOT NULL, -- Ex: Crédito, Débito
    Valor DECIMAL(15, 2) NOT NULL,
    DataTransacao TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    Descricao TEXT
);

CREATE TABLE CartoesCredito (
    CartaoID SERIAL PRIMARY KEY,
    ClienteID INT REFERENCES Clientes(ClienteID) ON DELETE CASCADE,
    NumeroCartao VARCHAR(16) NOT NULL UNIQUE,
    DataValidade DATE NOT NULL,
    Limite DECIMAL(15, 2) NOT NULL
);


CREATE TABLE Faturas (
    FaturaID SERIAL PRIMARY KEY,
    CartaoID INT REFERENCES CartoesCredito(CartaoID) ON DELETE CASCADE,
    MesAno VARCHAR(7) NOT NULL, -- Ex: '08/2024'
    ValorTotal DECIMAL(15, 2) NOT NULL DEFAULT 0,
    DataVencimento DATE NOT NULL,
    Pago BOOLEAN NOT NULL DEFAULT FALSE
);


CREATE TABLE ComprasCartao (
    CompraID SERIAL PRIMARY KEY,
    FaturaID INT REFERENCES Faturas(FaturaID) ON DELETE CASCADE,
    CartaoID INT REFERENCES CartoesCredito(CartaoID) ON DELETE CASCADE,
    DataCompra TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    Valor DECIMAL(15, 2) NOT NULL,
    Descricao TEXT
);

-- Clientes
INSERT INTO Clientes (Nome, Email, Telefone, DataNascimento, Endereco)
VALUES ('João Silva', 'joao.silva@example.com', '11999999999', '1990-05-15', 'Rua A, 123, São Paulo, SP');

INSERT INTO Clientes (Nome, Email, Telefone, DataNascimento, Endereco)
VALUES ('Maria Oliveira', 'maria.oliveira@example.com', '21988888888', '1985-03-22', 'Rua B, 456, Rio de Janeiro, RJ');

INSERT INTO Clientes (Nome, Email, Telefone, DataNascimento, Endereco)
VALUES ('Carlos Souza', 'carlos.souza@example.com', '31977777777', '1993-12-10', 'Rua C, 789, Belo Horizonte, MG');

INSERT INTO Clientes (Nome, Email, Telefone, DataNascimento, Endereco)
VALUES ('Ana Pereira', 'ana.pereira@example.com', '41966666666', '2000-07-30', 'Rua D, 101, Curitiba, PR');

INSERT INTO Clientes (Nome, Email, Telefone, DataNascimento, Endereco)
VALUES ('Paulo Santos', 'paulo.santos@example.com', '51955555555', '1978-11-05', 'Rua E, 202, Porto Alegre, RS');


-- Cartões
INSERT INTO CartoesCredito (ClienteID, NumeroCartao, DataValidade, Limite)
VALUES 
  (1, '1234567812345678', '2025-08-01', 5000.00),
  (2, '2345678923456789', '2024-07-01', 3000.00),
  (3, '3456789034567890', '2023-06-01', 7000.00),
  (4, '4567890145678901', '2026-05-01', 6000.00),
  (5, '5678901256789012', '2022-04-01', 8000.00);


-- Compras cartões
INSERT INTO ComprasCartao (FaturaID, CartaoID, DataCompra, Valor, Descricao)
VALUES 
  (1, 1, '2024-08-01 10:30:00', 300.00, 'Compra na loja de eletrônicos'),
  (1, 1, '2024-08-05 14:00:00', 200.50, 'Restaurante'),
  (2, 2, '2024-08-10 16:30:00', 150.75, 'Posto de gasolina'),
  (3, 3, '2024-08-15 11:00:00', 450.25, 'Supermercado'),
  (4, 4, '2024-08-20 13:30:00', 275.00, 'Cinema');


-- contas
INSERT INTO Contas (ClienteID, TipoConta, Saldo)
VALUES 
  (1, 'Corrente', 1500.00),
  (2, 'Poupança', 2500.50),
  (3, 'Corrente', 1000.75),
  (4, 'Poupança', 3000.00),
  (5, 'Corrente', 2000.25);

--Faturas
INSERT INTO Faturas (CartaoID, MesAno, ValorTotal, DataVencimento, Pago)
VALUES 
  (1, '08/2024', 1200.50, '2024-09-10', FALSE),
  (2, '08/2024', 850.75, '2024-09-15', FALSE),
  (3, '08/2024', 1450.25, '2024-09-20', FALSE),
  (4, '08/2024', 975.00, '2024-09-25', FALSE),
  (5, '08/2024', 1300.00, '2024-09-30', FALSE);

--Transacoes
INSERT INTO Transacoes (ContaID, TipoTransacao, Valor, Descricao)
VALUES 
  (1, 'Crédito', 500.00, 'Depósito em conta'),
  (1, 'Débito', 100.00, 'Pagamento de conta de luz'),
  (2, 'Crédito', 1500.00, 'Transferência recebida'),
  (2, 'Débito', 200.00, 'Compra no supermercado'),
  (3, 'Crédito', 2000.00, 'Salário');
