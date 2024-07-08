import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { OrgPageProps } from "../org-page-props";
import { Button } from "@/components/ui/button";

export default function BudgetPage({
  params: { organizationId },
}: OrgPageProps) {
  return (
    <section className="mx-auto flex flex-col  justify-center gap-8">
      <h1>Budget</h1>
      <div className="flex flex-wrap gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Current Budget</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Budget Templates</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Categories</CardTitle>
            <CardDescription>What you spent the most on</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Category 1</p>
            <p>Category 2</p>
            <p>Category 3</p>
          </CardContent>
          <CardFooter>
            <Button>View All</Button>
            <Button variant="secondary">Add Category</Button>
          </CardFooter>
        </Card>
      </div>
    </section>
  );
}
