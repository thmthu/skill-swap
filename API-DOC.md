# API Documentation

## Table of Contents
- [Overview](#overview)
- [Authentication](#authentication)
- [Base URL](#base-url)
- [Endpoints](#endpoints)
  - [Authentication](#authentication-1)
  - [Home: User List View](#home-user-list-view)
  - [Connect & Accept & Reject](#connect--accept--reject)
  - [Profile page](#profile-page)
## Overview
This API doc provides endpoints to interact with skill-swap FE and BE.

## Authentication
To access the API, you need an API key. You can obtain an API key by registering on our platform.

- **API Key**: Pass your API key in the `Authorization` header as `Bearer YOUR_API_KEY`.

Example:
```bash
Authorization: Bearer YOUR_API_KEY
```
## Base URL
- On development environment
```bash
https://localhost:8080/api/
```
- On production environment:
```bash
```
## Endpoints
### Authentication
```bash
/auth
```

| Method | Path | Request | Response |
| --- | --- | --- | --- |
| POST | `/register` | `username`: String - User's username (Required)<br>`email`: String - User's email (Required)<br>`password`: String - User's password (Required)<br>`firstName`: String - User's first name (Required)<br>`lastName`: String - User's last name (Required) | `userId`: String - Unique user identifier (Required)<br>`username`: String - User's username (Required)<br>`email`: String - User's email (Required)<br>`message`: String - Success message (Required) |
| POST | `/login` | `username`: String - Username (Required)<br>`password`: String - User's password (Required) | `token`: String - JWT token for authentication (Required)<br>`userId`: String - Unique user identifier (Required)<br>`username`: String - User's username (Required) |
| GET | `/user` | None | `userId`: String - Unique user identifier (Required)<br>`username`: String - User's username (Required)<br>`email`: String - User's email (Required)<br>`firstName`: String - User's first name (Required)<br>`lastName`: String - User's last name (Required) |

### Home: User List View
```bash
/users-list
```

| Method | Path | Request | Response |
| --- | --- | --- | --- |
| POST | `/` | Query Parameters:<br>`name`: String - Filter users by name (Optional)<br>`skills`: String - Filter users by skills (Optional)<br> | `userId`: String - Unique user identifier (Required)<br>`username`: String - User's username (Required)<br>`learn`: List - Fields user wants to learn<br>`teach`: List - Fields user can teach<br>`message`: String - Success message (Required) |

### Connect & Accept & Reject 
```bash
/connect
```
| Method | Path | Request | Response |
| --- | --- | --- | --- |
| POST | `/` | `userId`: String - User's username (Required) | `idConnect`: String - id of the connection created<br>`message`: String - Success message (Required) |
| POST | `/accept` | `idConnect`: String - Connection request ID (Required)<br> | `message`: String - Success message (Required) |
| POST | `/reject` | `idConnect`: String - Connection request ID (Required)<br> | `message`: String - Success message (Required) |

### Profile page
```bash
/user
```
| Method | Path | Request | Response |
| --- | --- | --- | --- |
| POST | `/skills` | `skillName`: String - Skill|`message`: String - Success message (Required) |
| DELETE | `/skills` | `skillName`: String - Skill | `message`: String - Success message (Required) |
| POST | `/learn` | `learnName`: String - Learn|`message`: String - Success message (Required) |
| DELETE | `/learn` | `learnName`: String - Learn | `message`: String - Success message (Required) |
