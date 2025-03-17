import Link from "next/link";
import { FaGithub, FaInstagram, FaLinkedinIn } from "react-icons/fa";

const JoinUsPage = () => {
  return (
    <div className="min-h-screen w-full">
      <section className="container mx-auto mt-[14vh] h-screen">
        <div className="flex h-[80vh] w-full gap-8">
          <div className="flex h-full flex-[3] flex-col gap-8 bg-gray-100">
            <div className="w-full flex-[4] rounded-2xl bg-gray-200 p-4"></div>
            <div className="bg-primary-dark flex w-full flex-[1] flex-col justify-between rounded-2xl p-4">
              <div className="text-white">
                <div className="text-2xl">Still in doubt</div>
                <div className="text-sm font-light">with Linkup DIgital?</div>
              </div>
              <div className=" flex justify-between items-end text-white">
                <div className=" text-2xl">Discover</div>
                <div className=" flex gap-4">
                  <Link href="/" className="w-fit rounded-lg bg-primary p-1 hover:bg-primary/50 transition-colors duration-300 ease-in-out">
                    <FaInstagram className="size-8" />
                  </Link>
                  <Link href="/" className="w-fit rounded-lg bg-primary p-1 hover:bg-primary/50 transition-colors duration-300 ease-in-out">
                    <FaLinkedinIn className="size-8" />
                  </Link>
                  <Link href="/" className="w-fit rounded-lg bg-primary p-1 hover:bg-primary/50 transition-colors duration-300 ease-in-out">
                    <FaGithub className="size-8" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="h-full flex-[2] rounded-2xl bg-gray-100"></div>
        </div>
      </section>
    </div>
  );
};

export default JoinUsPage;
