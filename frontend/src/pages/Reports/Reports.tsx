import { BarChart3, CheckCircle2, Clock3, ListChecks } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

const stats = [
  { label: 'Completed', value: '24', icon: CheckCircle2 },
  { label: 'In progress', value: '11', icon: Clock3 },
  { label: 'Backlog', value: '7', icon: ListChecks },
];

function Reports() {
  return (
    <div className="flex w-full flex-col gap-6">
      <section className="motion-safe:animate-slide-up-fade">
        <Badge variant="secondary">
          <BarChart3 />
          Reports
        </Badge>
        <h2 className="mt-3 font-bold text-3xl tracking-tight">
          Understand your task flow
        </h2>
        <p className="mt-2 max-w-3xl text-muted-foreground">
          Review progress signals across completed work, active items, and
          upcoming tasks.
        </p>
      </section>

      <div className="grid w-full gap-4 md:grid-cols-3">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <Card key={stat.label} className="motion-safe:animate-fade-in">
              <CardHeader>
                <CardDescription className="flex items-center gap-2">
                  <Icon className="size-4" />
                  {stat.label}
                </CardDescription>
                <CardTitle className="text-3xl">{stat.value}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm">
                  Placeholder metric ready for API-backed reporting.
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

export default Reports;
