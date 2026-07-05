# API Documentation

**Base URL (Production):** `https://servicehive-6h25.onrender.com/api`  
**Base URL (Local):** `http://localhost:5000/api`

All protected routes require a Bearer token in the `Authorization` header:

```
Authorization: Bearer <token>
```

---

## Authentication

### POST `/auth/register`

Register a new user. All new users are assigned the `sales` role by default.

**Request Body**

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Validation Rules**
- `name` — required
- `email` — must be a valid email
- `password` — minimum 6 characters

**Success Response** `201 Created`

```json
{
  "success": true,
  "token": "<jwt_token>",
  "user": {
    "id": "664abc123...",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "sales"
  }
}
```

**Error Response** `400 Bad Request`

```json
{
  "success": false,
  "message": "User already exists"
}
```

---

### POST `/auth/login`

Login with existing credentials.

**Request Body**

```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Validation Rules**
- `email` — must be a valid email
- `password` — required

**Success Response** `200 OK`

```json
{
  "success": true,
  "token": "<jwt_token>",
  "user": {
    "id": "664abc123...",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "sales"
  }
}
```

**Error Response** `400 Bad Request`

```json
{
  "success": false,
  "message": "Invalid credentials"
}
```

---

## Leads

All lead endpoints require authentication.

---

### POST `/leads`

Create a new lead. The lead is automatically linked to the authenticated user.

**Headers**
```
Authorization: Bearer <token>
```

**Request Body**

```json
{
  "name": "Jane Smith",
  "email": "jane@example.com",
  "status": "New",
  "source": "Website"
}
```

**Validation Rules**
- `name` — required
- `email` — must be a valid email
- `status` — must be one of: `New`, `Contacted`, `Qualified`, `Lost`
- `source` — must be one of: `Website`, `Instagram`, `Referral`

**Success Response** `201 Created`

```json
{
  "success": true,
  "data": {
    "_id": "664def456...",
    "name": "Jane Smith",
    "email": "jane@example.com",
    "status": "New",
    "source": "Website",
    "createdBy": "664abc123...",
    "createdAt": "2026-05-19T10:00:00.000Z",
    "updatedAt": "2026-05-19T10:00:00.000Z"
  }
}
```

---

### GET `/leads`

Get all leads with optional filtering, search, sorting, and pagination.

**Headers**
```
Authorization: Bearer <token>
```

**Query Parameters**

| Parameter | Type   | Default  | Description |
|-----------|--------|----------|-------------|
| `search`  | string | —        | Search by name or email (case-insensitive) |
| `status`  | string | —        | Filter by status: `New`, `Contacted`, `Qualified`, `Lost` |
| `source`  | string | —        | Filter by source: `Website`, `Instagram`, `Referral` |
| `sort`    | string | `latest` | Sort order: `latest` (newest first) or `oldest` |
| `page`    | number | `1`      | Page number (10 results per page) |

**Example Request**

```
GET /leads?search=jane&status=New&sort=latest&page=1
```

**Success Response** `200 OK`

```json
{
  "success": true,
  "pagination": {
    "currentPage": 1,
    "totalPages": 3,
    "totalRecords": 25
  },
  "count": 10,
  "data": [
    {
      "_id": "664def456...",
      "name": "Jane Smith",
      "email": "jane@example.com",
      "status": "New",
      "source": "Website",
      "createdBy": {
        "_id": "664abc123...",
        "name": "John Doe",
        "email": "john@example.com"
      },
      "createdAt": "2026-05-19T10:00:00.000Z",
      "updatedAt": "2026-05-19T10:00:00.000Z"
    }
  ]
}
```

---

### GET `/leads/export/csv`

Export all leads as a CSV file.

**Headers**
```
Authorization: Bearer <token>
```

**Response**

Returns a downloadable CSV file with columns: `name`, `email`, `status`, `source`, `createdAt`.

---

### GET `/leads/:id`

Get a single lead by ID.

**Headers**
```
Authorization: Bearer <token>
```

**Success Response** `200 OK`

```json
{
  "success": true,
  "data": {
    "_id": "664def456...",
    "name": "Jane Smith",
    "email": "jane@example.com",
    "status": "New",
    "source": "Website",
    "createdBy": {
      "_id": "664abc123...",
      "name": "John Doe",
      "email": "john@example.com"
    },
    "createdAt": "2026-05-19T10:00:00.000Z",
    "updatedAt": "2026-05-19T10:00:00.000Z"
  }
}
```

**Error Response** `404 Not Found`

```json
{
  "success": false,
  "message": "Lead not found"
}
```

---

### PUT `/leads/:id`

Update a lead by ID.

**Access Control**
- `admin` — can update any lead
- `sales` — can only update leads they created

**Headers**
```
Authorization: Bearer <token>
```

**Request Body** (all fields required)

```json
{
  "name": "Jane Smith",
  "email": "jane@example.com",
  "status": "Contacted",
  "source": "Referral"
}
```

**Success Response** `200 OK`

```json
{
  "success": true,
  "data": {
    "_id": "664def456...",
    "name": "Jane Smith",
    "email": "jane@example.com",
    "status": "Contacted",
    "source": "Referral",
    "createdBy": "664abc123...",
    "createdAt": "2026-05-19T10:00:00.000Z",
    "updatedAt": "2026-05-19T10:30:00.000Z"
  }
}
```

**Error Responses**

`403 Forbidden` — not your lead and you're not an admin
```json
{
  "success": false,
  "message": "Not authorized"
}
```

`404 Not Found`
```json
{
  "success": false,
  "message": "Lead not found"
}
```

---

### DELETE `/leads/:id`

Delete a lead by ID.

**Access Control**
- `admin` — can delete any lead
- `sales` — can only delete leads they created

**Headers**
```
Authorization: Bearer <token>
```

**Success Response** `200 OK`

```json
{
  "success": true,
  "message": "Lead deleted"
}
```

**Error Responses**

`403 Forbidden`
```json
{
  "success": false,
  "message": "Not authorized"
}
```

`404 Not Found`
```json
{
  "success": false,
  "message": "Lead not found"
}
```

---

## Error Reference

| Status Code | Meaning |
|-------------|---------|
| 400 | Bad request — validation failed or user already exists |
| 401 | Unauthorized — missing or invalid token |
| 403 | Forbidden — authenticated but not permitted |
| 404 | Resource not found |
| 500 | Internal server error |

**Validation Error Response** `400 Bad Request`

```json
{
  "success": false,
  "errors": [
    {
      "field": "email",
      "message": "Valid email required"
    }
  ]
}
```

---

## Data Models

### User

| Field       | Type     | Notes |
|-------------|----------|-------|
| `_id`       | ObjectId | Auto-generated |
| `name`      | String   | Required |
| `email`     | String   | Required, unique, lowercase |
| `password`  | String   | Hashed with bcrypt (salt rounds: 10) |
| `role`      | String   | `admin` or `sales` — defaults to `sales` |
| `createdAt` | Date     | Auto-generated |
| `updatedAt` | Date     | Auto-generated |

### Lead

| Field       | Type     | Notes |
|-------------|----------|-------|
| `_id`       | ObjectId | Auto-generated |
| `name`      | String   | Required |
| `email`     | String   | Required, lowercase |
| `status`    | String   | `New`, `Contacted`, `Qualified`, `Lost` — defaults to `New` |
| `source`    | String   | `Website`, `Instagram`, `Referral` — required |
| `createdBy` | ObjectId | Reference to User |
| `createdAt` | Date     | Auto-generated |
| `updatedAt` | Date     | Auto-generated |
