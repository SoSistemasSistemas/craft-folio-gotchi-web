# craft-folio-gotchi-web
Microserviço responsável por servir o conteúdo Web do projeto CraftFolioGotchi. Esse projeto faz parte do trabalho final da disciplina Programação WEB do curso de Engenharia de Computação/CEFET-MG.

## Requisítos de ambiente
- docker
- docker-compose
- gcloud (Para realizar deploys. Entre em contato com lcnascimento para liberar acesso)
- node (opcional)
- npm (opcional)

## Como rodar aplicação local

```shell
docker-compose up
```

### Caso seja incluído um novo pacote via NPM, a imagem dos containers devem ser atualizadas

```shell
docker-compose down
docker-compose build
docker-compose up
```

## Como fazer deploy em produção

Gerar nova imagem local, incrementando valor da tag:

```shell
docker build -t gcr.io/so-sistemas-sistemas-201603/craft-folio-gotchi-web:0.1.X
```

Depois subir a nova imagem criada para o repositório do Google na cloud

```shell
gcloud docker -- push gcr.io/so-sistemas-sistemas-201603/craft-folio-gotchi-web:0.1.X
```

Atualizar o atributo referente a tag da imagem no arquivo `k8s/web-deployment.yml`

Aplicar as alterações no cluster de producão

```shell
kubectl apply -f k8s/web-deployment.yml
```

Aguardar até que os novos pods criados estejam com status `running`

```shell
kubectl get pods
```