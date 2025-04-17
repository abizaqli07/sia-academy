import {
  LayoutDashboard,
  ListChecks,
  Pencil,
  CircleDollarSign,
} from "lucide-react";
import { redirect } from "next/navigation";
import { Banner } from "~/components/ui/banner";
import { IconBadge } from "~/components/ui/icon-badge";
import { api } from "~/trpc/server";
import { Actions } from "./_components/actions";
import { Button } from "~/components/ui/button";
import Link from "next/link";
import { ImageForm } from "./_components/image-form";
import { ImageBannerForm } from "./_components/image-banner-form";
import { ScrollArea } from "~/components/ui/scroll-area";
import { ChaptersForm } from "./_components/chapters-form";
import { CourseSale } from "./_components/course-sale";

export const dynamicParams = true;
export const dynamic = "force-dynamic";

const CourseDetailPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  const course = await api.adminRoute.course.getOne({
    courseId: id,
  });

  if (!course) {
    return redirect("/");
  }

  const requiredFields = [
    course.title,
    course.desc,
    course.titleDesc,
    course.image,
    course.bannerImage,
    course.level,
    course.materi,
    course.place,
    course.price,
    course.chapters.some((chapter) => chapter.isPublished),
  ];

  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;

  const completionText = `(${completedFields}/${totalFields})`;

  const isComplete = requiredFields.every(Boolean);

  return (
    <>
      {course.isHidden && (
        <Banner label="This course is unpublished. It will not be visible to the students." />
      )}
      <ScrollArea className="h-full">
        <div className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-y-2">
              <h1 className="text-2xl font-medium">Course setup</h1>
              <span className="text-sm text-slate-700">
                Complete all fields {completionText}
              </span>
            </div>
            <Actions
              disabled={!isComplete}
              courseId={id}
              isPublished={!course.isHidden}
            />
          </div>
          <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={LayoutDashboard} />
                <h2 className="text-xl">Customize your course</h2>
              </div>

              {/* Edit Details */}
              <div className="mt-6 rounded-md border bg-slate-100 p-4">
                <div className="flex items-center justify-between font-medium">
                  Course Details
                  <Link href={`/dashboard/admin/courses/${id}/details`}>
                    <Button variant="ghost">
                      <Pencil className="mr-2 h-4 w-4" />
                      Edit details
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Course Image */}
              <ImageForm initialData={course} courseId={course.id} />

              {/* Course Banner Image */}
              <ImageBannerForm initialData={course} courseId={course.id} />
            </div>

            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-x-2">
                  <IconBadge icon={ListChecks} />
                  <h2 className="text-xl">Course chapters</h2>
                </div>
                <ChaptersForm initialData={course} courseId={course.id} />
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-x-2">
                  <IconBadge icon={CircleDollarSign} />
                  <h2 className="text-xl">Course Pricing</h2>
                </div>
                <CourseSale
                  initialData={{
                    isSale: course.isSale ?? false,
                    price: course.price,
                    salePrice: course.salePrice ?? "0",
                  }}
                  chapterId={course.id}
                />
              </div>
            </div>
          </div>
        </div>
      </ScrollArea>
    </>
  );
};

export default CourseDetailPage;
