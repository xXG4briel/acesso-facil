# Acesso Fácil - Sistema de Controle de Acesso via QR Code

   <image src="https://github.com/user-attachments/assets/6174b5c1-a8f5-4c4c-b655-fb4bc9706126" width="248px" />


## Visão Geral

O projeto "Acesso Fácil" apresenta um sistema inovador de controle de acesso, simplificando a entrada de visitantes em ambientes empresariais através da utilização de QR codes. A solução abrange desde a gestão de convites pela empresa até o acompanhamento do status da visita pelo convidado.

O fluxo principal se inicia com a empresa gerando e enviando um convite, que inclui um QR code único, para o e-mail do visitante. Ao chegar no local, o visitante apresenta o QR code, que é escaneado para validar e liberar o seu acesso. O sistema é arquitetado em duas partes distintas para otimizar a funcionalidade e a experiência do usuário:

* **Web (Gestão Empresarial):** Interface administrativa para a empresa realizar a gestão completa dos convidados, incluindo a criação e o envio de convites.
* **Web (Portal do Convidado):** Interface para o convidado verificar o status dos seus convites e visitas agendadas.

## Tecnologias Utilizadas

Este projeto foi desenvolvido utilizando as seguintes tecnologias:

* **Frontend (Web):**
    * [Angular](https://angular.io/): Framework para construção das interfaces web (tanto para a gestão empresarial quanto para o portal do convidado).
    * [Ionic](https://ionicframework.com/): Framework para desenvolvimento de aplicativos híbridos (potencialmente utilizado para a interface de leitura de QR code no local de acesso ou para componentes reutilizáveis nas interfaces web).
* **Backend (Server):**
    * [NestJS](https://nestjs.com/): Framework Node.js para construção da API principal, responsável pela lógica de negócios, autenticação e comunicação com o banco de dados.
    * [Python](https://www.python.org/): Linguagem de programação utilizada para serviços específicos, como a geração dos QR codes.
    * [Flask](https://flask.palletsprojects.com/): Microframework Python utilizado para expor a funcionalidade de geração de QR codes como uma API ou serviço interno.
* **Banco de Dados:**
    * [PostgreSQL](https://www.postgresql.org/): Sistema de gerenciamento de banco de dados relacional para armazenar informações sobre usuários, convites, acessos e logs.

## Funcionalidades Principais

* **Gestão de Convidados (Interface Empresarial):**
    * Criação e edição de convites, especificando informações do visitante, data e hora de acesso, e outros detalhes relevantes.
    * Envio automático de e-mails contendo o QR code para os convidados.
    * Visualização e gerenciamento do status dos convites (pendente, enviado, utilizado, cancelado).
    * [Outras funcionalidades de gestão que a empresa possui].
* **Portal do Convidado (Interface do Convidado):**
    * Área para o convidado verificar o status dos convites recebidos.
    * Visualização de detalhes da visita agendada (data, hora, informações da empresa).
    * [Outras funcionalidades para o convidado, se houver].
* **Validação de Acesso via QR Code:**
    * Sistema de leitura de QR codes implementado no local de acesso para validar a autenticidade e a permissão do visitante.
    * Registro automático da entrada e saída dos visitantes.
* **Segurança:**
    * Geração de QR codes únicos e seguros para cada convite.
    * Mecanismos de autenticação e autorização para proteger as informações e funcionalidades do sistema.
    * [Outros aspectos de segurança implementados].

![image](https://github.com/user-attachments/assets/9545c355-b061-47b4-b0f2-6dd1a3e1e208)


## Participantes

Este projeto foi desenvolvido pelos seguintes alunos:

* Gabriel George Alves Nicodemus (1) - 9-ENGCOMP-351876
* Gustavo Ferreira Garcia (2) - 9-ENGCOMP-355498
* Italo Francisco de Oliveira (3) - 9-ENGCOMP-334701
* Lucas Neri dos Santos Gonçalves (4) - 9-ENGCOMP-335221
* Marcos Antonio Aparecido Miano (5) - 9-ENGCOMP-152312
* Vinicius Ferreira Sobral (6) - 9-ENGCOMP-346603

**Orientador:** Me. Prof. Ranieri Marinho de Souza

