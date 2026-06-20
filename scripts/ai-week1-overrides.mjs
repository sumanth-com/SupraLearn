/** Hand-crafted Week 1 content — shared by generate scripts and regenerate-all-ai-content.mjs */

export const WEEK1_TOPIC_OVERRIDES = {
  "ai-t1": {
    answer:
      "Artificial Intelligence (AI) is the field of building systems that perform tasks requiring human-like intelligence — recognizing patterns, making decisions, understanding language, or generating content. Modern AI in software development mostly means machine learning models trained on huge datasets, not rule-based if-else programs. For you as a Java learner, AI is a tool that can explain concepts, suggest code, and review your work — but it does not replace understanding fundamentals.",
    realWorld:
      "When learning variables and loops in Java, read the for-loop explanation on this page — like counting items in a shopping cart. Then type and run the example in your IDE yourself. Understanding sticks when you write the code, not just read it.",
  },
  "ai-t2": {
    answer:
      "Generative AI creates new content — text, code, images — from patterns learned during training. ChatGPT, Claude, and Gemini are generative models: you send a prompt, they generate a response token by token. Unlike a search engine that finds existing pages, generative AI produces novel output that may be correct, partially correct, or completely fabricated.",
    realWorld:
      "The Practice Exercises section here shows a Java grade calculator example. Study it, run it in your IDE, and fix edge cases like empty input. You learn more by debugging than by only reading the answer.",
  },
  "ai-t3": {
    answer:
      "A Large Language Model (LLM) is a neural network trained on massive text/code datasets to predict the next token in a sequence. That simple mechanism, scaled up, produces fluent answers, code, and explanations. LLMs don't 'know' facts like a database — they estimate statistically likely continuations based on training data, which is why verification matters.",
    realWorld:
      "When you ask Copilot to autocomplete a Java method, it is an LLM predicting likely code based on your file context and millions of open-source examples. Sometimes it nails your style; sometimes it hallucinates a method that doesn't exist on String.",
  },
  "ai-t4": {
    answer:
      "A prompt is the input you give an AI model — your question, instruction, or context. The quality of the prompt directly shapes the quality of the response. Prompts can be one line ('What is polymorphism?') or structured briefs with role, constraints, and examples. Think of a prompt as a specification document for the AI.",
    realWorld:
      "Bad prompt: 'Java arrays.' Good prompt: 'Explain Java arrays to a beginner who knows variables. Include declaration, initialization, and a loop example. Keep it under 150 words.' The second prompt gives you a focused lesson you can use while studying Week 1 topics.",
  },
  "ai-t5": {
    answer:
      "A good prompt is specific, contextual, and constrained. Include: (1) your goal, (2) relevant background, (3) desired format, (4) boundaries ('don't use advanced topics I haven't learned'), and (5) examples if needed. Good prompts reduce vague or overly advanced answers and make AI feel like a patient tutor instead of a random search result.",
    realWorld:
      "While learning if-else, prompt: 'I'm a Week 1 Java student. Write one if-else example for grading (A/B/C/F) using only int scores and println. Add comments explaining each branch.' You get teachable code aligned with your level.",
  },
  "ai-t6": {
    answer:
      "Hallucination is when an AI confidently states false information — fake citations, invented Java methods, or incorrect syntax presented as fact. LLMs optimize for plausible text, not verified truth. Hallucinations are more common for niche APIs, recent events, or precise numeric facts.",
    realWorld:
      "You ask AI for the signature of a Java 21 method it doesn't know well. It might invent `String.reverse()` (which doesn't exist on String). Always check the official JDK docs or compile the code — never trust generated APIs blindly.",
  },
  "ai-t7": {
    answer:
      "AI gives wrong answers because: (1) training data has errors or gaps, (2) the model generalizes incorrectly, (3) your prompt was ambiguous, (4) the question needs real-time or private data the model lacks, or (5) it optimizes for sounding confident over being correct. Understanding this keeps you skeptical and professional.",
    realWorld:
      "AI suggests using `==` to compare two String names in Java. You remember from class that `equals()` is correct for content comparison. You fix the suggestion, add a test, and learn why — the AI mistake actually reinforced your understanding.",
  },
  "ai-t8": {
    answer:
      "AI ethics covers responsible use: privacy (don't paste confidential code or PII into public tools), bias (models reflect biased training data), attribution (know when AI-generated work needs disclosure), environmental cost, and job impact. As a developer, ethics means choosing when AI helps users vs. when it could harm them.",
    realWorld:
      "Before sharing code online for help, ask: is this allowed by policy? Could customer data leak? Ethical developers protect sensitive data and only use approved learning platforms like this one for coursework.",
  },
  "ai-t9": {
    answer:
      "Trust AI when: the task is explanatory (concepts, analogies), the output is easy to verify (small code snippets you can compile), you're brainstorming alternatives, or you need a first draft to refine. Cross-check important facts with docs, textbooks, or your mentor. Trust but verify.",
    realWorld:
      "You trust AI to explain the difference between `int` and `double` because you can confirm it against your Week 1 notes and a quick main() experiment. You don't trust it blindly for your final exam answers without studying yourself.",
  },
  "ai-t10": {
    answer:
      "Do not trust AI alone for: production security decisions, legal/compliance advice, unverified medical or financial guidance, copying homework without understanding, or deploying code you haven't tested. Also be cautious with rare libraries, exact version-specific APIs, and math-heavy proofs — error rates rise.",
    realWorld:
      "AI generates a password-storage snippet using MD5. You know (or look up) that bcrypt or Argon2 is required for real apps. You reject the suggestion — that's professional judgment AI cannot replace.",
  },
};

export const WEEK1_EXERCISE_OVERRIDES = {
  "ai-e1": {
    answer:
      "JDK (Java Development Kit) is what developers install to write Java programs. It includes the compiler (javac), debugger, libraries, and a JRE. JRE (Java Runtime Environment) is what you need to run Java programs — it contains the JVM plus core class libraries, but no compiler. JVM (Java Virtual Machine) is the engine that executes bytecode — it loads classes, manages memory, runs garbage collection, and translates bytecode to machine instructions on your OS.",
    realWorld:
      "On your laptop you install the JDK to write and compile Week 1 programs. When you deploy a JAR to a server, the server only needs a JRE (or JDK) with a compatible JVM — the same HelloWorld.class bytecode runs on Windows and Linux without recompiling.",
    code: "// You write this with the JDK (javac compiles it)\npublic class Hello {\n    public static void main(String[] args) {\n        System.out.println(\"Runs on the JVM!\");\n    }\n}",
  },
  "ai-e2": {
    answer:
      "A variable is like a labeled box where you store a value. The label is the variable name (e.g., age), and the box holds one value at a time (e.g., 12). In Java you must say what type of value the box holds — int for whole numbers, double for decimals, String for text. You can change what's inside the box later: age = 13;",
    realWorld:
      "Imagine a video game character: health = 100, coins = 50, playerName = \"Maya\". When Maya collects a coin, the program updates coins = 51. Variables let your Student Information System remember names, roll numbers, and grades while the program runs.",
    code: 'int age = 10;\nString name = "Riya";\ndouble height = 1.42;\nSystem.out.println(name + " is " + age + " years old");',
  },
  "ai-e3": {
    answer:
      "Line 1: `public class HelloWorld` — declares a class named HelloWorld (filename must match). Line 2: `public static void main(String[] args)` — the entry point; JVM starts here. Line 3: `System.out.println(...)` — prints text to the console followed by a newline. Line 4–5: closing braces end the method and class. Every standalone Java app needs this main method structure.",
    realWorld:
      "Your first GitHub upload for Week 1 is HelloWorld.java. When you run `java HelloWorld`, the JVM finds main(), executes println, and you see output in the terminal — the same flow every Java application uses to start.",
    code: 'public class HelloWorld {\n    public static void main(String[] args) {\n        System.out.println("Hello, World!");\n    }\n}',
  },
  "ai-e4": {
    answer:
      "A syntax error means the Java compiler (javac) cannot understand your code structure — missing semicolon, mismatched braces, wrong keyword spelling, or invalid type usage. The compiler stops before creating bytecode and reports the file name and line number. Syntax errors are caught before the program ever runs.",
    realWorld:
      "You write `int x = 5` without a semicolon. The IDE shows a red squiggle; javac says '; expected'. Fix the semicolon, recompile, and the error disappears. Syntax errors protect you from running broken structure.",
    code: "// Syntax error: missing semicolon\nint score = 95\nSystem.out.println(score);\n\n// Fixed:\nint score = 95;\nSystem.out.println(score);",
  },
  "ai-e5": {
    answer:
      "Common beginner bugs: missing semicolons, wrong variable types, using = instead of == in conditions, array index out of bounds, and typos in method names. To debug: read the compiler error line number, check recent edits, print variable values, and fix one issue at a time. Logic bugs compile but produce wrong output — trace the code step by step.",
    realWorld:
      "Broken program: `String name = null; System.out.println(name.length());` — compiles but throws NullPointerException at runtime. The fix: check `if (name != null)` before calling methods. Always read the error message from the bottom of the stack trace upward.",
    code: '// Bug: prints nothing useful — forgot to add numbers\npublic class Add {\n    public static void main(String[] args) {\n        int a = 5, b = 3;\n        System.out.println("Sum"); // should print a + b\n    }\n}\n\n// Fix:\nSystem.out.println("Sum: " + (a + b));',
  },
  "ai-e6": {
    answer:
      "When comparing explanations, check: (1) accuracy against JDK docs, (2) clarity for your level, (3) whether examples compile, (4) depth vs. unnecessary complexity. One answer might use perfect analogies but wrong syntax; another might be technically correct but hard to follow. The best explanation is correct, simple, and runnable.",
    realWorld:
      'Question: "Difference between int and double?" Response A says doubles are \'always better\' — misleading. Response B explains int for counts, double for measurements with a price example — clearer and correct. You learned to evaluate quality, not just accept the first answer.',
  },
  "ai-e7": {
    answer:
      "Good variable names describe purpose: studentCount not n, totalPrice not tp, isLoggedIn not flag. Use camelCase in Java. Avoid single letters except loop counters (i, j). Boolean names often start with is/has/can. Names should make code readable without comments.",
    realWorld:
      "Before: `int x = 20; String s = \"A\";` After: `int passingScore = 20; String grade = \"A\";` A teammate reading your Student Information System instantly understands the second version during code review.",
    code: "// Weak\nint a = 100;\ndouble b = 89.5;\n\n// Strong\nint maxAttendance = 100;\ndouble examAverage = 89.5;",
  },
  "ai-e8": {
    answer:
      "Type casting converts a value from one type to another. Widening (implicit): int → double happens automatically. Narrowing (explicit): double → int requires (int) and truncates decimals. Casting is needed when you mix types or extract integer parts from decimals.",
    realWorld:
      "Shopping cart: items = 3 (int), priceEach = 9.99 (double). Total = items * priceEach gives 29.97. To split bill among friends: (int)(29.97 / 2) = 14 — cast drops .97. Know when data loss is acceptable.",
    code: "double price = 9.99;\nint rounded = (int) price; // 9\n\ndouble avg = 7 / 2;      // 3.0 (int division first!)\ndouble avg2 = 7 / 2.0;   // 3.5",
  },
  "ai-e9": {
    answer:
      "Java basics quiz — test yourself: (1) What is the entry point method signature? (2) Name 4 primitive types. (3) int vs double — when use each? (4) What does javac do vs java? (5) Fix: `String name = Alex` (missing quotes). (6) What is a variable? (7) Why use semicolons? (8) What is bytecode? (9) == vs = ? (10) What package contains System.out?",
    realWorld:
      "Before your Week 1 assessment, cover the answer panel, try each quiz question on paper, then reveal and check. Active recall beats rereading — this is how interview prep works too.",
  },
  "ai-e10": {
    answer:
      "Student Information System review checklist: separate input, logic, and display (main method shouldn't do everything); use meaningful class/variable names; validate user input (empty name, negative age); handle invalid menu choices with loops; avoid magic numbers (use constants); add comments only where logic isn't obvious; test edge cases — empty list, duplicate roll number.",
    realWorld:
      "A hiring manager skims your GitHub README and Variables.java. Clean structure and validation show you think like a developer, not just someone who copied code. Refactor one 80-line main() into smaller methods — that's a visible improvement for your portfolio.",
  },
};
