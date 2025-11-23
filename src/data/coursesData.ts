// University of Lincoln - Course Data
// Organized by School and Subject Areas

export interface Course {
  name: string;
  description: string;
  interests: string[];
  link?: string;
  entryGrades?: string;
}

export interface School {
  name: string;
  courses: Course[];
}

export const coursesData: { [key: string]: School[] } = {
  Science: [
    {
      name: "School of Natural Sciences",
      courses: [
        {
          name: "BSc (Hons) Biology",
          description: "Biology is the science of life itself, exploring the structure, function, growth, origin, evolution, and distribution of living organisms.",
          interests: ["Natural environment", "Life sciences", "Research"],
          entryGrades: "96-112"
        },
        {
          name: "MBio Biology",
          description: "Advanced integrated Master's in Biology, exploring life sciences with extended research opportunities.",
          interests: ["Natural environment", "Life sciences", "Advanced research"],
          entryGrades: "104-120"
        },
        {
          name: "BSc (Hons) Biomedical Science",
          description: "Play a key role in improving human health and exploring life processes in humans; they lay the foundation for understanding and investigating health, disease, treatment and prevention.",
          interests: ["Human health", "Laboratory work", "Medical research"],
          entryGrades: "96-112"
        },
        {
          name: "MBio Biomedical Science",
          description: "Advanced biomedical science with integrated Master's level study, focusing on human health and disease investigation.",
          interests: ["Human health", "Critical thinking", "Advanced research"],
          entryGrades: "104-120"
        },
        {
          name: "BSc (Hons) Biochemistry",
          description: "Offers an understanding of the biological and chemical processes that allow life to thrive, giving us the tools we need to solve key challenges in cell biology, pathology, pharmacology, physiology and genetics.",
          interests: ["Biological processes", "Chemical analysis", "Medical applications"],
          entryGrades: "96-112"
        },
        {
          name: "MBio Biochemistry",
          description: "Understanding of the biological and chemical processes that allow life to thrive, with advanced study in cell biology, pathology, pharmacology, physiology, and genetics.",
          interests: ["Biological and chemical processes", "Advanced research", "Problem-solving"],
          entryGrades: "104-120"
        },
        {
          name: "BSc (Hons) Bioveterinary Science",
          description: "Opportunity to explore the science that underlies animal health and diseases. Information which veterinarians use to treat animals often comes from labs; this degree combines key concepts in animal science with relevant lab, field, and computer analysis.",
          interests: ["Animal health", "Veterinary science", "Laboratory analysis"],
          entryGrades: "96-112"
        },
        {
          name: "MBio Bioveterinary Science",
          description: "Advanced study exploring the science that underlies animal health and diseases with extended research opportunities.",
          interests: ["Animal health", "Veterinary research", "Advanced diagnostics"],
          entryGrades: "104-120"
        },
        {
          name: "BSc (Hons) Animal Behaviour and Welfare",
          description: "Scientific study of animal behavior furthers our understanding of why animals behave in the way that they do, and helps us learn how best to respond to the challenges that animals face when living in captive and wild environments.",
          interests: ["Animal behavior", "Welfare", "Conservation"],
          entryGrades: "96-112"
        },
        {
          name: "MBio Animal Behaviour and Welfare",
          description: "Advanced study of behaviour and welfare furthers our understanding of why animals behave in the way that they do, and help us learn how best to respond to the challenges that animals face.",
          interests: ["Animal behavior", "Research", "Welfare science"],
          entryGrades: "104-120"
        },
        {
          name: "BSc (Hons) Zoology",
          description: "Exploration of how animals have evolved, how they function and the ways in which they interact with their environment.",
          interests: ["Animals", "Evolution", "Ecology"],
          entryGrades: "96-112"
        },
        {
          name: "MBio Zoology",
          description: "Advanced exploration of how animals have evolved, how they function and the ways in which they interact with their environment.",
          interests: ["Animals", "Evolution", "Advanced ecology"],
          entryGrades: "104-120"
        },
        {
          name: "BSc (Hons) Ecology and Conservation",
          description: "Conserving biodiversity and avoiding the extinction of species are huge global challenges, scientists to understand organisms and ecosystems and how they respond to the threats they face.",
          interests: ["Conservation", "Biodiversity", "Environmental protection"],
          entryGrades: "96-112"
        },
        {
          name: "MBio Ecology",
          description: "Conserving biodiversity and avoiding the extinction of species are huge global challenges and scientists to understand organisms and ecosystems, and how they respond to the threats they face.",
          interests: ["Conservation", "Ecosystems", "Environmental science"],
          entryGrades: "104-120"
        },
        {
          name: "BSc (Hons) Chemistry",
          description: "Concerned with the study of matter, its properties and reactions, chemistry plays a vital role in practical science and tackling global challenges such as energy production, health and well-being, food security, and the use of natural resources.",
          interests: ["Chemical science", "Laboratory work", "Problem-solving"],
          entryGrades: "96-112"
        },
        {
          name: "MChem Chemistry",
          description: "Aims to integrate the core chemistry disciplines with advanced topics aligned to the major scientific challenges of the 21st Century.",
          interests: ["Analytical chemistry", "Advanced research", "Innovation"],
          entryGrades: "104-120"
        },
        {
          name: "BSc (Hons) Forensic Chemistry",
          description: "Application of chemistry knowledge and investigation for law enforcement and identifying substances to analysing crime scenes and the skills of a forensic chemist play a vital role in criminal investigation.",
          interests: ["Forensic science", "Crime investigation", "Analytical chemistry"],
          entryGrades: "96-112"
        },
        {
          name: "MChem Forensic Chemistry",
          description: "Extended study experience through a full-year industrial placement in forensic chemistry with industry partners.",
          interests: ["Crime scenes", "Advanced forensics", "Industry placement"],
          entryGrades: "104-120"
        },
        {
          name: "BSc (Hons) Chemistry for Drug Discovery",
          description: "Join the fight against disease by learning how to create better and safer drugs for society with a degree in chemistry for drug discovery and development.",
          interests: ["Drug development", "Pharmaceutical science", "Medical chemistry"],
          entryGrades: "96-112"
        },
        {
          name: "MChem Chemistry for Drug Discovery",
          description: "Designed to develop skills in the design and development of active molecules, all the way through to the final pharmaceutical products available to patients.",
          interests: ["Drug development", "Molecular design", "Pharmaceutical research"],
          entryGrades: "104-120"
        },
        {
          name: "BSc (Hons) Forensic Science",
          description: "Provide impartial evidence in criminal investigations through their scientific ability working in labs, at crime scenes and in courtrooms, utilising their highly developed biology and chemistry skills.",
          interests: ["Criminal investigation", "Laboratory analysis", "Crime scene analysis"],
          entryGrades: "96-112"
        },
        {
          name: "BA (Hons) Geography",
          description: "From climate change to health inequalities, and from food security to natural hazards and disasters, geography is at the heart of many of humanity's greatest challenges.",
          interests: ["Human geography", "Social science", "Environmental issues"],
          entryGrades: "96-112"
        },
        {
          name: "BSc (Hons) Geography",
          description: "From climate change to health inequalities, and from food security to natural hazards and disasters, geography is at the heart of many of humanity's greatest challenges.",
          interests: ["Physical geography", "Environmental science", "Sustainability"],
          entryGrades: "96-112"
        },
        {
          name: "MGeog Human Geography",
          description: "Perspectives on issues of globalisation, sustainability, geo-policy, and cultural change, ranging from the local to the global scale.",
          interests: ["Social science", "Analytical skills", "Global issues"],
          entryGrades: "104-120"
        },
        {
          name: "MGeog Physical Geography",
          description: "Explores environmental change and sustainability from local to global scales with collaborative and critical skills development.",
          interests: ["Environmental change", "Analytical skills", "Sustainability"],
          entryGrades: "104-120"
        }
      ]
    }
  ],
  
  Tech: [
    {
      name: "School of Engineering and Physical Sciences",
      courses: [
        {
          name: "BSc (Hons) Computer Science",
          link: "https://www.lincoln.ac.uk/course/cmpcmsub/",
          description: "Develop skills to design and build innovative technologies through core computer science, artificial intelligence, and machine learning, preparing for diverse careers in sectors transforming through digital and technological advancement.",
          interests: ["Software engineering", "Problem-solving", "Data science and analytics"],
          entryGrades: "104-112"
        },
        {
          name: "BSc (Hons) Computer Science with Artificial Intelligence",
          link: "https://www.lincoln.ac.uk/course/cmpaiub/",
          description: "Study the design of intelligent systems through computer science and AI, exploring deep learning, natural language processing, and ethical innovation to prepare for technology-driven careers across global industries.",
          interests: ["Artificial intelligence", "Machine learning", "Ethics and technology", "Software engineering"],
          entryGrades: "104-112"
        },
        {
          name: "BSc (Hons) Games Computing",
          link: "https://www.lincoln.ac.uk/course/cgpcpub/",
          description: "Explore computer science through game development, gaining skills in programming, design, 3D graphics, AI, and virtual reality to create engaging, interactive experiences for the fast-evolving digital landscape.",
          interests: ["Game design", "Software engineering", "User experience and interaction"],
          entryGrades: "104-112"
        },
        {
          name: "BSc (Hons) Games Computing with Virtual and Augmented Reality",
          description: "Combine games computing with virtual and augmented reality to design immersive, interactive experiences. Develop technical, creative, and user-focused skills for careers shaping the future of extended reality and digital innovation.",
          interests: ["VR/AR", "Game design", "Immersive technology"],
          entryGrades: "104-112"
        },
        {
          name: "MComp Computer Science",
          description: "Gain advanced expertise in computer science through this integrated Master's, developing skills in software design, AI, and research to create innovative technological solutions for real-world digital challenges.",
          interests: ["Advanced computing", "AI research", "Software architecture"],
          entryGrades: "112-120"
        },
        {
          name: "MComp Games Computing",
          description: "Advance your games computing expertise with Master's-level study, exploring programming, 3D graphics, AI, and virtual reality while developing creative, technical, and research skills for the evolving digital and gaming industries.",
          interests: ["Advanced game development", "3D graphics", "VR technology"],
          entryGrades: "112-120"
        },
        {
          name: "BSc (Hons) Computer Science with Cloud Computing",
          description: "Develop expertise in cloud technologies by combining core computer science with practical skills in cloud design.",
          interests: ["Cloud computing", "Distributed systems", "Infrastructure"],
          entryGrades: "104-112"
        },
        {
          name: "BSc (Hons) Computer Science with Cyber Security",
          link: "https://www.lincoln.ac.uk/course/cmpcybub/",
          description: "Combine computer science and cyber security to develop skills in threat analysis, network protection, and incident response, preparing for technical roles safeguarding modern computing systems across diverse industries.",
          interests: ["Cybersecurity", "Network security", "Threat analysis"],
          entryGrades: "104-112"
        },
        {
          name: "BSc (Hons) Mathematics and Computer Science",
          description: "This programme integrates mathematics and computer science, developing analytical, computational, and problem-solving skills through study of mathematical theory, programming, and data-driven approaches applied across modern technological fields.",
          interests: ["Software development", "Problem-solving", "Mathematical modeling"],
          entryGrades: "104-112"
        },
        {
          name: "MSci Mathematics and Computer Science",
          description: "Bridging mathematics and computer science, this integrated Master's develops advanced analytical, computational, and research skills through applied study, project work, and exploration of the theoretical foundations driving digital innovation.",
          interests: ["Mathematics and computation", "Advanced algorithms", "Research"],
          entryGrades: "112-120"
        }
      ]
    }
  ],

  Engineering: [
    {
      name: "School of Engineering and Physical Sciences",
      courses: [
        {
          name: "BEng (Hons) Mechanical Engineering",
          link: "https://www.lincoln.ac.uk/course/egrub/",
          description: "Develop creative and practical engineering skills through a research-led programme built with industry collaboration, focusing on product design, innovation, and sustainable solutions for modern mechanical engineering challenges.",
          interests: ["Product design", "Innovation", "Sustainability"],
          entryGrades: "104-112"
        },
        {
          name: "MEng (Hons) Mechanical Engineering",
          description: "Gain advanced expertise in mechanical engineering through a research-led, industry-collaborative Master's programme focused on innovation, product design, and sustainable solutions for modern engineering challenges and professional career development.",
          interests: ["Advanced engineering", "Research", "Industry collaboration"],
          entryGrades: "112-120"
        },
        {
          name: "BEng (Hons) Mechatronic Engineering",
          link: "https://www.lincoln.ac.uk/course/egrbcnub/",
          description: "Design and develop mechanical-electrical systems in this industry-guided programme, building skills in automation, robotics, control and innovation to become versatile engineers ready for modern challenges.",
          interests: ["Robotics", "Automation", "Control systems"],
          entryGrades: "104-112"
        },
        {
          name: "BEng (Hons) Electrical and Electronic Engineering",
          description: "Develop industry-ready skills in electrical and electronic engineering through hands-on projects and research-led teaching, focusing on innovation, sustainability, and real-world applications in energy, automation, and communications.",
          interests: ["Energy systems", "Automation", "Communications"],
          entryGrades: "104-112"
        },
        {
          name: "MEng (Hons) Electrical and Electronic Engineering",
          description: "This programme examines the principles and applications of electrical and electronic engineering across energy, automation, communications, and transport, combining research-led learning with practical experience and interdisciplinary collaboration.",
          interests: ["Advanced electronics", "Energy", "Research"],
          entryGrades: "104-112"
        },
        {
          name: "BEng (Hons) General Engineering",
          description: "Develop broad engineering expertise across multiple disciplines, gaining adaptable skills for sustainable, real-world problem-solving through a flexible programme combining core engineering principles with practical, cross-disciplinary experience.",
          interests: ["Multi-disciplinary", "Problem-solving", "Sustainability"],
          entryGrades: "104-112"
        },
        {
          name: "BEng (Hons) Biomedical Engineering",
          description: "Apply engineering principles to healthcare and medicine, developing innovative solutions and sustainable technologies to improve lives.",
          interests: ["Medical technology", "Healthcare innovation", "Bioengineering"],
          entryGrades: "104"
        }
      ]
    }
  ],

  Mathematics: [
    {
      name: "School of Engineering and Physical Sciences",
      courses: [
        {
          name: "BSc (Hons) Mathematics",
          description: "This programme develops knowledge in pure and applied mathematics, fostering analytical and problem-solving skills through research-informed teaching, collaborative projects, and creative approaches to tackling real-world mathematical challenges.",
          interests: ["Pure mathematics", "Applied mathematics", "Problem-solving"],
          entryGrades: "104-112"
        },
        {
          name: "MMath Mathematics",
          link: "https://www.lincoln.ac.uk/course/mthhmthum/",
          description: "This programme develops advanced mathematical knowledge through study of analytical and numerical methods, research techniques, and independent project work, building strong problem-solving, reasoning, and communication skills for professional and academic contexts.",
          interests: ["Advanced mathematics", "Research", "Analytical methods"],
          entryGrades: "112-120"
        },
        {
          name: "BSc (Hons) Mathematics and Theoretical Physics",
          description: "This programme explores the connections between mathematics and physics, combining theoretical and applied study to develop analytical, numerical, and research skills essential for understanding and solving scientific and technological problems.",
          interests: ["Problem-solving and logic", "Research and data analysis", "Theoretical physics"],
          entryGrades: "104-112"
        },
        {
          name: "MMath Mathematics and Theoretical Physics",
          link: "https://www.lincoln.ac.uk/course/mthphyum/",
          description: "This programme combines mathematics and theoretical physics, developing advanced analytical, numerical, and problem-solving skills.",
          interests: ["Advanced mathematics", "Theoretical physics", "Research"],
          entryGrades: "112-120"
        },
        {
          name: "BSc (Hons) Mathematics with Philosophy",
          description: "This programme integrates mathematics and philosophy, combining quantitative reasoning with critical analysis to explore logic, problem-solving, and the philosophical principles underlying how we understand knowledge, truth, and the world.",
          interests: ["Problem-solving and logic", "Research and data analysis", "Philosophy"],
          entryGrades: "104-112"
        },
        {
          name: "BSc (Hons) Chemistry with Mathematics",
          link: "https://www.thecompleteuniversityguide.co.uk/courses/details/chemistry-with-mathematics/56779328",
          description: "This programme combines mathematics and chemistry, exploring their interconnections across physical, organic, and inorganic chemistry while developing analytical, quantitative, and problem-solving skills applicable to scientific and industrial contexts.",
          interests: ["Chemical analysis", "Mathematical modeling", "Problem-solving"],
          entryGrades: "96-112"
        },
        {
          name: "MChem Chemistry with Mathematics",
          link: "https://www.thecompleteuniversityguide.co.uk/courses/details/chemistry-with-mathematics-mchem/56985664",
          description: "Exploring the intersection of mathematics and chemistry, this course integrates physical, organic, and inorganic chemistry with analytical and quantitative methods to understand and apply chemistry in scientific and societal contexts.",
          interests: ["Advanced chemistry", "Mathematical analysis", "Research"],
          entryGrades: "112"
        }
      ]
    }
  ],

  Physics: [
    {
      name: "School of Engineering and Physical Sciences",
      courses: [
        {
          name: "BSc (Hons) Physics",
          description: "Explore the principles of physics through theory, computation, and experiments, studying topics such as quantum mechanics, astrophysics, and electromagnetism while developing practical and analytical research skills.",
          interests: ["Fundamental physics", "Research and experimentation", "Problem-solving"],
          entryGrades: "104-112"
        },
        {
          name: "BSc (Hons) Physics with Astrophysics",
          description: "Study the laws of physics alongside astrophysics, exploring topics like cosmology, space science, and extreme environments while developing strong analytical, computational, and research skills through theory, observation, and experimentation.",
          interests: ["Space and observation", "Computational modeling", "Astrophysics"],
          entryGrades: "104-112"
        },
        {
          name: "BSc (Hons) Physics with Philosophy",
          description: "Combining physics and philosophy, this course explores scientific principles alongside critical inquiry, encouraging reflection on the nature of reality, knowledge, and the universe through theory, experimentation, and analytical reasoning.",
          interests: ["Philosophy of science", "Research and analytics", "Fundamental physics"],
          entryGrades: "104-112"
        },
        {
          name: "MPhys Physics",
          description: "This course develops advanced expertise in fundamental and applied physics involving mathematical, computational, and experimental study, with opportunities for independent research, extended projects, and scientific publication preparation.",
          interests: ["Applied physics", "Analytical methods", "Advanced research"],
          entryGrades: "104-112"
        },
        {
          name: "MPhys Physics and Astrophysics",
          description: "This advanced course combines physics and astrophysics, exploring cosmology, space science, and extreme environments while developing high-level analytical, computational, and research skills through extended study and substantial project work.",
          interests: ["Space science", "Computational modeling", "Advanced research"],
          entryGrades: "104-112"
        },
        {
          name: "MPhys Physics with Philosophy",
          description: "This integrated course explores the relationship between physics and philosophy, combining scientific theory and experimentation with critical inquiry, advanced study, and project work to examine fundamental questions about reality and knowledge.",
          interests: ["Philosophy of science", "Research and analytics", "Advanced physics"],
          entryGrades: "104-112"
        }
      ]
    }
  ],

  Health: [
    {
      name: "School of Lincoln Medical School",
      courses: [
        {
          name: "MBChB Medicine",
          description: "Several themes lie at the heart of the programme, including clinical and communication skills, clinical reasoning, health equity, health education, public health, medical and healthcare leadership, medical ethics and law and research and quality improvement.",
          interests: ["Scientific and academic interests", "Healthcare", "Patient care"],
          entryGrades: "AAA"
        },
        {
          name: "MBChB (with Gateway Year)",
          description: "Underpins the key themes in modern healthcare with links with the NHS and healthcare providers and case-based learning which makes use of real patient scenarios.",
          interests: ["Communication", "Healthcare", "Clinical skills"],
          entryGrades: "BBB"
        }
      ]
    },
    {
      name: "School of Health and Care Sciences",
      courses: [
        {
          name: "BSc (Hons) Diagnostic Radiography",
          description: "Diagnostic Radiography involves using medical imaging techniques to support the diagnosis and treatment of illnesses and injuries, with the course preparing graduates for professional registration and employment as qualified radiographers.",
          interests: ["Healthcare and patient care", "Science and technology", "Problem-solving and analysis"],
          entryGrades: "104-120"
        },
        {
          name: "BSc (Hons) Public Health and Human Behaviour",
          description: "Health and social care practitioners can make a profound difference to the lives of individuals, communities and wider society and work in a variety of settings including healthcare, education and public health.",
          interests: ["Health and social care services", "Working with people", "Employability skills"],
          entryGrades: "96-112"
        },
        {
          name: "BSc (Hons) Midwifery",
          description: "Midwives offer specialist support to mothers from the antenatal to the postnatal period, and work with a range of healthcare professionals to promote the best interests of a mother and her baby.",
          interests: ["Healthcare", "Practical placement", "Maternal care"],
          entryGrades: "104-120"
        },
        {
          name: "BSc (Hons) Nursing (Registered Nurse – Adult)",
          description: "Nurses perform a vital role in 21st Century healthcare, in both primary and secondary care settings, restoring and promoting health, supporting patients and their families and profiling healthcare needs of Communities.",
          interests: ["Healthcare", "Helping people", "Practical placement"],
          entryGrades: "104-120"
        },
        {
          name: "BSc (Hons) Nursing (Registered Nurse – Child)",
          description: "Nurses perform a vital role in 21st Century healthcare, in both primary and secondary care settings, restoring and promoting health, supporting patients and their families and profiling healthcare needs of Communities.",
          interests: ["Healthcare", "Helping children", "Practical placement"],
          entryGrades: "104-120"
        },
        {
          name: "BSc (Hons) Nursing (Registered Nurse – Mental Health)",
          description: "Healthcare Nursing aims to prepare students to become fit for practice in accordance with the NMC's standards for pre-registration nursing education and to be eligible to register as a qualified nurse.",
          interests: ["Healthcare", "Mental health support", "Practical placement"],
          entryGrades: "104-120"
        },
        {
          name: "BSc (Hons) Paramedic Science",
          description: "Healthcare Paramedics work on the frontline of healthcare, looking after those in need and responding to a wide range of situations, from minor wounds and conditions to more serious, life-threatening injuries and illness.",
          interests: ["Healthcare", "Emergency response", "Practical placements"],
          entryGrades: "104-120"
        },
        {
          name: "BSc (Hons) Social Work Practice",
          description: "Offers students a flexible route to a qualification as a social worker and will be delivered via a blended learning method of online and face-to-face.",
          interests: ["Understanding society", "Social problems", "Practical experiences"],
          entryGrades: "96-112"
        },
        {
          name: "BSc (Hons) Pharmaceutical Science",
          description: "Pharmaceutical science encompasses a range of scientific laboratory-based practicals introducing students to the exciting world of drug discovery, development, and management.",
          interests: ["Experimental work", "Laboratory practicals", "Problem-solving"],
          entryGrades: "96-112"
        },
        {
          name: "MSci Applied Pharmaceutical Science",
          description: "Encompasses a range of scientific disciplines, introducing students to the exciting world of drug discovery, development, and management.",
          interests: ["Advanced pharmaceutical research", "Drug development", "Laboratory work"],
          entryGrades: "104-120"
        },
        {
          name: "MSci Pharmaceutical Science",
          description: "Encompasses the similar features as the pharmaceutical degree alongside working on real-world problems currently faced by the pharmaceutical industry with the chance to develop an understanding of how their decision in the management of these projects can have business implications.",
          interests: ["Pharmaceutical industry", "Business applications", "Problem-solving"],
          entryGrades: "104-120"
        },
        {
          name: "MPharm Pharmacy",
          description: "Combines the sciences of medicines and disease with the development of the patient-facing decision-making skills and professional practice required by modern pharmacists.",
          interests: ["Patient care", "Pharmaceutical science", "Clinical practice"],
          entryGrades: "112-120"
        }
      ]
    }
  ],

  Social: [
    {
      name: "School of Psychology, Sports Science and Wellbeing",
      courses: [
        {
          name: "BSc (Hons) Psychology",
          description: "Psychology studies how people think, feel, and behave. Lincoln's BSc (Hons) Psychology explores the mind, brain, and behaviour through research and practical learning.",
          interests: ["Human behavior", "Mental processes", "Research"],
          entryGrades: "104-120"
        },
        {
          name: "BSc (Hons) Psychology (Sport and Exercise)",
          description: "Explore how psychological principles apply to sport and exercise. Learn how thoughts, emotions, and behaviors influence performance, motivation, and wellbeing through research-led teaching and specialist modules in applied sport psychology.",
          interests: ["Human behavior", "Sport psychology", "Performance"],
          entryGrades: "104-120"
        },
        {
          name: "BSc (Hons) Psychology with Forensic Psychology",
          description: "Examine human behaviour and thought through a psychological lens, specialising in forensic psychology to explore criminal motives, offender behaviour, and the application of psychology within the justice system.",
          interests: ["Forensic psychology", "Criminal behavior", "Justice system"],
          entryGrades: "104-120"
        },
        {
          name: "BSc (Hons) Psychology with Mental Health",
          description: "Explore mental health across the lifespan, examining diagnosis, treatment, and wellbeing. Learn from experts about psychological processes, therapy approaches, and the biological, cognitive, and social factors influencing mental health.",
          interests: ["Mental health", "Therapy", "Wellbeing"],
          entryGrades: "104-120"
        }
      ]
    }
  ],

  Business: [
    {
      name: "School of Business",
      courses: [
        {
          name: "BA (Hons) Accountancy and Finance",
          description: "Address real world financial challenges by developing critical thinking, commercial awareness with accountancy skills.",
          interests: ["Financial analysis", "Problem Solving", "Mathematical skills"],
          link: "https://www.lincoln.ac.uk/course/accfinub/",
          entryGrades: "104-112"
        },
        {
          name: "BSc (Hons) Banking and Finance",
          description: "Practical + real world experience in financial systems, decision making preparing for future career.",
          interests: ["Maths", "Computer science", "Decision making"],
          link: "https://www.lincoln.ac.uk/studywithus/subjects/accountancyfinanceandeconomics/",
          entryGrades: "96-104"
        },
        {
          name: "BSc (Hons) Economics and Finance",
          description: "Analyse financial and economic events, focusing on practical skills in financial techniques + market decision making.",
          interests: ["Accountancy", "Maths", "Economics", "Financial analysis"],
          link: "https://www.lincoln.ac.uk/course/ecofinub/",
          entryGrades: "96-104"
        },
        {
          name: "BA (Hons) Business and Management",
          description: "Dynamic global business environment through practical experience, critical thinking and broad management knowledge.",
          interests: ["Adaptability", "Problem based learning", "Leadership"],
          link: "https://www.lincoln.ac.uk/studywithus/subjects/management/",
          entryGrades: "96-104"
        },
        {
          name: "BA (Hons) Business",
          description: "Developing skills through an international perspective, offering practical experience in global business.",
          interests: ["Critical thinking", "Problem solving", "Analytical skills"],
          link: "https://www.lincoln.ac.uk/course/busprpub/",
          entryGrades: "96-104"
        },
        {
          name: "BA (Hons) Business Economics",
          description: "Analyse + solve complex business problems in international and national economic context.",
          interests: ["Economics", "Analytical thinking", "Business decision making"],
          link: "https://www.lincoln.ac.uk/course/busecoub/",
          entryGrades: "96-104"
        },
        {
          name: "BSc (Hons) Economics",
          description: "Prepares to analyse evolving economic issues through critical thinking and rigorous frameworks.",
          interests: ["Economics", "Data interpretation", "Problem solving"],
          link: "https://www.lincoln.ac.uk/course/ecoecoub/",
          entryGrades: "104-112"
        },
        {
          name: "BA (Hons) International Business Management",
          description: "Developing understanding of cross-cultural communication + decision making.",
          interests: ["Cultural Competency", "Global market analysis"],
          link: "https://www.lincoln.ac.uk/studywithus/subjects/management/",
          entryGrades: "96-104"
        },
        {
          name: "BA (Hons) International Tourism Management",
          description: "Excel in dynamic tourism industry by developing expertise in global planning, management and sustainable practices.",
          interests: ["Tourism strategy", "Global travel operations", "Sustainability", "Destination marketing"],
          link: "https://www.lincoln.ac.uk/course/inttouub/",
          entryGrades: "96-104"
        },
        {
          name: "BA (Hons) Sports Business Management",
          description: "Commercial and societal aspects of global sport industries, focusing on management + policy.",
          interests: ["Sports", "Business", "Practical skills"],
          link: "https://www.lincoln.ac.uk/studywithus/subjects/management/",
          entryGrades: "96-104"
        },
        {
          name: "BSc (Hons) Events Management",
          description: "Industrial knowledge and leadership abilities for a successful career in global event industry with hands on experience.",
          interests: ["Event design + planning", "Business leadership", "Problem solving"],
          link: "https://www.lincoln.ac.uk/studywithus/subjects/marketingandtourism/",
          entryGrades: "96-104"
        },
        {
          name: "BA (Hons) Business and Marketing",
          description: "Emphasizes understanding the international business landscape, identifying marketing opportunities.",
          interests: ["Marketing strategy", "Marketing analysis", "Problem solving"],
          link: "https://www.lincoln.ac.uk/course/mktprpub/",
          entryGrades: "96-104"
        },
        {
          name: "BA (Hons) Marketing and Advertising",
          description: "Diverse roles in the evolving marketing industry by developing strategic, creative marketing skills.",
          interests: ["Marketing", "Computing", "Creative"],
          link: "https://www.lincoln.ac.uk/course/advmktub/",
          entryGrades: "104"
        }
      ]
    }
  ],

  Arts: [
    {
      name: "School of Design",
      courses: [
        {
          name: "BA (Hons) Creative Advertising",
          description: "Developing creativity, conceptual thinking and communication skills to craft ideas that influence audiences + industrial collabs.",
          interests: ["Creativity", "Communication", "Media production"],
          link: "https://www.lincoln.ac.uk/studywithus/subjects/artanddesign/",
          entryGrades: "104-112"
        },
        {
          name: "BA (Hons) Fine Art",
          description: "Emphasizes developing socially engaged and versatile artists who collab across platforms.",
          interests: ["Artistic practices", "Collaboration", "Digital media"],
          link: "https://www.lincoln.ac.uk/course/artartub/",
          entryGrades: "104-112"
        },
        {
          name: "BA (Hons) Illustration",
          description: "Develop craftmanship, creativity through traditional techniques. Completing project virtually and in person.",
          interests: ["Illustration", "Digital art", "Storytelling"],
          link: "https://www.lincoln.ac.uk/course/illillub/",
          entryGrades: "104-112"
        },
        {
          name: "BA (Hons) Photography",
          description: "Encouraging creative interpretation of communities and environments through practical projects.",
          interests: ["Photography", "Storytelling"],
          link: "https://www.lincoln.ac.uk/course/clmclmub/",
          entryGrades: "104-112"
        },
        {
          name: "BA (Hons) Animation and Visual Effects",
          description: "Prepare students as creative animators with opportunities to produce award winning short films.",
          interests: ["Animation Techniques", "Storytelling", "Digital visualization"],
          link: "https://www.lincoln.ac.uk/course/anianiub/",
          entryGrades: "104-112"
        },
        {
          name: "BA (Hons) Graphic Design",
          description: "Developing creative storytelling skills across various media. Industry-standard tech and opportunities for international competition and portfolio development.",
          interests: ["Visual storytelling", "Digital design", "Creative projects"],
          link: "https://www.lincoln.ac.uk/course/gragraub/",
          entryGrades: "96-112"
        },
        {
          name: "BA (Hons) Product Design",
          description: "Creating innovative challenges by combining creative design with digital tech.",
          interests: ["Product design", "Tech fabrication"],
          link: "https://www.lincoln.ac.uk/course/prdprdub/",
          entryGrades: "104-112"
        },
        {
          name: "BArch (Hons) Architecture",
          description: "Heritage and archaeology with contemporary design for a career in architecture through creative projects.",
          interests: ["Architectural Design", "Heritage Studies", "Maths"],
          link: "https://www.lincoln.ac.uk/course/arcboaub/",
          entryGrades: "104-112"
        },
        {
          name: "BA (Hons) Interior Architecture and Design",
          description: "Innovative and ethical design skills through interdisciplinary approach leading to positive change.",
          interests: ["Maths", "Architectural design", "Interior design"],
          link: "https://www.lincoln.ac.uk/course/intintub/",
          entryGrades: "104-112"
        }
      ]
    }
  ],

  Humanities: [
    {
      name: "School of Humanities and Performing Arts",
      courses: [
        {
          name: "BA (Hons) Drama and English",
          description: "Foundational training of physical skills, voice, writing, design in performance manner.",
          interests: ["Performance", "Physical theatre", "Stage design"],
          link: "https://www.lincoln.ac.uk/course/enldraub/",
          entryGrades: "104-112"
        },
        {
          name: "BA (Hons) Drama, Theatre and Performance",
          description: "Exploration of theatre traditions with opportunity of international study to develop career prospects.",
          interests: ["Theatrical performance", "Creative practice", "Dance", "Music"],
          link: "https://www.lincoln.ac.uk/course/dradraub/",
          entryGrades: "104-112"
        },
        {
          name: "BA (Hons) Musical Theatre",
          description: "Comprehensive education in creating, performing theatre. Opportunity to learn from industry practitioners.",
          interests: ["Music", "Performance", "Theatre"],
          link: "https://www.lincoln.ac.uk/course/mustheub/",
          entryGrades: "104-112"
        },
        {
          name: "BA (Hons) Technical Theatre and Stage Management",
          description: "Prepares students for careers in live arts by practicing skills and improving industrial knowledge.",
          interests: ["Performance", "Theatre design", "Stage management"],
          link: "https://www.lincoln.ac.uk/course/tectheub/",
          entryGrades: "104-112"
        },
        {
          name: "BA (Hons) Film and Media",
          description: "Learn how film and tv influences society and culture. Opportunities to explore media theory + history.",
          interests: ["Media analysis", "Film + tv studies", "Critical theory"],
          entryGrades: "104-112"
        },
        {
          name: "BA (Hons) Film and Television Studies",
          description: "Exploring documentaries + heritage cinema while preparing for creative and professional opportunities in media industry.",
          interests: ["Critical analysis", "Media production", "Industry engagement"],
          link: "https://www.lincoln.ac.uk/course/ftvftvub/",
          entryGrades: "104-112"
        },
        {
          name: "BA (Hons) Film Production",
          description: "Professional training into film making with industrial standard facilities with mentoring from award winning professionals.",
          interests: ["Film making", "Industrial equipment usage"],
          link: "https://www.lincoln.ac.uk/course/medproub/",
          entryGrades: "104-112"
        },
        {
          name: "BA (Hons) Media Production",
          description: "Creative and technical skills across diverse media platforms and emerging technology.",
          interests: ["Media Creation", "Digital tech", "Innovation design"],
          link: "https://www.lincoln.ac.uk/course/medmedub/",
          entryGrades: "104-112"
        },
        {
          name: "BA (Hons) Media Studies",
          description: "Critical and creative exploration of how digital media shapes society. Enabling students to understand the pervasive role of media.",
          interests: ["Media analysis", "Communication", "Digital tech"],
          link: "https://www.lincoln.ac.uk/course/mdsmdsub/",
          entryGrades: "104"
        },
        {
          name: "BA (Hons) Creative Writing",
          description: "Develop unique voices across diverse genres, expanding creative and technical writing.",
          interests: ["Creative writing", "Genre diversity", "Literature"],
          link: "https://www.lincoln.ac.uk/course/crwcrwub/",
          entryGrades: "104-112"
        },
        {
          name: "BA (Hons) English",
          description: "Exploration of medieval times to contemporary culture. Research led teaching.",
          interests: ["Literary analysis", "Critical research", "Cultural studies"],
          link: "https://www.lincoln.ac.uk/course/enlenlub/",
          entryGrades: "96-112"
        },
        {
          name: "BA (Hons) English and Creative Writing",
          description: "Offering diverse genres, expert workshops and opportunities to build professional portfolios.",
          interests: ["Creative writing", "Literary analysis", "Cultural perspectives"],
          link: "https://www.lincoln.ac.uk/course/enlcrwub/",
          entryGrades: "104-112"
        },
        {
          name: "BA (Hons) English and History",
          description: "Combining literary and historical analysis across global periods. Developing practical skills in research.",
          interests: ["Interdisciplinary analysis", "Research + data skills", "Critical thinking"],
          link: "https://www.lincoln.ac.uk/course/enlhstub/",
          entryGrades: "104-112"
        },
        {
          name: "BA (Hons) Sound and Music Production",
          description: "Combining hands on technical training with industry partnerships with opportunities at Abbey Road Studios.",
          interests: ["Audio engineering", "Creative sound", "Music"],
          link: "https://www.lincoln.ac.uk/course/medaupub/",
          entryGrades: "104-112"
        },
        {
          name: "BA (Hons) Dance",
          description: "Contemporary techniques + choreography with theoretical practice. Opportunity to work with professional companies.",
          interests: ["Dance", "Performance", "Art"],
          link: "https://www.lincoln.ac.uk/course/dandanub/",
          entryGrades: "104-112"
        },
        {
          name: "BA (Hons) Music",
          description: "Industry oriented education that combines performance, composition across diverse musical styles.",
          interests: ["Music", "Performance", "Composition"],
          link: "https://www.lincoln.ac.uk/course/musmusub/",
          entryGrades: "104-112"
        },
        {
          name: "BA (Hons) Journalism",
          description: "Industry focused, practical training in print and broadcast news production.",
          interests: ["Media Studies", "Journalism", "English"],
          link: "https://www.lincoln.ac.uk/course/joujouub/",
          entryGrades: "96-104"
        },
        {
          name: "BA (Hons) Journalism Studies",
          description: "Explore history, societal roles equipping students with knowledge and skills to succeed in a digital landscape.",
          interests: ["Media studies", "Journalism", "English"],
          link: "https://www.lincoln.ac.uk/course/jouinvub/",
          entryGrades: "96-104"
        },
        {
          name: "BA (Hons) Sports Journalism",
          description: "Trains students in core journalism skills for sports media across various platforms.",
          interests: ["Sports media", "Journalism", "Media"],
          link: "https://www.lincoln.ac.uk/course/sptjouub/",
          entryGrades: "96-104"
        }
      ]
    }
  ]
};

// Helper function to get all courses for a subject
export const getCoursesBySubject = (subject: string): Course[] => {
  const schools = coursesData[subject] || [];
  return schools.flatMap(school => school.courses);
};

// Helper function to search courses by interests/skills
export const searchCoursesByInterests = (subject: string, interests: string[]): Course[] => {
  const courses = getCoursesBySubject(subject);
  return courses.filter(course => 
    course.interests.some(interest => 
      interests.some(userInterest => 
        interest.toLowerCase().includes(userInterest.toLowerCase()) ||
        userInterest.toLowerCase().includes(interest.toLowerCase())
      )
    )
  );
};
