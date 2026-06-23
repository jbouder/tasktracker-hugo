import { CheckCircle2, ListTodo, Plus, Sparkles } from 'lucide-react';
import { type FormEvent, useId, useMemo, useRef, useState } from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Field, FieldDescription, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';

type Priority = 'high' | 'medium' | 'low';

interface Task {
  id: number;
  title: string;
  done: boolean;
  priority: Priority;
}

const priorityVariant: Record<
  Priority,
  'destructive' | 'default' | 'secondary'
> = {
  high: 'destructive',
  medium: 'default',
  low: 'secondary',
};

const initialTasks: Task[] = [
  { id: 1, title: 'Wire up the tasks API', done: false, priority: 'high' },
  { id: 2, title: 'Design the board view', done: false, priority: 'medium' },
  { id: 3, title: 'Set up the Nebari theme', done: true, priority: 'low' },
];

function Home() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [draft, setDraft] = useState('');
  const [createOpen, setCreateOpen] = useState(false);
  const [showCompleted, setShowCompleted] = useState(true);
  const nextId = useRef(initialTasks.length + 1);
  const newTaskId = useId();
  const showCompletedId = useId();

  const addTask = (event: FormEvent) => {
    event.preventDefault();
    const title = draft.trim();
    if (!title) return;
    setTasks((prev) => [
      { id: nextId.current++, title, done: false, priority: 'medium' },
      ...prev,
    ]);
    setDraft('');
    setCreateOpen(false);
  };

  const toggleTask = (id: number) =>
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task,
      ),
    );

  const completed = useMemo(
    () => tasks.filter((task) => task.done).length,
    [tasks],
  );
  const active = tasks.length - completed;
  const visibleTasks = showCompleted
    ? tasks
    : tasks.filter((task) => !task.done);

  return (
    <div className="flex w-full flex-col gap-6">
      <header className="motion-safe:animate-slide-up-fade flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <span className="flex size-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <ListTodo className="size-5" />
          </span>
          <h1 className="text-3xl font-bold tracking-tight">
            Welcome to TaskTracker
          </h1>
          <Badge variant="secondary">v0.1</Badge>
        </div>
        <p className="text-muted-foreground">
          A tiny task list to show off the Nebari design system. Everything
          below is built from the <code>@nebari</code> component registry.
        </p>
      </header>

      <Alert variant="info" className="motion-safe:animate-fade-in">
        <Sparkles className="size-4" />
        <AlertTitle>Try it out</AlertTitle>
        <AlertDescription>
          Add a task, then toggle one complete — the badges and counts update
          live.
        </AlertDescription>
      </Alert>

      <Card className="motion-safe:animate-fade-in">
        <CardHeader>
          <CardTitle>Your tasks</CardTitle>
          <CardDescription>
            {active} active · {completed} completed
          </CardDescription>
          <CardAction>
            <div className="flex items-center gap-3">
              <label
                htmlFor={showCompletedId}
                className="flex items-center gap-2 text-sm text-muted-foreground"
              >
                Show completed
                <Switch
                  id={showCompletedId}
                  checked={showCompleted}
                  onCheckedChange={setShowCompleted}
                />
              </label>
              <Dialog open={createOpen} onOpenChange={setCreateOpen}>
                <DialogTrigger asChild>
                  <Button type="button">
                    <Plus />
                    New task
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Create task</DialogTitle>
                    <DialogDescription>
                      Capture something before you forget.
                    </DialogDescription>
                  </DialogHeader>
                  <form onSubmit={addTask} className="grid gap-4">
                    <Field>
                      <FieldLabel htmlFor={newTaskId}>New task</FieldLabel>
                      <Input
                        id={newTaskId}
                        value={draft}
                        onChange={(event) => setDraft(event.target.value)}
                        placeholder="e.g. Review the pull request"
                      />
                      <FieldDescription>
                        Press Add or hit Enter.
                      </FieldDescription>
                    </Field>
                    <DialogFooter>
                      <Button
                        render={<button type="submit" />}
                        disabled={!draft.trim()}
                      >
                        <Plus />
                        Add task
                      </Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
          </CardAction>
        </CardHeader>
        <CardContent className="flex flex-col gap-1">
          {visibleTasks.length === 0 ? (
            <p className="py-6 text-center text-sm text-muted-foreground">
              Nothing here yet. Add your first task from the New task button.
            </p>
          ) : (
            visibleTasks.map((task, index) => (
              <div key={task.id}>
                {index > 0 && <Separator className="my-1" />}
                <div className="flex items-center gap-3 py-2">
                  <Switch
                    checked={task.done}
                    onCheckedChange={() => toggleTask(task.id)}
                    aria-label={`Mark "${task.title}" ${
                      task.done ? 'incomplete' : 'complete'
                    }`}
                  />
                  <span
                    className={
                      task.done
                        ? 'flex-1 text-muted-foreground line-through'
                        : 'flex-1'
                    }
                  >
                    {task.title}
                  </span>
                  {task.done ? (
                    <Badge variant="ghost">
                      <CheckCircle2 />
                      Done
                    </Badge>
                  ) : (
                    <Badge variant={priorityVariant[task.priority]}>
                      {task.priority}
                    </Badge>
                  )}
                </div>
              </div>
            ))
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default Home;
