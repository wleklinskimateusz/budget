import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export const EditStructure = () => {
  return (
    <div className="w-full max-w-md">
      <form className="mb-4 flex space-x-2">
        <Input className="flex-1" id="asset-name" placeholder="Asset Name" />
        <Input
          className="w-24"
          id="asset-percentage"
          placeholder="Percentage"
          type="number"
        />
        <Button type="submit">Add Asset</Button>
      </form>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="font-medium">Asset 1</span>
          <span className="font-medium">25%</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="font-medium">Asset 2</span>
          <span className="font-medium">35%</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="font-medium">Asset 3</span>
          <span className="font-medium">40%</span>
        </div>
      </div>
      <div className="mt-6">
        <div className="h-2 rounded-full bg-gray-200">
          <div
            className="h-full rounded-full bg-green-500"
            style={{
              width: "100%",
            }}
          />
        </div>
        <p className="mt-2 text-right">100%</p>
      </div>
    </div>
  );
};
