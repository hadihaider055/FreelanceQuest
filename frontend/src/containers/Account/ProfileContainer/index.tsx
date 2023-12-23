// React Icons
import { FaPen } from "react-icons/fa";

// Styled
import {
  ProfileContainerContent,
  ProfileContainerStyled,
  ProfileContainerWrapper,
  ProfileContentLeft,
  ProfileContentPartition,
  ProfileContentRight,
} from "./styled";

// Components
import Container from "@/components/common/Container";
import Button from "@/components/common/Button";
import { useState } from "react";

const ProfileContainer: React.FC = () => {
  const [lineClamp, setLineClamp] = useState(8);
  return (
    <ProfileContainerStyled>
      <Container>
        <ProfileContainerWrapper>
          <div className="border-b-2 max-w-[145px]">
            <h1 className="font-poppins text-2xl font-bold text-slate-600 py-2">
              User Profile
            </h1>
          </div>

          <ProfileContainerContent>
            <div className="flex items-center justify-between border-b-2 pb-16 border-stone-300">
              <div className="flex items-center gap-[18px]">
                <div className="w-[190px] h-[190px] rounded-[50%] overflow-hidden flex items-center justify-center bg-slate-200 shadow-profile-image">
                  <img
                    src="https://thumbs.dreamstime.com/b/vector-illustration-avatar-dummy-logo-collection-image-icon-stock-isolated-object-set-symbol-web-137160339.jpg"
                    alt="Dummy"
                    className="w-[170px] h-[170px] object-cover rounded-[50%]"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <h2 className="font-montserrat text-2xl font-bold text-slate-600">
                    John Doe
                  </h2>
                  <h6 className="font-montserrat text-xl text-slate-600">
                    Product Design
                  </h6>
                  <p className="text-gray-500 text-lg font-normal font-montserrat">
                    Eastern European Time (EET), Cairo UTC +3
                  </p>
                  <div className="flex items-center gap-4">
                    <p className="text-gray-500 text-lg font-medium font-montserrat">
                      $20/hr
                    </p>
                    <i className="cursor-pointer text-green-500">
                      <FaPen />
                    </i>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-14">
                <div className="btns">
                  <Button variant="grey">Upload New Photo</Button>
                </div>
                <div className="btns">
                  <Button variant="grey-transparent">Delete</Button>
                </div>
              </div>
            </div>

            <ProfileContentPartition className="flex">
              <ProfileContentLeft className="w-1/3 h-full">
                <div className="flex items-center justify-around  border-b-2 border-stone-300 w-full px-4 pb-4">
                  <div className="flex items-center flex-col">
                    <h3 className="font-montserrat font-medium text-2xl text-black">
                      $3k+
                    </h3>
                    <p className="text-black text-lg font-base font-montserrat">
                      Total earnings
                    </p>
                  </div>
                  <div className="flex items-center flex-col">
                    <h3 className="font-montserrat font-medium text-2xl text-black">
                      5
                    </h3>
                    <p className="text-black text-lg font-base font-montserrat">
                      Total jobs
                    </p>
                  </div>
                </div>

                <div className="flex flex-col border-b-2 border-stone-300 w-full px-4 py-4">
                  <h3 className="font-montserrat font-medium text-2xl text-black text-left">
                    Languages
                  </h3>

                  <ul className="mt-4 flex flex-col gap-2">
                    <li>
                      <p className="text-black text-lg font-normal font-montserrat">
                        English
                      </p>
                    </li>
                    <p className="text-black text-lg font-normal font-montserrat">
                      Urdu
                    </p>
                  </ul>
                </div>
              </ProfileContentLeft>

              <ProfileContentRight className="w-full">
                <div>
                  <h2
                    className="font-poppins text-3xl font-bold text-slate-600"
                    style={{ marginBottom: "1.5rem" }}
                  >
                    MERN/JAM Stack || AWS Serverless || CMS Developer
                  </h2>
                </div>
                <div>
                  <p
                    className={`font-montserrat text-lg text-slate-600 line-clamp-[${lineClamp}]`}
                  >
                    ❓Looking for a Modern Blockchain, MERN Stack, JAMStack, or
                    AWS Serverless Developer❓ Hello 👋, I'm a Modern Full-Stack
                    Web developer from Pakistan who loves to work in a
                    challenging mode and crack great logic to create excellent
                    web applications using state-of-the-art technologies. 🏆Over
                    the past two years, I am constantly learning new
                    technologies and building logical problem-solving projects.
                    From development, optimization, security, and maintenance, I
                    am providing all the possible solutions.🏆 ⚡ I love being
                    challenged and always trying to achieve the highest level of
                    code maintainability and extensibility. Not afraid to learn
                    new technologies. Seeking a strong project and honest people
                    to cooperate with.⚡ 🌟Here is a detailed description of my
                    skills🌟 ✔ Javascript, Typescript, Rust ✔ React.js, Next.js,
                    Gatsby.js ✔ Vue.js, Nuxt.js ✔ Redux, Redux Toolkit ✔
                    CSS/Sass/Scss/Tailwind CSS ✔ Node js, Express js ✔ Cypress,
                    Jest (E2E Testing) ✔ Solidity, Web3.js, Ethers.js, Hardhat,
                    Remix, Ethereum, DAO, Metmask Integration, etc... ✔ NFTs
                    (ERC 115 & ERC 721), tokens (ERC20), DApps, NFT Marketplace,
                    etc... ✔ BigCommerce, Stencil ✔ Apollo, GraphQL ✔ Headless
                    CMS(Contentful, Strapi, Sanity, etc...) ✔ Mongo DB, Fauna
                    DB, Skynet/SkyDB, Firebase Database, DynamoDB ✔ Serverless
                    Framework, AWS CDK, AWS S3, AWS EC2, AWS SQS/SNS, AWS
                    CloudFront, AWS Amplify, etc... ✔ RestApi, Event Driven
                    Architechture ✔I also had a great art of converting Websites
                    to Progressive Web Apps (PWA). For a great, long-lasting
                    user experience. ❓What makes me different❓ ✔ I always aim
                    at striking long-term working relations with outstanding
                    clients and everything is notwithstanding premised on the
                    quality that surpasses your expectations. ✔ I focus on
                    providing value to all of my Clients and Earning their
                    trust. The Client Reviews and Feedback on my Profile are
                    immensely important to me and the value that I provide. ❤️ I
                    love what I do and I hope my work reflects it. If you think
                    we might work well together, please use the "Invite" button
                    to contact me. I'd love to hear from you! MEET YOU AT WORK!!
                    Best Regards, Hadi Haider
                  </p>

                  <span
                    className="cursor-pointer font-montserrat text-lg font-medium text-green-500 underline"
                    onClick={() => setLineClamp(lineClamp === 0 ? 8 : 0)}
                  >
                    {lineClamp === 0 ? "less" : "more"}
                  </span>
                </div>
              </ProfileContentRight>
            </ProfileContentPartition>
          </ProfileContainerContent>
        </ProfileContainerWrapper>
      </Container>
    </ProfileContainerStyled>
  );
};

export default ProfileContainer;
