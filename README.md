# Desafio técnico

Olá! Bem vindo ao desafio técnico da Lovyca. Estamos focados em elevar as experiências de bem-estar em serviços residenciais, garantindo comodidade e segurança.
Sendo assim, este desafio irá testar suas habilidades no desenvolvimento de uma pequena aplicação que contará com frontend e backend.

---

## Contextualização do desafio

Considere que estamos precisando desenvolver uma nova interface para o gerenciamento de seviços oferecidos para os cliente da Lovyca. Esta plataforma deverá gerenciar os serviços, ou seja, permitir que sejam feitas todas as ações do CRUD no serviço.

---

## Especificações Técnicas 🧑🏽‍💻

A autenticação deverá usar o Firebase Auth com autenticação via SMS.

Você poderá autenticar o frontend diretamente com o firebase.

O front deverá utilizar:

Typescript

ReactJS

NextJS

TailwindCSS

As telas devem seguir o padrão estabelecido no mockup, para acessar use o link: https://whimsical.com/technical-test-lovyca-WaJopgbqbhnmBSS4NMq3wV

Para se comunicar com a base de dados, você deverá fazer uma API, com todas as regras de segurança possíveis, que seja desenvolvida com:

Typescript

NestJS

Firebase

---

## Critérios de avaliação

- Qualidade de escrita do código
- Organização do projeto
- Qualidade da API
- Lógica da solução implementada
- Utilização do Git (quantidade e descrição dos commits, Git Flow, ...)
- Validações
- Tratamento de erros
- Padrões de projeto e arquitetura

### Desejável

- Testes unitários
- Documentação da arquitetura da solução

---

## Instruções de entrega

1. Crie um fork do repositório no seu GitHub
2. Faça o push do código desenvolvido no seu Github
3. Inclua um arquivo chamado README.md explicando
   - Decisão da arquitetura utilizada
   - Lista de bibliotecas de terceiros utilizadas
   - O que você melhoraria se tivesse mais tempo
   - Quais requisitos obrigatórios que não foram entregues
4. Lembre-se de informar quando concluir o desafio e enviar o link do repositório
5. Após revisão do projeto junto com a equipe de desevolvimento deixe seu repositório privado

Lembre-se, qualquer dúvida na execução do desafio, não exite em nos perguntar

Boa sorte! 🚀

## Entregas

- [✔] - backend com nestJs;
- [✔] - Frontend usando NextJs;
- [✔] - Autenticação por telefone do Firebase;
- [✔] - serviços backend para criação de listas de serviços;
- [✔] - Criação, edição e listagem de serviços;
- [❌] - Pesquisa de serviços cadastrados;

## Arquitetura

Os dois projetos se encontram na mesma pasta a API roda a portar _3001_ e o FRONTEND na porta _3000_.
O backend já possui estrutura MVC, foi adicionado uma pasta modules que armazena todos os modulos de serviço, e os modulos de serviço possui seus services e controller.

Os dados necessários para serem usados no frontend como **token** foi armazenado utilizando cookies, pois pode ser utilizado no SSR do nextJs para autorização de rotas privas e informação para o contexto das requisições.

## Lista de bibliotecas utilizadas

- Firebase (Autenticação e Database);
- Toastify;
- React-hook-form;
- Nookies;

# Melhorias

- O backend não demanda tanto esforço o mesmo poderia ser escrito utilizando as rotas API no nextJs;
- A primeira tela após o login seria com as listas de serviços cadastrados;
- Integração de Middleware com o backend (JWT);
- Outras opções de método de autenticação no frontend.
- banco de dados relacional (postgre, mysql), é mais escalaval conforme o aumento de dados a ser armazenados.

## requisitos não entregues

- Não foi entregue a solução de pesquisa dos serviços, mas a proposta dessa solução seria um componente Input que recebe uma lista de soluções criadas por contexto `<Input {...serviçosName}/>`, detro do componente seria feito o tratamento da informação digitada para comparar com os elementos recebidos e apresentar o alemento com maior similaridade.
