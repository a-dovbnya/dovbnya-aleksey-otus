## ДЗ GraphQL Server

Для схемы сделан сервер на express. Проверить запросы / мутации можно запустив сервер командой nodemon index.mjs
по адресу http://localhost:5000/graphql

## Примеры запросов / мутаций
### Выбор всех сущностей
```
{
  getAllUsers {
   id,
    username
  }
  getAllProducts {
    id,
    color,
    productName
  },
  getAllBrands {
    id,
    name
  }
}
```

### Выбор конкретных сущностей по id
```
{
  getUser(id: 1) {
    id,
    username
  }
  getProduct(id: 1) {
    id,
    productName
  }
  getBrand(id: 1) {
    id,
    name
  }
}
```

### Создать пользователя
```
mutation {
	createUser(input: {
		username: "Sergey"
		age: 30
		email: "serg@test.test"
	}) {
		id, username, email
	}
}
```

### Создать Товар

```
mutation {
	createProduct(input: {
		productName: "Смартфон",
    color: "yellow"
    
	}) {
		id, productName
	}
}
```

### Создать производителя
```
mutation {
	createBrand(input: {
		name: "Компания"
    
	}) {
		id, name
	}
}
```
