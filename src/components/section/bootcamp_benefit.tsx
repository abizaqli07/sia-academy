import { BiSolidVideoRecording } from "react-icons/bi";
import { GrDocumentConfig } from "react-icons/gr";
import { TbCertificate } from "react-icons/tb";

const BootcampBenefitComp = () => {
  return (
    <div className="mt-[30px] w-full rounded-lg text-center">
      <div className="text-xl font-bold">
        Banyak Manfaat <br /> yang kamu dapatkan
      </div>
      <div className=" mt-8 flex flex-wrap justify-center gap-8">
        <div className="flex max-w-[260px] flex-col items-center gap-3 rounded-lg p-4 text-gray-700 shadow-md transition-all duration-300 ease-in-out hover:bg-primary hover:text-white hover:shadow-lg">
          <div className="flex h-20 w-20 items-center justify-center rounded-lg bg-primary-dark">
            <BiSolidVideoRecording className="text-3xl text-primary" />
          </div>
          <div className="font-medium">
            Akses Recording Pembelajaran Melalui Website
          </div>
          <div>
            Video Pembelajaran akan didapatkan dalam berbentuk recording kelas
            bootcamp yang telah dijalankan, peserta akan mendapatkan akses video
            melalui website
          </div>
        </div>
        <div className="flex max-w-[260px] flex-col items-center gap-3 rounded-lg p-4 text-gray-700 shadow-md transition-all duration-300 ease-in-out hover:bg-primary hover:text-white hover:shadow-lg">
          <div className="flex h-20 w-20 items-center justify-center rounded-lg bg-primary-dark">
            <TbCertificate className="text-3xl text-primary" />
          </div>
          <div className="font-medium">Sertifikat Kompetensi</div>
          <div>
            Sertifikat dengan “Certified AI & Machine Learning Developer” akan
            diberikan di akhir bootcamp dengan predikat Entry Level
          </div>
        </div>
        <div className="flex max-w-[260px] flex-col items-center gap-3 rounded-lg p-4 text-gray-700 shadow-md transition-all duration-300 ease-in-out hover:bg-primary hover:text-white hover:shadow-lg">
          <div className="flex h-20 w-20 items-center justify-center rounded-lg bg-primary-dark">
            <GrDocumentConfig className="text-3xl text-primary" />
          </div>
          <div className="font-medium">Portofolio Proyek</div>
          <div>
            Case akan diberikan berbentuk project developing sebuah kecerdasan
            buatan yang akan sesuai dengan materi yang diterangkan, dan dapat
            digunakan sebagai portofolio
          </div>
        </div>
      </div>
    </div>
  );
};

export default BootcampBenefitComp;
