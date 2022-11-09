
# O Projeto Contém 

Typescript
ReactJS
NextJS
TailwindCSS
NestJS
Firebase


## Entregas

- [✔] - backend com nestJs;
- [✔] - Frontend usando NextJs;
- [✔] - Autenticação por telefone do Firebase;
- [✔] - serviços backend para criação de listas de serviços;
- [✔] - Criação, edição e listagem de serviços;
- [✔] - Pesquisa de serviços cadastrados;

## Arquitetura

Os dois projetos se encontram na mesma pasta a API roda a portar _3001_ e o FRONTEND na porta _3000_.
O backend já possui estrutura MVC, foi adicionado uma pasta modules que armazena todos os modulos de serviço, e os modulos de serviço possui seus services e controller.

Os dados necessários para serem usados no frontend como **token** foi armazenado utilizando cookies, pois pode ser utilizado no SSR do nextJs para autorização de rotas privas e informação para o contexto das requisições.

## Lista de bibliotecas utilizadas

- Firebase (Autenticação e Database);
- Toastify;
- React-hook-form;
- Nookies;

## Melhorias

- O backend não demanda tanto esforço o mesmo poderia ser escrito utilizando as rotas API no nextJs;
- A primeira tela após o login seria com as listas de serviços cadastrados;
- Integração de Middleware com o backend (JWT);
- Outras opções de método de autenticação no frontend.
- banco de dados relacional (postgre, mysql), é mais escalaval conforme o aumento de dados a ser armazenados.
