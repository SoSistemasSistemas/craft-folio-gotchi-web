# craft-folio-gotchi-web

Microserviço responsável por servir o conteúdo Web do projeto CraftFolioGotchi. Esse projeto faz parte do [trabalho final da disciplina Programação WEB](https://github.com/fegemo/cefet-web/tree/master/assignments/project-craftfoliogotchi) do curso de Engenharia de Computação/CEFET-MG.

## Requisitos de ambiente

- npm
- node
- docker (opcional)
- docker-compose (opcional)
- docker-machine (caso seu computador não suporte virtualização)
- gcloud (opcional, para realizar deploys. Entre em contato com lcnascimento para liberar acesso)

## Como rodar aplicação local

Com docker
```shell
docker-compose up
```

Com docker-machine
```shell

docker-machine create default
docker-machine start default
eval $(docker-machine env default)
docker-compose up
```

Sem docker

```shell
npm install
npm run bundle
API_PORT=8000 node src/app.js
```

### Caso seja incluído um novo pacote via NPM, a imagem dos containers deve ser atualizada

```shell
docker-compose down
docker-compose build
docker-compose up
```

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
