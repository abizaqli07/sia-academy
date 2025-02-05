import { seed as drizzleSeed } from "drizzle-seed";
import { db } from ".";
import * as schema from "./schema";

// Seeding
async function seed() {
  const industries = [
    "Information Technology",
    "Education",
    "Business",
    "Health",
    "Math",
    "Social Sciences",
    "Art dan Humanities",
  ];
  const images = [
    "https://3w9phjqcaf.ufs.sh/f/5529d26e-6d17-47a1-8127-2da58c6101f1-s2e63z.jpg",
    "https://3w9phjqcaf.ufs.sh/f/59b5673e-9515-43e2-9295-3a2c4230adc2-ivx165.png",
    "https://3w9phjqcaf.ufs.sh/f/ae1af73c-888e-4638-8f76-0e80f4052a6e-msmq1r.jpeg",
  ];
  const bannerImages = [
    "https://3w9phjqcaf.ufs.sh/f/194a23d8-ea9f-4135-a33e-797497cbfdb5-1mmum.png",
    "https://3w9phjqcaf.ufs.sh/f/61b526bb-5818-45c9-889d-598f66a16a1d-uwei8l.png",
    "https://3w9phjqcaf.ufs.sh/f/a0f4831b-05bb-4876-98bd-1a750328a0ab-jscrml.png",
  ];

  await drizzleSeed(db, {
    category: schema.category,
    mentor: schema.mentor,
    course: schema.course,
    coursesToMentor: schema.coursesToMentors,
  }).refine((f) => ({
    category: {
      columns: {
        name: f.valuesFromArray({
          values: industries,
        }),
      }
    },
    mentor: {
      count: 10,
      columns: {
        company: f.companyName(),
        expertise: f.valuesFromArray({
          values: [
            "Web Developer",
            "Biology",
            "Management",
            "Ortopedic",
            "Algebra",
            "Psychology",
            "Digital Painting",
          ],
        }),
        name: f.fullName(),
        industry: f.valuesFromArray({ values: industries }),
        desc: f.loremIpsum({ sentencesCount: 5 }),
        title: f.jobTitle(),
        image: f.valuesFromArray({ values: images }),
      },
    },
    course: {
      columns: {
        bannerImage: f.valuesFromArray({ values: bannerImages }),
        date: f.datetime(),
        desc: f.loremIpsum({ sentencesCount: 5 }),
        image: f.valuesFromArray({ values: images }),
        isFeatured: f.valuesFromArray({ values: [true] }),
        isFree: f.boolean(),
        isHidden: f.valuesFromArray({ values: [false] }),
        isSale: f.valuesFromArray({ values: [false] }),
        isWebinar: f.boolean(),
        requireProofment: f.valuesFromArray({ values: [false] }),
        title: f.valuesFromArray({values: ["Title for Course"]}),
        titleDesc: f.loremIpsum({ sentencesCount: 12 }),
        materi: f.valuesFromArray({ values: ["Materi A,Materi B,Materi C"] }),
        place: f.streetAddress(),
        placeUrl: f.valuesFromArray({ values: ["https://zoom.com"] }),
        price: f.number({
          minValue: 100000,
          maxValue: 1000000,
          precision: 15,
        }),
      },
    },
  }));
}

seed().catch((err) => console.log(err));