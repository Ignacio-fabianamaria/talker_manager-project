#  Talker Manager! 


## :memo: Descrição
<p>Projeto Talker Manager é uma aplicação de cadastro de talkers (palestrantes) em que é possível cadastrar, visualizar, pesquisar, editar e excluir informações. Foi Implementado o conjunto de operações conhecido como CRUD.

CRUD (Create, Read, Update, Delete) é um acrônimo para Create (criar), Read (ler), Update (atualizar) e Delete (deletar) que constituem a forma mais básica de manipular dados.</p>

# GET `/talker`

```json
[
  {
    "name": "Henrique Albuquerque",
    "age": 62,
    "id": 1,
    "talk": { "watchedAt": "23/10/2020", "rate": 5 }
  },
  {
    "name": "Heloísa Albuquerque",
    "age": 67,
    "id": 2,
    "talk": { "watchedAt": "23/10/2020", "rate": 5 }
  },
  {
    "name": "Ricardo Xavier Filho",
    "age": 33,
    "id": 3,
    "talk": { "watchedAt": "23/10/2020", "rate": 5 }
  },
  {
    "name": "Marcos Costa",
    "age": 24,
    "id": 4,
    "talk": { "watchedAt": "23/10/2020", "rate": 5 }
  }
]
```

## :books: Objetivos do Projeto: 
  
 Fixar os conceitos introdutórios sobre NODE.js.
  
  <b>Objetivo proposto :</b>
  
* Desenvolver uma API de um CRUD (Create, Read, Update e Delete) de talkers

* Desenvolver alguns endpoints que irão ler e escrever em um arquivo utilizando o módulo fs.
  

## :wrench: Tecnologias utilizadas
  
* Docker
  
* NODE.js 
