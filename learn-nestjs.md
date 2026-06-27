# Learn NestJS — Academic Notes

> A simple, structured note file for the NestJS chapters covered so far.  
> This file is intentionally kept as a single learning document so new chapters can be added later.

---

## Visual Overview: How a NestJS REST Request Works

```svg
<svg width="1000" height="520" viewBox="0 0 1000 520" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0" x2="1" y1="0" y2="1">
      <stop offset="0%" stop-color="#f8fbff"/>
      <stop offset="100%" stop-color="#eef3ff"/>
    </linearGradient>
    <linearGradient id="nest" x1="0" x2="1">
      <stop offset="0%" stop-color="#e0234e"/>
      <stop offset="100%" stop-color="#ff6b8a"/>
    </linearGradient>
    <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="8" stdDeviation="8" flood-color="#1f2937" flood-opacity="0.16"/>
    </filter>
    <marker id="arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto" markerUnits="strokeWidth">
      <path d="M0,0 L0,6 L9,3 z" fill="#334155" />
    </marker>
  </defs>

  <rect width="1000" height="520" rx="28" fill="url(#bg)"/>
  <text x="500" y="48" text-anchor="middle" font-size="28" font-family="Arial" font-weight="700" fill="#0f172a">NestJS Request Lifecycle for REST APIs</text>

  <rect x="50" y="115" width="170" height="100" rx="18" fill="#ffffff" filter="url(#shadow)"/>
  <text x="135" y="150" text-anchor="middle" font-size="20" font-family="Arial" font-weight="700" fill="#0f172a">Client</text>
  <text x="135" y="180" text-anchor="middle" font-size="14" font-family="Arial" fill="#475569">Browser / Thunder Client</text>
  <text x="135" y="200" text-anchor="middle" font-size="14" font-family="Arial" fill="#475569">GET, POST, PATCH...</text>

  <rect x="290" y="105" width="190" height="120" rx="18" fill="#ffffff" filter="url(#shadow)"/>
  <text x="385" y="140" text-anchor="middle" font-size="20" font-family="Arial" font-weight="700" fill="#0f172a">Controller</text>
  <text x="385" y="170" text-anchor="middle" font-size="14" font-family="Arial" fill="#475569">@Controller('users')</text>
  <text x="385" y="192" text-anchor="middle" font-size="14" font-family="Arial" fill="#475569">@Get(), @Post()</text>

  <rect x="540" y="105" width="190" height="120" rx="18" fill="#ffffff" filter="url(#shadow)"/>
  <text x="635" y="140" text-anchor="middle" font-size="20" font-family="Arial" font-weight="700" fill="#0f172a">Pipes + DTOs</text>
  <text x="635" y="170" text-anchor="middle" font-size="14" font-family="Arial" fill="#475569">Validate input</text>
  <text x="635" y="192" text-anchor="middle" font-size="14" font-family="Arial" fill="#475569">Transform data</text>

  <rect x="790" y="105" width="160" height="120" rx="18" fill="#ffffff" filter="url(#shadow)"/>
  <text x="870" y="140" text-anchor="middle" font-size="20" font-family="Arial" font-weight="700" fill="#0f172a">Provider</text>
  <text x="870" y="170" text-anchor="middle" font-size="14" font-family="Arial" fill="#475569">Service logic</text>
  <text x="870" y="192" text-anchor="middle" font-size="14" font-family="Arial" fill="#475569">Database / business</text>

  <rect x="320" y="325" width="360" height="120" rx="22" fill="url(#nest)" filter="url(#shadow)"/>
  <text x="500" y="365" text-anchor="middle" font-size="24" font-family="Arial" font-weight="700" fill="#ffffff">Module</text>
  <text x="500" y="395" text-anchor="middle" font-size="15" font-family="Arial" fill="#ffffff">Organizes controllers and providers</text>
  <text x="500" y="420" text-anchor="middle" font-size="15" font-family="Arial" fill="#ffffff">Example: UsersModule imported into AppModule</text>

  <line x1="220" y1="165" x2="290" y2="165" stroke="#334155" stroke-width="3" marker-end="url(#arrow)"/>
  <line x1="480" y1="165" x2="540" y2="165" stroke="#334155" stroke-width="3" marker-end="url(#arrow)"/>
  <line x1="730" y1="165" x2="790" y2="165" stroke="#334155" stroke-width="3" marker-end="url(#arrow)"/>
  <line x1="870" y1="225" x2="870" y2="270" stroke="#334155" stroke-width="3"/>
  <line x1="870" y1="270" x2="135" y2="270" stroke="#334155" stroke-width="3"/>
  <line x1="135" y1="270" x2="135" y2="215" stroke="#334155" stroke-width="3" marker-end="url(#arrow)"/>

  <line x1="385" y1="225" x2="435" y2="325" stroke="#64748b" stroke-width="2" stroke-dasharray="8 6"/>
  <line x1="635" y1="225" x2="565" y2="325" stroke="#64748b" stroke-width="2" stroke-dasharray="8 6"/>
  <line x1="870" y1="225" x2="650" y2="325" stroke="#64748b" stroke-width="2" stroke-dasharray="8 6"/>

  <text x="500" y="492" text-anchor="middle" font-size="14" font-family="Arial" fill="#475569">Request data flows through route handlers, pipes, DTO validation, and service providers before a response is returned.</text>
</svg>
```

---

# 1. Introduction to NestJS

## 1.1 What is NestJS?

**NestJS** is a progressive Node.js framework for building efficient, reliable, and scalable server-side applications.

It is built on top of Node.js HTTP platforms such as **Express** by default, and it also supports Fastify.

NestJS uses TypeScript heavily and follows a structured architecture inspired by Angular.

## 1.2 Why use NestJS?

NestJS helps developers build backend applications using a clean and organized structure.

Important benefits:

- Uses **TypeScript** by default
- Encourages modular architecture
- Supports REST APIs, GraphQL, WebSockets, microservices, and more
- Provides dependency injection
- Has built-in support for pipes, guards, interceptors, filters, and validation
- Makes large backend projects easier to maintain

## 1.3 Basic NestJS Application Structure

A simple NestJS project usually contains:

```text
src/
  app.module.ts
  app.controller.ts
  app.service.ts
  main.ts
```

### `main.ts`

The entry point of the application.

```ts
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
```

### `AppModule`

The root module of the application.

```ts
@Module({
  imports: [],
  controllers: [],
  providers: [],
})
export class AppModule {}
```

## 1.4 NestJS REST Idea

In REST APIs, clients send HTTP requests to server endpoints.

Example:

```http
GET http://localhost:3000/users
```

NestJS receives the request through a controller method and returns a response.

---

# 2. Understanding Modules

## 2.1 What is a Module?

A **module** is a class decorated with `@Module()`.

Modules organize related parts of the application.

Example:

```ts
import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';

@Module({
  controllers: [UsersController],
})
export class UsersModule {}
```

A module may contain:

- `imports`
- `controllers`
- `providers`
- `exports`

## 2.2 Why modules are important

Modules help divide the application into feature areas.

Example:

```text
UsersModule
ProductsModule
AuthModule
OrdersModule
```

This improves maintainability and makes the project easier to scale.

## 2.3 Importing Feature Modules

A feature module must be imported into another module, commonly `AppModule`, to become part of the application.

```ts
@Module({
  imports: [UsersModule],
})
export class AppModule {}
```

---

## 2.4 Controllers

A **controller** handles incoming requests and returns responses.

```ts
import { Controller, Get } from '@nestjs/common';

@Controller('users')
export class UsersController {
  @Get()
  getUsers() {
    return 'You sent a GET request to users endpoint';
  }
}
```

Here:

```ts
@Controller('users')
```

creates the base route:

```text
/users
```

And:

```ts
@Get()
```

handles:

```http
GET /users
```

---

## 2.5 Routing Decorators

Routing decorators define which HTTP method a controller method handles.

Common routing decorators:

| Decorator | HTTP Method | Purpose |
|---|---|---|
| `@Get()` | GET | Read data |
| `@Post()` | POST | Create data |
| `@Put()` | PUT | Replace data |
| `@Patch()` | PATCH | Partially update data |
| `@Delete()` | DELETE | Delete data |

Example:

```ts
@Controller('users')
export class UsersController {
  @Get()
  findAll() {
    return 'Get all users';
  }

  @Post()
  create() {
    return 'Create user';
  }
}
```

---

## 2.6 Route Params

Route params are values inside the URL path.

Example request:

```http
GET /users/45
```

Controller:

```ts
@Get(':id')
getUser(@Param('id') id: string) {
  return `User id is ${id}`;
}
```

Here `45` is received as `id`.

Important note: URL params arrive as strings by default.

---

## 2.7 Query Parameters

Query parameters are values after `?` in the URL.

Example:

```http
GET /users?limit=10&offset=20
```

Controller:

```ts
@Get()
getUsers(
  @Query('limit') limit: string,
  @Query('offset') offset: string,
) {
  return { limit, offset };
}
```

Query parameters are useful for:

- Pagination
- Filtering
- Searching
- Sorting

Example:

```text
/users?search=pema&page=1&limit=10
```

---

## 2.8 Request Body

The request body contains data sent by the client, commonly in POST, PUT, or PATCH requests.

Example request:

```http
POST /users
Content-Type: application/json

{
  "firstName": "Pema",
  "lastName": "Wangchuk",
  "email": "pema@example.com",
  "password": "Password123"
}
```

Controller:

```ts
@Post()
createUser(@Body() body: any) {
  return body;
}
```

However, using `any` is not recommended for real applications. DTOs should be used instead.

---

## 2.9 Providers

A **provider** is usually a service class that contains business logic.

Controllers should not contain too much business logic. Instead, they call providers.

Example service:

```ts
import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  findAll() {
    return ['Pema', 'Sonam'];
  }
}
```

Register provider in module:

```ts
@Module({
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
```

Use it in controller:

```ts
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll() {
    return this.usersService.findAll();
  }
}
```

This is called **dependency injection**.

---

# 3. Validations and Pipes

## 3.1 Why validation is needed

Validation protects the application from invalid data.

Without validation, a client may send incorrect data such as:

```json
{
  "email": "not-an-email",
  "password": "123"
}
```

Validation helps ensure the data has the expected format before it reaches business logic.

## 3.2 Why transformation is needed

HTTP route params and query params usually arrive as strings.

Example:

```http
GET /users/45?limit=10
```

Even though `45` and `10` look like numbers, they arrive as strings:

```ts
typeof id === 'string'
typeof limit === 'string'
```

Transformation converts them to the correct type.

---

## 3.3 What is a Pipe?

A **pipe** is a NestJS feature used for:

1. Validation
2. Transformation

Pipes run before the controller method is executed.

```text
Request → Pipe → Controller Method
```

---

## 3.4 Validating Params with Pipes

`ParseIntPipe` validates and transforms a value into a number.

Example:

```ts
@Get(':id')
getUser(@Param('id', ParseIntPipe) id: number) {
  return id;
}
```

Request:

```http
GET /users/45
```

`id` becomes a number.

But this request fails:

```http
GET /users/abc
```

Because `abc` cannot be converted into a number.

NestJS returns:

```json
{
  "message": "Validation failed (numeric string is expected)",
  "error": "Bad Request",
  "statusCode": 400
}
```

This is expected behavior. It means the pipe is working.

---

## 3.5 Validating Query Parameters

Example request:

```http
GET /users/45?limit=10&offset=20
```

Controller:

```ts
@Get(':id')
getUser(
  @Param('id', ParseIntPipe) id: number,
  @Query('limit', ParseIntPipe) limit: number,
  @Query('offset', ParseIntPipe) offset: number,
) {
  return { id, limit, offset };
}
```

Here:

- `id` is converted to number
- `limit` is converted to number
- `offset` is converted to number

If the query is missing or non-numeric, `ParseIntPipe` returns a `400 Bad Request`.

Example invalid request:

```http
GET /users/45?limit=abc&offset=20
```

---

# 4. DTOs, Global Pipes, and Safe Requests

## 4.1 What is a DTO?

DTO means **Data Transfer Object**.

A DTO defines the expected shape of data transferred between client and server.

Example:

```ts
export class CreateUserDto {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}
```

In NestJS, DTOs are commonly used with validation decorators.

---

## 4.2 DTO with Validation Decorators

Install packages if needed:

```bash
npm install class-validator class-transformer
```

Example DTO:

```ts
import { IsEmail, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  firstName!: string;

  @IsString()
  lastName!: string;

  @IsEmail()
  email!: string;

  @IsString()
  @MinLength(6)
  password!: string;
}
```

The `!` tells TypeScript that NestJS will assign the value later from the request body.

---

## 4.3 Connecting DTO to Route Method

Instead of using `any`, use the DTO as the type of `@Body()`.

```ts
@Post()
createUser(@Body() createUserDto: CreateUserDto) {
  return createUserDto;
}
```

This improves:

- Type safety
- Code readability
- Validation support
- API structure

---

## 4.4 Global Pipes

To make DTO validation work globally, add `ValidationPipe` in `main.ts`.

```ts
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  await app.listen(3000);
}
bootstrap();
```

---

## 4.5 Avoiding Malicious Requests

A client may send extra unwanted properties.

Example malicious or unwanted request:

```json
{
  "firstName": "Pema",
  "lastName": "Wangchuk",
  "email": "pema@example.com",
  "password": "Password123",
  "isAdmin": true
}
```

The user should not be allowed to send `isAdmin` if the API does not expect it.

With this global pipe configuration:

```ts
new ValidationPipe({
  whitelist: true,
  forbidNonWhitelisted: true,
  transform: true,
})
```

Behavior:

| Option | Meaning |
|---|---|
| `whitelist: true` | Removes properties not defined in DTO |
| `forbidNonWhitelisted: true` | Throws an error if unknown properties are sent |
| `transform: true` | Converts payloads to DTO instances and can transform primitive types |

This helps protect the API from unwanted input.

---

## 4.6 Using DTOs with Params

DTOs can also be used for route parameters.

Example param DTO:

```ts
import { IsInt } from 'class-validator';
import { Type } from 'class-transformer';

export class GetUserParamDto {
  @Type(() => Number)
  @IsInt()
  id!: number;
}
```

Controller:

```ts
@Get(':id')
getUser(@Param() params: GetUserParamDto) {
  return params.id;
}
```

Because URL params arrive as strings, `@Type(() => Number)` helps convert `id` into a number before validation.

---

# 5. Using Mapped Types to Avoid Code Duplication

## 5.1 Problem: Repeating DTOs

Suppose we have a DTO for creating a user:

```ts
export class CreateUserDto {
  firstName!: string;
  lastName!: string;
  email!: string;
  password!: string;
}
```

For updating a user, we may need similar fields, but optional.

Without mapped types, we might write another DTO manually:

```ts
export class UpdateUserDto {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
}
```

This duplicates code.

---

## 5.2 What are Mapped Types?

Mapped types help create new DTO types from existing DTOs.

Common mapped type helpers:

| Helper | Purpose |
|---|---|
| `PartialType()` | Makes all properties optional |
| `PickType()` | Selects only specific properties |
| `OmitType()` | Removes specific properties |
| `IntersectionType()` | Combines multiple DTOs |

Install package if needed:

```bash
npm install @nestjs/mapped-types
```

---

## 5.3 PartialType Example

```ts
import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {}
```

This means `UpdateUserDto` has the same properties as `CreateUserDto`, but all are optional.

Useful for PATCH requests:

```ts
@Patch(':id')
updateUser(
  @Param('id', ParseIntPipe) id: number,
  @Body() updateUserDto: UpdateUserDto,
) {
  return { id, updateUserDto };
}
```

Request:

```http
PATCH /users/45
Content-Type: application/json

{
  "firstName": "Updated Name"
}
```

Only one field is required because PATCH usually updates partial data.

---

## 5.4 PickType Example

Use `PickType()` when you need only selected fields.

```ts
import { PickType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

export class LoginUserDto extends PickType(CreateUserDto, [
  'email',
  'password',
] as const) {}
```

This creates a DTO with only:

- `email`
- `password`

Useful for login requests.

---

## 5.5 OmitType Example

Use `OmitType()` when you want to remove fields.

```ts
import { OmitType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

export class PublicUserDto extends OmitType(CreateUserDto, [
  'password',
] as const) {}
```

This creates a DTO without `password`.

---

# Quick Practical Examples

## GET with Params and Query

```http
GET http://localhost:3000/users/45?limit=10&offset=20
Accept: application/json
```

```ts
@Get(':id')
getUser(
  @Param('id', ParseIntPipe) id: number,
  @Query('limit', ParseIntPipe) limit: number,
  @Query('offset', ParseIntPipe) offset: number,
) {
  return { id, limit, offset };
}
```

## POST with DTO

```http
POST http://localhost:3000/users
Content-Type: application/json

{
  "firstName": "Pema",
  "lastName": "Wangchuk",
  "email": "pema.wangchuk@example.com",
  "password": "Password123"
}
```

```ts
@Post()
createUser(@Body() createUserDto: CreateUserDto) {
  return createUserDto;
}
```

---

# Common Beginner Errors and Meanings

## Error: numeric string is expected

Example:

```json
{
  "message": "Validation failed (numeric string is expected)",
  "error": "Bad Request",
  "statusCode": 400
}
```

Meaning: `ParseIntPipe` expected a number-like string but received an invalid value or missing value.

Example cause:

```ts
@Query('page', ParseIntPipe) page: number
```

But request sends:

```http
?limit=10&offset=20
```

There is no `page`, so validation fails.

## Error: property has no initializer

Example:

```text
Property 'firstName' has no initializer and is not definitely assigned in the constructor.
```

Fix in DTO:

```ts
firstName!: string;
```

This tells TypeScript the property will be assigned later by NestJS from the request body.

---

# Chapters To Be Added Later

The following sections are reserved for future learning.

## 6. Services and Dependency Injection in Depth

_To be added later._

## 7. Exception Filters

_To be added later._

## 8. Guards and Authentication

_To be added later._

## 9. Interceptors

_To be added later._

## 10. Middleware

_To be added later._

## 11. Database Integration

_To be added later._

## 12. TypeORM / Prisma

_To be added later._

## 13. Authentication with JWT

_To be added later._

## 14. File Uploads

_To be added later._

## 15. Testing in NestJS

_To be added later._

---

# Final Summary

NestJS provides a structured way to build backend applications. So far, the most important concepts are modules, controllers, routing decorators, params, query parameters, request bodies, providers, pipes, DTOs, global validation, and mapped types. These features help build REST APIs that are organized, safe, scalable, and easy to maintain.
