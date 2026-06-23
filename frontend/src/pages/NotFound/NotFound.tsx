import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

function NotFound() {
  return (
    <div className="flex w-full flex-1 items-center justify-center">
      <Card className="w-full max-w-xl text-center">
        <CardContent className="py-10">
          <h1 className="text-4xl font-bold tracking-tight">404</h1>
          <p className="mt-4 text-muted-foreground">Page not found.</p>
          <Button className="mt-8" render={<Link to="/" />}>
            Go home
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

export default NotFound;
