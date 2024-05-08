# language: pt 

Funcionalidade: Atualização de usuário

@atualizarUsuario
Cenário: Localizar usuário com sucesso e visualizar informações do usuário para atualização
    Dado que acessei a página inicial
    Quando consultar usuário através do seu identificador único
    E acessar a página do usuário
    Então será possível visualizar as informações do usuário


Cenário: Não deve ser possível localizar usuário com sucesso e visualizar informações do usuário para atualização se o usuário não estiver cadastrado 
    Dado que acessei a página inicial
    E tentar acessar a página do usuário com um identificador qualquer
    Então não será possível visualizar as informações do usuário


Cenário: Deve ser possível alterar as informações do usuário com sucesso, caso os dados sejam válidos 
    Dado que acessei a página inicial
    Quando consultar usuário através do seu identificador único
    E acessar a página do usuário
    E clicar na opção editar 
    E alterar o campo nome, com um nome válido 
    E alterar o campo e-mail, com um e-mail válido 
    E salvar a operação
    Entao o usuário deverá ser atualizado com sucesso e o sistema apresentará a mensagem 'Informações atualizadas com sucesso!'


Cenário: Não deve ser possível alterar o nome para que tenha mais de 100 caracteres 
    Dado que acessei a página inicial
    Quando consultar usuário através do seu identificador único
    E acessar a página do usuário
    E clicar na opção editar 
    E alterar o campo nome, colocando um nome com mais de 100 caracteres
    E salvar a operação
    Entao o usuário não deverá ser atualizado com sucesso e o sistema apresentará uma mensagem 

Cenário: Não deve ser possível alterar o nome para um que tenha menos de 4 caracteres 
    Dado que acessei a página inicial
    Quando consultar usuário através do seu identificador único
    E acessar a página do usuário
    E clicar na opção editar 
    E alterar o campo nome, colocando um nome com menos de 4 caracteres
    E salvar a operação
    Entao o usuário não poderá ser alterado e o sistema apresentará uma mensagem     


Esquema do Cenário: Não deve ser possível alterar o nome para um formato inválido
    Dado que acessei a página inicial
    Quando consultar usuário através do seu identificador único
    E acessar a página do usuário
    E clicar na opção editar 
    E alterar o campo nome, colocando um nome com formato inválido "<nome>"
    E salvar a operação
    Entao o usuário não poderá ser alterado e o sistema apresentará a mensagem 'Formato do nome é inválido'   
    Exemplos:
    | nome     | 
    | 2222     | 
    | Maria22  |
    | ________ |


Cenário: Não deve ser possível alterar e-mail para que tenha mais de 60 caracteres 
    Dado que acessei a página inicial
    Quando consultar usuário através do seu identificador único
    E acessar a página do usuário
    E clicar na opção editar 
    E alterar o campo e-mail, informando um novo e-mail com mais de 60 caracteres
    E salvar a operação
    Entao não deve ser possível extrapolar a quantidade de 60 caracteres no e-mail do usuário

Esquema do Cenário: Não deve ser possível alterar e-mail para um formato inválido 
    Dado que acessei a página inicial
    Quando consultar usuário através do seu identificador único
    E acessar a página do usuário
    E clicar na opção editar 
    E alterar o campo e-mail, informando um novo e-mail inválido "<email>"
    E salvar a operação
    Entao o usuário não será salvo com sucesso e o sistema apresenta a mensagem "Formato de e-mail inválido"
    Exemplos:
    | email             | 
    | maria             |
    | maria@            |
    | .com              |
    | @.com             |

@atualizarUsuario
Cenário: Não deve ser possível atualizar o e-mail de um usuário utilizando um e-mail já cadastrado
    Dado que existe um usuário cadastrado no banco de dados
    E que acessei a página inicial
    Quando consultar usuário através do seu identificador único
    E acessar a página do usuário
    E clicar na opção editar 
    E alterar o campo e-mail, informando um novo e-mail já cadastrado por outro usuário
    E salvar a operação 
    Então o usuário não é atualizado com sucesso e o sistema devolve o erro "Este e-mail já é utilizado por outro usuário."
    