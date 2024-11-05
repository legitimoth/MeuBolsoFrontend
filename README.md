![Meu Bolso Frontend](banner.jpg "meu bolso frontend")

# 💼️ MeuBolsoFrontend

Frontend desenvolvido em Angular para o sistema de controle de finanças pessoais: MeuBolso.

## 📝 Sobre o Projeto

MeuBolso é uma aplicação que auxilia os usuários a monitorar suas finanças pessoais, registrando manualmente compras e transações feitas via cartão de crédito, débito ou Pix. As compras são categorizadas por tags (como lazer, alimentação, etc.), permitindo uma visão clara dos gastos mensais em comparação com a renda fixa do usuário.

## 🎯 Objetivo

O objetivo do MeuBolso é simplificar o controle de gastos pessoais, oferecendo uma interface intuitiva para que o usuário possa acompanhar suas finanças de forma fácil e eficiente.

## 🛠️ Tecnologias Utilizadas

- Angular: Framework para construção de interfaces interativas e responsivas.
- Angular Material: Biblioteca de componentes para estilização consistente da interface.
- RxJS: Biblioteca para manipulação de fluxos assíncronos de dados.
- Chart.js: Ferramenta para criação de gráficos financeiros, facilitando a visualização de dados.

## 🚀 Funcionalidades

- Autenticação: Interface de login e registro de usuários utilizando Auth0.
- Registro de Compras: Tela para o registro de compras via cartão de crédito, débito ou Pix.
- Categorização de Gastos: Opção de adicionar tags às compras para facilitar a organização financeira.
- Resumo Mensal: Exibição de um resumo financeiro do mês, mostrando o total de gastos por categoria.
- Gráficos: Visualização gráfica para análise dos gastos e do saldo mensal.

## 📚 Futuras Melhorias

- Melhorias na interface de usuário para facilitar a navegação.
- Adição de filtros avançados para a análise financeira.
- Notificações personalizadas para alertas financeiros.

## 🏗️ Estrutura do Projeto

- src/app: Contém os componentes principais da aplicação.
- assets: Recursos estáticos como imagens e ícones.
- environments: Arquivos de configuração para diferentes ambientes (desenvolvimento, produção).

## 🚧 Como Executar o Projeto

1. Clone o repositório:

```shell
git clone https://github.com/legitimoth/MeuBolsoFrontend.git
```

2. Navegue até o diretório:

```shell
cd MeuBolsoFrontend
```

3. Instale as dependências:

```shell
npm install
```

4. Execute a aplicação:

```shell
ng serve
```
- Acesse o aplicativo em http://localhost:4200

## 🗒️ Versionamento:

- **Angular CLI:** 18.2.11
- **Node:** 22.11.0
- **Package Manager:** npm 10.9.0
