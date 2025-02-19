**ScrapeFlow,**

Implementation of the project created by Kliton Bare:
See video: https://www.youtube.com/watch?v=RkwbGuL-dzo&t=18243s

Workflow platforms with tasks, AI features and webscraping.
Allows users to create custom workflows.

Tech Stack:
Next.JS, TypeScript, Prisma ORM, OpenAI SDK, React-flow, React-query amongst other...

Random docs below //Need to fix

**To create a new task as dev:**

1. Create the task type: /types/task/
2. Create the task file: /lib/workflow/task/
   - Modify type, label and choose an appropriate icon.
   - Also change: credits, isEntryPoint
   - Finally modify the inputs and outputs arrays by adding objects with:
     - name, type, required, variant
   - Make sure that TaskParamType is defined for your task type in /lib/types/task.ts (See instructions further down)
3. Add the task to the task registry: /lib/workflow/task/registry.ts
4. Add the task to the task menu file: /app/workflow/\_components/TaskMenu.tsx
   - Find the appropriate place in the accordion to paste a new <TaskBtn>.
   - If new accordion type, add the id to defaultValue list to keep it open by default.
5. Define the executor file in the /lib/workflow/executor/
   - Trycatch block.
   - Try: Get inputs from environment and validate them one by one.
   - Try: Throw errors if there is an issue.
   - Try: Specify the execution logic
   - Catch: Log errors in environment.log.error(error.message). Return false.
6. Add executor to the executor registry: /lib/workflow/executor/registry.ts

** To create a new TaskParamType**

1. Go to app/workflow/\_components/nodes/param and create a new param file.
2. Style the new Param component.
3. Open app/workflow/\_components/nodes/NodeParamField.tsx
4. Add a new Case in the switch, containing the correct Param component with inputs
5. Choose a color in the app/workflow/\_components/nodes/common.tsx file.
