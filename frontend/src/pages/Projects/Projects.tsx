import { FolderKanban, Plus } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

const projects = [
  { name: 'Product launch', status: 'Planning', tasks: 8 },
  { name: 'Nebari polish', status: 'Active', tasks: 5 },
  { name: 'API integration', status: 'Next up', tasks: 3 },
];

function Projects() {
  return (
    <div className="flex w-full flex-col gap-6">
      <section className="motion-safe:animate-slide-up-fade flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
        <div>
          <Badge variant="secondary">
            <FolderKanban />
            Projects
          </Badge>
          <h2 className="mt-3 font-bold text-3xl tracking-tight">
            Organize work by initiative
          </h2>
          <p className="mt-2 max-w-3xl text-muted-foreground">
            Group related tasks, track momentum, and keep every effort aligned
            with a clear status.
          </p>
        </div>
        <Button type="button">
          <Plus />
          New project
        </Button>
      </section>

      <div className="grid w-full gap-4 md:grid-cols-3">
        {projects.map((project) => (
          <Card key={project.name} className="motion-safe:animate-fade-in">
            <CardHeader>
              <CardTitle>{project.name}</CardTitle>
              <CardDescription>{project.tasks} open tasks</CardDescription>
            </CardHeader>
            <CardContent>
              <Badge variant="outline">{project.status}</Badge>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default Projects;
