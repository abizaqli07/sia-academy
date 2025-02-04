"use client"

import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";

const SearchMentor = () => {
  return (
    <div className="w-full space-y-6">
      <div className="flex flex-col sm:flex-row items-start justify-start sm:items-center sm:justify-stretch gap-4">
        <Input id="skill" placeholder="Search Skill" />
        <Input id="industry" placeholder="Search Industry" />
        <Button>Search</Button>
      </div>

      <div className="w-full rounded-xl border-[thin] border-slate-200 p-4">
        <Tabs defaultValue="general" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="technology">Technology</TabsTrigger>
          </TabsList>
          <TabsContent value="general">
            <div className="flex w-full flex-wrap items-start justify-center gap-4">
              <div className="flex w-[100px] shrink-0 flex-col items-center justify-center gap-3 p-4 text-center">
                <div className="size-[50px] overflow-hidden rounded-full bg-primary"></div>
                <div className="text-base">Tags 1</div>
              </div>
              <div className="flex w-[100px] shrink-0 flex-col items-center justify-center gap-3 p-4 text-center">
                <div className="size-[50px] overflow-hidden rounded-full bg-primary"></div>
                <div className="text-base">Tags 2</div>
              </div>
              <div className="flex w-[100px] shrink-0 flex-col items-center justify-center gap-3 p-4 text-center">
                <div className="size-[50px] overflow-hidden rounded-full bg-primary"></div>
                <div className="text-base">Tags 3</div>
              </div>
              <div className="flex w-[100px] shrink-0 flex-col items-center justify-center gap-3 p-4 text-center">
                <div className="size-[50px] overflow-hidden rounded-full bg-primary"></div>
                <div className="text-base">Tags 4</div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="technology">
            <div className="flex w-full flex-wrap items-start justify-center gap-4">
              <div className="flex w-[100px] shrink-0 flex-col items-center justify-center gap-3 p-4 text-center">
                <div className="size-[50px] overflow-hidden rounded-full bg-primary"></div>
                <div className="text-base">Tags 1</div>
              </div>
              <div className="flex w-[100px] shrink-0 flex-col items-center justify-center gap-3 p-4 text-center">
                <div className="size-[50px] overflow-hidden rounded-full bg-primary"></div>
                <div className="text-base">Tags 2</div>
              </div>
              <div className="flex w-[100px] shrink-0 flex-col items-center justify-center gap-3 p-4 text-center">
                <div className="size-[50px] overflow-hidden rounded-full bg-primary"></div>
                <div className="text-base">Tags 3</div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default SearchMentor;
