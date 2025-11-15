# Penugasan Open Recruitment BackEnd OmahTI 2025

**Oleh**: Aliya Khairun Nisa (KOMA 24)
**Deploy URL**: `Coming soon...`

## Tech Stack

- **Framework:** NestJS
- **API:** GraphQL (Apollo Server)
- **Database:** PostgreSQL (Supabase)
- **ORM:** TypeORM
- **Authentication:** JWT
- **Security:** Bcrypt password hashing, Validation Pipes
- **Language:** TypeScript

## Features

- **JWT Authentication**: Secure token-based authentication with expiration
- **Password Hashing**: Bcrypt with salt rounds = 10
- **SQL Injection Protection**: TypeORM with parameterized queries
- **Input Validation**: class-validator decorators with global ValidationPipe 

## Installation 

### Prerequisites
- Node.js (v18+)
- npm atau yarn
- PostgreSQL database (atau gunakan Supabase)

### Setup
```bash
git clone https://github.com/alykhns/OTIBackend25.git
cd OTIBackend25
npm install
```

```env
DATABASE_URL=postgresql://postgres:Akai2186@db.havajtjzntqpoorbthtr.supabase.co:5432/postgres
```

```bash
npm run start:dev
```

Server akan running di `http://localhost:3000/graphql`

## API Documentation & Testing (Postman)
```
http://localhost:3000/graphql
```
Semua request menggunakan **POST** method dengan **GraphQL** body type.


## Test Cases

### Signup

**Query:**
```graphql
mutation {
  signup(createUserInput: {
    username: "Aya"
    password: "password123"
  }) {
    id
    username
  }
}
```

**Expected Response:**
```json
{
    "data": {
        "signup": {
            "id": 6,
            "username": "Auryn"
        }
    }
}
```

---

### Login

**Query:**
```graphql
mutation login ($input: LoginUserInput!) {
    login(loginUserInput: $input){
        user {
            username
            id
        }
        accessToken 
    }
}
```

**Variables**:
```graphql
{
    "input": {
        "username": "Auryn",
        "password": "password123"
    }
}
```

**Expected Response:**
```json
{
    "data": {
        "login": {
            "user": {
                "username": "Auryn",
                "id": 5
            },
            "accessToken": "eyJhbGciOiJIU..."
        }
    }
}
```

**Note:** Copy accessToken untuk digunakan pada request yang membutuhkan authentication.

---

### Get All Users 

**Headers:**
```
Authorization: Bearer <paste_token>
```

**Query:**
```graphql
query {
  users {
    id
    username
  }
}
```

**Expected Response:**
```json
{
    "data": {
        "users": [
            {
                "id": 1,
                "username": "Aliya"
            },
            {
                "id": 2,
                "username": "Rafathin"
            },
            {
                "id": 4,
                "username": "Nadhifa"
            },
            {
                "id": 5,
                "username": "Auryn"
            }
        ]
    }
}
```

---

### Get My Profile

**Headers:**
```
Authorization: Bearer <paste_token_dari_login>
```

**Query:**
```graphql
query {
  getMyProfile {
    id
    username
  }
}
```

**Expected Response:**
```json
{
    "data": {
        "getMyProfile": {
            "id": 5,
            "username": "Auryn"
        }
    }
}
```

---

### Get User by Username (Public)

**Query:**
```graphql
query {
  user(username: "Nadhifa") {
    id
    username
  }
}
```

**Expected Response:**
```json
{
    "data": {
        "user": {
            "id": 4,
            "username": "Nadhifa"
        }
    }
}
```

## Error Handling Tests

### Login Wrong Password

**Query:**
```graphql
mutation {
  login(loginUserInput: {
    username: "Nadhifa"
    password: "wrongpassword"
  }) {
    accessToken
  }
}
```

**Expected Response:**
```json
{
  "errors": [
    {
      "message": "Invalid credentials"
    }
  ]
}
```

---

### Login User Not Registered

**Query:**
```graphql
mutation {
  login(loginUserInput: {
    username: "useryangtidakada"
    password: "password123"
  }) {
    accessToken
  }
}
```

**Expected Response:**
```json
{
  "errors": [
    {
      "message": "Invalid credentials"
    }
  ]
}
```

---

### Signup Same Username

**Query:**
```graphql
mutation {
  signup(createUserInput: {
    username: "Nadhifa"
    password: "newpassword"
  }) {
    id
  }
}
```

**Expected Response:**
```json
{
  "errors": [
    {
      "message": "User already exists"
    }
  ]
}
```

---

### Access No Token

**Query (Without Authorization Header):**
```graphql
query {
  users {
    id
    username
  }
}
```

**Expected Response:**
```json
{
  "errors": [
    {
      "message": "Unauthorized",
      "extensions": {
        "code": "UNAUTHENTICATED"
      }
    }
  ]
}
```

---

### Access Invalid Token

**Headers:**
```
Authorization: Bearer invalid_token_123abc
```

**Request:**
```graphql
query {
  users {
    id
    username
  }
}
```

**Expected Response:**
```json
{
  "errors": [
    {
      "message": "Unauthorized",
      "extensions": {
        "code": "UNAUTHENTICATED"
      }
    }
  ]
}
```

## Validation Tests

### Signup with Short Username

**Request:**
```graphql
mutation {
  signup(createUserInput: {
    username: "ab"
    password: "password123"
  }) {
    id
  }
}
```

**Expected Response:**
```json
{
  "errors": [
    {
      "message": "Bad Request Exception",
      "extensions": {
        "code": "BAD_REQUEST",
        "response": {
          "message": [
            "Username must be at least 3 characters"
          ]
        }
      }
    }
  ]
}
```

---

### Signup with Short Password

**Request:**
```graphql
mutation {
  signup(createUserInput: {
    username: "testuser"
    password: "123"
  }) {
    id
  }
}
```

**Expected Response:**
```json
{
  "errors": [
    {
      "message": "Bad Request Exception",
      "extensions": {
        "code": "BAD_REQUEST",
        "response": {
          "message": [
            "Password must be at least 6 characters"
          ]
        }
      }
    }
  ]
}
```