# craft-folio-gotchi-web

O CraftFolioGotchi é uma aplicação Web que possibilita a criação e personalização de mundos virtuais onde vivem personagens controlados pelos usuários.

Esse projeto faz parte do [trabalho final da disciplina Programação para Web](https://github.com/fegemo/cefet-web/tree/master/assignments/project-craftfoliogotchi) do curso de Engenharia de Computação do CEFET-MG.

A aplicação está publicada na nuvem e pode ser acessada [aqui](http://35.184.50.176).

## Requisitos de ambiente

- npm
- node
- docker (opcional)
- docker-compose (opcional)
- docker-machine (opcional)
- virtualbox (opcional, apenas em host Mac)
- gcloud (opcional, para realizar deploys. Entre em contato com lcnascimento para liberar acesso)

## Como rodar aplicação local

```shell
npm install
npm run bundle
API_PORT=8000 node src/app.js
```

__Com Docker__

Passo opcional, para utilizar com docker-machine

```shell
docker-machine create default
docker-machine start default
eval $(docker-machine env default)
docker-compose up
```

Subir container

```shell
docker-compose up
```

__Caso seja incluído um novo pacote via NPM, a imagem dos containers deve ser atualizada__

```shell
docker-compose down
docker-compose build
docker-compose up
```

## Itens extras implementados

- Todas as páginas responsive
- Favicon
- Framework CSS: Bootstrap
- Pré-processador CSS: Sass
- Framework Javascript: Angular
- Dividir código em múltiplos arquivos
- Recursos ES6 (Webpack + babel)
- Configuração de Widgets na própria página
- Novos tipos de Widgets
  - Plaquinha fincada no chão
  - Selecionar Avatar (Sugestão do grupo)
- Sobre o personagem
  - Salto quando uma tecla é pressionada
  - Máquina de estados (mudança de estado via console ou comando de voz)
    - Estados: dormindo, com fome, doente
    - Ações: dormir, acordar, fome, comer, adoecer, mediar, etc...
  - Iteração do personagem com o cenário
    - Imaginamos o mundo em um plano 3D. Nesse sentido existem 3 níveis: Plaquinha, Avatar, Outdoor. A sobreposicão dos componentes deve seguir essa hierarquia.
- Extras gerais
  - Speech Recognition API

__Itens adicionados por conta do grupo visando melhor qualidade no desenvolvimento e nas entregas__

- Docker
- ESLint
- Cloud (GCP + Kubernetes)

## Como fazer deploy em produção

Gerar nova imagem local com a tag latest:

```shell
docker build -t gcr.io/so-sistemas-sistemas-201603/craft-folio-gotchi-web:latest
```

Depois subir a nova imagem criada para o repositório do Google na cloud

```shell
gcloud docker -- push gcr.io/so-sistemas-sistemas-201603/craft-folio-gotchi-web:latest
```

Recriar pods

```shell
kubectl delete --all pods
```

Aguardar até que os novos pods criados estejam com status `running`

```shell
kubectl get pods
```

Executar o bundler em cada um dos pods criados

```shell
kubectl get pods
kubectl exec -it <pod> npm run bundle
```

### Observações Finais

Antes de realizar pushs garanta que, além de não ter quebrado nenhuma funcionalidade, seu código está respeitando as regras do linter.

```shell
docker-compose up web (caso ainda não esteja rodando)
docker-compose exec web npm run lint
```

No futuro, o processo de deploy sera automatizado e a build irá falhar caso aconteça algum erro no linter.
