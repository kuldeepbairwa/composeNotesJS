# Node.js Note Taking App for API Testing

## Project Summary

The Node.js Note Taking App is a robust and secure application designed to simplify note management. Developed using the Node.js/Express framework and integrated with MongoDB using Mongoose, the app supports basic CRUD operations, allowing users to create, read, update, and delete notes effortlessly.

## Key Features

- **CRUD Operations**: The app facilitates the creation, modification, and deletion of notes, providing a seamless user experience for managing personal or professional information.

- **MongoDB with Mongoose**: Leveraging the power of MongoDB and Mongoose, the application ensures efficient data storage, retrieval, and management, offering a scalable and flexible solution for users.

- **JWT Authentication**: To enhance security, the app employs JSON Web Token (JWT) authentication for securing the routes. This ensures that only authorized users can access and manipulate their notes.

- **User Registration with Bcrypt**: The app incorporates Bcrypt for password hashing during user registration, enhancing the overall security of user accounts. This safeguards sensitive information and protects user privacy.

## Technical Stack

- **Backend Framework**: Node.js/Express
- **Database**: MongoDB with Mongoose
- **Authentication**: JSON Web Token (JWT)
- **Password Security**: Bcrypt

## API Endpoints


```sh
BASE_URL:http://localhost:3001/api
```

### `GET` `/notes`

Returns all notes.

**Parameters**: None

**Response**: An array of note objects.

### `POST` ```/notes```

Creates a new note.

**Parameters**:
- `title`: The title of the note.
- `content`: The content of the note.

**Response**: The created note object.

### `PUT` `/notes/:id`

Updates a note.

**Parameters**:
- `id`: The ID of the note to update.
- `title`: The new title of the note.
- `content`: The new content of the note.

**Response**: The updated note object.

### `DELETE` `/notes/:id`

Deletes a note.

**Parameters**:
- `id`: The ID of the note to delete.

**Response**: A message indicating the result of the operation.
