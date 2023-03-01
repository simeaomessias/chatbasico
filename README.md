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
  6. Caso o tempo de sessão de um usuário tenha expirado e ocorra a tentativa de envio de mensagens pela janela ainda aberta, o conteúdo não será encaminhado para a sala. O evento de emissão de mensagens está vinculado à sessão de cada usuário.
  7. Todas as mensagens recebidas na sala são marcadas com o nome de usuário do remetente.
  8. O remetente de uma mensagem não visualiza em sua janela o seu nome de usuário marcado nas mensagens.
      
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
     https://github.com/simeaomessias/chatbasico
  2. Certificar que o npm está instalado. <br>
     O npm pode ser obtido instalando o [Node](https://nodejs.org/en/).
  3. Configurar os valores da seguintes variaveis de ambiente:<br>
     - KEY: nome do cookie para o express-session. <br>
     - SECRET: chave secreta para o express-session <br>
     - MONGOURI: formato URI da string de conexão do MongoDB <br>
  4. Executar o comando *npm start*. <br>
     Acesse http://localhost:8081 para visualizar no navegador. <br>

## Imagens
### Tela de entrada<br>
![00](https://user-images.githubusercontent.com/76917508/222257704-306a5e30-1cc7-41bb-bfd7-a7daa51de74d.jpg) <br>
### Tela do primeiro usuário a entrar na sala<br>
![01](https://user-images.githubusercontent.com/76917508/222256820-72f56e83-8e9c-48f9-9eaa-f7bfb7e3c19c.jpg)<br>
### Tela do segundo usuário a entrar na sala<br>
![02](https://user-images.githubusercontent.com/76917508/222256884-9c7be35c-0901-43ae-8383-bfd70393e903.jpg)<br>
### Tela do terceiro usuário a entrar na sala<br>
![04](https://user-images.githubusercontent.com/76917508/222257227-2158e5be-1045-4820-8d94-a79579536125.png)<br>

## Autor
https://github.com/simeaomessias
