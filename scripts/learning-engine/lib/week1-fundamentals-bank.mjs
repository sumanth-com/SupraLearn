/**
 * Week 1 Java Fundamentals — topic-specific problems only.
 * No generic pattern/leetcode/company filler on fundamentals topics.
 */
import { enrichProblem, javaSolution, clsName, defaultApproaches } from "./rich-fields.mjs";
import { estimatedMinutes as estMinutes } from "./problem-type-spec.mjs";

const WEEK1_TOPIC_SLUGS = new Set([
  "what-is-java",
  "jdk-jre-jvm",
  "variables-data-types",
  "operators",
  "type-casting",
  "scanner-input",
  "first-java-program",
]);

export function isWeek1FundamentalsTopic(slug) {
  return WEEK1_TOPIC_SLUGS.has(slug);
}

const TOPIC_TITLES = {
  "what-is-java": "What is Java?",
  "jdk-jre-jvm": "JDK, JRE & JVM",
  "variables-data-types": "Variables & Data Types",
  operators: "Operators",
  "type-casting": "Type Casting",
  "scanner-input": "User Input (Scanner)",
  "first-java-program": "First Java Program",
};

/** Topic-specific problem templates — index rotates through list */
const TOPIC_PROBLEMS = {
  "what-is-java": [
    {
      title: "Print Your First Message",
      statement: "Write a Java program that prints exactly: Welcome to Java!",
      code: (cn) => javaSolution(cn, [], "", '        System.out.println("Welcome to Java!");'),
      output: "Welcome to Java!",
      input: "No input",
    },
    {
      title: "Java is Platform Independent",
      statement: "Print a message explaining that Java bytecode runs on any JVM.",
      code: (cn) =>
        javaSolution(
          cn,
          [],
          "",
          '        System.out.println("Java is platform independent via JVM");'
        ),
      output: "Java is platform independent via JVM",
      input: "No input",
    },
    {
      title: "Identify Java File Extension",
      statement: "Print the standard source file extension for Java programs.",
      code: (cn) => javaSolution(cn, [], "", '        System.out.println(".java");'),
      output: ".java",
      input: "No input",
    },
    {
      title: "Main Method Signature",
      statement: "Print the correct main method signature used to start a Java program.",
      code: (cn) =>
        javaSolution(
          cn,
          [],
          "",
          '        System.out.println("public static void main(String[] args)");'
        ),
      output: "public static void main(String[] args)",
      input: "No input",
    },
    {
      title: "Compiled vs Interpreted",
      statement: "Print whether Java source is compiled to bytecode before JVM execution (yes/no).",
      code: (cn) => javaSolution(cn, [], "", '        System.out.println("yes");'),
      output: "yes",
      input: "No input",
    },
  ],
  "jdk-jre-jvm": [
    {
      title: "What Does JDK Include?",
      statement: "Print the three core parts: compiler, libraries, and JVM tools.",
      code: (cn) =>
        javaSolution(cn, [], "", '        System.out.println("javac + libraries + tools");'),
      output: "javac + libraries + tools",
      input: "No input",
    },
    {
      title: "JRE Role",
      statement: "Print what JRE provides at runtime.",
      code: (cn) => javaSolution(cn, [], "", '        System.out.println("Runtime libraries + JVM");'),
      output: "Runtime libraries + JVM",
      input: "No input",
    },
    {
      title: "JVM Executes Bytecode",
      statement: "Simulate JVM printing the result of executing bytecode addition 10 + 5.",
      code: (cn) => javaSolution(cn, [], "", "        System.out.println(10 + 5);"),
      output: "15",
      input: "No input",
    },
    {
      title: "Compile Step Output",
      statement: "After compiling Hello.java, print the generated file name.",
      code: (cn) => javaSolution(cn, [], "", '        System.out.println("Hello.class");'),
      output: "Hello.class",
      input: "No input",
    },
    {
      title: "JDK vs JRE",
      statement: "Print which one developers need to write and compile code.",
      code: (cn) => javaSolution(cn, [], "", '        System.out.println("JDK");'),
      output: "JDK",
      input: "No input",
    },
  ],
  "variables-data-types": [
    {
      title: "Declare and Print an int",
      statement: "Declare int age = 21 and print it.",
      code: (cn) => javaSolution(cn, [], "", "        int age = 21;\n        System.out.println(age);"),
      output: "21",
      input: "age=21",
    },
    {
      title: "Store a double Value",
      statement: "Declare double price = 19.99 and print it.",
      code: (cn) =>
        javaSolution(cn, [], "", "        double price = 19.99;\n        System.out.println(price);"),
      output: "19.99",
      input: "price=19.99",
    },
    {
      title: "char and boolean Variables",
      statement: "Store grade='A' and passed=true; print both on one line separated by space.",
      code: (cn) =>
        javaSolution(
          cn,
          [],
          "",
          "        char grade = 'A';\n        boolean passed = true;\n        System.out.println(grade + \" \" + passed);"
        ),
      output: "A true",
      input: "grade=A, passed=true",
    },
    {
      title: "String Variable",
      statement: "Store String name = \"Alex\" and print a greeting: Hello, Alex",
      code: (cn) =>
        javaSolution(
          cn,
          [],
          "",
          '        String name = "Alex";\n        System.out.println("Hello, " + name);'
        ),
      output: "Hello, Alex",
      input: 'name="Alex"',
    },
    {
      title: "Swap Two int Variables",
      statement: "Swap a=5 and b=9 using a third variable; print a then b space-separated.",
      code: (cn) =>
        javaSolution(
          cn,
          [],
          "",
          "        int a = 5, b = 9, temp = a;\n        a = b;\n        b = temp;\n        System.out.println(a + \" \" + b);"
        ),
      output: "9 5",
      input: "a=5, b=9",
    },
  ],
  operators: [
    {
      title: "Add Two Numbers",
      statement: "Print the sum of 14 and 26.",
      code: (cn) => javaSolution(cn, [], "", "        System.out.println(14 + 26);"),
      output: "40",
      input: "a=14, b=26",
    },
    {
      title: "Modulo Remainder",
      statement: "Print the remainder when 17 is divided by 5.",
      code: (cn) => javaSolution(cn, [], "", "        System.out.println(17 % 5);"),
      output: "2",
      input: "17 % 5",
    },
    {
      title: "Relational Comparison",
      statement: "Print true if 10 > 7, else false.",
      code: (cn) => javaSolution(cn, [], "", "        System.out.println(10 > 7);"),
      output: "true",
      input: "10 > 7",
    },
    {
      title: "Logical AND",
      statement: "Print result of (5 > 3) && (2 < 1).",
      code: (cn) => javaSolution(cn, [], "", "        System.out.println((5 > 3) && (2 < 1));"),
      output: "false",
      input: "AND expression",
    },
    {
      title: "Compound Assignment",
      statement: "Start x=10, add 5 using +=, then print x.",
      code: (cn) =>
        javaSolution(cn, [], "", "        int x = 10;\n        x += 5;\n        System.out.println(x);"),
      output: "15",
      input: "x=10, add 5",
    },
  ],
  "type-casting": [
    {
      title: "Widening int to double",
      statement: "Cast int n=7 to double and print it.",
      code: (cn) =>
        javaSolution(cn, [], "", "        int n = 7;\n        double d = n;\n        System.out.println(d);"),
      output: "7.0",
      input: "n=7",
    },
    {
      title: "Narrowing double to int",
      statement: "Cast double pi=3.99 to int and print (truncated).",
      code: (cn) =>
        javaSolution(
          cn,
          [],
          "",
          "        double pi = 3.99;\n        int whole = (int) pi;\n        System.out.println(whole);"
        ),
      output: "3",
      input: "pi=3.99",
    },
    {
      title: "char to int Code Point",
      statement: "Print Unicode value of char c='A'.",
      code: (cn) =>
        javaSolution(cn, [], "", "        char c = 'A';\n        System.out.println((int) c);"),
      output: "65",
      input: "c='A'",
    },
    {
      title: "int Division vs float Division",
      statement: "Print int result of 7/2 then float result of 7.0/2 on two lines.",
      code: (cn) =>
        javaSolution(
          cn,
          [],
          "",
          "        System.out.println(7 / 2);\n        System.out.println(7.0 / 2);"
        ),
      output: "3\n3.5",
      input: "7/2 comparisons",
    },
    {
      title: "Safe Cast with Range",
      statement: "Cast long value 100L to int and print.",
      code: (cn) =>
        javaSolution(cn, [], "", "        long big = 100L;\n        int small = (int) big;\n        System.out.println(small);"),
      output: "100",
      input: "100L",
    },
  ],
  "scanner-input": [
    {
      title: "Read int from Scanner",
      statement: "Simulate reading age=25 from Scanner and printing: Age: 25",
      code: (cn) =>
        javaSolution(
          cn,
          [],
          "",
          "        int age = 25;\n        System.out.println(\"Age: \" + age);"
        ),
      output: "Age: 25",
      input: "25",
    },
    {
      title: "Read String and int",
      statement: "Simulate name=Sam and score=88; print: Sam scored 88",
      code: (cn) =>
        javaSolution(
          cn,
          [],
          "",
          '        String name = "Sam";\n        int score = 88;\n        System.out.println(name + " scored " + score);'
        ),
      output: "Sam scored 88",
      input: "Sam, 88",
    },
    {
      title: "Sum Two Scanned Values",
      statement: "Simulate reading 12 and 30; print their sum.",
      code: (cn) =>
        javaSolution(cn, [], "", "        int a = 12, b = 30;\n        System.out.println(a + b);"),
      output: "42",
      input: "12, 30",
    },
    {
      title: "Format Currency Output",
      statement: "Simulate price=49.5 from Scanner; print: Price: $49.5",
      code: (cn) =>
        javaSolution(
          cn,
          [],
          "",
          "        double price = 49.5;\n        System.out.println(\"Price: $\" + price);"
        ),
      output: "Price: $49.5",
      input: "49.5",
    },
    {
      title: "Even or Odd from Input",
      statement: "Simulate n=14 from Scanner; print Even if divisible by 2.",
      code: (cn) =>
        javaSolution(
          cn,
          [],
          "",
          "        int n = 14;\n        System.out.println(n % 2 == 0 ? \"Even\" : \"Odd\");"
        ),
      output: "Even",
      input: "14",
    },
  ],
  "first-java-program": [
    {
      title: "Print Hello World",
      statement: "Write your first complete Java program that prints Hello, Java Backend!",
      code: (cn) =>
        javaSolution(cn, [], "", '        System.out.println("Hello, Java Backend!");'),
      output: "Hello, Java Backend!",
      input: "No input",
    },
    {
      title: "Class and main Structure",
      statement: "Print the number of lines in a minimal valid Java class with main (answer: 5).",
      code: (cn) => javaSolution(cn, [], "", "        System.out.println(5);"),
      output: "5",
      input: "No input",
    },
    {
      title: "Print Multiple Lines",
      statement: "Print Line1 on first line and Line2 on second line.",
      code: (cn) =>
        javaSolution(
          cn,
          [],
          "",
          '        System.out.println("Line1");\n        System.out.println("Line2");'
        ),
      output: "Line1\nLine2",
      input: "No input",
    },
    {
      title: "Student Grade Message",
      statement: "Print: Welcome to Java Programming!",
      code: (cn) =>
        javaSolution(cn, [], "", '        System.out.println("Welcome to Java Programming!");'),
      output: "Welcome to Java Programming!",
      input: "No input",
    },
    {
      title: "Print Your Name",
      statement: "Store your name in a String and print: My name is Java Learner",
      code: (cn) =>
        javaSolution(
          cn,
          [],
          "",
          '        String name = "Java Learner";\n        System.out.println("My name is " + name);'
        ),
      output: "My name is Java Learner",
      input: 'name="Java Learner"',
    },
  ],
};

function pickTemplate(slug, index) {
  const list = TOPIC_PROBLEMS[slug] ?? TOPIC_PROBLEMS["first-java-program"];
  return list[index % list.length];
}

function typeSuffix(problemType, index) {
  if (problemType === "output-prediction") return " — Output?";
  if (problemType === "find-bug") return " — Fix the Bug";
  if (problemType === "dry-run") return " — Dry Run";
  if (problemType === "interview") return " — Practice";
  return "";
}

export function buildWeek1FundamentalsProblem(slug, topicTitle, category, difficulty, problemType, index) {
  const className = clsName(slug, `W1${difficulty[0]}${index + 1}`);
  const tpl = pickTemplate(slug, index);
  const topicLabel = TOPIC_TITLES[slug] ?? topicTitle;

  let code = tpl.code(className);
  let output = tpl.output;
  let statement = tpl.statement;
  let title = `${tpl.title}${typeSuffix(problemType, index)}`;

  if (problemType === "find-bug") {
    statement = `The following ${topicLabel} program has a beginner mistake. Fix it and explain.\n\n${statement}`;
    title = `Fix: ${tpl.title}`;
  } else if (problemType === "output-prediction") {
    statement = `Predict the output for this ${topicLabel} program.\n\n${statement}`;
    title = `Output: ${tpl.title}`;
  } else if (problemType === "dry-run") {
    statement = `Dry-run this ${topicLabel} program line by line.\n\n${statement}`;
    title = `Dry Run: ${tpl.title}`;
  } else if (problemType === "interview") {
    statement = `Interview-style ${topicLabel} question:\n\n${statement}`;
    title = `Practice: ${tpl.title}`;
  }

  const base = {
    id: `${slug}-${difficulty}-${problemType}-${index + 1}`,
    title,
    description: `${topicLabel} — ${tpl.title}`,
    problemType,
    estimatedMinutes: estMinutes(difficulty, problemType),
    problemStatement: statement,
    constraints: [
      `Use only ${topicLabel} concepts covered in Week 1.`,
      "Program must compile and run with the given values.",
    ],
    exampleInput: tpl.input,
    exampleOutput: output,
    explanation: `This exercise reinforces ${topicLabel} fundamentals.`,
    approaches: defaultApproaches(difficulty, "O(1)", "O(1)", "O(1)"),
    code,
    filename: `${className}.java`,
    expectedOutput: output,
    dryRun: `Trace the program and confirm output: ${output.split("\n")[0]}`,
    visualization: `${topicLabel} → stdout`,
    hints: [`Focus on ${topicLabel} syntax.`, "Run mentally before coding."],
    companyTags: [],
    commonMistakes: ["Missing semicolon", "Wrong variable type", "Incorrect println format"],
    interviewTips: ["State what each line does before running."],
    alternativeSolutions: ["Use formatted printf instead of println"],
    followUpQuestions: [`How would you extend this with Scanner input?`],
    practiceVariations: [`Change input values and re-run.`],
    practiceQuestions: [`Explain ${tpl.title} in your own words.`],
  };

  return { ...base, ...enrichProblem({ ...base, companyTags: [] }, { slug, difficulty, index, category }) };
}
