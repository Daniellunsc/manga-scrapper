# manga-scrapper


## Sobre
O projeto é um webscrapping para busca dos volumes de um mangá.

## Organização do projeto
O projeto está organizado com algumas camadas para manter a coesão e o propósito do código.

- [/Interfaces](https://github.com/Daniellunsc/manga-scrapper/tree/master/Interfaces)
    - Aqui fica organizado qualquer tipo de interface utilizada, como respostas de requisições e modelos dos dados.
- [/Models](https://github.com/Daniellunsc/manga-scrapper/tree/master/models)
    - Aqui fica organizado os atuais modelos dos dados, mas pendente a alteração de acordo com essa [issue](https://github.com/Daniellunsc/manga-scrapper/issues/29).
- [/Apis](https://github.com/Daniellunsc/manga-scrapper/tree/master/Apis)
    - Aqui fica organizado as chamadas padrões para a API onde é consultado o Mangá e seus volumes.
    - O objetivo de cada API é apenas lidar com a requisição, o ideal é que não faça tratamento ou os manipule os dados de resposta, melhor deixar isso para o Services.
    - BaseRequest:
        - O ideal é que para cada site ou domínio de API, seja criado um arquivo BaseRequest pra ela, a fim de conter a urlBase e os headers padrões.
- [/Services](https://github.com/Daniellunsc/manga-scrapper/tree/master/services)
    - Aqui fica organizado qualquer lógica necessária, como elencar chamadas de APIs ou tratamento de dados, como visto no método ```searchVolumes``` do [MangaEngine](https://github.com/Daniellunsc/manga-scrapper/blob/master/services/MangaEngine.ts).
    
## Executando o projeto
- Necessário para rodar o projeto:
   - Yarn ou NPM
   - Typescript

- Depois de instalado o Yarn ou NPM e o Typescript, na pasta inicial do projeto basta executar ``yarn start`` ou ``npm start``
- Atualmente no arquivo index.ts da base do projeto, você consegue alterar o nome do Mangá sendo buscado, e também escolher o volume que deseja. Atualmente o volume selecionado é sempre o último lançado.
## Planos para o projeto
- A ideia é evoluir o código para uma API, onde possa ser consultado direto e possa retornar um volume de um mangá específico.
- Depois da API construída, um outro serviço de bot do telegram será criado e atualizado aqui com o Link, para que possa ser consultado o(s) volume(s) diretamente pelo chat do telegram.
## Contribuindo

- Escolha uma issue e caso ela já tenha alguém assigned pra ela, verifique se pode continuar o trabalho ou começar ela.
- Escolha uma issue sem ninguém assigned e seja feliz :)