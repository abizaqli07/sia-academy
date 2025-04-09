import { type RouterOutputs } from "~/trpc/react";
import AcceptButton from "./accept_button";
import DeclineButton from "./decline_button";

interface MenteeScheduleComponentInterface {
  data: RouterOutputs["mentorRoute"]["mentee"]["getOneMentee"];
}

const MenteeScheduleComponent = ({
  data,
}: MenteeScheduleComponentInterface) => {
  const schedules = data?.schedules;

  return (
    <div>
      {schedules?.length !== 0 ? (
        <div>
          {schedules?.map((item) => (
            <div key={item.id} className=" w-full p-4 rounded-lg flex justify-between bg-gray-200 items-center">
              <div>{item.date.toLocaleString()}</div>
              <div>{item.status}</div>
              <div className=" flex gap-2">
                <div>
                  <AcceptButton mentoringDataId={item.userMentoringDataId} message={item.message??""} />
                </div>
                <div>
                  <DeclineButton mentoringDataId={item.userMentoringDataId} message={item.message??""} />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div>User Not Requesting schedule yet</div>
      )}
    </div>
  );
};

export default MenteeScheduleComponent;
