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
ALTER TABLE students ADD CONSTRAINT chk_age CHECK (age >= 18);`,
        language: "sql"
      }
    ]
  },
  {
    title: "DROP, TRUNCATE & RENAME",
    description: "Removing tables entirely, clearing data, or renaming them.",
    keyPoints: [
      "DROP: Deletes the entire table structure and data (DDL).",
      "TRUNCATE: Empties the table but keeps the structure intact. Very fast! (DDL).",
      "DELETE: Removes rows one by one, can be rolled back (DML)."
    ],
    codeBlocks: [
      {
        title: "Remove Operations",
        code: `DROP DATABASE db_name;
DROP TABLE students;

TRUNCATE TABLE students; -- Clears all data, resets identity

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
    keyPoints: [
      "Strings and Dates must be single-quoted 'John'",
      "Bulk inserting is faster than multiple single inserts"
    ],
    codeBlocks: [
      {
        title: "Single & Bulk Variations",
        code: `-- Insert All Columns
INSERT INTO students VALUES (1, 'Ali', 'ali@email.com', 20, 2);

-- Insert Specific Columns
INSERT INTO students (id, name) VALUES (2, 'Ahmed');

-- Bulk Insert (Multiple rows)
INSERT INTO students (id, name, age) VALUES 
(4, 'Diana', 21), 
(5, 'Evan', 19);`,
        language: "sql"
      }
    ],
    tableVisual: {
      headers: ["id", "name", "email", "age", "dept_id"],
      rows: [
        ["1", "Ali", "ali@email.com", "20", "2"],
        ["2", "Ahmed", "NULL", "NULL", "NULL"],
        ["4", "Diana", "NULL", "21", "NULL"],
        ["5", "Evan", "NULL", "19", "NULL"]
      ]
    }
  },
  {
    title: "UPDATE Statements",
    description: "Modifies existing data. ALWAYS use WHERE unless changing the entire table.",
    keyPoints: [
      "No WHERE clause = EVERY row is updated",
      "You can update multiple columns at once using commas"
    ],
    codeBlocks: [
      {
        title: "Update specific row",
        code: "UPDATE students \nSET age = 25, email = 'ahmed_new@email.com'\nWHERE id = 2;",
        language: "sql"
      }
    ],
    tableVisual: {
      headers: ["id", "name", "email", "age", "dept_id"],
      rows: [
        ["1", "Ali", "ali@email.com", "20", "2"],
        ["2", "Ahmed", "ahmed_new@email.com", "25", "NULL"]
      ]
    }
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
      "'%' represents ANY sequence of zero or more characters.",
      "'_' represents EXACTLY ONE character. (e.g., '_a%' means second letter is 'a')",
      "IS NULL is the ONLY way to check for NULL (you cannot use = NULL)."
    ],
    codeBlocks: [
      {
        title: "Complex conditions",
        code: `-- NULL checks
SELECT * FROM students WHERE email IS NULL;

-- Ranges (BETWEEN is inclusive)
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
      "Row Filtering / Selection (σ - sigma): Equivalent to WHERE clause.",
      "Column Selection / Projection (π - pi): Equivalent to SELECT attribute list.",
      "Rename (ρ - rho): Equivalent to AS keyword."
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

export const interactiveQuizData = [
  {
    question: "Which SQL command empties a table completely but preserves its structure, doing so significantly faster than a DELETE operation?",
    options: ["DROP TABLE", "DELETE FROM", "TRUNCATE TABLE", "CLEAR TABLE"],
    correctAnswer: 2,
    explanation: "TRUNCATE is a DDL command that quickly deallocates the data pages and resets identity columns, unlike DELETE which removes rows one by one."
  },
  {
    question: "In Relational Algebra, what does the symbol 'π' (pi) represent?",
    options: ["Row Selection (WHERE)", "Column Projection (SELECT)", "Cross Join (CARTESIAN)", "Renaming (AS)"],
    correctAnswer: 1,
    explanation: "π (pi) extracts specific columns from a relation, exactly like specifying column names in an SQL SELECT clause."
  },
  {
    question: "Which of these is the ONLY correct way to extract students who have not provided an email address?",
    options: ["WHERE email = NULL", "WHERE email IS NULL", "WHERE email == NULL", "WHERE email IN (NULL)"],
    correctAnswer: 1,
    explanation: "NULL is not a value; it's a state of 'unknown'. You cannot use mathematical operators (like =) on an unknown state. You must use IS NULL."
  },
  {
    question: "Which attribute correctly links a child table to a parent table and can automatically delete child rows if the parent is removed?",
    options: ["PRIMARY KEY", "CHECK CONSTRAINT", "UNIQUE", "FOREIGN KEY ... ON DELETE CASCADE"],
    correctAnswer: 3,
    explanation: "FOREIGN KEY establishes the link, and 'ON DELETE CASCADE' is the specific instruction that tells the database to clean up orphaned rows."
  },
  {
    question: "Suppose Department is a parent table, and 'Students' has a foreign key to 'Department' with 'ON DELETE CASCADE'. What happens if you DROP the Department table?",
    options: [
      "The database prevents the DROP command.",
      "The Department table is dropped and Students records are wiped.",
      "The Department table is dropped and Students Dept_ID is set to NULL.",
      "The Department table is dropped but orphaned rows remain."
    ],
    correctAnswer: 0,
    explanation: "TRICK QUESTION! You cannot DROP a table that is referenced by a foreign key constraint, regardless of cascading rules. You must drop the constraint or child table first. Cascades only apply to DML (DELETE)."
  },
  {
    question: "Evaluate this query: SELECT * FROM Users WHERE Role = 'Admin' OR Role = 'Editor' AND Age > 30; Which users are returned?",
    options: [
      "Only Admins and Editors who are older than 30.",
      "All Admins (regardless of age), AND Editors who are older than 30.",
      "Only Editors who are older than 30.",
      "Syntax error."
    ],
    correctAnswer: 1,
    explanation: "AND has higher precedence than OR. The query evaluates as: Admin OR (Editor AND Age > 30). To enforce Age > 30 for both, you MUST use parentheses: (Admin OR Editor) AND Age > 30."
  }
];
