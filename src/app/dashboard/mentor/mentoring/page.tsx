import { CircleDollarSign, LayoutDashboard, Pencil } from "lucide-react";
import Link from "next/link";
import { Banner } from "~/components/ui/banner";
import { Button } from "~/components/ui/button";
import { IconBadge } from "~/components/ui/icon-badge";
import { ScrollArea } from "~/components/ui/scroll-area";
import { api } from "~/trpc/server";
import { Actions } from "./_components/actions";
import RegisterMentoringForm from "./_components/register_mentoring_form";
import { ImageBannerForm } from "./_components/image-banner-form";

const MentorMentoringPage = async () => {
  const mentorData = await api.mentorRoute.mentoring.getData();
  const mentoringData = mentorData?.mentoring

  const categories = await api.mentorRoute.mentoring.getCategory();

  if (categories.length === 0) {
    return <div>Error..</div>;
  }

  if (!mentoringData) {
    return <RegisterMentoringForm categories={categories} />;
  }

  const requiredFields = [
    mentoringData.title,
    mentoringData.desc,
    mentoringData.bannerImage,
    mentoringData.materi,
    mentoringData.price,
  ];

  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;

  const completionText = `(${completedFields}/${totalFields})`;

  const isComplete = requiredFields.every(Boolean);

  return (
    <>
      {mentoringData.isHidden && (
        <Banner label="This mentoring is unpublished. It will not be visible to the mentee." />
      )}
      <ScrollArea className="h-full">
        <div className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-y-2">
              <h1 className="text-2xl font-medium">Mentoring setup</h1>
              <span className="text-sm text-slate-700">
                Complete all fields {completionText}
              </span>
            </div>
            <Actions
              disabled={!isComplete}
              mentoringId={mentoringData.id}
              isPublished={!mentoringData.isHidden}
            />
          </div>
          <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={LayoutDashboard} />
                <h2 className="text-xl">Customize your mentoring</h2>
              </div>

              {/* Edit Details */}
              <div className="mt-6 rounded-md border bg-slate-100 p-4">
                <div className="flex items-center justify-between font-medium">
                  Mentoring Details
                  <Link href={`/dashboard/mentor/mentoring/details`}>
                    <Button variant="ghost">
                      <Pencil className="mr-2 h-4 w-4" />
                      Edit details
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Course Banner Image */}
              <ImageBannerForm initialData={mentoringData.bannerImage} mentoringId={mentoringData.id} />
            </div>

            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-x-2">
                  <IconBadge icon={CircleDollarSign} />
                  <h2 className="text-xl">Course Pricing</h2>
                </div>
                {/* <CourseSale initialData={{ isSale: course.isSale ?? false, price: course.price, salePrice: course.salePrice ?? "0" }} chapterId={course.id}/> */}
              </div>
            </div>

          </div>
        </div>
      </ScrollArea>
    </>
  );
};

export default MentorMentoringPage;
