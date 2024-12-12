# Lista de Tarefas (Todo App)

Este projeto é uma aplicação de lista de tarefas utilizando Firebase Firestore para armazenamento.

## Requisitos
- **Navegador moderno** com suporte a JavaScript ES6+.
- **Conta no Firebase** para configuração do Firestore.

## Configuração

### Credenciais do Firebase
No arquivo `todo.js`, configure as credenciais no objeto `firebaseConfig`. Exemplo:

```javascript
// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCrZgHlPVX59zM68ENmAyXogc3JmoTU5rE",
  authDomain: "tentando-eed5d.firebaseapp.com",
  projectId: "tentando-eed5d",
  storageBucket: "tentando-eed5d.appspot.com",
  messagingSenderId: "103578231381",
  appId: "1:103578231381:web:485a8e94f53e8087e92adc",
  measurementId: "G-V3BFLM3V3X",
};
```

### Firestore
- Crie uma coleção chamada `todo`.
- Adicione campos: `text` (String), `priority` (String), e `completed` (Boolean).

## Execução

1. Certifique-se de que as credenciais no arquivo `todo.js` estão configuradas corretamente.
2. Abra o arquivo `todo.html` no navegador.

## Tecnologias
- HTML, CSS, JavaScript.
- Firebase Firestore.

---
Desenvolvido por Matheus Pedro Carvalho.
