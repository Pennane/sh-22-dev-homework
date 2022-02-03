import { Database } from 'sqlite3';

export const createTables = (db: Database) => {
  const sql = `
    CREATE TABLE IF NOT EXISTS character (
      id INTEGER PRIMARY KEY,
      name TEXT,
      description TEXT,
      age INTEGER,
      happiness INTEGER DEFAULT 5,
      hunger INTEGER DEFAULT 5
    )
  `;
  return new Promise((resolve, reject) => {
    return db.run(sql, (result: unknown, err: any) => {
      if (err) {
        reject(err);
      }
      resolve(result);
    });
  });
};

export const seedDatabase = (db: Database) => {
  const porcu = {
    id: 1,
    name: 'Porcu',
    age: 1,
    description: 'Wild beast',
  };

  return new Promise((resolve, reject) =>
    db.run(
      `INSERT INTO character (id, name, age, description) VALUES (?, ?, ?, ?)`,
      Object.values(porcu),
      (result: unknown, err: any) => {
        if (err) {
          reject(err);
        }
        resolve(result);
      },
    ),
  );
};
