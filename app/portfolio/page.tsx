import { currentUser } from "@clerk/nextjs";
import { PortfolioTable } from "./_components/PortfolioTable";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";

export default async function PortfolioPage() {
  const user = await currentUser();
  if (!user) {
    return null;
  }

  return (
    <div className="grid w-full flex-grow grid-cols-3 gap-4 p-2">
      <PortfolioTable userId={user.id} />
      <Card>
        <CardHeader>
          <CardTitle>Future Graphs</CardTitle>
        </CardHeader>
      </Card>
    </div>
  );
}
