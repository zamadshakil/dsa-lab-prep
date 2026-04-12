// ===== ALL CODE EXAMPLES (using CLASS, NOT struct) =====

export const codeExamples = {
  // ==================== RECURSION ====================
  recursion_print_pattern: `#include <iostream>
using namespace std;

void f(int x) {
    if (x > 0) {
        cout << x;
        f(x - 2);
        cout << x;
    }
}

int main() {
    f(5);    // Output: 5 3 1 1 3 5
    return 0;
}`,

  recursion_ascending: `#include <iostream>
using namespace std;

void f(int x) {
    if (x > 0) {
        f(x - 1);
        cout << x;
    }
}

int main() {
    f(5);    // Output: 1 2 3 4 5
    return 0;
}`,

  recursion_power: `#include <iostream>
using namespace std;

int cal(int b, int p) {
    if (p != 0) {
        return (b * cal(b, p - 1));
    } else {
        return 1;
    }
}

int main() {
    cout << cal(2, 3);    // Output: 8
    return 0;
}`,

  recursion_factorial: `#include <iostream>
using namespace std;

int fac(int n) {
    if (n == 0 || n == 1)
        return 1;
    else
        return (n * fac(n - 1));
}

int main() {
    cout << fac(5);    // Output: 120
    return 0;
}`,

  recursion_reverse_string: `#include <iostream>
using namespace std;

string reverseString(string s) {
    // Base case
    if (s.length() == 0)
        return s;

    // Recursive case: move first char to end
    return reverseString(s.substr(1)) + s[0];
}

int main() {
    string text = "Hello";
    cout << reverseString(text);    // Output: olleH
    return 0;
}`,

  recursion_product: `#include <iostream>
using namespace std;

int product(int a, int b) {
    // Base case
    if (b == 0)
        return 0;

    // Recursive: a * b = a + a*(b-1)
    return a + product(a, b - 1);
}

int main() {
    int num1, num2;
    cout << "Enter first number: ";
    cin >> num1;
    cout << "Enter second number: ";
    cin >> num2;
    cout << "Product = " << product(num1, num2);
    return 0;
}`,

  recursion_count_digits: `#include <iostream>
using namespace std;

int countDigits(int n) {
    // Base case
    if (n == 0)
        return 0;

    // Recursive case
    return 1 + countDigits(n / 10);
}

int main() {
    int num;
    cout << "Enter a number: ";
    cin >> num;

    if (num == 0)
        cout << "Number of digits = 1";
    else
        cout << "Number of digits = " << countDigits(num);
    return 0;
}`,

  recursion_sum_digits: `#include <iostream>
using namespace std;

int sumDigits(int n) {
    // Base case
    if (n == 0)
        return 0;

    // Recursive case: last digit + sum of rest
    return (n % 10) + sumDigits(n / 10);
}

int main() {
    int num;
    cout << "Enter a number: ";
    cin >> num;
    cout << "Sum of digits = " << sumDigits(num);
    return 0;
}`,

  // ==================== SINGLY LINKED LIST ====================
  singly_full: `#include <iostream>
using namespace std;

class Node {
public:
    int data;
    Node* next;
};

class LinkedList {
private:
    Node* head;

public:
    // Constructor
    LinkedList() {
        head = NULL;
    }

    // Insert at beginning
    void insertBeginning(int value) {
        Node* newNode = new Node();
        newNode->data = value;
        newNode->next = head;
        head = newNode;
    }

    // Insert at specific position
    void insertPosition(int value, int pos) {
        Node* newNode = new Node();
        newNode->data = value;

        if (pos == 0) {
            newNode->next = head;
            head = newNode;
            return;
        }

        Node* temp = head;
        for (int i = 0; temp != NULL && i < pos - 1; i++) {
            temp = temp->next;
        }

        if (temp == NULL) {
            cout << "Position out of bounds" << endl;
            return;
        }

        newNode->next = temp->next;
        temp->next = newNode;
    }

    // Insert at end
    void insertEnd(int value) {
        Node* newNode = new Node();
        newNode->data = value;
        newNode->next = NULL;

        if (head == NULL) {
            head = newNode;
            return;
        }

        Node* temp = head;
        while (temp->next != NULL) {
            temp = temp->next;
        }
        temp->next = newNode;
    }

    // Delete from beginning
    void deleteBeginning() {
        if (head == NULL) {
            cout << "List empty" << endl;
            return;
        }
        Node* temp = head;
        head = head->next;
        delete temp;
    }

    // Delete from end
    void deleteEnd() {
        if (head == NULL) {
            cout << "List empty" << endl;
            return;
        }
        if (head->next == NULL) {
            delete head;
            head = NULL;
            return;
        }
        Node* temp = head;
        while (temp->next->next != NULL) {
            temp = temp->next;
        }
        delete temp->next;
        temp->next = NULL;
    }

    // Delete from specific position
    void deleteFromSpecificPosition(int position) {
        if (head == NULL) {
            cout << "List is empty." << endl;
            return;
        }

        Node* temp = head;

        if (position == 0) {
            head = temp->next;
            delete temp;
            return;
        }

        for (int i = 0; temp != NULL && i < position - 1; i++) {
            temp = temp->next;
        }

        if (temp == NULL || temp->next == NULL) {
            cout << "Position out of bounds." << endl;
            return;
        }

        Node* next = temp->next->next;
        delete temp->next;
        temp->next = next;
    }

    // Display
    void display() {
        Node* temp = head;
        while (temp != NULL) {
            cout << temp->data << " ";
            temp = temp->next;
        }
        cout << endl;
    }
};

int main() {
    LinkedList list;

    list.insertBeginning(3);
    list.insertBeginning(1);
    list.insertBeginning(7);
    list.insertBeginning(2);
    list.display();                // 2 7 1 3

    list.insertPosition(5, 2);
    list.display();                // 2 7 5 1 3

    list.insertEnd(10);
    list.display();                // 2 7 5 1 3 10

    list.deleteBeginning();
    list.display();                // 7 5 1 3 10

    list.deleteEnd();
    list.display();                // 7 5 1 3

    return 0;
}`,

  // ==================== CIRCULAR LINKED LIST ====================
  circular_full: `#include <iostream>
using namespace std;

class Node {
public:
    int data;
    Node* next;
};

class LinkedList {
private:
    Node* head;

public:
    LinkedList() {
        head = NULL;
    }

    // Insert at beginning
    void insert(int new_data) {
        Node* new_node = new Node();
        new_node->data = new_data;

        if (head == NULL) {
            // If list is empty, node points to itself
            new_node->next = new_node;
            head = new_node;
        } else {
            Node* temp = head;
            // Traverse to last node
            while (temp->next != head) {
                temp = temp->next;
            }
            // Insert at beginning, update last->next
            temp->next = new_node;
            new_node->next = head;
            head = new_node;
        }
    }

    // Insert at specific position
    void insertAtSpecificPosition(int new_data, int position) {
        Node* new_node = new Node();
        new_node->data = new_data;

        if (head == NULL) {
            cout << "List is empty, inserting at beginning." << endl;
            new_node->next = new_node;
            head = new_node;
            return;
        }

        if (position == 0) {
            insert(new_data);
            return;
        }

        Node* temp = head;
        for (int i = 0; i < position - 1 && temp->next != head; i++) {
            temp = temp->next;
        }

        new_node->next = temp->next;
        temp->next = new_node;
    }

    // Insert at end
    void insertAtEnd(int new_data) {
        Node* new_node = new Node();
        new_node->data = new_data;

        if (head == NULL) {
            new_node->next = new_node;
            head = new_node;
            return;
        }

        Node* temp = head;
        while (temp->next != head) {
            temp = temp->next;
        }

        temp->next = new_node;
        new_node->next = head;
    }

    // Delete from beginning
    void deleteFromBeginning() {
        if (head == NULL) {
            cout << "List is empty." << endl;
            return;
        }

        Node* temp = head;

        // If only one node
        if (head->next == head) {
            delete head;
            head = NULL;
            return;
        }

        // Find last node
        while (temp->next != head) {
            temp = temp->next;
        }

        Node* toDelete = head;
        head = head->next;
        temp->next = head;   // Maintain circular link
        delete toDelete;
    }

    // Delete from specific position
    void deleteFromSpecificPosition(int position) {
        if (head == NULL) {
            cout << "List is empty." << endl;
            return;
        }

        if (position == 0) {
            deleteFromBeginning();
            return;
        }

        Node* temp = head;
        Node* prev = NULL;

        for (int i = 0; i < position && temp->next != head; i++) {
            prev = temp;
            temp = temp->next;
        }

        prev->next = temp->next;
        delete temp;
    }

    // Delete from end
    void deleteFromEnd() {
        if (head == NULL) {
            cout << "List is empty." << endl;
            return;
        }

        Node* temp = head;
        Node* prev = NULL;

        // If only one node
        if (head->next == head) {
            delete head;
            head = NULL;
            return;
        }

        while (temp->next != head) {
            prev = temp;
            temp = temp->next;
        }

        prev->next = head;
        delete temp;
    }

    // Display (uses do-while!)
    void display() {
        if (head == NULL) {
            cout << "The list is empty." << endl;
            return;
        }

        Node* temp = head;
        cout << "Circular LL: ";
        do {
            cout << temp->data << " ";
            temp = temp->next;
        } while (temp != head);
        cout << endl;
    }
};

int main() {
    LinkedList l;

    l.insert(3);
    l.insert(1);
    l.insert(7);
    l.insert(2);
    l.insert(9);
    l.display();

    l.insertAtSpecificPosition(5, 2);
    l.display();

    l.insertAtEnd(10);
    l.display();

    l.deleteFromBeginning();
    l.display();

    l.deleteFromSpecificPosition(2);
    l.display();

    l.deleteFromEnd();
    l.display();

    return 0;
}`,

  // ==================== STACK USING ARRAY ====================
  stack_array: `#include <iostream>
using namespace std;

class Stack {
private:
    int* arr;
    int top;
    int maxSize;

public:
    // Constructor
    Stack(int size) {
        maxSize = size;
        arr = new int[maxSize];
        top = -1;
    }

    bool isEmpty() {
        return top == -1;
    }

    bool isFull() {
        return top == maxSize - 1;
    }

    // Push element
    void push(int value) {
        if (isFull()) {
            cout << "Stack Overflow!" << endl;
            return;
        }
        arr[++top] = value;
        cout << value << " pushed onto stack." << endl;
    }

    // Pop element
    int pop() {
        if (isEmpty()) {
            cout << "Stack Underflow!" << endl;
            return -1;
        }
        return arr[top--];
    }

    // Peek (top element)
    int peek() {
        if (isEmpty()) {
            cout << "Stack is empty!" << endl;
            return -1;
        }
        return arr[top];
    }

    // Display stack
    void display() {
        if (isEmpty()) {
            cout << "Stack is empty!" << endl;
            return;
        }
        cout << "Stack elements: ";
        for (int i = top; i >= 0; i--) {
            cout << arr[i] << " ";
        }
        cout << endl;
    }

    // Destructor
    ~Stack() {
        delete[] arr;
    }
};

int main() {
    Stack s(5);
    s.push(10);
    s.push(20);
    s.push(30);
    s.display();        // 30 20 10

    cout << "Top Element: " << s.peek() << endl;
    cout << "Popped: " << s.pop() << endl;
    s.display();        // 20 10

    return 0;
}`,

  // ==================== STACK USING LINKED LIST ====================
  stack_linked_list: `#include <iostream>
using namespace std;

class Node {
public:
    int data;
    Node* next;
};

class Stack {
private:
    Node* top;

public:
    Stack() {
        top = NULL;
    }

    bool isEmpty() {
        return top == NULL;
    }

    // Push: insert at top
    void push(int value) {
        Node* newNode = new Node();
        newNode->data = value;
        newNode->next = top;
        top = newNode;
        cout << value << " pushed onto stack." << endl;
    }

    // Pop: remove from top
    int pop() {
        if (isEmpty()) {
            cout << "Stack Underflow!" << endl;
            return -1;
        }
        Node* temp = top;
        int poppedValue = temp->data;
        top = top->next;
        delete temp;
        return poppedValue;
    }

    // Peek: view top
    int peek() {
        if (isEmpty()) {
            cout << "Stack is empty!" << endl;
            return -1;
        }
        return top->data;
    }

    // Display
    void display() {
        if (isEmpty()) {
            cout << "Stack is empty!" << endl;
            return;
        }
        cout << "Stack elements: ";
        Node* current = top;
        while (current != NULL) {
            cout << current->data << " ";
            current = current->next;
        }
        cout << endl;
    }

    // Destructor
    ~Stack() {
        while (!isEmpty()) {
            pop();
        }
    }
};

int main() {
    Stack s;
    s.push(10);
    s.push(20);
    s.push(30);
    s.display();

    cout << "Top Element: " << s.peek() << endl;
    cout << "Popped: " << s.pop() << endl;
    s.display();

    return 0;
}`,

  // ==================== SIMPLE QUEUE ====================
  queue_simple: `#include <iostream>
using namespace std;

class Queue {
private:
    int front, rear, size;
    int* arr;

public:
    Queue(int s) {
        front = rear = -1;
        size = s;
        arr = new int[size];
    }

    bool isFull() {
        return rear == size - 1;
    }

    bool isEmpty() {
        return front == -1 || front > rear;
    }

    // Enqueue
    void enqueue(int value) {
        if (isFull()) {
            cout << "Queue is Full!" << endl;
            return;
        }
        if (front == -1) front = 0;
        arr[++rear] = value;
        cout << value << " enqueued to queue" << endl;
    }

    // Dequeue
    void dequeue() {
        if (isEmpty()) {
            cout << "Queue is Empty!" << endl;
            return;
        }
        cout << arr[front] << " dequeued from queue" << endl;
        front++;
    }

    // Display
    void display() {
        if (isEmpty()) {
            cout << "Queue is Empty!" << endl;
            return;
        }
        cout << "Queue elements: ";
        for (int i = front; i <= rear; i++) {
            cout << arr[i] << " ";
        }
        cout << endl;
    }

    ~Queue() {
        delete[] arr;
    }
};

int main() {
    Queue q(5);
    q.enqueue(10);
    q.enqueue(20);
    q.enqueue(30);
    q.display();        // 10 20 30

    q.dequeue();
    q.display();        // 20 30

    return 0;
}`,

  // ==================== CIRCULAR QUEUE ====================
  queue_circular: `#include <iostream>
using namespace std;

class CircularQueue {
private:
    int* arr;
    int front, rear, size;

public:
    CircularQueue(int s) {
        size = s;
        arr = new int[size];
        front = rear = -1;
    }

    bool isFull() {
        return (rear + 1) % size == front;
    }

    bool isEmpty() {
        return front == -1;
    }

    // Enqueue
    void enqueue(int value) {
        if (isFull()) {
            cout << "Queue is Full!" << endl;
            return;
        }
        if (front == -1) front = 0;   // First element
        rear = (rear + 1) % size;
        arr[rear] = value;
        cout << value << " enqueued to queue" << endl;
    }

    // Dequeue
    void dequeue() {
        if (isEmpty()) {
            cout << "Queue is Empty!" << endl;
            return;
        }
        cout << arr[front] << " dequeued from queue" << endl;
        if (front == rear)             // Last element removed
            front = rear = -1;
        else
            front = (front + 1) % size;
    }

    // Display
    void display() {
        if (isEmpty()) {
            cout << "Queue is Empty!" << endl;
            return;
        }
        cout << "Queue elements: ";
        int i = front;
        while (true) {
            cout << arr[i] << " ";
            if (i == rear) break;
            i = (i + 1) % size;
        }
        cout << endl;
    }

    ~CircularQueue() {
        delete[] arr;
    }
};

int main() {
    CircularQueue q(5);
    q.enqueue(10);
    q.enqueue(20);
    q.enqueue(30);
    q.enqueue(40);
    q.enqueue(50);
    q.display();          // 10 20 30 40 50

    q.dequeue();
    q.dequeue();
    q.display();          // 30 40 50

    q.enqueue(60);        // Wraps around!
    q.enqueue(70);
    q.display();          // 30 40 50 60 70

    return 0;
}`,

  // ==================== NODE SWAPPING ====================
  swap_nodes: `#include <iostream>
using namespace std;

class Node {
public:
    int data;
    Node* next;
};

class LinkedList {
private:
    Node* head;

public:
    LinkedList() {
        head = NULL;
    }

    void insertEnd(int value) {
        Node* newNode = new Node();
        newNode->data = value;
        newNode->next = NULL;

        if (head == NULL) {
            head = newNode;
            return;
        }

        Node* temp = head;
        while (temp->next != NULL) {
            temp = temp->next;
        }
        temp->next = newNode;
    }

    // ★ SWAP NODES by changing LINKS (not data) ★
    void swapNodes(int x, int y) {
        if (x == y) return;

        // Find node x and its previous
        Node* prevX = NULL;
        Node* currX = head;
        while (currX != NULL && currX->data != x) {
            prevX = currX;
            currX = currX->next;
        }

        // Find node y and its previous
        Node* prevY = NULL;
        Node* currY = head;
        while (currY != NULL && currY->data != y) {
            prevY = currY;
            currY = currY->next;
        }

        // If either x or y not found
        if (currX == NULL || currY == NULL) {
            cout << "One or both values not found!" << endl;
            return;
        }

        // If x is not head, link prevX to currY
        if (prevX != NULL)
            prevX->next = currY;
        else
            head = currY;

        // If y is not head, link prevY to currX
        if (prevY != NULL)
            prevY->next = currX;
        else
            head = currX;

        // Swap next pointers
        Node* temp = currY->next;
        currY->next = currX->next;
        currX->next = temp;
    }

    void display() {
        Node* temp = head;
        while (temp != NULL) {
            cout << temp->data << " -> ";
            temp = temp->next;
        }
        cout << "NULL" << endl;
    }
};

int main() {
    LinkedList list;
    list.insertEnd(10);
    list.insertEnd(20);
    list.insertEnd(30);
    list.insertEnd(40);
    list.insertEnd(50);

    cout << "Before swap:" << endl;
    list.display();
    // 10 -> 20 -> 30 -> 40 -> 50 -> NULL

    list.swapNodes(20, 40);

    cout << "After swapping 20 and 40:" << endl;
    list.display();
    // 10 -> 40 -> 30 -> 20 -> 50 -> NULL

    return 0;
}`,

  // ==================== INFIX TO POSTFIX ====================
  infix_postfix: `#include <iostream>
#include <stack>
using namespace std;

int precedence(char op) {
    if (op == '^') return 3;
    if (op == '*' || op == '/') return 2;
    if (op == '+' || op == '-') return 1;
    return 0;
}

bool isOperator(char ch) {
    return (ch == '+' || ch == '-' ||
            ch == '*' || ch == '/' || ch == '^');
}

string infixToPostfix(string infix) {
    stack<char> s;
    string postfix = "";

    for (char ch : infix) {
        if (isalnum(ch)) {
            postfix += ch;           // Operand -> output
        }
        else if (ch == '(') {
            s.push(ch);              // '(' -> push
        }
        else if (ch == ')') {
            while (!s.empty() && s.top() != '(') {
                postfix += s.top();
                s.pop();
            }
            s.pop();                 // Pop '('
        }
        else if (isOperator(ch)) {
            while (!s.empty() &&
                   precedence(s.top()) >= precedence(ch)) {
                postfix += s.top();
                s.pop();
            }
            s.push(ch);
        }
    }

    while (!s.empty()) {
        postfix += s.top();
        s.pop();
    }

    return postfix;
}

int main() {
    string infix = "A+B*(C^D-E)";
    cout << "Infix:   " << infix << endl;
    cout << "Postfix: " << infixToPostfix(infix) << endl;
    // Output: ABCD^E-*+
    return 0;
}`,
};

// ==================== TOPIC METADATA ====================
export interface TopicInfo {
  slug: string;
  title: string;
  shortTitle: string;
  icon: string;
  color: string;
  colorDim: string;
  tag: string;
  description: string;
}

export const topics: TopicInfo[] = [
  {
    slug: "recursion",
    title: "Recursion",
    shortTitle: "Recursion",
    icon: "🔄",
    color: "#ff6b6b",
    colorDim: "rgba(255, 107, 107, 0.12)",
    tag: "Topic 1",
    description: "Functions that call themselves to solve sub-problems",
  },
  {
    slug: "singly-linked-list",
    title: "Singly Linked List",
    shortTitle: "Singly LL",
    icon: "🔗",
    color: "#4ecdc4",
    colorDim: "rgba(78, 205, 196, 0.12)",
    tag: "Topic 2",
    description: "Linear data structure with nodes pointing to next",
  },
  {
    slug: "circular-linked-list",
    title: "Circular Linked List",
    shortTitle: "Circular LL",
    icon: "🔵",
    color: "#45b7d1",
    colorDim: "rgba(69, 183, 209, 0.12)",
    tag: "Topic 3",
    description: "Linked list where last node points back to head",
  },
  {
    slug: "stack",
    title: "Stack (Array + Linked List)",
    shortTitle: "Stack",
    icon: "📚",
    color: "#feca57",
    colorDim: "rgba(254, 202, 87, 0.12)",
    tag: "Topic 4",
    description: "LIFO structure with push, pop, peek operations",
  },
  {
    slug: "queue",
    title: "Queue (Simple + Circular)",
    shortTitle: "Queue",
    icon: "🚶",
    color: "#a29bfe",
    colorDim: "rgba(162, 155, 254, 0.12)",
    tag: "Topic 5",
    description: "FIFO structure with enqueue, dequeue operations",
  },
  {
    slug: "node-swapping",
    title: "Node Swapping",
    shortTitle: "Swap",
    icon: "🔀",
    color: "#fd79a8",
    colorDim: "rgba(253, 121, 168, 0.12)",
    tag: "Advanced",
    description: "Swapping nodes by changing links, not data",
  },
];
