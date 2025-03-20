import { ArrowUpRight, Quote } from "lucide-react";

const AboutUsPage = () => {
  return (
    <div className="min-h-screen w-full">
      {/* ================= Hero ================ */}
      <section className="container mx-auto h-screen mt-32 md:mt-0">
        <div className="flex h-full w-full flex-col gap-20">
          <div className="flex flex-col md:flex-row flex-[3] items-center gap-y-12 md:justify-between">
            {/* Main Title */}
            <div className="flex max-w-[500px] flex-col items-start gap-12 self-start md:self-end text-4xl md:text-5xl font-semibold">
              <div className="flex items-center gap-6">
                Unleash <div className="title__comp"></div>
              </div>
              <div className="flex items-center gap-6">Your Market Full</div>
              <div className="flex items-center gap-6">
                Need <div className="title__comp"></div> Potentian
              </div>
            </div>
            {/* Description */}
            <div className="flex w-full max-w-[500px] flex-col gap-8">
              <div>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud
              </div>
              <div className="flex w-fit items-center justify-center gap-4 rounded-full bg-gray-100 px-8 py-4">
                <div>Know More</div>
                <ArrowUpRight />
              </div>
            </div>
          </div>
          {/* Main Image */}
          <div className="relative h-full w-full flex-[2] rounded-3xl bg-gray-100">
            <div className="absolute bottom-2 right-0 flex h-[70px] w-[310px] items-center justify-center gap-4 rounded-[30px] bg-gray-200 py-4">
              <div>Know More</div>
              <ArrowUpRight />
            </div>
          </div>
        </div>
      </section>

      {/* ========================== About ========================= */}
      <section className="container mx-auto mt-40">
        <div className="flex w-full justify-end h-fit relative">
          {/* Desc */}
          <div className="flex max-w-[900px] h-fit flex-col gap-8 absolute bottom-0 left-0">
            <div className="w-fit border-b-4 border-primary pb-4 text-[80px] font-light">
              What We Say <br /> About Our Self
            </div>
            <div className="flex items-start justify-start gap-4">
              <div className=" text-primary">
                <Quote size={50} />
              </div>
              <div>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud. Lorem ipsum dolor sit amet,
                consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                labore et dolore magna aliqua. Ut enim ad minim veniam, quis
                nostrud
              </div>
            </div>
          </div>
          {/* Image */}
          <div className="grid grid-cols-2 grid-rows-2 gap-4">
            <div className="h-[300px] w-[200px] rounded-br-[70px] rounded-tl-[70px] bg-gray-100"></div>
            <div className="h-[300px] w-[200px] rounded-bl-[70px] rounded-tr-[70px] bg-gray-100"></div>
            <div className="col-start-2 h-[300px] w-[200px] rounded-bl-[70px] rounded-br-[70px] rounded-tl-[70px] bg-gray-100"></div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUsPage;
