# Doo Graphics

Developed a RESTful API for a simple note-taking application using Node.js. The API allows users to create, read, update, and delete notes.

Implemented using: `Typescript, Express.js, MongoDB, Mongoose.js`

## Getting Started

Run the following commands

- `npm install` to install all the dependencies
- `npx tsc` to compile typescript files
- Use `node dist/index.js` to run the project

or

Just run `npm start` which compiles and runs the project

## Testing

After running the project, you can use `npm run test` to run the tests

## API Endpoints

- GET /notes - Retrieve all notes
- POST /notes - Create a new note
- GET /notes/:id - Retrieve a note by its ID
- PUT /notes/:id - Update a note by its ID
- DELETE /notes/:id - Delete a note by its ID
