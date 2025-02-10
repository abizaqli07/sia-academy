import { api } from "~/trpc/server";
import CreateCourseForm from "./_components/create_course_form";


const CreatePage = async () => {
  const categories = await api.adminRoute.course.getCategory()

  return (
    <>
      <CreateCourseForm categories={categories}/>
    </>
  );
};

export default CreatePage;
