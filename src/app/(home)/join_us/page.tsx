import Link from "next/link";
import { FaGithub, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { format } from "date-fns";

const JoinUsPage = () => {
  const today = new Date().toISOString();
  const dayOfWeek = format(today, "EEE");
  const dayOfMonth = format(today, "do");

  return (
    <div className="w-full">
      <section className="container mx-auto mt-[14vh] h-[86vh]">
        <div className="flex h-[80vh] w-full gap-8">
          <div className="flex h-full flex-[3] flex-col gap-8 bg-gray-100">
            <div className="w-full flex-[4] rounded-2xl bg-gray-200 p-4">
              
            </div>
            <div className="flex w-full flex-[1] flex-col justify-between rounded-2xl bg-primary-dark p-4">
              <div className="text-white">
                <div className="text-xl">Still in doubt</div>
                <div className="text-sm font-light">with Linkup DIgital?</div>
              </div>
              <div className="flex items-end justify-between text-white">
                <div className="text-xl">Discover</div>
                <div className="flex gap-4">
                  <Link
                    href="/"
                    className="w-fit rounded-lg bg-primary p-1 transition-colors duration-300 ease-in-out hover:bg-primary/50"
                  >
                    <FaInstagram className="size-5" />
                  </Link>
                  <Link
                    href="/"
                    className="w-fit rounded-lg bg-primary p-1 transition-colors duration-300 ease-in-out hover:bg-primary/50"
                  >
                    <FaLinkedinIn className="size-5" />
                  </Link>
                  <Link
                    href="/"
                    className="w-fit rounded-lg bg-primary p-1 transition-colors duration-300 ease-in-out hover:bg-primary/50"
                  >
                    <FaGithub className="size-5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="h-full flex-[2] rounded-2xl bg-gray-100 p-3">
            <div className="mr-auto flex h-full w-[70%] rounded-xl bg-white justify-between flex-col p-4">
              <div>
                <div className=" text-5xl">{dayOfWeek}</div>
                <div className=" text-4xl text-gray-500">{dayOfMonth}</div>
              </div>
              <div className=" text-sm font-light">
                <div>El Samara Coworking Space, Jl. Wora Wari No.3</div>
                <div>+61-851-7992-2903</div>
              </div>
              <div className=" font-medium">
                Linkup Digital
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default JoinUsPage;
