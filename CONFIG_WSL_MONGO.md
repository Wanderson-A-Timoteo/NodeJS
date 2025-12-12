# 🍃 Configuração de Conexão: MongoDB (Windows) + Node.js (WSL2)

Este guia documenta os passos necessários para permitir que uma aplicação Node.js rodando no ambiente **WSL2 (Ubuntu)** se conecte ao **MongoDB** instalado no **Windows Host**.

## 📋 Cenário: Ambiente de Desenvolvimento Windows 11 PRO + WSL2
* **Banco de Dados:** MongoDB Community Server (instalado no Windows).
* **Porta:** 27017 (Padrão).
* **Aplicação:** Node.js + Mongoose rodando no WSL2.

---

## 🚀 Passo a Passo

### 1. Configurar o MongoDB para Acesso Externo
Por padrão, o MongoDB só aceita conexões locais (`127.0.0.1`). Precisamos permitir que ele escute o IP do WSL.

1. Abra o **Bloco de Notas** como **Administrador**.
2. Abra o arquivo de configuração do MongoDB.
    * Geralmente em: `C:\Program Files\MongoDB\Server\8.2\bin\mongod.cfg` (a versão pode variar).
3. Localize a seção `net:` e altere o `bindIp`:

**De:**
```yaml
net:
  port: 27017
  bindIp: 127.0.0.1
```
**Para:**
```yaml
net:
  port: 27017
  bindIp: 0.0.0.0
```
4. Salve o arquivo.

5. Reinicie o serviço do MongoDB:

    - Abra Serviços no Windows (Win+R > services.msc).

    - Encontre MongoDB Server.

    - Clique com botão direito > Reiniciar.


### 2. Configurar Firewall do Windows

O WSL2 é visto como uma rede externa. Precisamos liberar a porta do banco.

No PowerShell (como Administrador) execute:

```PowerShell
New-NetFirewallRule -DisplayName "MongoDB-WSL" -Direction Inbound -LocalPort 27017 -Protocol TCP -Action Allow
```

### 3. Descobrir o IP do Windows no WSL

O localhost dentro do WSL aponta para o Linux. Precisamos do IP da máquina Windows.

No Terminal do WSL execute:

```Bash
ip route show default | awk '{print $3}'
```
Copie o IP retornado (ex: 172.27.48.1).


### 4. Configurar a Conexão no Node.js (Mongoose)

No arquivo de configuração (model/server.js), utilize o IP descoberto.

Arquivo: model/server.js

```Javascript
const mongoose = require('mongoose');

// Substitua pelo IP obtido no Passo 3
const windowsIP = '172.27.48.1'; 

const dbURI = `mongodb://${windowsIP}:27017/notas_nosql`;

mongoose.connect(dbURI)
    .then(() => {
        console.log('Conexão com banco de dados MongoDB estabelecida com sucesso.');
    })
    .catch((error) => {
        console.error('Erro ao se conectar ao banco de dados:', error);
    });

module.exports = mongoose;
```
