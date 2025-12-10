# 🔧 Configuração de Conexão: MySQL (Windows) + Node.js (WSL2)

Este guia documenta os passos necessários para permitir que uma aplicação Node.js rodando no ambiente **WSL2 (Ubuntu)** se conecte a um banco de dados MySQL rodando no **Windows Host**.

## 📋 Cenário (Ambiente de Desenvolvimento Windows 11 PRO + WSL2)
* **Banco de Dados:** MySQL 8.x rodando no Windows.
* **Porta:** 3307 (Instalação dedicada no meu caso, mas a padrão é 3306).
* **Aplicação:** Node.js rodando no WSL2.

---

## 🚀 Passo a Passo

### 1. Configurar Firewall do Windows
Como o WSL2 é visto como uma rede externa pelo Windows, o firewall nativo bloqueia a conexão. Precisamos liberar a porta 3307 no meu caso ou 3306 padrão.

**No PowerShell (como Administrador):**
```powershell
New-NetFirewallRule -DisplayName "MySQL-WSL-3307" -Direction Inbound -LocalPort 3307 -Protocol TCP -Action Allow
```

### 2. Criar Usuário com Permissão Externa
O usuário **root** geralmente só aceita conexões locais (localhost). Criamos um usuário específico que aceita conexões de qualquer IP (%).

**No MySQL Workbench instalado no windows (conectado como root)**

Vamos criar o usuário `fullstack` permitindo acesso de qualquer host (%):
- Abra seu MySQL Workbench no Windows
- Conecte-se na instância que está rodando na porta 3306 padrão ou 3307 no meu caso.
- Abra uma nova aba de consulta (Query) e execute estes blocos a seguir:
```
CREATE USER 'fullstack'@'%' IDENTIFIED BY '12345678';
```
Isso vai criar um novo usuário **fullstack** e senha **12345678** para o MySQL. Caso desejar pode alterar o nome do usuário e senha.

- Garante permissões totais no banco de dados "notas" do projeto
```
CREATE SCHEMA IF NOT EXISTS notas;

GRANT ALL PRIVILEGES ON notas.* TO 'fullstack'@'%';
```

- Aplica as permissões
```
FLUSH PRIVILEGES;
```

### 3. Descobrir o IP do Windows no WSL
O `localhost` dentro do WSL2 aponta para o próprio Linux, não para o Windows. Precisamos do IP do Gateway (a "ponte" para o Windows).

No Terminal do WSL execute:
```
ip route show default | awk '{print $3}'
```
Copie o IP retornado (ex: 172.27.48.1 ou 10.255.255.254).

### 4. Configurar a Conexão no Node.js
No arquivo de configuração do Sequelize (`model/server.js`), utilize o IP descoberto no passo anterior.

Arquivo: model/server.js
```Javascript
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
    'notas',       // Nome do Schema
    'fullstack',   // Usuário criado no Passo 2
    '12345678',    // Senha definida no Passo 2
    {
        host: '172.27.48.1', // <--- IP obtido no Passo 3
        port: 3307,          // Porta do MySQL no Windows no meu caso
        dialect: 'mysql'
    }
);

sequelize.authenticate().then(() => {
    console.log('Conexão com banco de dados estabelecida com sucesso.');
}).catch((error) => {
    console.error('Erro ao se conectar ao banco de dados:', error);
});

module.exports = sequelize;
```
