# Sistema para troca de mensagens on-line

## Objetivo
- Estudar sobre RTC (Real Time Communication)
- Aplicação da biblioteca Socket.io em uma situação prática.

## Funcionalidades
  1. A sala de conversas tem capacidade para 5 pessoas. <br>
  2. Para entrar, é necessário informar um nome de usuário único na sala. <br>
  3. A sala é informada sobre a entrada e saída de um usuário. <br>
  4. A sessão do usuário é salva em banco de dados e dura no máximo 10 minutos. <br>
  5. O usuário pode encerrar sua sessão saindo da sala a qualquer momento. <br>
  6. Caso o tempo de sessão de um usuário tenha expirado e ocorra a tentativa de envio de mensagens pela janela ainda aberta, o conteúdo não será encaminhada passado para a sala. O evento de emissão de mensagens está vinculado à sessão de cada usuário.
  7. Todas as mensagens recebidas na sala são marcadas com o nome de usuário do remetente.
  8. O remetente de uma mensagem não visualiza em sua janela o seu nome de usuário marcado
      
## Tecnologias utilizadas
- HTML5 + CSS3 + JAVASCRIPT
- NODE.JS + MONGODB
- BIBLIOTECAS<br>
  express, express-handlebars, express-session, cookie-parser, mongoose, connect-mongo, dotenv, connect-flash, socket.io
      
## Como acessar
- **Deploy** <br>
  https://bate-papo.onrender.com/
- **Para instalar e executar o projeto** <br>
  1. Fazer clone deste repositório. <br>
     `https://github.com/simeaomessias/controle-arquivos-mongodb-gridfs`
  2. Certificar que o npm está instalado. <br>
     O npm pode ser obtido instalando o [Node](https://nodejs.org/en/).
  3. Configurar os valores da seguintes variaveis de ambiente:<br>
     - KEY: nome do cookie para o express-session. <br>
     - SECRET: chave secreta para o express-session <br>
     - MONGOURI: formato URI da string de conexão do MongoDB <br>
  4. Executar o comando *npm start*. <br>
     Acesse http://localhost:8081 para visualizar no navegador. <br>

## Imagens
![01 - Tela de login](https://user-images.githubusercontent.com/76917508/222044209-a5abec0c-683c-40f6-921b-900172b652e4.jpg)
![03 - Admin - Cadastro de usuários](https://user-images.githubusercontent.com/76917508/222044358-17a96710-3b84-4262-8d0f-95df0c85f15c.jpg)
![06 - Admin - Cadastro de documentos](https://user-images.githubusercontent.com/76917508/222044388-83903427-9af7-4e06-8715-d4af849168c4.jpg)
![07 - Admin - Documentos cadastrados](https://user-images.githubusercontent.com/76917508/222044469-88eee914-86c0-4b49-8b6b-ac32725fe462.jpg)
![08 - Usuário - Documentos para download](https://user-images.githubusercontent.com/76917508/222044484-2d23d1e0-4857-4870-ae4a-6960ef89a15f.jpg)
![09 - Admin - List de usuários por documento](https://user-images.githubusercontent.com/76917508/222044552-626e33cc-2bd2-4b84-b7b9-58b19181c755.jpg)
![09 - Admin - Lista de documentos por usuário](https://user-images.githubusercontent.com/76917508/222044568-67c07281-68e2-43c5-a401-659cb4b14680.jpg)


## Autor
https://github.com/simeaomessias
