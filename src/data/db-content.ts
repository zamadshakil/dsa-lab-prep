export const ddlContent = [
  {
    title: "CREATE DATABASE & USE",
    description: "Commands to create and select an active database.",
    codeBlocks: [
      {
        title: "Basic Creation",
        code: "CREATE DATABASE db_name;\nSHOW DATABASES;\nUSE db_name;",
        language: "sql"
      }
    ]
  },
  {
    title: "CREATE TABLE with Constraints",
    description: "Creating a table with Primary Key, Foreign Key, Default, and cascades.",
    keyPoints: [
      "PRIMARY KEY = UNIQUE + NOT NULL",
      "UNIQUE = No duplicate values allowed",
      "NOT NULL = Cannot be empty",
      "DEFAULT = Automatically assigns a value",
      "FOREIGN KEY = Links table to a parent table",
      "ON DELETE CASCADE = Removes dependent rows automatically."
    ],
    codeBlocks: [
      {
        title: "Students and Departments Example",
        code: `CREATE TABLE students (
  id INT PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  email VARCHAR(100) UNIQUE,
  age INT DEFAULT 18,
  dept_id INT,
  FOREIGN KEY (dept_id) REFERENCES departments(id) ON DELETE CASCADE
);`,
        language: "sql"
      }
    ]
  },
  {
    title: "ALTER TABLE",
    description: "Modifying existing table structure.",
    codeBlocks: [
      {
        title: "Common Alternations",
        code: `-- Add Column
ALTER TABLE students ADD city VARCHAR(50);

-- Modify Column
ALTER TABLE students MODIFY age INT;

-- Rename Column
ALTER TABLE students CHANGE COLUMN email abc VARCHAR(20);

-- Drop Column
ALTER TABLE students DROP COLUMN city;

-- Add Constraint
ALTER TABLE students ADD CONSTRAINT pk_students PRIMARY KEY (id);`,
        language: "sql"
      }
    ]
  },
  {
    title: "DROP & RENAME",
    description: "Removing databases/tables entirely, or renaming tables.",
    codeBlocks: [
      {
        title: "Drop & Rename",
        code: `DROP DATABASE db_name;
DROP TABLE students;

RENAME TABLE Orders TO Customer_Orders;`,
        language: "sql"
      }
    ]
  }
];

export const dmlContent = [
  {
    title: "INSERT Statements",
    description: "Adding new rows to a table.",
    codeBlocks: [
      {
        title: "Variations of Insert",
        code: `-- Insert All Columns
INSERT INTO students VALUES (1, 'Ali', 'ali@email.com', 20, 2);

-- Insert Specific Columns
INSERT INTO students (id, name) VALUES (2, 'Ahmed');

-- Insert With NULL
INSERT INTO students VALUES (3, 'Sara', NULL, 22, NULL);`,
        language: "sql"
      }
    ]
  },
  {
    title: "UPDATE Statements",
    description: "Modifying existing data within a table.",
    codeBlocks: [
      {
        title: "Update specific row",
        code: "UPDATE students \nSET age = 25 \nWHERE id = 1;",
        language: "sql"
      }
    ]
  },
  {
    title: "DELETE Statements",
    description: "Removing specific rows from a table.",
    codeBlocks: [
      {
        title: "Delete specific row",
        code: "DELETE FROM students WHERE id = 2;",
        language: "sql"
      }
    ]
  }
];

export const queryContent = [
  {
    title: "Basic SELECT Queries",
    description: "Filtering and retrieving data using WHERE clause.",
    keyPoints: [
      "Use '=' for equality, '<>' or '!=' for NOT EQUAL."
    ],
    codeBlocks: [
      {
        title: "Conditions",
        code: `SELECT * FROM students;
SELECT name, age FROM students;
SELECT * FROM students WHERE age > 18;
SELECT * FROM students WHERE id <> 10;`,
        language: "sql"
      }
    ]
  },
  {
    title: "NULL Handling & BETWEEN & LIKE",
    description: "Special conditions and pattern matching.",
    keyPoints: [
      "'%' represents ANY number of characters.",
      "'_' represents EXACTLY ONE character."
    ],
    codeBlocks: [
      {
        title: "Complex conditions",
        code: `-- NULL checks
SELECT * FROM students WHERE email IS NULL;

-- Ranges
SELECT * FROM students WHERE age BETWEEN 18 AND 25;

-- LIKE wildcards
SELECT * FROM students WHERE name LIKE 'A%';   -- Starts with A
SELECT * FROM students WHERE name LIKE '_a%';  -- Second letter a`,
        language: "sql"
      }
    ]
  },
  {
    title: "DISTINCT, ORDER BY, LIMIT",
    description: "Removing duplicates, sorting results, and limiting output.",
    codeBlocks: [
      {
        title: "Sorting and Limiting",
        code: `SELECT DISTINCT dept_id FROM students;
SELECT * FROM students ORDER BY age ASC;
SELECT * FROM students LIMIT 5;`,
        language: "sql"
      }
    ]
  }
];

export const relationalAlgebraContent = [
  {
    title: "Relational Algebra to SQL",
    description: "The mathematical foundations that back SQL query operations mapping to Row filtering, Column projecting, and Renaming.",
    keyPoints: [
      "Row Filtering / Selection (σ): Equivalent to WHERE clause.",
      "Column Selection / Projection (π): Equivalent to SELECT attribute list.",
      "Rename (ρ): Equivalent to AS keyword."
    ],
    codeBlocks: [
      {
        title: "Equivalents",
        code: `-- Selection (σ age > 18 (students))
SELECT * FROM students WHERE age > 18;

-- Projection (π name, age (students))
SELECT name, age FROM students;

-- Rename (ρ stud (students))
SELECT * FROM students AS stud;`,
        language: "sql"
      }
    ]
  }
];
