// ===== ALL CODE EXAMPLES (using CLASS, NOT struct) =====

export const codeExamples = {
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

  // ==================== QUEUE USING ARRAY ====================
  queue_array: `#include <iostream>
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

  // ==================== QUEUE USING LINKED LIST ====================
  queue_linked_list: `#include <iostream>
using namespace std;

class Node {
public:
    int data;
    Node* next;
};

class Queue {
private:
    Node *front, *rear;
public:
    Queue() {
        front = rear = NULL;
    }

    bool isEmpty() {
        return front == NULL;
    }

    void enqueue(int value) {
        Node* newNode = new Node();
        newNode->data = value;
        newNode->next = NULL;

        if (rear == NULL) {
            front = rear = newNode;
            cout << value << " enqueued to queue" << endl;
            return;
        }

        rear->next = newNode;
        rear = newNode;
        cout << value << " enqueued to queue" << endl;
    }

    void dequeue() {
        if (isEmpty()) {
            cout << "Queue is Empty!" << endl;
            return;
        }

        Node* temp = front;
        int dequeuedValue = temp->data;
        front = front->next;

        if (front == NULL) {
            rear = NULL;
        }

        cout << dequeuedValue << " dequeued from queue" << endl;
        delete temp;
    }

    void display() {
        if (isEmpty()) {
            cout << "Queue is Empty!" << endl;
            return;
        }
        cout << "Queue elements: ";
        Node* current = front;
        while (current != NULL) {
            cout << current->data << " ";
            current = current->next;
        }
        cout << endl;
    }

    ~Queue() {
        while (!isEmpty()) {
            Node* temp = front;
            front = front->next;
            delete temp;
        }
        rear = NULL;
    }
};

int main() {
    Queue q;
    q.enqueue(10);
    q.enqueue(20);
    q.enqueue(30);
    q.display();

    q.dequeue();
    q.display();

    return 0;
}`,

  // ==================== CIRCULAR QUEUE USING ARRAY ====================
  circular_queue_array: `#include <iostream>
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

  // ==================== INFIX TO POSTFIX CONVERSION ====================
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
}`
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
    slug: "stack",
    title: "Stack (Array & LL)",
    shortTitle: "Stack",
    icon: "📚",
    color: "#feca57",
    colorDim: "rgba(254, 202, 87, 0.12)",
    tag: "Topic 1",
    description: "LIFO structure with push, pop, peek operations",
  },
  {
    slug: "queue",
    title: "Queue (Array & LL)",
    shortTitle: "Queue",
    icon: "🚶",
    color: "#a29bfe",
    colorDim: "rgba(162, 155, 254, 0.12)",
    tag: "Topic 2",
    description: "FIFO structure with enqueue, dequeue operations",
  },
  {
    slug: "circular-queue",
    title: "Circular Queue (Array)",
    shortTitle: "Circular Queue",
    icon: "🎡",
    color: "#45b7d1",
    colorDim: "rgba(69, 183, 209, 0.12)",
    tag: "Topic 3",
    description: "Queue where wrap-around avoids wasted space",
  },
  {
    slug: "infix-postfix",
    title: "Infix to Postfix",
    shortTitle: "Infix Postfix",
    icon: "🧮",
    color: "#fd79a8",
    colorDim: "rgba(253, 121, 168, 0.12)",
    tag: "Topic 4",
    description: "Conversion of math expressions using Stack",
  },
];
