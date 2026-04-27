// seed.js
// =============================================================================
//  Seed the database with realistic test data.
//  Run with: npm run seed
//
//  Required minimum:
//    - 2 users
//    - 4 projects (split across the users)
//    - 5 tasks (with embedded subtasks and tags arrays)
//    - 5 notes (some attached to projects, some standalone)
//
//  Use the bcrypt module to hash passwords before inserting users.
//  Use ObjectId references for relationships (projectId, ownerId).
// =============================================================================

require('dotenv').config();
const bcrypt = require('bcryptjs');
const { connect } = require('./db/connection');

(async () => {
  const db = await connect();

  await db.collection('users').deleteMany({});
  await db.collection('projects').deleteMany({});
  await db.collection('tasks').deleteMany({});
  await db.collection('notes').deleteMany({});

  // USERS
  const pass1 = await bcrypt.hash('123456', 10);
  const u1 = await db.collection('users').insertOne({
    email: "user1@gmail.com",
    passwordHash: pass1,
    name: "Ahmed",
    createdAt: new Date()
  });

  const pass2 = await bcrypt.hash('123456', 10);
  const u2 = await db.collection('users').insertOne({
    email: "user2@gmail.com",
    passwordHash: pass2,
    name: "Khokhar",
    createdAt: new Date()
  });

  const id1 = u1.insertedId;
  const id2 = u2.insertedId;

  // PROJECTS
  const p1 = await db.collection('projects').insertOne({
    ownerId: id1,
    name: "Study",
    archived: false,
    createdAt: new Date()
  });

  const p2 = await db.collection('projects').insertOne({
    ownerId: id1,
    name: "Assignments",
    archived: false,
    createdAt: new Date()
  });

  const p3 = await db.collection('projects').insertOne({
    ownerId: id2,
    name: "Lab",
    archived: false,
    createdAt: new Date()
  });

  const p4 = await db.collection('projects').insertOne({
    ownerId: id2,
    name: "kuch bhi nahi (rest)",
    archived: true,
    createdAt: new Date()
  });

  // TASKS
  await db.collection('tasks').insertOne({
    ownerId: id1,
    projectId: p1.insertedId,
    title: "Read notes",
    status: "todo",
    priority: 2,
    tags: ["study"],
    subtasks: [
      { title: "Chapter 1", done: false }
    ],
    dueDate: new Date(),
    createdAt: new Date()
  });

  await db.collection('tasks').insertOne({
    ownerId: id1,
    projectId: p1.insertedId,
    title: "Practice questions",
    status: "in-progress",
    priority: 1,
    tags: ["practice"],
    subtasks: [
      { title: "Solve 5 questions", done: false }
    ],
    createdAt: new Date()
  });

  await db.collection('tasks').insertOne({
    ownerId: id1,
    projectId: p2.insertedId,
    title: "Submit assignment",
    status: "done",
    priority: 3,
    tags: ["college"],
    subtasks: [
      { title: "Upload file", done: true }
    ],
    createdAt: new Date()
  });

  await db.collection('tasks').insertOne({
    ownerId: id2,
    projectId: p3.insertedId,
    title: "Fix Errors",
    status: "todo",
    priority: 4,
    tags: ["work"],
    subtasks: [
      { title: "Fix bug", done: false }
    ],
    createdAt: new Date()
  });

  await db.collection('tasks').insertOne({
    ownerId: id2,
    projectId: p3.insertedId,
    title: "Solve Practice Mid",
    status: "in-progress",
    priority: 2,
    tags: ["office"],
    subtasks: [
      { title: "Preparation", done: false }
    ],
    createdAt: new Date()
  });

  // NOTES
  await db.collection('notes').insertOne({
    ownerId: id1,
    projectId: p1.insertedId,
    title: "Study plan",
    body: "Study daily",
    tags: ["plan"],
    createdAt: new Date()
  });

  await db.collection('notes').insertOne({
    ownerId: id1,
    title: "Reminder",
    body: "Drink water",
    tags: ["health"],
    createdAt: new Date()
  });

  await db.collection('notes').insertOne({
    ownerId: id2,
    projectId: p3.insertedId,
    title: "Client note",
    body: "Client wants changes",
    tags: ["work"],
    createdAt: new Date()
  });

  await db.collection('notes').insertOne({
    ownerId: id2,
    title: "Daily task",
    body: "Go for Gym",
    tags: ["personal"],
    createdAt: new Date()
  });

  await db.collection('notes').insertOne({
    ownerId: id2,
    projectId: p3.insertedId,
    title: "Ideas",
    body: "New features",
    tags: ["ideas"],
    createdAt: new Date()
  });
  console.log('TODO: implement seed.js');
  process.exit(0);
})();
